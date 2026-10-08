export default function Input({ label, error, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input {...props}
        className={`mt-1 w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${error ? 'border-red-400' : 'border-slate-300'}`} />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
