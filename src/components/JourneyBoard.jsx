import StepCard from './StepCard';

export default function JourneyBoard({ view, boardData, onEdit }) {
  if (view === 'crm') {
    return (
      <section>
        <SectionHeading>CRM Campaigns</SectionHeading>
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
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-el-content-low uppercase tracking-widest whitespace-nowrap">
              {stage.name}
            </span>
            <div className="flex-1 h-px bg-el-content-low opacity-30" />
            <span className="text-xs text-el-content-low">{stage.steps.length}</span>
          </div>
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

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-semibold text-el-content-low uppercase tracking-widest">{children}</span>
      <div className="flex-1 h-px bg-el-content-low opacity-30" />
    </div>
  );
}
