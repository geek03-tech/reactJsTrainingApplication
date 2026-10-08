import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContext } from './app/AppContext';
import { AuthProvider, useAuth } from './app/AuthContext';
import { I18nProvider, useI18n } from './app/I18nContext';
import AppShell from './components/layout/AppShell';
import Card from './components/common/Card';
import EmployeePage from './pages/Employees/EmployeePage';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import Login from './pages/Login/Login';
import { useEmployees } from './hooks/useEmployees';

function Protected({ children }) { const { user } = useAuth(); return user ? children : <Navigate to="/login" replace />; }

function Content() {
  const { user, logout } = useAuth(); const { locale, setLocale, t } = useI18n(); const employeesApi = useEmployees();
  const app = { user, logout, employeesApi };
  return <AppContext.Provider value={app}>
    <div className="mb-6 flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      <span className="text-sm font-semibold text-slate-500">{t('role')}: <b>{t(`role${user?.role}`)}</b></span>
      <div className="flex items-center gap-2"><span className="text-xs font-bold text-slate-400">{t('language')}</span><select aria-label={t('language')} value={locale} onChange={e=>setLocale(e.target.value)} className="rounded-lg border px-2 py-1.5"><option value="en">EN</option><option value="hi">HI</option><option value="fr">FR</option></select></div>
    </div>
    <AppShell day={3}>
      <Routes>
        <Route path="/dashboard" element={<div className="space-y-6"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{t('enterpriseDay')}</p><h1 className="mt-1 text-3xl font-black">{t('dashboardTitle')}</h1><p className="mt-2 text-sm text-slate-500">{t('dashboardDescription')}</p></div><div className="grid gap-4 md:grid-cols-3"><Card className="p-5"><p className="text-sm text-slate-500">{t('employees')}</p><p className="mt-2 text-3xl font-black">{employeesApi.employees.length}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">{t('role')}</p><p className="mt-2 font-black">{t(`role${user.role}`)}</p></Card><Card className="p-5"><p className="text-sm text-slate-500">{t('dataSource')}</p><p className="mt-2 font-black">{t('reqresApi')}</p></Card></div></div>} />
        <Route path="/employees" element={
          <EmployeePage
            day={3}
            sourceLabel="ReqRes API"
            employees={employeesApi.employees}
            loading={employeesApi.loading}
            error={employeesApi.error}
            onRetry={employeesApi.reload}
            onCreate={employeesApi.createEmployee}
            onUpdate={employeesApi.updateEmployee}
            onDelete={employeesApi.deleteEmployee}
          />
        } />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="*" element={<p>404 — Page not found</p>} />
      </Routes>
    </AppShell>
  </AppContext.Provider>;
}
export default function App() {
  return <AuthProvider><I18nProvider><Routes><Route path="/login" element={<Login/>}/><Route path="*" element={<Protected><Content/></Protected>}/></Routes></I18nProvider></AuthProvider>;
}
