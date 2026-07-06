import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden flex-col justify-between bg-slate-900 p-10 lg:flex">
          <div className="text-xl font-extrabold">FitPulse</div>
          <div>
            <p className="max-w-lg text-5xl font-extrabold leading-tight tracking-normal">
              Fitness insight that keeps up with real life.
            </p>
            <p className="mt-5 max-w-md text-slate-300">
              Track workouts, hydration, weight trends, and goals from one clean dashboard.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
            <div className="rounded-lg bg-white/10 p-4">Smart charts</div>
            <div className="rounded-lg bg-white/10 p-4">Local data</div>
            <div className="rounded-lg bg-white/10 p-4">Fast logging</div>
          </div>
        </section>
        <section className="flex items-center justify-center p-5">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
