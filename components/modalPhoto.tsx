/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { getDownloadURL, StorageReference } from 'firebase/storage'
import type { NextComponentType, NextPageContext } from 'next'
import Image from 'next/image'

interface Props {
    item: StorageReference
}

const ModalPhoto: NextComponentType<NextPageContext, {}, Props> = (
    props: Props
) => {
    const [url, setUrl] = useState<string>()
    const { item } = props

    useEffect(() => {
        const getPhoto = async (item: StorageReference) => {
            const url = await getDownloadURL(item)
            setUrl(url)
        }

        getPhoto(item)
    }, [item])

    return (
        <>
            {url && (
                <Image
                    src={url}
                    width={500}
                    height={500}
                    className="mx-auto h-full w-auto object-contain"
                    alt="image"
                />
            )}
        </>
    )
}

export default ModalPhoto
