export default function EmptyState({ title = 'No employees found', description = 'Try changing your search or filters.' }) {
  return <div className="py-14 text-center"><h3 className="font-bold text-slate-800">{title}</h3><p className="mt-1 text-sm text-slate-500">{description}</p></div>;
}
