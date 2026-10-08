import { useCallback, useEffect, useState } from 'react';
import * as service from '../services/employeeService';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const result = await service.getAllEmployees(); setEmployees(result.data); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  return {
    employees, loading, error, reload: load,
    createEmployee: async p => { const e = await service.createEmployee(p); setEmployees(x => [e, ...x]); },
    updateEmployee: async (id,p) => { const e = await service.updateEmployee(id,p); setEmployees(x => x.map(v => v.id === id ? e : v)); },
    deleteEmployee: async id => { await service.deleteEmployee(id); setEmployees(x => x.filter(v => v.id !== id)); }
  };
}
