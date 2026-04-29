import Pill from './Pill';

// Mood accent uses EL-Dark token hex values directly (Tailwind arbitrary)
const MOOD_ACCENT = {
  Grounded: 'border-t-[#4a4b4f]',
  Core:     'border-t-[#385ef9]',
  Lifted:   'border-t-[#ffa600]',
  Peak:     'border-t-[#00d486]',
};

export default function StepCard({ step, view, onEdit }) {
  const isCrm = view === 'crm';
  const Wrapper = isCrm ? 'div' : 'button';

  return (
    <Wrapper
      onClick={isCrm ? undefined : () => onEdit(step.id)}
      className={[
        'bg-el-bg-mid rounded-xl p-4 w-40 text-left border border-el-content-low border-t-4 transition-all',
        MOOD_ACCENT[step.mood] ?? 'border-t-el-content-low',
        !isCrm && 'hover:border-el-content-mid hover:brightness-110 cursor-pointer',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="text-sm font-medium text-el-content-high mb-3 leading-snug min-h-[2.5rem]">
        {step.name}
      </p>
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
