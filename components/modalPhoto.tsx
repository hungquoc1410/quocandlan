/* eslint-disable @next/next/no-img-element */
import { StorageReference, getDownloadURL } from 'firebase/storage'
import type { NextComponentType, NextPageContext } from 'next'
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

    return <img src={url} className="object-cover w-full" alt="image" />
}

export default ModalPhoto
