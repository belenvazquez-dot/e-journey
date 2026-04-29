export const MOODS = ['Grounded', 'Core', 'Lifted', 'Peak'];
export const CL_OPTIONS = ['Low', 'Medium', 'High'];
export const ED_OPTIONS = ['Positive', 'Neutral', 'Negative'];

// Low and Medium both fall in the "low" CL group per the matrix spec
const CL_GROUP = {
  Low: 'low',
  Medium: 'low',
  High: 'high',
};

const MATRIX = {
  low: {
    Positive: 'Peak',
    Neutral: 'Lifted',
    Negative: 'Core',
  },
  high: {
    Positive: 'Core',
    Neutral: 'Core',
    Negative: 'Grounded',
  },
};

export function resolve(cl, ed) {
  const group = CL_GROUP[cl];
  return MATRIX[group]?.[ed] ?? 'Core';
}

export function moodToValue(mood) {
  const idx = MOODS.indexOf(mood);
  return idx === -1 ? 1 : idx;
}
