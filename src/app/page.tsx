'use client'

import { useState } from 'react'
import { UploadImage } from '@/components/UploadImage'
import { UploadLoading } from '@/components/UploadLoading'
import { ImagePreview } from '@/components/ImagePreview'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="bg-background w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-[420px] bg-white rounded-xl drop-shadow-md p-8">
          {isLoading ? (
            <UploadLoading />
          ) : imageUrl ? (
            <ImagePreview imageUrl={imageUrl} />
          ) : (
            <UploadImage
              setIsLoading={setIsLoading}
              setImageUrl={setImageUrl}
            />
          )}
        </div>
      </main>
    </>
  )
}
