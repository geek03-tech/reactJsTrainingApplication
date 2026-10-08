import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import SidebarInfo from '../../components/layout/SidebarInfo';
import EmployeeFilters from '../../components/employee/EmployeeFilters';
import EmployeeGrid from '../../components/employee/EmployeeGrid';
import EmployeeForm from '../../components/employee/EmployeeForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import ErrorState from '../../components/common/ErrorState';
import Card from '../../components/common/Card';

export default function EmployeePage({ employees, loading, error, onRetry, onCreate, onUpdate, onDelete, sourceLabel, day }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => employees.filter(e =>
    `${e.name} ${e.email} ${e.role}`.toLowerCase().includes(search.toLowerCase()) &&
    (department === 'All' || e.department === department) &&
    (status === 'All' || e.status === status)
  ), [employees, search, department, status]);

  async function submit(form) {
    setSaving(true);
    try {
      if (modal?.employee) await onUpdate(modal.employee.id, form);
      else await onCreate(form);
      setModal(null);
    } finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`Employee management • ${sourceLabel}`}
        title="Employees"
        description="The same Employee Portal UI is carried forward every day. Only the underlying architecture and data source evolve."
        action={<Button onClick={() => setModal({ type: 'form' })}>+ Add Employee</Button>}
      />
      <EmployeeFilters {...{ search, setSearch, department, setDepartment, status, setStatus }} />
      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <div>
          {loading ? <Spinner label={sourceLabel === 'Dummy data' ? 'Loading local employees...' : 'Fetching employees from ReqRes...'} /> :
           error ? <ErrorState message={error} onRetry={onRetry} /> :
           <><div className="mb-3 flex items-center justify-between text-sm text-slate-500"><span>{filtered.length} employees</span><span>{sourceLabel}</span></div>
           <EmployeeGrid employees={filtered}
             onView={e => navigate(`/employees/${e.id}`)}
             onEdit={e => setModal({ type: 'form', employee: e })}
             onDelete={e => setModal({ type: 'delete', employee: e })}
             canDelete />
           </>}
        </div>
        <SidebarInfo day={day} topics={day === 1
          ? ['Reusable components', 'Local state + hooks', 'Dummy CRUD', 'Unit testing']
          : day === 2
          ? ['ReqRes GET /users', 'Service layer', 'CRUD API calls', 'Routing + pagination']
          : day === 3
          ? ['Authentication', 'Role-based UI', 'i18n', 'API-driven CRUD']
          : ['Global state', 'Performance', 'Lazy routes', 'CI/CD + testing']} />
      </div>

      <Modal open={modal?.type === 'form'} title={modal?.employee ? 'Edit Employee' : 'Add Employee'} onClose={() => setModal(null)}>
        <EmployeeForm employee={modal?.employee} onSubmit={submit} onCancel={() => setModal(null)} saving={saving} />
      </Modal>

      <Modal open={modal?.type === 'delete'} title="Delete Employee" onClose={() => setModal(null)}>
        <p className="text-sm text-slate-600">Are you sure you want to delete <b>{modal?.employee?.name}</b>?</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
          <Button variant="danger" onClick={async () => { setSaving(true); try { await onDelete(modal.employee.id); setModal(null); } finally { setSaving(false); } }} disabled={saving}>
            {saving ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
