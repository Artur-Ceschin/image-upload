'use client'

import { UploadImage } from '@/components/UploadImage'
import { UploadLoading } from '@/components/UploadLoading'
import { ImagePreview } from '@/components/ImagePreview'

import 'react-toastify/dist/ReactToastify.css'
import { Toast } from '@/components/Toast'

export default function Home() {
  return (
    <>
      <Toast />
      <main className="bg-background w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-[420px] bg-white rounded-xl drop-shadow-md p-8">
          {/* <UploadLoading /> */}

          {/* <ImagePreview /> */}

          <UploadImage />
        </div>
      </main>
    </>
  )
}
