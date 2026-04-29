const VIEWS = [
  { id: 'buyer', label: 'Buyer' },
  { id: 'seller', label: 'Seller' },
  { id: 'crm', label: 'CRM' },
];

export default function ViewSwitcher({ active, onChange }) {
  return (
    <div className="flex bg-slate-100 rounded-xl p-1 gap-0.5">
      {VIEWS.map(v => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            active === v.id
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
