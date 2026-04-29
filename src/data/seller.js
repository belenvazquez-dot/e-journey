export const SELLER_STAGES = [
  {
    name: 'Awareness',
    steps: [
      { id: 's1', name: 'Awareness', cl: 'Low', ed: 'Positive' },
    ],
  },
  {
    name: 'Registration',
    steps: [
      { id: 's2', name: 'Access', cl: 'High', ed: 'Negative' },
      { id: 's3', name: 'Onboard', cl: 'Low', ed: 'Neutral' },
    ],
  },
  {
    name: 'Account',
    steps: [
      { id: 's4', name: 'Manage Account', cl: 'High', ed: 'Neutral' },
      { id: 's5', name: 'Manage Listings', cl: 'High', ed: 'Neutral' },
      { id: 's6', name: 'Sales Performance', cl: 'High', ed: 'Neutral' },
    ],
  },
  {
    name: 'Transaction',
    steps: [
      { id: 's7', name: 'Purchase Intent', cl: 'High', ed: 'Neutral' },
      { id: 's8', name: 'Purchase', cl: 'High', ed: 'Neutral' },
      { id: 's9', name: 'Logistics', cl: 'High', ed: 'Neutral' },
    ],
  },
  {
    name: 'Post-sale',
    steps: [
      { id: 's10', name: 'Product Evaluation', cl: 'Low', ed: 'Positive' },
      { id: 's11', name: 'Dispute', cl: 'High', ed: 'Negative' },
      { id: 's12', name: 'Returns', cl: 'High', ed: 'Negative' },
      { id: 's13', name: 'Rate', cl: 'Low', ed: 'Neutral' },
    ],
  },
];
