'use client'

type Result = {
  class?: string;
  confidence?: number;
  error?: string;
  guidance?: string;
  top3?: { class: string; confidence: number }[];
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  result: Result | null;
}

export default function Popup({ open, onOpenChange, result }: Props) {
  if (!open || !result) return null;

  const cls = result.class || '';
  const conf = Number(result.confidence || 0);
  const text =
    result.error
      ? 'Prediction failed. Please try again.'
      : cls === 'uncertain'
        ? 'Uncertain prediction. Use better lighting, fill the frame with the leaf, and try again.'
        : `Detected: ${cls} (${(conf * 100).toFixed(0)}%).`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-white via-brand-50 to-accent-50 p-7 shadow-glow animate-pop-in">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-extrabold text-brand-800">Result</h3>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg px-3 py-1 text-brand-800 hover:bg-brand-50 text-xl"
            aria-label="Close"
          >
            &#10005;
          </button>
        </div>
        <p className="mt-2 text-brand-700 text-lg font-semibold">{text}</p>

        {result.guidance && (
          <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-brand-800 shadow-soft">
            <strong className="font-semibold">Guidance:</strong> {result.guidance}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-brand-300 bg-white px-4 py-3 text-brand-800 shadow-soft hover:bg-brand-50 text-lg font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(JSON.stringify(result, null, 2));
              onOpenChange(false);
            }}
            className="flex-1 rounded-xl bg-brand-500 px-4 py-3 text-white shadow-soft hover:bg-brand-600 text-lg font-semibold"
          >
            Copy result
          </button>
        </div>
      </div>
    </div>
  );
}