import { useDispatch, useSelector } from 'react-redux';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import CircularProgress from '../components/CircularProgress.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { addWater, setWater } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';
import { todaysWater } from '../utils/calculations.js';
import { todayKey } from '../utils/date.js';

export default function WaterTracker() {
  const { water, goals } = useSelector((state) => state.fitness);
  const dispatch = useDispatch();
  const glasses = todaysWater(water);

  const addGlass = () => {
    dispatch(addWater({ glasses: 1 }));
    dispatch(showToast({ message: 'Water added.' }));
  };

  const removeGlass = () => {
    dispatch(setWater({ date: todayKey(), glasses: Math.max(0, glasses - 1) }));
  };

  return (
    <>
      <PageHeader title="Water Tracker" description="Track hydration against your daily goal." />
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card title="Today">
          <CircularProgress value={glasses} goal={goals.dailyWater} />
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={removeGlass}><FiMinus /> Remove</Button>
            <Button onClick={addGlass}><FiPlus /> Add Glass</Button>
          </div>
        </Card>
        <Card title="Recent Hydration">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[...water].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-3">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{entry.date}</span>
                <span className="text-sm font-bold text-sky-600">{entry.glasses} glasses</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
