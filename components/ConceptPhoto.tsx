import type { NextComponentType, NextPageContext } from 'next'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
    imageUrl: string
}

const ConceptPhoto: NextComponentType<NextPageContext, {}, Props> = ({
    imageUrl,
}) => {
    const [zoom, setZoom] = useState('hidden')
    return (
        <div className="overflow-hidden rounded-xl bg-gray-200 p-1 shadow-lg">
            <Image
                src={imageUrl}
                className="h-52 w-auto cursor-zoom-in rounded-lg hover:opacity-70 lg:h-80"
                width={500}
                height={500}
                alt="Nasi lemak cover"
                onClick={() => setZoom('block')}
            />

            <div
                className={`${zoom} fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/80`}
            >
                <div className="container flex h-screen items-center justify-center overflow-hidden p-2">
                    <div className="relative h-auto w-auto">
                        <button
                            type="button"
                            onClick={() => setZoom('hidden')}
                            className="absolute top-2 right-2 inline-flex items-center rounded-lg bg-black/50 p-1 text-sm text-gray-200 hover:bg-gray-400 hover:text-white"
                        >
                            <svg
                                className="h-8 w-8"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <Image
                            id="concept_photo"
                            src={imageUrl}
                            className="w-auto rounded-lg object-contain"
                            width={500}
                            height={500}
                            alt="Nasi lemak cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConceptPhoto
