import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployeePage from './src/pages/Employees/EmployeePage';

test('renders the consistent employee UI shell', () => {
  render(
    <MemoryRouter>
      <EmployeePage
        day={2}
        sourceLabel="ReqRes API"
        employees={[]}
        loading={false}
        error=""
        onCreate={jest.fn()}
        onUpdate={jest.fn()}
        onDelete={jest.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument();
  expect(screen.getAllByText(/ReqRes API/i).length).toBeGreaterThan(0);
});
