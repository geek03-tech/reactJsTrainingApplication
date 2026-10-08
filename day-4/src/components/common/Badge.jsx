export default function Badge({ children, tone = 'blue' }) {
  const styles = {
    blue: 'bg-sky-100 text-sky-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    slate: 'bg-slate-100 text-slate-700'
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${styles[tone]}`}>{children}</span>;
}
