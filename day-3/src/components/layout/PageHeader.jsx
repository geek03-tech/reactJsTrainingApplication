export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
