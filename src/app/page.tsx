'use client'

import { useState } from 'react'
import { apiPredict } from '../lib/api'
import Uploader from '../components/Uploader'
import ResultCard from '../components/ResultCard'
import Popup from '../components/Popup'

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    class?: string;
    confidence?: number;
    error?: string;
    guidance?: string;
    top3?: { class: string; confidence: number }[];
  } | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const onFileChange = (f: File | null) => {
    setFile(f)
    setResult(null)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const onPredict = async () => {
    if (!file) return
    setLoading(true)
    try {
      const data = await apiPredict(file)
      setResult(data)
      setShowPopup(true)
      // Optional: log to Neon
      try {
        await fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            class: data.class,
            confidence: data.confidence,
            top3: data.top3,
            source: 'web',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          }),
        })
      } catch {}
    } catch {
      setResult({ error: 'Prediction failed. Please retry.' });
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md p-4 sm:max-w-lg animate-fade-in">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-brand-800 mb-2 tracking-tight drop-shadow-lg">Potato Leaf Classifier</h1>
        <p className="mt-1 text-brand-700 text-base font-medium">
          Upload a leaf photo to triage: <span className="text-brand-500 font-bold">Healthy</span>, <span className="text-accent-500 font-bold">Early blight</span>, or <span className="text-red-500 font-bold">Late blight</span>.
        </p>
      </header>

      <section className="rounded-2xl bg-white/80 backdrop-blur-xs shadow-soft p-4">
  <Uploader file={file} preview={preview} onFileChange={onFileChange} />

        <button
          onClick={onPredict}
          disabled={!file || loading}
          className="mt-4 w-full rounded-xl bg-brand-500 px-4 py-3 text-white font-semibold shadow-soft transition hover:bg-brand-600 disabled:opacity-60 text-lg"
        >
          {loading ? 'Analyzing…' : 'Analyze leaf'}
        </button>
      </section>

      <section className="mt-6">
        <ResultCard result={result} preview={preview} />
      </section>

      <Popup open={showPopup} onOpenChange={setShowPopup} result={result} />
    </main>
  );
}