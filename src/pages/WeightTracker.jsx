import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { WeightLineChart } from '../components/Charts.jsx';
import { addWeight } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';
import { todayKey } from '../utils/date.js';

export default function WeightTracker() {
  const weights = useSelector((state) => state.fitness.weights);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({ defaultValues: { date: todayKey(), weight: '' } });

  const onSubmit = (values) => {
    dispatch(addWeight(values));
    dispatch(showToast({ message: 'Weight logged.' }));
    reset({ date: todayKey(), weight: '' });
  };

  return (
    <>
      <PageHeader title="Weight Tracker" description="Log daily weight and monitor your trend over time." />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.3fr]">
        <Card title="Add Daily Weight">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-sm font-semibold">Date<input className="field mt-1" type="date" {...register('date', { required: true })} /></label>
            <label className="block text-sm font-semibold">Weight (kg)<input className="field mt-1" type="number" step="0.1" min="1" {...register('weight', { required: true })} /></label>
            <Button type="submit">Add Weight</Button>
          </form>
          <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
            {[...weights].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex justify-between py-3 text-sm">
                <span>{entry.date}</span>
                <span className="font-bold">{entry.weight} kg</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Weight Trend Graph"><WeightLineChart data={weights} /></Card>
      </div>
    </>
  );
}
