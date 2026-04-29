import Pill from './Pill';

const MOOD_ACCENT = {
  Grounded: 'border-t-slate-400',
  Core: 'border-t-blue-400',
  Lifted: 'border-t-amber-400',
  Peak: 'border-t-teal-400',
};

export default function StepCard({ step, view, onEdit }) {
  const isCrm = view === 'crm';
  const Wrapper = isCrm ? 'div' : 'button';

  return (
    <Wrapper
      onClick={isCrm ? undefined : () => onEdit(step.id)}
      className={[
        'bg-white rounded-xl p-4 w-40 text-left shadow-sm border border-slate-200 border-t-4 transition-all',
        MOOD_ACCENT[step.mood] ?? 'border-t-slate-200',
        !isCrm && 'hover:border-slate-300 hover:shadow-md cursor-pointer',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="text-sm font-medium text-slate-900 mb-3 leading-snug min-h-[2.5rem]">{step.name}</p>
      <div className="space-y-1.5">
        {!isCrm && (
          <>
            <Pill type="cl" value={step.cl} />
            <Pill type="ed" value={step.ed} />
          </>
        )}
        <Pill type="mood" value={step.mood} />
      </div>
    </Wrapper>
  );
}
