import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 6000,
});

export async function simulateRemoteSync(payload) {
  // Kept as a single service boundary so a real backend can be attached later.
  return Promise.resolve({ ok: true, payload });
}
