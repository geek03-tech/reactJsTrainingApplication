import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './app/AppContext';
import { EmployeeStoreProvider, useEmployeeStore } from './store/employeeStore.jsx';
import { useEmployees } from './hooks/useEmployees';
import AppShell from './components/layout/AppShell';
import Card from './components/common/Card';
import EmployeePage from './pages/Employees/EmployeePage';
import EmployeeDetails from './pages/Employees/EmployeeDetails';

const Reports = lazy(() => import('./pages/Reports/Reports'));

function Content() {
  const api = useEmployees(); const { state } = useEmployeeStore();
  return <AppContext.Provider value={{user:{email:'api-training@reqres.dev'},logout:()=>{},employeesApi:api}}>
    <AppShell day={4}><Routes>
      <Route path="/dashboard" element={<div className="space-y-6"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Day 4 • Scale + delivery</p><h1 className="mt-1 text-3xl font-black">Employee Management Portal</h1><p className="mt-2 text-sm text-slate-500">Same UI and structure, now with centralized state, memoized selectors, lazy routes and CI/CD readiness.</p></div><div className="grid gap-4 md:grid-cols-4"><Card className="p-5"><p className="text-sm text-slate-500">Employees</p><p className="mt-2 text-3xl font-black">{state.employees.length}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">API</p><p className="mt-2 font-black">ReqRes</p></Card><Card className="p-5"><p className="text-sm text-slate-500">State</p><p className="mt-2 font-black">Reducer</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Delivery</p><p className="mt-2 font-black">CI/CD</p></Card></div></div>} />
      <Route path="/employees" element={
        <EmployeePage
          employees={api.employees}
          loading={api.loading}
          error={api.error}
          onRetry={api.reload}
          onCreate={api.createEmployee}
          onUpdate={api.updateEmployee}
          onDelete={api.deleteEmployee}
        />
      } />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/reports" element={<Suspense fallback={<p role="status">Loading report...</p>}><Reports/></Suspense>} />
      <Route path="*" element={<p>404 — Page not found</p>} />
    </Routes></AppShell>
  </AppContext.Provider>;
}
export default function App(){return <EmployeeStoreProvider><Content/></EmployeeStoreProvider>}
