import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployeePage from './src/pages/Employees/EmployeePage';
import { EmployeeStoreProvider } from './src/store/employeeStore.jsx';

test('renders the consistent employee UI shell', () => {
	render(<EmployeeStoreProvider><MemoryRouter><EmployeePage day={4} sourceLabel="ReqRes API" employees={[]} loading={false} error="" onCreate={jest.fn()} onUpdate={jest.fn()} onDelete={jest.fn()} /></MemoryRouter></EmployeeStoreProvider>);
	expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument();
	expect(screen.getByText(/Employee management • Global state/)).toBeInTheDocument();
});
