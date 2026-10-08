import { useCallback, useEffect, useState } from 'react';
import * as service from '../services/employeeService';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { 
      const result = await service.getAllEmployees();
      setEmployees(Array.isArray(result?.data) ? result.data : []); 
    }
    catch (e) { 
      console.log(e)  
      setError(e.message); 
    }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const createEmployee = async payload => {
    const created = await service.createEmployee(payload);
    setEmployees(prev => [created, ...prev]);
  };
  const updateEmployee = async (id, payload) => {
    const updated = await service.updateEmployee(id, payload);
    setEmployees(prev => prev.map(e => e.id === id ? updated : e));
  };
  const deleteEmployee = async id => {
    await service.deleteEmployee(id);
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return { employees, loading, error, reload: load, createEmployee, updateEmployee, deleteEmployee };
}
