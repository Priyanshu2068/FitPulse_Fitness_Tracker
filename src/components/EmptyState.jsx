import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <FiInbox className="h-8 w-8 text-slate-400" />
      <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>}
    </div>
  );
}
