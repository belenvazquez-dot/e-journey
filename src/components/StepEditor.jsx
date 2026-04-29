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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-el-bg-mid border border-el-content-low rounded-2xl shadow-2xl p-6 w-80">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-semibold text-el-content-high">{step.name}</h3>
            <p className="text-xs text-el-content-low mt-0.5">Edit cognitive load &amp; emotional direction</p>
          </div>
          <button
            onClick={onClose}
            className="text-el-content-low hover:text-el-content-mid text-xl leading-none mt-0.5 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <OptionGroup label="Cognitive Load" options={CL_OPTIONS} value={cl} onChange={setCl} />
          <OptionGroup label="Emotional Direction" options={ED_OPTIONS} value={ed} onChange={setEd} />

          <div className="pt-3 border-t border-el-content-low flex items-center justify-between">
            <span className="text-xs font-medium text-el-content-low">Resolved Mood</span>
            <Pill type="mood" value={mood} />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-el-content-mid border border-el-content-low hover:border-el-content-mid transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(step.id, cl, ed)}
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-el-brand-mid text-el-content-onhigh hover:brightness-110 transition-all"
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
      <p className="text-xs font-medium text-el-content-mid mb-1.5">{label}</p>
      <div className="flex gap-1.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              value === opt
                ? 'border-el-brand-mid bg-el-bg-low text-el-brand-high'
                : 'border-el-content-low text-el-content-low hover:border-el-content-mid hover:text-el-content-mid'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
