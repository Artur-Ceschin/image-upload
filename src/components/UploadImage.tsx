import Image from 'next/image'
import { ChangeEvent, useState, DragEvent } from 'react'

import DefaultUploadImage from '@/assets/image.svg'
import { useSupabase } from '@/hooks/useSupabase'
import { toast } from 'react-toastify'

interface UploadImageProps {
  setIsLoading: (data: boolean) => void
  setImageUrl: (data: string) => void
}

export function UploadImage({ setIsLoading, setImageUrl }: UploadImageProps) {
  const [isDragging, setIsDragging] = useState(false)

  const supabase = useSupabase()

  function validateFileType(file: File): boolean {
    if (file.type.startsWith('image/')) {
      return true
    } else {
      toast.error('Please select an image (JPEG, PNG, JPG)')
      return false
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]

    if (file) {
      await handleSupabaseServices(file)
    }
  }

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleSupabaseServices(file)
    }
  }

  async function handleSupabaseServices(file: File) {
    if (file && validateFileType(file)) {
      try {
        setIsLoading(true)

        const { data } = await supabase.storage
          .from('images')
          .list(`public`, { search: file.name })

        if (data?.length) {
          console.log('DATA =>', data)
          const { data: imageUrl } = await supabase.storage
            .from('images')
            .getPublicUrl(`public/${file.name}`)

          return setImageUrl(imageUrl.publicUrl)
        }

        const { data: uploadedData, error } = await supabase.storage
          .from('images')
          .upload(`public/${file.name}`, file)

        if (error) {
          toast.error('Please select an image (JPEG, PNG, JPG)')
        }

        if (uploadedData?.path) {
          const { data: imageUrl } = await supabase.storage
            .from('images')
            .getPublicUrl(uploadedData?.path)

          setImageUrl(imageUrl.publicUrl)
        }
      } catch (error) {
        console.error('error', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-start">
      <h1 className="text-gray-500 text-xl">Upload your image</h1>
      <p className="text-gray-400 text-xs">File should be Jpeg, Png,...</p>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-gray-100 border-2 border-dashed rounded-xl p-10 flex items-center flex-col w-full justify-center gap-10 ${
          isDragging ? 'opacity-70 border-green' : 'border-light-blue'
        }`}
      >
        <Image
          src={DefaultUploadImage}
          alt="Default image"
          width={115}
          height={100}
        />
        <h3 className="text-gray-300 text-sm">
          {isDragging ? 'Drop your image' : 'Drag & Drop your image here'}
        </h3>
      </div>

      <p className="text-gray-200 text-sm">Or</p>

      <div className="bg-primary hover:brightness-90 text-xs text-white rounded-lg">
        <label className="py-3 px-5 cursor-pointer block" htmlFor="fileInput">
          Choose a file
        </label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          id="fileInput"
        />
      </div>
    </div>
  )
}