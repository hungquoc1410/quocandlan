import Head from 'next/head'
import { Roboto } from '@next/font/google'
import Clock from '@/components/clock'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export default function Home() {
    return (
        <>
            <Head>
                <title>Quoc & Lan</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`bg-center bg-cover ${roboto.className}`}>
                <div className="w-screen h-screen flex justify-center items-center bg-black/50">
                    <div className="w-full h-full flex justify-center items-center container">
                        <Clock />
                    </div>
                </div>
            </main>
        </>
    )
}
