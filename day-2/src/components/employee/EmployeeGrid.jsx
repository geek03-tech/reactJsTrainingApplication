import EmployeeCard from './EmployeeCard';
import EmptyState from '../common/EmptyState';

export default function EmployeeGrid({ employees, onView, onEdit, onDelete, canDelete }) {
  if (!employees.length) return <EmptyState />;
  return <div className="grid gap-4 lg:grid-cols-2">{employees.map(e =>
    <EmployeeCard key={e.id} employee={e} onView={onView} onEdit={onEdit} onDelete={onDelete} canDelete={canDelete} />
  )}</div>;
}
