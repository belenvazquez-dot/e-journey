const STYLES = {
  cl: {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-red-100 text-red-700',
  },
  ed: {
    Positive: 'bg-emerald-100 text-emerald-700',
    Neutral: 'bg-slate-100 text-slate-600',
    Negative: 'bg-rose-100 text-rose-700',
  },
  mood: {
    Grounded: 'bg-slate-200 text-slate-700',
    Core: 'bg-blue-100 text-blue-700',
    Lifted: 'bg-amber-100 text-amber-700',
    Peak: 'bg-teal-100 text-teal-700',
  },
};

const PREFIXES = { cl: 'CL', ed: 'ED' };

export default function Pill({ type, value }) {
  const colorClass = STYLES[type]?.[value] ?? 'bg-slate-100 text-slate-600';
  const prefix = PREFIXES[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {prefix && <span className="opacity-50">{prefix}</span>}
      {value}
    </span>
  );
}
