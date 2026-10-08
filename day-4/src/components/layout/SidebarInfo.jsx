export default function SidebarInfo({ day, topics }) {
  return (
    <aside className="rounded-2xl bg-slate-950 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-widest text-sky-300">Training progression</p>
      <p className="mt-2 text-lg font-black">Day {day}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">{topics.map(t => <li key={t}>✓ {t}</li>)}</ul>
    </aside>
  );
}
