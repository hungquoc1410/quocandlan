import Clock from '@/components/Clock'
import Timeline from '@/components/Timeline'
import { db } from '@/utils/firebase'
import { getDocs, collection, DocumentData } from 'firebase/firestore'
import { NextComponentType, NextPageContext } from 'next'

interface Props {
    data: {
        name: string
        description: string
        longText: string
        time: string
    }[]
}

export const getStaticProps = async () => {
    const querySnapshot = await getDocs(collection(db, 'content'))
    let data: DocumentData[] = []
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), name: doc.id })
    })
    return {
        props: { data: data },
    }
}

const Home: NextComponentType<NextPageContext, {}, Props> = ({ data }) => {
    return (
        <>
            <section id="clock" className="bg-cover bg-fixed bg-center">
                <Clock />
            </section>
            <section className="bg-black p-12">
                <Timeline data={data} />
            </section>
        </>
    )
}

export default Home
