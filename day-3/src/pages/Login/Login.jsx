import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { useAuth } from '../../app/AuthContext';
import { useI18n } from '../../app/I18nContext';

export default function Login() {
  const { user, login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError('');
    try { await login(email, password, role); navigate('/dashboard'); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }
  return <div className="grid min-h-[70vh] place-items-center">
    <Card className="w-full max-w-md p-7">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{t('loginEyebrow')}</p>
      <h1 className="mt-2 text-3xl font-black">{t('login')}</h1>
      <p className="mt-2 text-sm text-slate-500">{t('loginDescription')}</p>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Input label={t('email')} value={email} onChange={e => setEmail(e.target.value)} />
        <Input label={t('password')} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <label className="block text-sm font-semibold">{t('role')}<select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full rounded-xl border px-4 py-2.5"><option value="Admin">{t('roleAdmin')}</option><option value="HR">{t('roleHR')}</option><option value="Viewer">{t('roleViewer')}</option></select></label>
        <Button type="submit" disabled={loading} className="w-full">{loading ? t('signingIn') : t('login')}</Button>
      </form>
    </Card>
  </div>;
}
