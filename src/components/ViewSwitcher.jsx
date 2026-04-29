const VIEWS = [
  { id: 'buyer', label: 'Buyer' },
  { id: 'seller', label: 'Seller' },
  { id: 'crm', label: 'CRM' },
];

export default function ViewSwitcher({ active, onChange }) {
  return (
    <div className="flex bg-el-bg-base rounded-xl p-1 gap-0.5 border border-el-content-low">
      {VIEWS.map(v => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all ${
            active === v.id
              ? 'bg-el-bg-mid text-el-content-high shadow-sm'
              : 'text-el-content-low hover:text-el-content-mid'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
