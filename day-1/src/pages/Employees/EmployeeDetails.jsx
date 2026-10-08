import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function EmployeeDetails({ employees }) {
  const { id } = useParams();
  const employee = employees.find(e => e.id === id);
  if (!employee) return <Card className="p-6"><p>Employee not found.</p><Link to="/employees" className="mt-3 inline-block font-bold text-sky-600">← Back</Link></Card>;
  return <Card className="max-w-2xl p-6">
    <Link to="/employees" className="text-sm font-bold text-sky-600">← Back to employees</Link>
    <div className="mt-5 flex gap-4"><img src={employee.avatar} alt="" className="h-20 w-20 rounded-2xl" /><div><h1 className="text-2xl font-black">{employee.name}</h1><p className="text-slate-500">{employee.role}</p><Badge tone="green">{employee.status}</Badge></div></div>
    <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm"><div><dt className="text-slate-400">Email</dt><dd className="font-bold">{employee.email}</dd></div><div><dt className="text-slate-400">Department</dt><dd className="font-bold">{employee.department}</dd></div></dl>
  </Card>;
}
