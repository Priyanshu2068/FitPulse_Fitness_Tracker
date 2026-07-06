import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FiUserPlus } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import { signup } from '../context/authSlice.js';
import { updateProfile } from '../context/fitnessSlice.js';
import { showToast } from '../context/uiSlice.js';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const user = { name: values.name, email: values.email };
    dispatch(signup(user));
    dispatch(updateProfile({ name: values.name, email: values.email }));
    dispatch(showToast({ message: 'Account created.' }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg bg-white p-6 text-slate-950 shadow-2xl dark:bg-slate-900 dark:text-white">
      <p className="text-sm font-bold text-teal-600">FitPulse</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-normal">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">Your data stays in this browser with local storage.</p>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold">Name<input className="field mt-1" {...register('name', { required: true })} />{errors.name && <span className="text-xs text-rose-600">Name is required.</span>}</label>
        <label className="block text-sm font-semibold">Email<input className="field mt-1" type="email" {...register('email', { required: true })} />{errors.email && <span className="text-xs text-rose-600">Email is required.</span>}</label>
        <label className="block text-sm font-semibold">Password<input className="field mt-1" type="password" {...register('password', { required: true, minLength: 4 })} />{errors.password && <span className="text-xs text-rose-600">Password must be at least 4 characters.</span>}</label>
      </div>
      <Button className="mt-6 w-full" type="submit"><FiUserPlus /> Sign up</Button>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account? <Link className="font-bold text-teal-600" to="/login">Log in</Link>
      </p>
    </form>
  );
}
