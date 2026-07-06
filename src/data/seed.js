const today = new Date();
const iso = (offset = 0) => {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const categories = ['Cardio', 'Strength', 'Yoga', 'HIIT', 'Running', 'Cycling'];

export const seedWorkouts = [
  { id: 'w1', name: 'Morning Run', category: 'Running', duration: 38, calories: 420, date: iso(0), notes: 'Comfortable 5K pace.' },
  { id: 'w2', name: 'Upper Body Strength', category: 'Strength', duration: 45, calories: 310, date: iso(-1), notes: 'Added shoulder supersets.' },
  { id: 'w3', name: 'Power Yoga', category: 'Yoga', duration: 32, calories: 180, date: iso(-2), notes: 'Mobility and breathing.' },
  { id: 'w4', name: 'Spin Intervals', category: 'Cycling', duration: 50, calories: 520, date: iso(-3), notes: 'Six sprint blocks.' },
  { id: 'w5', name: 'HIIT Core', category: 'HIIT', duration: 28, calories: 360, date: iso(-4), notes: 'Planks, mountain climbers, burpees.' },
  { id: 'w6', name: 'Zone 2 Cardio', category: 'Cardio', duration: 42, calories: 390, date: iso(-5), notes: 'Steady elliptical session.' },
];

export const seedWater = [
  { id: 'h1', date: iso(0), glasses: 5 },
  { id: 'h2', date: iso(-1), glasses: 8 },
  { id: 'h3', date: iso(-2), glasses: 7 },
  { id: 'h4', date: iso(-3), glasses: 6 },
];

export const seedWeights = [
  { id: 'p1', date: iso(-12), weight: 78.4 },
  { id: 'p2', date: iso(-9), weight: 77.9 },
  { id: 'p3', date: iso(-6), weight: 77.6 },
  { id: 'p4', date: iso(-3), weight: 77.2 },
  { id: 'p5', date: iso(0), weight: 76.9 },
];

export const defaultGoals = {
  weeklyWorkouts: 5,
  dailyCalories: 550,
  dailyWater: 8,
};

export const defaultProfile = {
  name: 'Fitness Pro',
  email: 'demo@fitpulse.app',
  height: 178,
  weight: 76.9,
  age: 31,
  gender: 'Male',
};
