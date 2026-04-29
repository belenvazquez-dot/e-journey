import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { resolve } from '../engine/moodEngine';
import { T } from '../tokens';

// ─── Normalisation ────────────────────────────────────────────────────────────
const MOOD_NORM  = { Grounded: 0, Core: 0.33, Lifted: 0.67, Peak: 1 };
const CL_NORM    = { Low: 0, Medium: 0.5, High: 1 };
const ED_NORM    = { Negative: 0, Neutral: 0.5, Positive: 1 };
const MOOD_TICKS = [
  { v: 0,    label: 'Grounded' },
  { v: 0.33, label: 'Core' },
  { v: 0.67, label: 'Lifted' },
  { v: 1,    label: 'Peak' },
];

// ─── Chart constants ──────────────────────────────────────────────────────────
const Y_AXIS_W   = 64;
const MARGIN     = { top: 28, right: 20, left: 0, bottom: 0 };
// header left-pad must equal Y_AXIS_W + MARGIN.left so columns align with x-axis ticks
const HEADER_L   = Y_AXIS_W + MARGIN.left;
const HEADER_R   = MARGIN.right;

// ─── Custom SVG mood badge ─────────────────────────────────────────────────────
function MoodDot({ cx, cy, payload }) {
  const label = payload?.moodLabel;
  if (!label) return null;
  const w = label.length * 6.5 + 14;
  const h = 20;
  return (
    <g>
      <rect
        x={cx - w / 2} y={cy - h / 2}
        width={w} height={h} rx={5}
        fill={T.purpleLow} stroke={T.purpleMid} strokeWidth={1}
      />
      <text
        x={cx} y={cy + 4.5}
        textAnchor="middle"
        fill={T.purpleHigh}
        fontSize={9.5}
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function ArcTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div
      style={{ background: T.bgLow, border: `1px solid ${T.contentLow}` }}
      className="rounded-lg px-3 py-2 shadow-xl text-xs"
    >
      <p className="font-semibold text-el-content-high mb-1">{d.name}</p>
      <div className="space-y-0.5">
        <Row color={T.purpleMid} label="Mood"   value={d.moodLabel} />
        <Row color={T.blueHigh}  label="CL"     value={d.clLabel} />
        <Row color={T.amberMid}  label="ED"     value={d.edLabel} />
      </div>
    </div>
  );
}

function Row({ color, label, value }) {
  return (
    <p style={{ color }} className="font-medium">
      <span className="opacity-60">{label}: </span>{value}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExpressionArc({ view, stages, stepMap }) {
  // Flatten stages → enriched steps for chart data
  const allSteps = stages.flatMap(stage =>
    stage.steps.map(s => {
      const step = stepMap[s.id] ?? s;
      return { ...step, mood: resolve(step.cl, step.ed) };
    })
  );

  const chartData = allSteps.map((step, idx) => ({
    idx,
    name:      step.name,
    moodNorm:  MOOD_NORM[step.mood]  ?? 0,
    clNorm:    CL_NORM[step.cl]      ?? 0.5,
    edNorm:    ED_NORM[step.ed]      ?? 0.5,
    moodLabel: step.mood,
    clLabel:   step.cl,
    edLabel:   step.ed,
  }));

  // Stage boundary x-positions (between stages)
  let cumIdx = 0;
  const stageBoundaries = [];
  for (let i = 0; i < stages.length - 1; i++) {
    cumIdx += stages[i].steps.length;
    stageBoundaries.push(cumIdx - 0.5);
  }

  const title = view === 'buyer'
    ? 'Buyer expressiveness arc'
    : 'Seller expressiveness arc';

  return (
    <div className="bg-el-bg-mid border border-el-content-low rounded-2xl overflow-hidden">
      {/* Title */}
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-sm font-bold text-el-content-high tracking-wide">{title}</h2>
      </div>

      {/* Stage + step header — precisely aligned with chart plot area */}
      <div style={{ paddingLeft: HEADER_L, paddingRight: HEADER_R }}>
        {/* Stage names */}
        <div className="flex border-b border-el-content-low">
          {stages.map((stage, i) => (
            <div
              key={stage.name}
              style={{ flex: stage.steps.length }}
              className={`py-1.5 text-center text-xs font-semibold text-el-content-mid uppercase tracking-widest ${
                i < stages.length - 1 ? 'border-r border-el-content-low' : ''
              }`}
            >
              {stage.name}
            </div>
          ))}
        </div>
        {/* Step names */}
        <div className="flex border-b border-el-content-low">
          {allSteps.map((step, i) => (
            <div
              key={step.id ?? i}
              className={`flex-1 py-1.5 text-center text-[10px] text-el-content-low truncate px-0.5 ${
                i < allSteps.length - 1 ? 'border-r border-el-content-low border-dashed' : ''
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={MARGIN}>
          <CartesianGrid
            vertical={false}
            horizontal
            strokeDasharray="3 3"
            stroke={T.bgLow}
          />

          {/* Stage dividers */}
          {stageBoundaries.map(x => (
            <ReferenceLine
              key={x}
              x={x}
              stroke={T.contentLow}
              strokeDasharray="2 2"
              strokeOpacity={0.5}
            />
          ))}

          <XAxis dataKey="idx" type="number" domain={[0, chartData.length - 1]} hide />

          <YAxis
            domain={[0, 1]}
            ticks={MOOD_TICKS.map(t => t.v)}
            tickFormatter={v => MOOD_TICKS.find(t => Math.abs(t.v - v) < 0.01)?.label ?? ''}
            tick={{ fontSize: 10, fill: T.purpleMid, fontWeight: 600 }}
            width={Y_AXIS_W}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            content={<ArcTooltip />}
            cursor={{ stroke: T.contentLow, strokeDasharray: '3 3' }}
          />

          {/* CL — blue dashed */}
          <Line
            dataKey="clNorm"
            type="monotone"
            stroke={T.blueHigh}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={{ r: 3, fill: T.blueHigh, stroke: T.bgMid, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />

          {/* ED — amber dashed */}
          <Line
            dataKey="edNorm"
            type="monotone"
            stroke={T.amberMid}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={{ r: 3, fill: T.amberMid, stroke: T.bgMid, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />

          {/* Mood — purple solid with labeled badges */}
          <Line
            dataKey="moodNorm"
            type="monotone"
            stroke={T.purpleMid}
            strokeWidth={2.5}
            dot={<MoodDot />}
            activeDot={{ r: 6, fill: T.purpleMid, stroke: T.bgMid, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{ paddingLeft: HEADER_L, paddingRight: HEADER_R }}
        className="flex gap-5 pb-4 pt-1"
      >
        <LegendItem color={T.purpleMid} label="Mood" />
        <LegendItem color={T.blueHigh}  label="Cognitive load (CL)" dashed />
        <LegendItem color={T.amberMid}  label="Emotional direction (ED)" dashed />
      </div>
    </div>
  );
}

function LegendItem({ color, label, dashed }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="20" height="8">
        <line
          x1="0" y1="4" x2="20" y2="4"
          stroke={color}
          strokeWidth={dashed ? 1.5 : 2.5}
          strokeDasharray={dashed ? '4 2' : undefined}
        />
        {!dashed && <circle cx="10" cy="4" r="2.5" fill={color} />}
      </svg>
      <span className="text-[10px] text-el-content-low">{label}</span>
    </div>
  );
}
