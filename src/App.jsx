import { useState, useEffect } from 'react';
import { BUYER_STAGES } from './data/buyer';
import { SELLER_STAGES } from './data/seller';
import { CRM_CAMPAIGNS } from './data/crm';
import { resolve } from './engine/moodEngine';
import ViewSwitcher from './components/ViewSwitcher';
import JourneyBoard from './components/JourneyBoard';
import MoodCurve from './components/MoodCurve';
import StepEditor from './components/StepEditor';

function buildStepMap(stages) {
  const map = {};
  for (const stage of stages)
    for (const step of stage.steps)
      map[step.id] = { ...step };
  return map;
}

function buildCrmMap(campaigns) {
  const map = {};
  for (const c of campaigns) map[c.id] = { ...c };
  return map;
}

function load(key, fallback) {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
}

function enrichStages(stages, stepMap) {
  return stages.map(stage => ({
    ...stage,
    steps: stage.steps.map(s => {
      const step = stepMap[s.id] ?? s;
      return { ...step, mood: resolve(step.cl, step.ed) };
    }),
  }));
}

const BUYER_DEFAULT = buildStepMap(BUYER_STAGES);
const SELLER_DEFAULT = buildStepMap(SELLER_STAGES);
const CRM_DEFAULT = buildCrmMap(CRM_CAMPAIGNS);

export default function App() {
  const [view, setView] = useState('buyer');
  const [buyer, setBuyer] = useState(() => load('ej-buyer', BUYER_DEFAULT));
  const [seller, setSeller] = useState(() => load('ej-seller', SELLER_DEFAULT));
  const [crm] = useState(() => load('ej-crm', CRM_DEFAULT));
  const [editingId, setEditingId] = useState(null);

  useEffect(() => localStorage.setItem('ej-buyer', JSON.stringify(buyer)), [buyer]);
  useEffect(() => localStorage.setItem('ej-seller', JSON.stringify(seller)), [seller]);

  function handleSave(id, cl, ed) {
    const updater = prev => ({ ...prev, [id]: { ...prev[id], cl, ed } });
    if (view === 'buyer') setBuyer(updater);
    else if (view === 'seller') setSeller(updater);
    setEditingId(null);
  }

  let boardData, curveData;

  if (view === 'crm') {
    boardData = Object.values(crm);
    curveData = boardData.map(c => ({ name: c.name, mood: c.mood }));
  } else {
    const stages = view === 'buyer' ? BUYER_STAGES : SELLER_STAGES;
    const stepMap = view === 'buyer' ? buyer : seller;
    boardData = enrichStages(stages, stepMap);
    curveData = boardData.flatMap(stage =>
      stage.steps.map(s => ({ name: s.name, mood: s.mood }))
    );
  }

  const editingStep = editingId
    ? view === 'buyer'
      ? buyer[editingId]
      : view === 'seller'
        ? seller[editingId]
        : null
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">Journey Map</h1>
            <p className="text-xs text-slate-400 mt-1">Wallapop Expressive Layer</p>
          </div>
          <ViewSwitcher active={view} onChange={v => { setView(v); setEditingId(null); }} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <JourneyBoard
          view={view}
          boardData={boardData}
          onEdit={id => view !== 'crm' && setEditingId(id)}
        />
        <MoodCurve data={curveData} />
      </main>

      {editingStep && (
        <StepEditor
          step={editingStep}
          onSave={handleSave}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
