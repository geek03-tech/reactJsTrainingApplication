import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import Spinner from '../../components/common/Spinner';
import ErrorState from '../../components/common/ErrorState';
import Badge from '../../components/common/Badge';
import { getEmployee } from '../../services/employeeService';
import { useI18n } from '../../app/I18nContext';

export default function EmployeeDetails() {
  const { t } = useI18n();
  const { id } = useParams(); const [employee,setEmployee]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{getEmployee(id).then(setEmployee).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[id]);
  if(loading)return <Spinner label={t('loadingEmployee')} />;
  if(error)return <ErrorState message={error} t={t}/>;
  return <Card className="max-w-2xl p-6"><Link to="/employees" className="text-sm font-bold text-sky-600">{t('back')}</Link><div className="mt-5 flex gap-4"><img src={employee.avatar} alt="" className="h-20 w-20 rounded-2xl"/><div><h1 className="text-2xl font-black">{employee.name}</h1><p className="text-slate-500">{employee.role}</p><Badge tone="green">{t(employee.status === 'On Leave' ? 'onLeave' : employee.status.toLowerCase())}</Badge></div></div><dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm"><div><dt className="text-slate-400">{t('emailAddress')}</dt><dd className="font-bold">{employee.email}</dd></div><div><dt className="text-slate-400">{t('department')}</dt><dd className="font-bold">{t(({ Engineering: 'engineering', 'Human Resources': 'humanResources', Design: 'design', Finance: 'finance', Operations: 'operations' })[employee.department] || employee.department)}</dd></div></dl></Card>;
}
