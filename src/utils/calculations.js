import { lastDays, todayKey } from './date.js';

export function todaysWorkouts(workouts) {
  const today = todayKey();
  return workouts.filter((workout) => workout.date === today);
}

export function todaysCalories(workouts) {
  return todaysWorkouts(workouts).reduce((sum, workout) => sum + Number(workout.calories || 0), 0);
}

export function todaysDuration(workouts) {
  return todaysWorkouts(workouts).reduce((sum, workout) => sum + Number(workout.duration || 0), 0);
}

export function todaysWater(water) {
  return water.find((entry) => entry.date === todayKey())?.glasses || 0;
}

export function currentWeight(weights, profileWeight) {
  return [...weights].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.weight || profileWeight;
}

export function weeklyWorkoutData(workouts) {
  return lastDays(7).map((date) => {
    const day = workouts.filter((workout) => workout.date === date);
    return {
      date,
      label: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
      calories: day.reduce((sum, workout) => sum + Number(workout.calories || 0), 0),
      duration: day.reduce((sum, workout) => sum + Number(workout.duration || 0), 0),
      workouts: day.length,
    };
  });
}

export function monthlyCaloriesData(workouts) {
  return lastDays(30).map((date) => ({
    date,
    label: new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    calories: workouts
      .filter((workout) => workout.date === date)
      .reduce((sum, workout) => sum + Number(workout.calories || 0), 0),
  }));
}

export function categoryData(workouts) {
  return Object.entries(
    workouts.reduce((map, workout) => {
      map[workout.category] = (map[workout.category] || 0) + 1;
      return map;
    }, {}),
  ).map(([name, value]) => ({ name, value }));
}

export function bmi(heightCm, weightKg) {
  const meters = Number(heightCm) / 100;
  return meters ? (Number(weightKg) / (meters * meters)).toFixed(1) : '0.0';
}

export function dailyCalories({ gender, weight, height, age }) {
  const base =
    gender === 'Female'
      ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161
      : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
  return Math.round(base * 1.45);
}
