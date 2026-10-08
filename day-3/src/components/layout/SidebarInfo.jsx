export default function SidebarInfo({ day, topics, t = key => key }) {
  return (
    <aside className="rounded-2xl bg-slate-950 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-widest text-sky-300">{t('trainingProgression')}</p>
      <p className="mt-2 text-lg font-black">{t('dayLabel')} {day}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">{topics.map(topic => <li key={topic}>✓ {t(topic)}</li>)}</ul>
    </aside>
  );
}
