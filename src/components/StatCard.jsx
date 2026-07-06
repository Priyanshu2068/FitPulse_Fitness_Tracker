export default function StatCard({ icon: Icon, label, value, helper, tone = 'teal' }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    sky: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
  };
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950 dark:text-white">{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p>}
        </div>
        <div className={`rounded-lg p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
