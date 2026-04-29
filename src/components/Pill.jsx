// Colors pulled from EL-Dark tokens
const STYLES = {
  cl: {
    Low:    'bg-el-positive-low text-el-positive-high',
    Medium: 'bg-el-warning-subtle text-el-warning-high',
    High:   'bg-el-negative-low text-el-negative-high',
  },
  ed: {
    Positive: 'bg-el-positive-low text-el-positive-high',
    Neutral:  'bg-el-bg-low text-el-content-mid border border-el-content-low',
    Negative: 'bg-el-negative-low text-el-negative-high',
  },
  mood: {
    Grounded: 'bg-el-bg-low text-el-content-mid',
    Core:     'bg-el-blue-low text-el-blue-high',
    Lifted:   'bg-el-orange-low text-el-orange-high',
    Peak:     'bg-el-lime-low text-el-lime-high',
  },
};

const PREFIXES = { cl: 'CL', ed: 'ED' };

export default function Pill({ type, value }) {
  const colorClass = STYLES[type]?.[value] ?? 'bg-el-bg-low text-el-content-mid';
  const prefix = PREFIXES[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {prefix && <span className="opacity-50">{prefix}</span>}
      {value}
    </span>
  );
}
