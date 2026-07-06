import Button from './Button.jsx';

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <Button variant="secondary" disabled={page === 1} onClick={() => onPage(page - 1)}>Previous</Button>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Page {page} of {totalPages}</span>
      <Button variant="secondary" disabled={page === totalPages} onClick={() => onPage(page + 1)}>Next</Button>
    </div>
  );
}
