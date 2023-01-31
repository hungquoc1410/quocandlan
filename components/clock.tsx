import { useEffect,useState } from 'react'
import type { NextComponentType, NextPageContext } from 'next'

interface Props {}

const Clock: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const target = new Date('03/09/2022 00:00:00')

        const interval = setInterval(() => {
            const now = new Date()
            const difference = now.getTime() - target.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            setHours(h)

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            setMinutes(m)

            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setSeconds(s)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex h-full w-full items-center justify-center text-2xl text-gray-50 xl:text-5xl">
            <div className="flex items-center justify-center gap-6 xl:gap-14">
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time">{days}</span>
                    <span className="label text-xl xl:text-3xl">Days</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time">{hours}</span>
                    <span className="label text-xl xl:text-3xl">Hours</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time">{minutes}</span>
                    <span className="label text-xl xl:text-3xl">Minutes</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time">{seconds}</span>
                    <span className="label text-xl xl:text-3xl">Seconds</span>
                </div>
            </div>
        </div>
    )
}

export default Clock
