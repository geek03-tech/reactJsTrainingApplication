import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import EmployeePage from './EmployeePage';
const employees=[{id:'1',name:'Selva Raman',email:'selva@company.com',role:'Developer',department:'Engineering',status:'Active',avatar:'https://i.pravatar.cc/150?img=1'}];
test('filters employees and opens add form',async()=>{const user=userEvent.setup();render(<MemoryRouter><EmployeePage day={1} sourceLabel="Dummy data" employees={employees} loading={false} error="" onCreate={jest.fn()} onUpdate={jest.fn()} onDelete={jest.fn()}/></MemoryRouter>);await user.type(screen.getByRole('textbox',{name:/search employee/i}),'Selva');expect(screen.getByText('Selva Raman')).toBeInTheDocument();await user.click(screen.getByRole('button',{name:/add employee/i}));expect(screen.getByRole('heading',{name:'Add Employee'})).toBeInTheDocument();});
