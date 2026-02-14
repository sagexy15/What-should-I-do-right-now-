import { Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Lately from './pages/Lately';
import Settings from './pages/Settings';
import Games from './pages/Games';

export default function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="lately" element={<Lately />} />
          <Route path="games" element={<Games />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}
