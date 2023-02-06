import ConceptPhoto from '@/components/ConceptPhoto'
import { db, storage } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import type {
    GetStaticPaths,
    GetStaticProps,
    NextComponentType,
    NextPageContext,
} from 'next'
import Link from 'next/link'

interface Props {
    data: string[]
    detail: {
        name?: string
        description?: string
        longText?: string
        time?: string
    }
}

const details = [
    '20220127',
    '20220227',
    '20220309',
    '20220313',
    '20220326',
    '20220329',
    '20220403',
    '20220517',
    '20220528',
    '20220814',
    '20221015',
    '20221120',
    '20230114',
]

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = details.map((detail) => {
        return { params: { date: detail } }
    })
    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    if (context.params) {
        const galleryRef = ref(storage, `${String(context.params.date)}`)
        const gallerySnap = await listAll(galleryRef)
        let i = 0
        let data: string[] = []

        while (i < gallerySnap.items.length) {
            const url = await getDownloadURL(gallerySnap.items[i])
            data.push(url)
            i++
        }

        const docRef = doc(db, 'content', String(context.params.date))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                props: {
                    data: data,
                    detail: { ...docSnap.data(), name: docSnap.id },
                },
            }
        } else {
            return { props: { data: data, detail: {} } }
        }
    }

    return {
        props: { data: [] },
    }
}

const Date: NextComponentType<NextPageContext, {}, Props> = ({
    data,
    detail,
}) => {
    const { description, time, longText } = detail

    return (
        <div className="min-h-screen w-full bg-black/50 text-white">
            <div className="container mx-auto py-12">
                <Link
                    href="/"
                    className="ml-2 mb-4 inline-flex items-center rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:text-yellow-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
                >
                    Go Back
                </Link>
                {description && (
                    <h3 className="mb-1 text-center text-2xl font-bold text-white">
                        {description}
                    </h3>
                )}
                {time && (
                    <time className="mb-4 block text-center text-sm font-normal leading-none text-gray-400">
                        {time}
                    </time>
                )}
                {longText && (
                    <p className="mb-4 px-4 text-base font-normal text-gray-200">
                        {longText}
                    </p>
                )}
                <div className="mb-4 flex flex-wrap justify-center gap-4">
                    {data.map((image, index) => {
                        return (
                            <ConceptPhoto
                                key={`image_${index}`}
                                imageUrl={image}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Date
