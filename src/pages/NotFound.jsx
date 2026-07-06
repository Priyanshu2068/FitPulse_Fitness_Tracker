import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-6 text-center dark:bg-slate-950">
      <div>
        <p className="text-sm font-bold text-teal-600">404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
        <Link to="/"><Button className="mt-6">Back to Dashboard</Button></Link>
      </div>
    </main>
  );
}
