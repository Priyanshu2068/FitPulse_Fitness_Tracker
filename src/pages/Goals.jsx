import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { updateGoals } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';
import { todaysCalories, todaysWater, weeklyWorkoutData } from '../utils/calculations.js';

export default function Goals() {
  const { goals, workouts, water } = useSelector((state) => state.fitness);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ defaultValues: goals });
  const weekCount = weeklyWorkoutData(workouts).reduce((sum, day) => sum + day.workouts, 0);

  const onSubmit = (values) => {
    dispatch(updateGoals({
      weeklyWorkouts: Number(values.weeklyWorkouts),
      dailyCalories: Number(values.dailyCalories),
      dailyWater: Number(values.dailyWater),
    }));
    dispatch(showToast({ message: 'Goals updated.' }));
  };

  return (
    <>
      <PageHeader title="Goals" description="Set targets and track progress against your current week and day." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Set Goals">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-sm font-semibold">Weekly workout goal<input className="field mt-1" type="number" min="1" {...register('weeklyWorkouts')} /></label>
            <label className="block text-sm font-semibold">Daily calorie burn goal<input className="field mt-1" type="number" min="1" {...register('dailyCalories')} /></label>
            <label className="block text-sm font-semibold">Daily water intake goal<input className="field mt-1" type="number" min="1" {...register('dailyWater')} /></label>
            <Button type="submit">Save Goals</Button>
          </form>
        </Card>
        <Card title="Progress">
          <div className="space-y-6">
            <ProgressBar label="Weekly workouts" value={weekCount} goal={goals.weeklyWorkouts} />
            <ProgressBar label="Daily calories" value={todaysCalories(workouts)} goal={goals.dailyCalories} suffix=" kcal" />
            <ProgressBar label="Daily water" value={todaysWater(water)} goal={goals.dailyWater} />
          </div>
        </Card>
      </div>
    </>
  );
}
