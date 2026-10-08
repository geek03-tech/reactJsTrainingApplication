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
import { useEmployeeStore } from '../../store/employeeStore.jsx';

export default function EmployeePage({ employees, loading, error, onRetry, onCreate, onUpdate, onDelete }) {
  const navigate=useNavigate(); const {state}=useEmployeeStore();
  const [modal,setModal]=useState(null); const [saving,setSaving]=useState(false);
  const filtered=useMemo(()=>employees.filter(e=>`${e.name} ${e.email} ${e.role}`.toLowerCase().includes(state.search.toLowerCase())&&(state.department==='All'||e.department===state.department)&&(state.status==='All'||e.status===state.status)),[employees,state.search,state.department,state.status]);
  async function submit(form){setSaving(true);try{if(modal?.employee)await onUpdate(modal.employee.id,form);else await onCreate(form);setModal(null);}finally{setSaving(false);}}
  return <div className="space-y-6">
    <PageHeader eyebrow="Employee management • Global state" title="Employees" description="The same Employee Portal design continues. Day 4 moves shared state and derived filtering into a centralized reducer architecture." action={<Button onClick={()=>setModal({type:'form'})}>+ Add Employee</Button>}/>
    <EmployeeFilters search={state.search} setSearch={()=>{}} department={state.department} setDepartment={()=>{}} status={state.status} setStatus={()=>{}} />
    <div className="grid gap-6 xl:grid-cols-[1fr_280px]"><div>{loading?<Spinner label="Fetching employees from ReqRes..."/>:error?<ErrorState message={error} onRetry={onRetry}/>:<><div className="mb-3 text-sm text-slate-500">{filtered.length} employees • ReqRes API</div><EmployeeGrid employees={filtered} onView={e=>navigate(`/employees/${e.id}`)} onEdit={e=>setModal({type:'form',employee:e})} onDelete={e=>setModal({type:'delete',employee:e})} canDelete/></>}</div><SidebarInfo day={4} topics={['Centralized reducer state','Memoized derived data','Lazy route / Suspense','API CRUD + CI/CD']}/></div>
    <Modal open={modal?.type==='form'} title={modal?.employee?'Edit Employee':'Add Employee'} onClose={()=>setModal(null)}><EmployeeForm employee={modal?.employee} onSubmit={submit} onCancel={()=>setModal(null)} saving={saving}/></Modal>
    <Modal open={modal?.type==='delete'} title="Delete Employee" onClose={()=>setModal(null)}><p className="text-sm text-slate-600">Delete <b>{modal?.employee?.name}</b> using the ReqRes DELETE endpoint?</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={()=>setModal(null)}>Cancel</Button><Button variant="danger" onClick={async()=>{setSaving(true);try{await onDelete(modal.employee.id);setModal(null);}finally{setSaving(false);}}}>Delete</Button></div></Modal>
  </div>;
}
