/* eslint-disable @next/next/no-img-element */
import { StorageReference, getDownloadURL } from 'firebase/storage'
import type { NextComponentType, NextPageContext } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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
                    className="object-cover w-full"
                    alt="image"
                />
            )}
        </>
    )
}

export default ModalPhoto
