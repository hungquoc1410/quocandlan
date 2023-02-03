import Clock from '@/components/Clock'
import Timeline from '@/components/Timeline'

export default function Home() {
    return (
        <>
            <section id="clock" className="bg-cover bg-fixed bg-center">
                <Clock />
            </section>
            <section className="bg-black p-12">
                <Timeline />
            </section>
        </>
    )
}
