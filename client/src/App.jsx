import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import './App.css';
import VisaoGeralDashboard from './components/VisaoGeralPanels/VisaoGeralDashboard';
import LazerDashboard from './components/LazerPanels/LazerDashboard';
import EducacaoDashboard from './components/EducacaoPanels/EducacaoDashboard';
import VerticalMenu from './components/VerticalMenu';
import { useState } from 'react';
import CasaDashboard from './components/CasaPanels/CasaDashboard';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <VerticalMenu open={open} setOpen={setOpen} />

      <Routes>
        <Route
          path="/"
          element={<VisaoGeralDashboard open={open} setOpen={setOpen} />}
        />

        {/*  <Route path="/" element={<Navigate to="/visao-geral" replace />} /> */}

        <Route path="/educacao" element={<EducacaoDashboard open={open} />} />
        <Route path="/casa" element={<CasaDashboard open={open} />} />
        <Route path="/lazer" element={<LazerDashboard open={open} />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
