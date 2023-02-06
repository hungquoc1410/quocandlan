import { cardDetails } from '@/utils/cardDetails'
import type { NextComponentType, NextPageContext } from 'next'
import Link from 'next/link'

interface Props {}

const Timeline: NextComponentType<NextPageContext, {}, Props> = (
    props: Props
) => {
    return (
        <div className="container mx-auto flex justify-center">
            <ol className="relative border-l border-gray-700">
                {cardDetails.map((detail, index) => {
                    const { description, time, longText, name } = detail
                    return (
                        <li className="mb-10 ml-6" key={`detail_${index}`}>
                            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 ring-8 ring-gray-800"></span>
                            {description && (
                                <h3 className="ml-2 mb-1 flex items-center text-lg font-semibold text-white">
                                    {description}
                                </h3>
                            )}
                            {time && (
                                <time className="ml-2 mb-2 block text-sm font-normal leading-none text-gray-500">
                                    {detail.time}
                                </time>
                            )}
                            {longText && (
                                <p id='long_text' className="ml-2 mb-4 max-w-md overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-400">
                                    {detail.longText}
                                </p>
                            )}
                            {name && (
                                <Link
                                    href={`/date/${detail.name}`}
                                    className="ml-2 inline-flex items-center rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:text-yellow-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
                                >
                                    Read More &gt;&gt;
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default Timeline
