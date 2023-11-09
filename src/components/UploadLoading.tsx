export function UploadLoading() {
  return (
    <>
      <h3 className="text-gray-500 text-xl mb-10">Uploading...</h3>

      <div className="w-full h-2 bg-gray-100 rounded-lg overflow-hidden">
        <div className="h-2 w-full animate-moveHorizontal">
          <div className="bg-primary w-24 h-2 rounded-lg" />
        </div>
      </div>
    </>
  )
}
