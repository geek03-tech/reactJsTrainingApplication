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
import { useI18n } from '../../app/I18nContext';

export default function EmployeePage({ employees, loading, error, onRetry, onCreate, onUpdate, onDelete, sourceLabel, day }) {
  const navigate = useNavigate();
  const { t } = useI18n();
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
        eyebrow={`${t('employeeManagement')} • ${sourceLabel}`}
        title={t('employees')}
        description={t('pageDescription')}
        action={<Button onClick={() => setModal({ type: 'form' })}>{t('addEmployee')}</Button>}
      />
      <EmployeeFilters {...{ search, setSearch, department, setDepartment, status, setStatus }} t={t} />
      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <div>
          {loading ? <Spinner label={t('loadingEmployees')} /> :
           error ? <ErrorState message={error} onRetry={onRetry} t={t} /> :
           <><div className="mb-3 flex items-center justify-between text-sm text-slate-500"><span>{filtered.length} {t('employeeCount')}</span><span>{sourceLabel}</span></div>
           <EmployeeGrid employees={filtered} t={t}
             onView={e => navigate(`/employees/${e.id}`)}
             onEdit={e => setModal({ type: 'form', employee: e })}
             onDelete={e => setModal({ type: 'delete', employee: e })}
             canDelete />
           </>}
        </div>
        <SidebarInfo day={day} t={t} topics={day === 1
          ? ['Reusable components', 'Local state + hooks', 'Dummy CRUD', 'Unit testing']
          : day === 2
          ? ['ReqRes GET /users', 'Service layer', 'CRUD API calls', 'Routing + pagination']
          : day === 3
          ? ['Authentication', 'Role-based UI', 'i18n', 'API-driven CRUD']
          : ['Global state', 'Performance', 'Lazy routes', 'CI/CD + testing']} />
      </div>

      <Modal open={modal?.type === 'form'} title={modal?.employee ? t('editEmployeeTitle') : t('addEmployeeTitle')} onClose={() => setModal(null)}>
        <EmployeeForm employee={modal?.employee} onSubmit={submit} onCancel={() => setModal(null)} saving={saving} t={t} />
      </Modal>

      <Modal open={modal?.type === 'delete'} title={t('deleteEmployeeTitle')} onClose={() => setModal(null)}>
        <p className="text-sm text-slate-600">{t('confirmDelete')} <b>{modal?.employee?.name}</b>?</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setModal(null)}>{t('cancel')}</Button>
          <Button variant="danger" onClick={async () => { setSaving(true); try { await onDelete(modal.employee.id); setModal(null); } finally { setSaving(false); } }} disabled={saving}>
            {saving ? t('deleting') : t('delete')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
