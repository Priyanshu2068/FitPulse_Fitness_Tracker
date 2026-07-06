import { useDispatch, useSelector } from 'react-redux';
import { FiMoon, FiSun } from 'react-icons/fi';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { setTheme, showToast } from '../context/uiSlice.js';

export default function Settings() {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  return (
    <>
      <PageHeader title="Settings" description="Adjust dashboard preferences for this browser." />
      <Card title="Appearance">
        <div className="flex flex-wrap gap-3">
          <Button variant={theme === 'light' ? 'primary' : 'secondary'} onClick={() => { dispatch(setTheme('light')); dispatch(showToast({ message: 'Light mode enabled.' })); }}><FiSun /> Light</Button>
          <Button variant={theme === 'dark' ? 'primary' : 'secondary'} onClick={() => { dispatch(setTheme('dark')); dispatch(showToast({ message: 'Dark mode enabled.' })); }}><FiMoon /> Dark</Button>
        </div>
      </Card>
    </>
  );
}
