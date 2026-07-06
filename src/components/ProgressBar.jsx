export default function ProgressBar({ label, value, goal, suffix = '' }) {
  const percent = Math.min(100, Math.round((Number(value) / Math.max(Number(goal), 1)) * 100));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">
          {value}{suffix} / {goal}{suffix}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
