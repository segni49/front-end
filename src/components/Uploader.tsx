'use client'

import Image from 'next/image'
import { ChangeEvent } from 'react'

type Props = {
  file: File | null
  preview: string | null
  onFileChange: (f: File | null) => void
}

export default function Uploader({ preview, onFileChange }: Props) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    onFileChange(f);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <label
        htmlFor="file"
        className="cursor-pointer rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 px-6 py-8 text-center text-brand-800 shadow-glow transition hover:bg-brand-100"
      >
        <span className="block text-xl font-bold mb-1">Tap to upload leaf photo</span>
        <span className="block text-base text-brand-700">JPEG/PNG, clear lighting, single leaf</span>
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleInput}
        className="hidden"
      />

      {preview && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-brand-200 bg-brand-50 shadow-md animate-pop-in">
          <Image
            src={preview}
            alt="Uploaded preview"
            width={400}
            height={256}
            className="h-64 w-full object-cover"
          />
          <div className="absolute bottom-2 right-2 rounded-full bg-white/80 px-4 py-2 text-sm text-brand-800 shadow-soft font-semibold">
            Preview
          </div>
        </div>
      )}
    </div>
  );
}