import { useSelector } from 'react-redux';
import { FiActivity, FiDroplet, FiFlag, FiZap } from 'react-icons/fi';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { WeeklyChart } from '../components/Charts.jsx';
import { currentWeight, todaysCalories, todaysDuration, todaysWater, weeklyWorkoutData } from '../utils/calculations.js';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const { workouts, water, weights, profile, goals } = useSelector((state) => state.fitness);
  const todayCalories = todaysCalories(workouts);
  const todayWater = todaysWater(water);
  const todayDuration = todaysDuration(workouts);
  const weight = currentWeight(weights, profile.weight);
  const week = weeklyWorkoutData(workouts);
  const recent = workouts.slice(0, 5);

  return (
    <>
      <PageHeader title={`Welcome back, ${user?.name || 'Athlete'}`} description="A focused snapshot of today's effort, hydration, and momentum." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiZap} label="Calories burned today" value={todayCalories} helper={`Goal ${goals.dailyCalories} kcal`} tone="rose" />
        <StatCard icon={FiDroplet} label="Water intake today" value={`${todayWater} glasses`} helper={`Goal ${goals.dailyWater} glasses`} tone="sky" />
        <StatCard icon={FiActivity} label="Workout duration" value={`${todayDuration} min`} helper="Logged today" tone="teal" />
        <StatCard icon={FiFlag} label="Current weight" value={`${weight} kg`} helper="Latest check-in" tone="amber" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Weekly Progress">
          <WeeklyChart data={week} />
        </Card>
        <Card title="Goal Progress">
          <div className="space-y-5">
            <ProgressBar label="Daily calories" value={todayCalories} goal={goals.dailyCalories} suffix=" kcal" />
            <ProgressBar label="Daily water" value={todayWater} goal={goals.dailyWater} />
            <ProgressBar label="Weekly workouts" value={week.reduce((sum, item) => sum + item.workouts, 0)} goal={goals.weeklyWorkouts} />
          </div>
        </Card>
      </div>
      <Card title="Recent Activities" className="mt-6">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {recent.map((workout) => (
            <div key={workout.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{workout.name}</p>
                <p className="text-sm text-slate-500">{workout.category} • {workout.duration} min</p>
              </div>
              <p className="text-sm font-bold text-teal-600">{workout.calories} kcal</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
