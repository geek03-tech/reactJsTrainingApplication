import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';

const empty = { name: '', email: '', role: '', department: 'Engineering', status: 'Active' };

export default function EmployeeForm({ employee, onSubmit, onCancel, saving = false, t = key => key }) {
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
    if (!form.name.trim()) return setError(t('nameRequired'));
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) return setError(t('enterEmail'));
    if (!form.role.trim()) return setError(t('roleRequired'));
    setError('');
    await onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t('name')} name="name" value={form.name} onChange={change} placeholder={t('employeeNamePlaceholder')} />
        <Input label={t('email')} name="email" value={form.email} onChange={change} placeholder={t('emailPlaceholder')} />
        <Input label={t('roleLabel')} name="role" value={form.role} onChange={change} placeholder={t('employeeRolePlaceholder')} />
        <Select label={t('department')} name="department" value={form.department} onChange={change}
          options={['Engineering', 'Human Resources', 'Design', 'Finance', 'Operations']} optionLabels={['engineering', 'humanResources', 'design', 'finance', 'operations'].map(t)} />
        <Select label={t('status')} name="status" value={form.status} onChange={change} options={['Active', 'On Leave', 'Inactive']} optionLabels={['active', 'onLeave', 'inactive'].map(t)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>{t('cancel')}</Button>
        <Button type="submit" disabled={saving}>{saving ? t('saving') : employee ? t('updateEmployee') : t('createEmployee')}</Button>
      </div>
    </form>
  );
}
