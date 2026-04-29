import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from 'recharts';
import { moodToValue, MOODS } from '../engine/moodEngine';

const MOOD_COLORS = {
  Grounded: '#64748b',
  Core: '#3b82f6',
  Lifted: '#f59e0b',
  Peak: '#14b8a6',
};

function CustomDot({ cx, cy, payload }) {
  const color = MOOD_COLORS[payload.moodLabel] ?? '#14b8a6';
  return <circle cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={2} />;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const { moodLabel } = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-slate-800">{label}</p>
      <p className="text-xs font-medium mt-0.5" style={{ color: MOOD_COLORS[moodLabel] }}>
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
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-700 mb-1">Emotional Arc</h2>
      <p className="text-xs text-slate-400 mb-5">Resolved mood across all steps</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            angle={-40}
            textAnchor="end"
            interval={0}
            tickLine={false}
          />
          <YAxis
            domain={[0, 3]}
            ticks={[0, 1, 2, 3]}
            tickFormatter={v => MOODS[v] ?? ''}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            width={72}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="moodValue"
            stroke="#14b8a6"
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: '#14b8a6', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
