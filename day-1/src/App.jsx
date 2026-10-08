import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './app/AppContext';
import AppShell from './components/layout/AppShell';
import Card from './components/common/Card';
import EmployeePage from './pages/Employees/EmployeePage';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import { dummyEmployees } from './data/dummyEmployees';

export default function App() {
  const [employees, setEmployees] = useState(dummyEmployees);
  const value = { user: { email: 'training@local.dev' }, logout: () => {} };

  async function createEmployee(payload) {
    const employee = { ...payload, id: `local-${Date.now()}`, avatar: `https://i.pravatar.cc/150?u=${Date.now()}` };
    setEmployees(prev => [employee, ...prev]);
  }
  async function updateEmployee(id, payload) {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...payload } : e));
  }
  async function deleteEmployee(id) {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }

  return (
    <AppContext.Provider value={value}>
      <AppShell day={1}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <div className="space-y-6">
              <div><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Day 1 • React foundations</p><h1 className="mt-1 text-3xl font-black">Employee Management Portal</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Start with the exact UI shell that will continue through Day 4. Today the data source is intentionally local dummy data.</p></div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-5"><p className="text-sm text-slate-500">Employees</p><p className="mt-2 text-3xl font-black">{employees.length}</p></Card>
                <Card className="p-5"><p className="text-sm text-slate-500">Data source</p><p className="mt-2 font-black">Dummy data</p></Card>
                <Card className="p-5"><p className="text-sm text-slate-500">CRUD</p><p className="mt-2 font-black">Local state</p></Card>
              </div>
              <Card className="p-6"><h2 className="text-lg font-black">Day 1 architecture</h2><p className="mt-2 text-sm text-slate-500">Pages → reusable components → local state → dummy employee repository → tests. The folder structure is already the same shape used by Days 2–4.</p></Card>
            </div>
          } />
          <Route path="/employees" element={<EmployeePage day={1} sourceLabel="Dummy data" employees={employees} loading={false} error="" onCreate={createEmployee} onUpdate={updateEmployee} onDelete={deleteEmployee} />} />
          <Route path="/employees/:id" element={<EmployeeDetails employees={employees} />} />
          <Route path="*" element={<p>404 — Page not found</p>} />
        </Routes>
      </AppShell>
    </AppContext.Provider>
  );
}
