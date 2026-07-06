import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiActivity,
  FiBarChart2,
  FiDroplet,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSettings,
  FiSun,
  FiTarget,
  FiTrendingDown,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useState } from 'react';
import { logout } from '../context/authSlice.js';
import { toggleTheme } from '../context/uiSlice.js';
import Toast from '../components/Toast.jsx';
import useTheme from '../hooks/useTheme.js';

const navItems = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/workouts', label: 'Workouts', icon: FiActivity },
  { to: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { to: '/goals', label: 'Goals', icon: FiTarget },
  { to: '/water', label: 'Water', icon: FiDroplet },
  { to: '/weight', label: 'Weight', icon: FiTrendingDown },
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/settings', label: 'Settings', icon: FiSettings },
];

function Sidebar({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/40 lg:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform dark:border-slate-800 dark:bg-slate-950 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2">
          <div>
            <p className="text-xl font-extrabold text-slate-950 dark:text-white">FitPulse</p>
            <p className="text-xs font-medium text-slate-500">Fitness command center</p>
          </div>
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 lg:hidden" onClick={onClose} aria-label="Close navigation">
            <FiX />
          </button>
        </div>
        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900" onClick={() => dispatch(toggleTheme())}>
            {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={handleLogout}>
            <FiLogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:px-8">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <FiMenu className="h-5 w-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-600 text-sm font-extrabold text-white">
              {user?.name?.slice(0, 1) || 'F'}
            </div>
          </div>
        </header>
        <main className="animate-[fadeIn_0.22s_ease-out] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}
