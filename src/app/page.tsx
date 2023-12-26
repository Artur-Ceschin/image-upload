'use client'

import { UploadImage } from '@/components/UploadImage'
import { UploadLoading } from '@/components/UploadLoading'
import { ImagePreview } from '@/components/ImagePreview'

import 'react-toastify/dist/ReactToastify.css'
import { Toast } from '@/components/Toast'
import { useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <Toast />
      <main className="bg-background w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-[420px] bg-white rounded-xl drop-shadow-md p-8">
          {isLoading ? (
            <UploadLoading />
          ) : imageUrl ? (
            <ImagePreview imageUrl={imageUrl} />
          ) : (
            <UploadImage
              setImageUrl={setImageUrl}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </main>
    </>
  )
}
