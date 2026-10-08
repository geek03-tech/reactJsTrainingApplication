export default function Select({ label, options, optionLabels = options, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <select {...props} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-sky-500">
        {options.map((option, index) => <option key={option} value={option}>{optionLabels[index]}</option>)}
      </select>
    </label>
  );
}
