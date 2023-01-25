import type { NextComponentType, NextPageContext } from 'next'
import Card from './card'
import { cardDetails } from '@/utils/cardDetails'

interface Props {}

const Timeline: NextComponentType<NextPageContext, {}, Props> = (
    props: Props
) => {
    return (
        <div className="w-full container flex flex-col justify-center items-center gap-6 p-8">
            {cardDetails.map((detail) => {
                return <Card key={detail.name} detail={detail} />
            })}
        </div>
    )
}

export default Timeline
