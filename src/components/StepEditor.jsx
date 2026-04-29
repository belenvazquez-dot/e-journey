import { useState } from 'react';
import { resolve, CL_OPTIONS, ED_OPTIONS } from '../engine/moodEngine';
import Pill from './Pill';

export default function StepEditor({ step, onSave, onClose }) {
  const [cl, setCl] = useState(step.cl);
  const [ed, setEd] = useState(step.ed);
  const mood = resolve(cl, ed);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-semibold text-slate-900">{step.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Edit cognitive load &amp; emotional direction</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none mt-0.5"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <OptionGroup
            label="Cognitive Load"
            options={CL_OPTIONS}
            value={cl}
            onChange={setCl}
          />
          <OptionGroup
            label="Emotional Direction"
            options={ED_OPTIONS}
            value={ed}
            onChange={setEd}
          />

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Resolved Mood</span>
            <Pill type="mood" value={mood} />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(step.id, cl, ed)}
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-teal-500 text-white hover:bg-teal-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-600 mb-1.5">{label}</p>
      <div className="flex gap-1.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              value === opt
                ? 'border-teal-500 bg-teal-50 text-teal-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
