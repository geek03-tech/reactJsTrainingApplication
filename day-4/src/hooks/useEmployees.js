import { useCallback, useEffect, useState } from 'react';
import * as service from '../services/employeeService';
import { useEmployeeStore } from '../store/employeeStore.jsx';

export function useEmployees() {
  const { state, dispatch } = useEmployeeStore();
  const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  const load=useCallback(async()=>{setLoading(true);setError('');try{const r=await service.getAllEmployees();dispatch({type:'load',payload:r.data});}catch(e){setError(e.message);}finally{setLoading(false);}},[dispatch]);
  useEffect(()=>{load();},[load]);
  return {
    employees: state.employees, loading, error, reload:load,
    createEmployee:async p=>{const e=await service.createEmployee(p);dispatch({type:'add',payload:e});},
    updateEmployee:async(id,p)=>{const e=await service.updateEmployee(id,p);dispatch({type:'update',payload:e});},
    deleteEmployee:async id=>{await service.deleteEmployee(id);dispatch({type:'delete',payload:id});}
  };
}
