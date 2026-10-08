export default function Button({ children, variant = 'primary', type = 'button', disabled = false, onClick, className = '' }) {
  const variants = {
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-slate-100'
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
