import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { moodToValue, MOODS } from '../engine/moodEngine';
import { T, MOOD_DOT_COLORS } from '../tokens';

function CustomDot({ cx, cy, payload }) {
  const color = MOOD_DOT_COLORS[payload.moodLabel] ?? T.brandMid;
  return <circle cx={cx} cy={cy} r={5} fill={color} stroke={T.bgMid} strokeWidth={2} />;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const { moodLabel } = payload[0].payload;
  return (
    <div style={{ background: T.bgLow, borderColor: T.contentLow }}
      className="border rounded-lg px-3 py-2 shadow-lg"
    >
      <p className="text-xs font-semibold text-el-content-high">{label}</p>
      <p className="text-xs font-medium mt-0.5" style={{ color: MOOD_DOT_COLORS[moodLabel] }}>
        {moodLabel}
      </p>
    </div>
  );
}

export default function MoodCurve({ data }) {
  const chartData = data.map(d => ({
    name: d.name,
    moodValue: moodToValue(d.mood),
    moodLabel: d.mood,
  }));

  return (
    <div className="bg-el-bg-mid border border-el-content-low rounded-xl p-6">
      <h2 className="text-sm font-semibold text-el-content-high mb-1">Emotional Arc</h2>
      <p className="text-xs text-el-content-low mb-5">Resolved mood across all steps</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.bgLow} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: T.contentLow }}
            angle={-40}
            textAnchor="end"
            interval={0}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tickFormatter={v => MOODS[v] ?? ''}
            tick={{ fontSize: 10, fill: T.contentLow }}
            width={72}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: T.contentLow, strokeDasharray: '3 3' }} />
          <Line
            type="monotone"
            dataKey="moodValue"
            stroke={T.brandMid}
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: T.brandMid, stroke: T.bgMid, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
