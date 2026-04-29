// WCAG-verified color pairs (contrast ≥ 4.5:1 for all combinations)
const STYLES = {
  cl: {
    // Blue semantic — bg/text pairs using EL blue tokens
    Low:    'bg-el-blue-low text-el-blue-high',
    Medium: 'bg-[#1a3080] text-el-blue-high',
    High:   'bg-el-blue-mid text-white',
  },
  ed: {
    // Amber semantic — bg/text pairs using EL amber/warning tokens
    Positive: 'bg-el-amber-subtle text-el-warning-high',
    Neutral:  'bg-el-content-low text-el-amber-high',
    Negative: 'bg-el-amber-low text-el-warning-high',
  },
  mood: {
    // Purple semantic — consistent purple pair for all mood levels
    Grounded: 'bg-el-purple-low text-el-purple-high',
    Core:     'bg-el-purple-low text-el-purple-high',
    Lifted:   'bg-el-purple-low text-el-purple-high',
    Peak:     'bg-el-purple-low text-el-purple-high',
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
