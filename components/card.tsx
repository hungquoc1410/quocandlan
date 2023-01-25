/* eslint-disable @next/next/no-img-element */
import type { NextComponentType, NextPageContext } from 'next'
import {
    StorageReference,
    getDownloadURL,
    listAll,
    ref,
} from 'firebase/storage'
import { storage } from '@/utils/firebase'
import { useEffect, useState } from 'react'
import ModalPhoto from './modalPhoto'
import Image from 'next/image'

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
            <div className="flex flex-col xl:flex-row shadow hover:shadow-md w-3/5 bg-white rounded-lg overflow-hidden">
                {photo && (
                    <Image
                        className="object-cover w-1/2"
                        src={photo}
                        width={500}
                        height={500}
                        alt="Flower and sky"
                    />
                )}
                <div className="relative w-1/2 p-4">
                    <h3 className="text-base md:text-xl font-medium text-gray-800">
                        {detail.title}
                    </h3>
                    <p className="mt-4 text-base md:text-lg text-gray-600">
                        {detail.description}
                    </p>
                    <button
                        onClick={() => setShow('block')}
                        className="mt-4 py-2 px-3 rounded-lg bg-gray-500 hover:bg-gray-600 font-bold text-white shadow transition ease-in-out duration-200 translate-10"
                    >
                        See More
                    </button>
                </div>
            </div>
            <div
                className={`${show} fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black/50`}
            >
                <div className="w-full h-full container p-8 flex flex-col gap-8 items-center justify-between overflow-auto">
                    <button
                        onClick={() => setShow('hidden')}
                        type="button"
                        className="self-end"
                    >
                        <svg
                            className="fill-white w-6 h-6"
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
                    <p className="rounded-xl bg-white p-2">{detail.longText}</p>
                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-2 lg:grid-cols-4 w-full">
                        {gallery &&
                            gallery.map((item, index) => (
                                <div
                                    className="relative rounded-xl flex justify-center items-center"
                                    key={`image_${index}`}
                                >
                                    <ModalPhoto item={item} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
