import { useSelector } from 'react-redux';
import { FiDownload } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import { CategoryPieChart, MonthlyCaloriesChart, WeeklyChart, WeightLineChart } from '../components/Charts.jsx';
import { categoryData, monthlyCaloriesData, weeklyWorkoutData } from '../utils/calculations.js';
import { downloadAnalyticsPdf } from '../utils/export.js';

export default function Analytics() {
  const { workouts, weights } = useSelector((state) => state.fitness);
  const calories = workouts.reduce((sum, workout) => sum + Number(workout.calories || 0), 0);
  const duration = workouts.reduce((sum, workout) => sum + Number(workout.duration || 0), 0);

  return (
    <>
      <PageHeader
        title="Analytics"
        description="See weekly effort, monthly calories, workout mix, and weight progress at a glance."
        actions={<Button variant="secondary" onClick={() => downloadAnalyticsPdf({ workouts, calories, duration })}><FiDownload /> Download PDF</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard icon={() => null} label="Total workout time" value={`${duration} min`} helper={`${workouts.length} workouts logged`} />
        <StatCard icon={() => null} label="Total calories burned" value={calories} helper="All-time local total" tone="rose" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Weekly Workout Chart"><WeeklyChart data={weeklyWorkoutData(workouts)} /></Card>
        <Card title="Monthly Calorie Chart"><MonthlyCaloriesChart data={monthlyCaloriesData(workouts)} /></Card>
        <Card title="Workout Category Distribution"><CategoryPieChart data={categoryData(workouts)} /></Card>
        <Card title="Weight Progress"><WeightLineChart data={weights} /></Card>
      </div>
    </>
  );
}
