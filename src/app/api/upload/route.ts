import { createClient } from '@supabase/supabase-js'

import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      throw new Error('No file was provided')
    }

    const { data } = await supabase.storage
      .from('images')
      .list(`public`, { search: file?.name })

    if (data?.length) {
      const { data: imageUrl } = await supabase.storage
        .from('images')
        .getPublicUrl(`public/${file.name}`)

      return NextResponse.json({ imageUrl: imageUrl.publicUrl })
    }

    const { data: uploadedData, error } = await supabase.storage
      .from('images')
      .upload(`public/${file.name}`, file)

    if (error) {
      throw new Error('Error occurred while uploading image')
    }

    if (uploadedData?.path) {
      const { data: imageUrl } = await supabase.storage
        .from('images')
        .getPublicUrl(uploadedData?.path)

      return NextResponse.json({ imageUrl: imageUrl.publicUrl })
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }
}
