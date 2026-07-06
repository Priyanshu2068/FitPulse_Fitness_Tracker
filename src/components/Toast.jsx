import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle } from 'react-icons/fi';
import { clearToast } from '../context/uiSlice.js';

export default function Toast() {
  const toast = useSelector((state) => state.ui.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => dispatch(clearToast()), 2600);
    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-950">
      <FiCheckCircle className="h-5 w-5 text-teal-400" />
      {toast.message}
    </div>
  );
}
