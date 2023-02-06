import ConceptPhoto from '@/components/ConceptPhoto'
import { cardDetails } from '@/utils/cardDetails'
import type { NextComponentType, NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {}

const Date: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const router = useRouter()
    const { query } = router
    const detail = cardDetails.filter((d) => d.name == query.date)[0]
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
                    <ConceptPhoto imageUrl="/images/desktop-background.jpg" />
                    <ConceptPhoto imageUrl="/images/mobile-background.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Date
