import Image from 'next/image'

import DefaultUploadImage from '@/assets/image.svg'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface UploadImage {
  setIsLoading: (value: boolean) => void
  setImageUrl: (value: string) => void
}

export function UploadImage({ setIsLoading, setImageUrl }: UploadImage) {
  const [isDragging, setIsDragging] = useState(false)

  function validateImageType(file: File) {
    if (file.type.startsWith('image/')) return true
    toast.error('Please select a valid image')
    return false
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setIsDragging(false)

    file && (await handleSupabaseUpload(file))
  }

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    file && (await handleSupabaseUpload(file))
  }

  async function handleSupabaseUpload(file: File) {
    try {
      if (validateImageType(file)) {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const { imageUrl, error } = await response.json()

        if (error) throw new Error(error)

        setImageUrl(imageUrl)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error happened while uploading the image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-start">
      <h1 className="text-gray-500 text-xl">Upload your image</h1>
      <p className="text-gray-400 text-xs">File should be Jpeg, Png,...</p>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`bg-gray-50 ${
          isDragging ? 'border-green' : 'border-light-blue'
        } border-2 border-dashed rounded-xl p-10 flex items-center flex-col w-full justify-center gap-10`}
      >
        <Image
          src={DefaultUploadImage}
          alt="Default image"
          width={115}
          height={100}
          priority
        />
        <h3 className="text-gray-300 text-sm">
          {!isDragging && 'Drag &'} Drop your image here
        </h3>
      </div>

      <p className="text-gray-200 text-sm">Or</p>

      <div className="bg-primary hover:brightness-90 text-xs text-white rounded-lg">
        <label className="py-3 px-5 cursor-pointer block" htmlFor="fileInput">
          Choose a file
        </label>
        <input
          onChange={handleFileInput}
          type="file"
          className="hidden"
          id="fileInput"
        />
      </div>
    </div>
  )
}
