import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiDownload, FiEdit2, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';
import { addWorkout, deleteWorkout, updateWorkout } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';
import { categories } from '../data/seed.js';
import { exportWorkoutsCsv } from '../utils/export.js';

const blankWorkout = { name: '', category: 'Cardio', duration: 30, calories: 250, date: new Date().toISOString().slice(0, 10), notes: '' };

export default function Workouts() {
  const workouts = useSelector((state) => state.fitness.workouts);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: 'All', date: '', sort: 'newest' });
  const [page, setPage] = useState(1);
  const { register, handleSubmit, reset } = useForm({ defaultValues: blankWorkout });

  const filtered = useMemo(() => {
    return workouts
      .filter((workout) => workout.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter((workout) => filters.category === 'All' || workout.category === filters.category)
      .filter((workout) => !filters.date || workout.date === filters.date)
      .sort((a, b) => filters.sort === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
  }, [filters, workouts]);

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const submitWorkout = (values) => {
    if (editing) {
      dispatch(updateWorkout({ ...values, id: editing.id }));
      dispatch(showToast({ message: 'Workout updated.' }));
    } else {
      dispatch(addWorkout(values));
      dispatch(showToast({ message: 'Workout added.' }));
    }
    setEditing(null);
    reset(blankWorkout);
  };

  const startEdit = (workout) => {
    setEditing(workout);
    reset(workout);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = () => {
    dispatch(deleteWorkout(pendingDelete.id));
    dispatch(showToast({ message: 'Workout deleted.' }));
    setPendingDelete(null);
  };

  return (
    <>
      <PageHeader
        title="Workout Management"
        description="Log workouts, edit details, review history, and export everything to CSV."
        actions={<Button variant="secondary" onClick={() => exportWorkoutsCsv(workouts)}><FiDownload /> Export CSV</Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.5fr]">
        <Card title={editing ? 'Edit Workout' : 'Add Workout'}>
          <form onSubmit={handleSubmit(submitWorkout)} className="grid gap-4">
            <label className="text-sm font-semibold">Workout Name<input className="field mt-1" {...register('name', { required: true })} /></label>
            <label className="text-sm font-semibold">Category<select className="field mt-1" {...register('category')}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Duration<input className="field mt-1" type="number" min="1" {...register('duration', { required: true })} /></label>
              <label className="text-sm font-semibold">Calories Burned<input className="field mt-1" type="number" min="1" {...register('calories', { required: true })} /></label>
            </div>
            <label className="text-sm font-semibold">Date<input className="field mt-1" type="date" {...register('date', { required: true })} /></label>
            <label className="text-sm font-semibold">Notes<textarea className="field mt-1 min-h-24" {...register('notes')} /></label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit"><FiPlus /> {editing ? 'Save Changes' : 'Add Workout'}</Button>
              {editing && <Button type="button" variant="secondary" onClick={() => { setEditing(null); reset(blankWorkout); }}>Cancel</Button>}
            </div>
          </form>
        </Card>
        <Card title="Activity History">
          <div className="grid gap-3 md:grid-cols-[1fr_160px_150px_130px]">
            <label className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input className="field pl-9" placeholder="Search workouts" value={filters.search} onChange={(event) => { setPage(1); setFilters({ ...filters, search: event.target.value }); }} />
            </label>
            <select className="field" value={filters.category} onChange={(event) => { setPage(1); setFilters({ ...filters, category: event.target.value }); }}>
              <option>All</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <input className="field" type="date" value={filters.date} onChange={(event) => { setPage(1); setFilters({ ...filters, date: event.target.value }); }} />
            <select className="field" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="mt-5">
            {visible.length === 0 ? <EmptyState title="No workouts found" message="Try changing your filters or add a fresh workout." /> : (
              <div className="space-y-3">
                {visible.map((workout) => (
                  <div key={workout.id} className="rounded-lg border border-slate-200 p-4 transition hover:border-teal-300 dark:border-slate-800">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-bold text-slate-950 dark:text-white">{workout.name}</p>
                        <p className="text-sm text-slate-500">{workout.category} • {workout.date} • {workout.duration} min • {workout.calories} kcal</p>
                        {workout.notes && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{workout.notes}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => startEdit(workout)} aria-label="Edit workout"><FiEdit2 /></button>
                        <button className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={() => setPendingDelete(workout)} aria-label="Delete workout"><FiTrash2 /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>
        </Card>
      </div>
      <ConfirmDialog open={Boolean(pendingDelete)} title="Delete workout?" message="This removes the workout from your local history." onClose={() => setPendingDelete(null)} onConfirm={confirmDelete} />
    </>
  );
}
