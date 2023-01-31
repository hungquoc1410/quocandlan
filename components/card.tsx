/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import {
    getDownloadURL,
    listAll,
    ref,
    StorageReference,
} from 'firebase/storage'
import type { NextComponentType, NextPageContext } from 'next'
import Image from 'next/image'

import { storage } from '@/utils/firebase'

import ModalPhoto from './modalPhoto'

interface Props {
    detail: {
        name: string
        title: string
        description: string
        longText: string
    }
}

const Card: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const { detail } = props
    const [photo, setPhoto] = useState<string>()
    const [show, setShow] = useState('hidden')
    const [gallery, setGallery] = useState<StorageReference[]>()

    const imageRef = ref(storage, `Thumbnails/${detail.name}.jpg`)
    getDownloadURL(imageRef).then((url) => setPhoto(url))

    useEffect(() => {
        const getGallery = async (name: string) => {
            const listRef = ref(storage, `${name}/`)
            const galleryList = await listAll(listRef)
            return setGallery(galleryList.items)
        }
        getGallery(detail.name)
    }, [detail.name])

    return (
        <>
            <div className="flex w-11/12 flex-col rounded-lg bg-white shadow hover:shadow-md xl:w-3/5 xl:flex-row">
                {photo && (
                    <Image
                        className="w-full object-cover xl:w-1/2"
                        src={photo}
                        width={500}
                        height={500}
                        alt="Flower and sky"
                    />
                )}
                <div className="relative w-full p-4 xl:w-1/2">
                    <h3 className="text-base font-medium text-gray-800 md:text-xl">
                        {detail.title}
                    </h3>
                    <p className="mt-4 whitespace-pre-line text-base text-gray-600 md:text-lg">
                        {detail.description}
                    </p>
                    <button
                        onClick={() => setShow('block')}
                        className="translate-10 mt-4 rounded-lg bg-gray-500 py-2 px-3 font-bold text-white shadow transition duration-200 ease-in-out hover:bg-gray-600"
                    >
                        See More
                    </button>
                </div>
            </div>
            <div
                className={`${show} fixed top-0 bottom-0 left-0 right-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50`}
            >
                <div className="container relative flex h-full w-full flex-col items-center gap-2 overflow-auto bg-white p-8">
                    <button
                        onClick={() => setShow('hidden')}
                        type="button"
                        className="self-end"
                    >
                        <svg
                            className="h-6 w-6 fill-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 121.31 122.876"
                            xmlSpace="preserve"
                        >
                            <g>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
                                />
                            </g>
                        </svg>
                    </button>
                    <p className="whitespace-pre-line rounded-xl p-2">
                        {detail.longText}
                    </p>
                    <div className="grid w-full grid-cols-2 gap-2 rounded-xl p-2 lg:grid-cols-4">
                        {gallery &&
                            gallery.map((item, index) => (
                                <div
                                    className="relative flex items-center justify-center rounded-xl"
                                    key={`image_${index}`}
                                >
                                    <ModalPhoto item={item} />
                                </div>
                            ))}
                    </div>
                    <button
                        onClick={() => setShow('hidden')}
                        className="translate-10 rounded-lg bg-gray-500 py-2 px-3 font-bold text-white shadow transition duration-200 ease-in-out hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card
