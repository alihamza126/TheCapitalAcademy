'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { uploadFile } from '@/actions/Cloudniary'

type Props = {
    onUpload?: (url: string) => void
}

export default function ImageUploaderBox({ onUpload }: Props) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setIsUploading(true)

        try {
            const result = await uploadFile(formData)

            setImageUrl(result.url)
            onUpload?.(result.url)
        } catch (err) {
            alert('Upload failed')
            console.error(err)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <label
            htmlFor="upload"
            className="cursor-pointer w-full max-w-xs aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center px-4 py-4 hover:border-blue-400 transition-all relative"
        >
            <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
            />

            {isUploading ? (
                <div className="animate-pulse text-sm text-gray-500">Uploading...</div>
            ) : imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="object-cover w-full h-full rounded-md"
                />
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <Upload className="w-6 h-6 mb-1" />
                    <p className="text-sm">Click to upload</p>
                </div>
            )}
        </label>
    )
}
