/* eslint-disable @next/next/no-img-element */
import { storage } from '@/utils/firebase'
import { StorageReference, listAll, ref } from 'firebase/storage'
import type { NextComponentType, NextPageContext } from 'next'
import { useEffect, useState } from 'react'

import ModalPhoto from './modalPhoto'
import { Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

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
    const [gallery, setGallery] = useState<StorageReference[]>()

    useEffect(() => {
        const getGallery = async (name: string) => {
            const listRef = ref(storage, `${name}/`)
            const galleryList = await listAll(listRef)
            return setGallery(galleryList.items)
        }
        getGallery(detail.name)
    }, [detail.name])

    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="container flex h-full w-full flex-col items-center justify-center rounded-lg bg-white shadow lg:flex-row">
                <div className="w-full p-4">
                    <p className="text-xl font-semibold">{detail.title}</p>
                    <p className="whitespace-pre-line text-lg font-medium">
                        {detail.description}
                    </p>
                    <p className="whitespace-pre-line">{detail.longText}</p>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    modules={[Mousewheel, Pagination]}
                    className="h-full w-full"
                >
                    {gallery &&
                        gallery.map((item, index) => (
                            <SwiperSlide key={`item_${index}`}>
                                <ModalPhoto item={item} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Card
