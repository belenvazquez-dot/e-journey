import { useState, useEffect } from 'react';
import { BUYER_STAGES } from './data/buyer';
import { SELLER_STAGES } from './data/seller';
import { CRM_CAMPAIGNS } from './data/crm';
import { resolve } from './engine/moodEngine';
import ViewSwitcher from './components/ViewSwitcher';
import ExpressionArc from './components/ExpressionArc';
import JourneyBoard from './components/JourneyBoard';
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

const BUYER_DEFAULT  = buildStepMap(BUYER_STAGES);
const SELLER_DEFAULT = buildStepMap(SELLER_STAGES);
const CRM_DEFAULT    = buildCrmMap(CRM_CAMPAIGNS);

export default function App() {
  const [view, setView] = useState('buyer');
  const [buyer, setBuyer] = useState(() => load('ej-buyer',  BUYER_DEFAULT));
  const [seller, setSeller] = useState(() => load('ej-seller', SELLER_DEFAULT));
  const [crm] = useState(() => load('ej-crm', CRM_DEFAULT));
  const [editingId, setEditingId] = useState(null);
  const [phasesOpen, setPhasesOpen] = useState(false);

  useEffect(() => localStorage.setItem('ej-buyer',  JSON.stringify(buyer)),  [buyer]);
  useEffect(() => localStorage.setItem('ej-seller', JSON.stringify(seller)), [seller]);

  function handleSave(id, cl, ed) {
    const updater = prev => ({ ...prev, [id]: { ...prev[id], cl, ed } });
    if (view === 'buyer')  setBuyer(updater);
    if (view === 'seller') setSeller(updater);
    setEditingId(null);
  }

  function handleViewChange(v) {
    setView(v);
    setEditingId(null);
    setPhasesOpen(false);
  }

  // ── Derived data ──────────────────────────────────────────────────────────
  const isCrm    = view === 'crm';
  const stages   = view === 'buyer' ? BUYER_STAGES : SELLER_STAGES;
  const stepMap  = view === 'buyer' ? buyer : seller;
  const boardData = isCrm
    ? Object.values(crm)
    : enrichStages(stages, stepMap);

  const editingStep = editingId
    ? (view === 'buyer' ? buyer[editingId] : view === 'seller' ? seller[editingId] : null)
    : null;

  return (
    <div className="min-h-screen bg-el-bg-base">
      {/* Header */}
      <header className="bg-el-bg-low border-b border-el-content-low sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-el-content-high leading-none">Journey Map</h1>
            <p className="text-xs text-el-content-low mt-1">Wallapop Expressive Layer</p>
          </div>
          <ViewSwitcher active={view} onChange={handleViewChange} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {isCrm ? (
          // ── CRM: simple board, no arc ───────────────────────────────────
          <div className="bg-el-bg-mid border border-el-content-low rounded-2xl p-6">
            <h2 className="text-sm font-bold text-el-content-high mb-5">CRM Campaigns</h2>
            <JourneyBoard view="crm" boardData={boardData} onEdit={() => {}} />
          </div>
        ) : (
          <>
            {/* ── Expressiveness arc ─────────────────────────────────────── */}
            <ExpressionArc
              view={view}
              stages={stages}
              stepMap={stepMap}
            />

            {/* ── Expand / collapse phases ───────────────────────────────── */}
            <div>
              <button
                onClick={() => setPhasesOpen(v => !v)}
                className="flex items-center gap-2 text-xs font-semibold text-el-content-low hover:text-el-content-mid transition-colors group"
                aria-expanded={phasesOpen}
              >
                <span
                  className="inline-block transition-transform duration-200"
                  style={{ transform: phasesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  ▾
                </span>
                {phasesOpen ? 'Hide phases' : 'Show phases'}
              </button>

              {phasesOpen && (
                <div className="mt-5">
                  <JourneyBoard
                    view={view}
                    boardData={boardData}
                    onEdit={id => setEditingId(id)}
                  />
                </div>
              )}
            </div>
          </>
        )}
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
