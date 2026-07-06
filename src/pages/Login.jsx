import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FiLogIn } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import { login } from '../context/authSlice.js';
import { showToast } from '../context/uiSlice.js';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: 'demo@fitpulse.app', password: 'password' } });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (values) => {
    dispatch(login({ name: values.email.split('@')[0], email: values.email }));
    dispatch(showToast({ message: 'Welcome back.' }));
    navigate(location.state?.from?.pathname || '/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-6 text-slate-950 shadow-2xl dark:bg-slate-900 dark:text-white">
      <p className="text-sm font-bold text-teal-600">FitPulse</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-normal">Log in</h1>
      <p className="mt-1 text-sm text-slate-500">Use any email to open your local dashboard.</p>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold">
          Email
          <input className="field mt-1" type="email" {...register('email', { required: true })} />
          {errors.email && <span className="text-xs text-rose-600">Email is required.</span>}
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input className="field mt-1" type="password" {...register('password', { required: true, minLength: 4 })} />
          {errors.password && <span className="text-xs text-rose-600">Password must be at least 4 characters.</span>}
        </label>
      </div>
      <Button className="mt-6 w-full" type="submit"><FiLogIn /> Log in</Button>
      <p className="mt-5 text-center text-sm text-slate-500">
        New here? <Link className="font-bold text-teal-600" to="/signup">Create account</Link>
      </p>
    </form>
  );
}
