export default function EmployeeFilters({ search, setSearch, department, setDepartment, status, setStatus, t = key => key }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <input aria-label={t('searchEmployee')} value={search} onChange={e => setSearch(e.target.value)}
        placeholder={t('searchPlaceholder')} className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500" />
      <select aria-label={t('department')} value={department} onChange={e => setDepartment(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none">
        <option value="All">{t('all')}</option><option value="Engineering">{t('engineering')}</option><option value="Human Resources">{t('humanResources')}</option><option value="Design">{t('design')}</option><option value="Finance">{t('finance')}</option><option value="Operations">{t('operations')}</option>
      </select>
      <select aria-label={t('status')} value={status} onChange={e => setStatus(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none">
        <option value="All">{t('all')}</option><option value="Active">{t('active')}</option><option value="On Leave">{t('onLeave')}</option><option value="Inactive">{t('inactive')}</option>
      </select>
    </div>
  );
}
