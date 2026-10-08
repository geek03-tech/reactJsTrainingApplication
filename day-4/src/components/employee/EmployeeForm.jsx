import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';

const empty = { name: '', email: '', role: '', department: 'Engineering', status: 'Active' };

export default function EmployeeForm({ employee, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (employee) setForm({
      name: employee.name || '',
      email: employee.email || '',
      role: employee.role || '',
      department: employee.department || 'Engineering',
      status: employee.status || 'Active'
    });
  }, [employee]);

  function change(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError('Name is required');
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) return setError('Enter a valid email');
    if (!form.role.trim()) return setError('Role is required');
    setError('');
    await onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" name="name" value={form.name} onChange={change} placeholder="Employee name" />
        <Input label="Email" name="email" value={form.email} onChange={change} placeholder="employee@company.com" />
        <Input label="Role" name="role" value={form.role} onChange={change} placeholder="Frontend Developer" />
        <Select label="Department" name="department" value={form.department} onChange={change}
          options={['Engineering', 'Human Resources', 'Design', 'Finance', 'Operations']} />
        <Select label="Status" name="status" value={form.status} onChange={change} options={['Active', 'On Leave', 'Inactive']} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : employee ? 'Update Employee' : 'Create Employee'}</Button>
      </div>
    </form>
  );
}
