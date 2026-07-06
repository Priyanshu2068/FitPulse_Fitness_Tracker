import { createSlice, nanoid } from '@reduxjs/toolkit';
import { defaultGoals, defaultProfile, seedWater, seedWeights, seedWorkouts } from '../data/seed.js';
import { todayKey } from '../utils/date.js';

const initialState = {
  workouts: seedWorkouts,
  water: seedWater,
  weights: seedWeights,
  goals: defaultGoals,
  profile: defaultProfile,
};

const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    addWorkout: {
      reducer(state, action) {
        state.workouts.unshift(action.payload);
      },
      prepare(workout) {
        return { payload: { id: nanoid(), ...workout, duration: Number(workout.duration), calories: Number(workout.calories) } };
      },
    },
    updateWorkout(state, action) {
      const index = state.workouts.findIndex((workout) => workout.id === action.payload.id);
      if (index >= 0) state.workouts[index] = { ...action.payload, duration: Number(action.payload.duration), calories: Number(action.payload.calories) };
    },
    deleteWorkout(state, action) {
      state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
    },
    addWater(state, action) {
      const date = action.payload?.date || todayKey();
      const glasses = Number(action.payload?.glasses || 1);
      const existing = state.water.find((entry) => entry.date === date);
      if (existing) existing.glasses += glasses;
      else state.water.unshift({ id: nanoid(), date, glasses });
    },
    setWater(state, action) {
      const { date = todayKey(), glasses } = action.payload;
      const existing = state.water.find((entry) => entry.date === date);
      if (existing) existing.glasses = Number(glasses);
      else state.water.unshift({ id: nanoid(), date, glasses: Number(glasses) });
    },
    addWeight: {
      reducer(state, action) {
        state.weights.unshift(action.payload);
        state.profile.weight = action.payload.weight;
      },
      prepare(entry) {
        return { payload: { id: nanoid(), date: entry.date, weight: Number(entry.weight) } };
      },
    },
    updateGoals(state, action) {
      state.goals = { ...state.goals, ...action.payload };
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { addWorkout, updateWorkout, deleteWorkout, addWater, setWater, addWeight, updateGoals, updateProfile } = fitnessSlice.actions;
export default fitnessSlice.reducer;
