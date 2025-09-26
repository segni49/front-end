'use client'

import Image from 'next/image'

type Top3Prediction = {
  class: string;
  confidence: number;
};

type Result = {
  class?: string;
  confidence?: number;
  error?: string;
  guidance?: string;
  top3?: Top3Prediction[];
};

type Props = {
  result: Result | null;
  preview: string | null;
}

const confidenceColor = (c: number) => {
  if (c >= 0.85) return 'bg-brand-500';
  if (c >= 0.65) return 'bg-accent-500';
  return 'bg-red-500';
}

export default function ResultCard({ result, preview }: Props) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-accent-50 p-6 text-brand-700 shadow-glow text-center animate-fade-in">
        <span className="block text-xl font-bold mb-2">Upload an image</span>
        <span className="block text-base">Tap <span className="font-bold text-brand-500">Analyze</span> to see predictions.</span>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-brand-50 p-6 text-red-700 shadow-glow text-center animate-shake">
        <span className="block text-xl font-bold mb-2">Error</span>
        <span className="block text-base">{result.error}</span>
      </div>
    );
  }

  const cls = result.class || '';
  const conf = Number(result.confidence || 0);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white via-brand-50 to-accent-50 p-6 shadow-glow animate-fade-in">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div>
          <h3 className="text-2xl font-extrabold text-brand-800 mb-1 drop-shadow">Prediction</h3>
          <p className="text-brand-700 text-lg font-medium">
            {cls === 'uncertain' ? 'Uncertain — try a clearer photo.' : cls}
          </p>
        </div>
        {preview && (
          <div className="h-20 w-20 rounded-xl overflow-hidden border-2 border-brand-200 flex items-center justify-center bg-brand-50 shadow-md">
            <Image src={preview} alt="Result preview" width={80} height={80} className="object-cover h-20 w-20" />
          </div>
        )}
      </div>

      {'confidence' in result && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-base text-brand-700 font-semibold">
            <span>Confidence</span>
            <span>{(conf * 100).toFixed(0)}%</span>
          </div>
          <div className="mt-2 h-4 w-full rounded-full bg-brand-100 shadow-inner">
            <div
              className={`h-4 rounded-full ${confidenceColor(conf)} transition-all duration-500 shadow-md`}
              style={{ width: undefined }}
              data-width={conf}
            />
          </div>
        </div>
      )}

      {'guidance' in result && result.guidance && (
        <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-brand-800 shadow-soft">
          <strong className="font-semibold">Guidance:</strong> {result.guidance}
        </div>
      )}

      {Array.isArray(result.top3) && (
        <div className="mt-6">
          <h4 className="text-brand-800 font-bold text-lg mb-2">Top 3 Predictions</h4>
          <ul className="space-y-2">
            {result.top3.map((t: Top3Prediction, i: number) => (
              <li key={i} className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 shadow-soft">
                <span className="text-brand-800 font-semibold text-base">{t.class}</span>
                <span className="text-brand-700 font-medium">{(Number(t.confidence) * 100).toFixed(0)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}