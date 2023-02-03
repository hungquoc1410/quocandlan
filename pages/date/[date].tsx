import { cardDetails } from '@/utils/cardDetails'
import type { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'

interface Props {}

const Date: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const router = useRouter()
    const { query } = router
    const detail = cardDetails.filter((d) => d.name == query.date)[0]
    return (
        <div className="min-h-screen w-full bg-black/50 text-white">
            <div className="container mx-auto py-12">
                <h3 className="mb-1 flex items-center text-center text-lg font-semibold text-white">
                    {detail.description}
                </h3>
                <time className="mb-2 block text-center text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {detail.time}
                </time>
                <p className="mb-4 max-w-md overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-normal text-gray-400">
                    {detail.longText}
                </p>
            </div>
        </div>
    )
}

export default Date
