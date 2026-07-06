import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { updateProfile } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';
import { bmi, dailyCalories } from '../utils/calculations.js';

export default function Profile() {
  const profile = useSelector((state) => state.fitness.profile);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm({ defaultValues: profile });
  const watched = watch();
  const currentBmi = bmi(watched.height, watched.weight);
  const calories = dailyCalories(watched);

  const onSubmit = (values) => {
    dispatch(updateProfile({ ...values, height: Number(values.height), weight: Number(values.weight), age: Number(values.age) }));
    dispatch(showToast({ message: 'Profile saved.' }));
  };

  return (
    <>
      <PageHeader title="Profile" description="Manage body metrics and estimate BMI plus daily calorie needs." />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="User Profile">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">Name<input className="field mt-1" {...register('name', { required: true })} /></label>
            <label className="text-sm font-semibold">Email<input className="field mt-1" type="email" {...register('email', { required: true })} /></label>
            <label className="text-sm font-semibold">Height (cm)<input className="field mt-1" type="number" {...register('height', { required: true })} /></label>
            <label className="text-sm font-semibold">Weight (kg)<input className="field mt-1" type="number" step="0.1" {...register('weight', { required: true })} /></label>
            <label className="text-sm font-semibold">Age<input className="field mt-1" type="number" {...register('age', { required: true })} /></label>
            <label className="text-sm font-semibold">Gender<select className="field mt-1" {...register('gender')}><option>Male</option><option>Female</option><option>Other</option></select></label>
            <div className="sm:col-span-2"><Button type="submit">Save Profile</Button></div>
          </form>
        </Card>
        <Card title="Calculators">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-lg bg-teal-50 p-5 dark:bg-teal-500/10">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">BMI Calculator</p>
              <p className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white">{currentBmi}</p>
            </div>
            <div className="rounded-lg bg-sky-50 p-5 dark:bg-sky-500/10">
              <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">Daily calorie requirement</p>
              <p className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white">{calories}</p>
              <p className="text-xs text-slate-500">Estimated maintenance calories.</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
