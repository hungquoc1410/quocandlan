import type { NextComponentType, NextPageContext } from 'next'

interface Props {}

const Date: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return <div>Date</div>
}

export default Date
