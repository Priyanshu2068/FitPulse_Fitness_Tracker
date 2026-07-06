const KEY = 'fitpulse-state-v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state) {
  const snapshot = {
    auth: state.auth,
    fitness: state.fitness,
    ui: { theme: state.ui.theme },
  };
  localStorage.setItem(KEY, JSON.stringify(snapshot));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
