import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    toast: null,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    showToast(state, action) {
      state.toast = { id: Date.now(), ...action.payload };
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { toggleTheme, setTheme, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
