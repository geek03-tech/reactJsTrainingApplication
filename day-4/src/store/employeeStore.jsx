import { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  employees: [],
  search: '',
  department: 'All',
  status: 'All',
  notifications: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { ...state, employees: action.payload };
    case 'search':
      return { ...state, search: action.payload };
    case 'department':
      return { ...state, department: action.payload };
    case 'status':
      return { ...state, status: action.payload };
    case 'add':
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        notifications: ['Employee created via ReqRes', ...state.notifications]
      };
    case 'update':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        ),
        notifications: ['Employee updated via ReqRes', ...state.notifications]
      };
    case 'delete':
      return {
        ...state,
        employees: state.employees.filter(employee => employee.id !== action.payload),
        notifications: ['Employee deleted via ReqRes', ...state.notifications]
      };
    case 'clearNotifications':
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function EmployeeStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useEmployeeStore = () => useContext(StoreContext);