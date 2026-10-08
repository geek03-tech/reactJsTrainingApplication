import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployeePage from './src/pages/Employees/EmployeePage';
import { I18nProvider, useI18n } from './src/app/I18nContext';

function EmployeePageWithLanguageSelector() {
	const { locale, setLocale, t } = useI18n();
	return <>
		<label>{t('language')}<select aria-label={t('language')} value={locale} onChange={event => setLocale(event.target.value)}><option value="en">EN</option><option value="hi">HI</option><option value="fr">FR</option></select></label>
		<EmployeePage day={3} sourceLabel="ReqRes API" employees={[]} loading={false} error="" onCreate={jest.fn()} onUpdate={jest.fn()} onDelete={jest.fn()} />
	</>;
}

test('renders the consistent employee UI shell', () => {
	render(<I18nProvider><MemoryRouter><EmployeePageWithLanguageSelector /></MemoryRouter></I18nProvider>);
	expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument();
	expect(screen.getByText('ReqRes API')).toBeInTheDocument();
});

test('changes employee page copy when the language changes to Hindi', () => {
	render(<I18nProvider><MemoryRouter><EmployeePageWithLanguageSelector /></MemoryRouter></I18nProvider>);
	fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), { target: { value: 'hi' } });
	expect(screen.getByRole('heading', { name: 'कर्मचारी' })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: '+ कर्मचारी जोड़ें' })).toBeInTheDocument();
});

test('changes employee page copy when the language changes to French', () => {
	render(<I18nProvider><MemoryRouter><EmployeePageWithLanguageSelector /></MemoryRouter></I18nProvider>);
	fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), { target: { value: 'fr' } });
	expect(screen.getByRole('heading', { name: 'Employés' })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: '+ Ajouter un employé' })).toBeInTheDocument();
});
