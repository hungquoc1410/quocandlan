import { useEffect, useState } from 'react'
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
        <div className="flex h-screen w-full items-center justify-center bg-black/50 text-2xl text-gray-50 xl:text-5xl">
            <div className="grid grid-cols-4 gap-4 xl:gap-14">
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time text-4xl lg:text-6xl">{days}</span>
                    <span className="label text-base xl:text-2xl">Days</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time text-4xl lg:text-6xl">{hours}</span>
                    <span className="label text-base xl:text-2xl">Hours</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time text-4xl lg:text-6xl">{minutes}</span>
                    <span className="label text-base xl:text-2xl">Minutes</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="time text-4xl lg:text-6xl">{seconds}</span>
                    <span className="label text-base xl:text-2xl">Seconds</span>
                </div>
            </div>
        </div>
    )
}

export default Clock
