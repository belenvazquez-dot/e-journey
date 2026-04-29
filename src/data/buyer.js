export const BUYER_STAGES = [
  {
    name: 'Interest',
    steps: [
      { id: 'b1', name: 'Awareness', cl: 'Low', ed: 'Positive' },
      { id: 'b2', name: 'Access', cl: 'High', ed: 'Negative' },
      { id: 'b3', name: 'Onboard', cl: 'Low', ed: 'Neutral' },
      { id: 'b4', name: 'Manage', cl: 'High', ed: 'Neutral' },
    ],
  },
  {
    name: 'Pre-purchase',
    steps: [
      { id: 'b5', name: 'Explore', cl: 'Low', ed: 'Neutral' },
      { id: 'b6', name: 'Narrow down', cl: 'High', ed: 'Negative' },
      { id: 'b7', name: 'Evaluate', cl: 'Low', ed: 'Neutral' },
    ],
  },
  {
    name: 'Purchase',
    steps: [
      { id: 'b8', name: 'P. intent', cl: 'High', ed: 'Neutral' },
      { id: 'b9', name: 'Purchase', cl: 'High', ed: 'Neutral' },
    ],
  },
  {
    name: 'Delivery',
    steps: [
      { id: 'b10', name: 'Logistics', cl: 'High', ed: 'Neutral' },
      { id: 'b11', name: 'Evaluation', cl: 'Low', ed: 'Neutral' },
    ],
  },
  {
    name: 'Post-purchase',
    steps: [
      { id: 'b12', name: 'Dispute', cl: 'High', ed: 'Negative' },
      { id: 'b13', name: 'Return', cl: 'High', ed: 'Neutral' },
      { id: 'b14', name: 'Rate', cl: 'Low', ed: 'Neutral' },
    ],
  },
];
