import Image from 'next/image'

import DefaultUploadImage from '@/assets/image.svg'

export function UploadImage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-start">
      <h1 className="text-gray-500 text-xl">Upload your image</h1>
      <p className="text-gray-400 text-xs">File should be Jpeg, Png,...</p>

      <div className="bg-gray-50 border-light-blue border-2 border-dashed rounded-xl p-10 flex items-center flex-col w-full justify-center gap-10">
        <Image
          src={DefaultUploadImage}
          alt="Default image"
          width={115}
          height={100}
          priority
        />
        <h3 className="text-gray-300 text-sm">Drag & Drop your image here</h3>
      </div>

      <p className="text-gray-200 text-sm">Or</p>

      <div className="bg-primary hover:brightness-90 text-xs text-white rounded-lg">
        <label className="py-3 px-5 cursor-pointer block" htmlFor="fileInput">
          Choose a file
        </label>
        <input type="file" className="hidden" id="fileInput" />
      </div>
    </div>
  )
}
