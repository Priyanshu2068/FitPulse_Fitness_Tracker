export default function CircularProgress({ value, goal }) {
  const percent = Math.min(100, Math.round((Number(value) / Math.max(Number(goal), 1)) * 100));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative mx-auto h-40 w-40">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} strokeWidth="12" className="fill-none stroke-slate-100 dark:stroke-slate-800" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          strokeWidth="12"
          strokeLinecap="round"
          className="fill-none stroke-teal-500 transition-all duration-500"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-slate-950 dark:text-white">{percent}%</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{value} of {goal} glasses</span>
      </div>
    </div>
  );
}
