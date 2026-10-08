export default function EmployeeFilters({ search, setSearch, department, setDepartment, status, setStatus }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <input aria-label="Search employee" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search employee by name or email" className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-sky-500" />
      <select aria-label="Department" value={department} onChange={e => setDepartment(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none">
        <option>All</option><option>Engineering</option><option>Human Resources</option><option>Design</option><option>Finance</option><option>Operations</option>
      </select>
      <select aria-label="Status" value={status} onChange={e => setStatus(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none">
        <option>All</option><option>Active</option><option>On Leave</option><option>Inactive</option>
      </select>
    </div>
  );
}
