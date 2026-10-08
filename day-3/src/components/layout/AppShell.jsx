import { NavLink } from 'react-router-dom';
import { useApp } from '../../app/AppContext';
import { useI18n } from '../../app/I18nContext';

export default function AppShell({ children, day }) {
  const { user, logout } = useApp();
  const { t } = useI18n();
  const link = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-bold ${isActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'}`;
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-600 font-black text-white">EP</div>
            <div>
              <p className="font-black tracking-tight text-slate-950">{t('employeePortal')}</p>
              <p className="text-xs font-semibold text-slate-400">{t('training')} • {t('dayLabel')} {day}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/dashboard" className={link}>{t('dashboard')}</NavLink>
            <NavLink to="/employees" className={link}>{t('employees')}</NavLink>
            {day >= 4 && <NavLink to="/reports" className={link}>Reports</NavLink>}
          </nav>
          <div className="flex items-center gap-2">
            {user && <span className="hidden text-xs font-semibold text-slate-500 sm:inline">{user.email}</span>}
            {user && <button onClick={logout} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold">{t('logout')}</button>}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}
