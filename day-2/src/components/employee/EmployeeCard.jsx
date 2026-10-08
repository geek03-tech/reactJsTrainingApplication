import Badge from '../common/Badge';
import Button from '../common/Button';

export default function EmployeeCard({ employee, onView, onEdit, onDelete, canDelete = true }) {
  const tone = employee.status === 'Active' ? 'green' : employee.status === 'On Leave' ? 'amber' : 'slate';
  console.log("employee",employee)
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-4">
        <img src={employee.avatar} alt={`${employee.name} avatar`} className="h-14 w-14 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0"><h3 className="truncate font-black text-slate-950">{employee.name}</h3><p className="mt-1 truncate text-sm text-slate-500">{employee.role}</p></div>
            <Badge tone={tone}>{employee.status}</Badge>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{employee.department}</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => onView(employee)}>View</Button>
        <Button variant="secondary" onClick={() => onEdit(employee)}>Edit</Button>
        {canDelete && <Button variant="danger" onClick={() => onDelete(employee)}>Delete</Button>}
      </div>
    </article>
  );
}
