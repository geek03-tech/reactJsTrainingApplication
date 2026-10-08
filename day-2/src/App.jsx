import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './app/AppContext';
import AppShell from './components/layout/AppShell';
import Card from './components/common/Card';
import EmployeePage from './pages/Employees/EmployeePage';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import { useEmployees } from './hooks/useEmployees';

export default function App() {
  const employeesApi = useEmployees();
  return (
    <AppContext.Provider value={{ user: { email: 'api-training@reqres.dev' }, logout: () => {}, employeesApi }}>
      <AppShell day={2}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <div className="space-y-6">
              <div><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Day 2 • API architecture</p><h1 className="mt-1 text-3xl font-black">Employee Management Portal</h1><p className="mt-2 text-sm text-slate-500">Same UI, same folder structure, now backed by ReqRes REST calls.</p></div>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-5"><p className="text-sm text-slate-500">API source</p><p className="mt-2 font-black">ReqRes /api/users</p></Card>
                <Card className="p-5"><p className="text-sm text-slate-500">Read</p><p className="mt-2 font-black">GET + pagination</p></Card>
                <Card className="p-5"><p className="text-sm text-slate-500">Mutations</p><p className="mt-2 font-black">POST / PUT / DELETE</p></Card>
              </div>
            </div>
          } />
          <Route path="/employees" element={
            <EmployeePage
              day={2}
              sourceLabel="ReqRes API"
              employees={employeesApi.employees}
              loading={employeesApi.loading}
              error={employeesApi.error}
              onRetry={employeesApi.reload}
              onCreate={employeesApi.createEmployee}
              updateEmployee={employeesApi.updateEmployee}
              onDelete={employeesApi.deleteEmployee}
            />
          } />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="*" element={<p>404 — Page not found</p>} />
        </Routes>
      </AppShell>
    </AppContext.Provider>
  );
}
