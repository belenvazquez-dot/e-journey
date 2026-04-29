import StepCard from './StepCard';

export default function JourneyBoard({ view, boardData, onEdit }) {
  if (view === 'crm') {
    return (
      <section>
        <StageDivider label="CRM Campaigns" />
        <p className="text-xs text-el-content-low mb-4">
          Mood is assigned directly — no CL/ED inputs for CRM.
        </p>
        <div className="flex flex-wrap gap-4">
          {boardData.map(campaign => (
            <StepCard key={campaign.id} step={campaign} view="crm" onEdit={onEdit} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {boardData.map(stage => (
        <div key={stage.name}>
          <StageDivider label={stage.name} count={stage.steps.length} />
          <div className="flex flex-wrap gap-3">
            {stage.steps.map(step => (
              <StepCard key={step.id} step={step} view={view} onEdit={onEdit} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function StageDivider({ label, count }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-semibold text-el-content-low uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-el-content-low opacity-25" />
      {count != null && (
        <span className="text-xs text-el-content-low">{count}</span>
      )}
    </div>
  );
}
