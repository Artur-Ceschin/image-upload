import Image from 'next/image'

import { MdCheckCircle } from 'react-icons/md'
import { toast } from 'react-toastify'

interface ImagePreviewProps {
  imageUrl: string
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  function copyLink() {
    navigator.clipboard.writeText(imageUrl)
    toast.info('Image copied on clipboard')
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-start">
      <MdCheckCircle size={43} className="text-green" />

      <Image
        src={imageUrl}
        className="rounded-xl"
        alt="Image Description"
        width={500}
        height={300}
      />

      <div className="rounded-lg border-2 border-gray-200 w-full flex mt-4 items-center bg-gray-100">
        <div className="text-gray-500 px-3 text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[80%]">
          {imageUrl}
        </div>
        <button
          onClick={() => {
            copyLink()
          }}
          className="bg-primary hover:brightness-90 w-full m-[1px] py-3 text-xs text-white rounded-lg"
        >
          Copy Link
        </button>
      </div>
    </div>
  )
}
