import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import FormAtividadeCasa from './components/FormAtividadeCasa';
import FormAtividadeEducacao from './components/FormAtividadeEducacao';
import FormAtividadeLazer from './components/FormAtividadeLazer';
import Navbar from './components/Navbar';
import { lazy, Suspense } from 'react';
const VisaoGeralDashboard = lazy(
  () => import('./components/VisaoGeralPanels/VisaoGeralDashboard'),
);
const CasaDashboard = lazy(
  () => import('./components/CasaPanels/CasaDashboard'),
);
const EducacaoDashboard = lazy(
  () => import('./components/EducacaoPanels/EducacaoDashboard'),
);
const LazerDashboard = lazy(
  () => import('./components/LazerPanels/LazerDashboard'),
);
import DashboardSkeleton from './components/DashboardSkeleton';
import VisaoGeralSkeleton from './components/VisaoGeralSkeleton';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<VisaoGeralSkeleton />}>
              <VisaoGeralDashboard />
            </Suspense>
          }
        ></Route>
        <Route
          path="/educacao"
          element={
            <Suspense fallback={<DashboardSkeleton />}>
              <EducacaoDashboard />
            </Suspense>
          }
        >
          <Route
            path="nova-atividade/educacao/:id"
            element={<FormAtividadeEducacao />}
          />
          <Route
            path="nova-atividade/educacao/"
            element={<FormAtividadeEducacao />}
          />
        </Route>
        <Route
          path="/casa"
          element={
            <Suspense fallback={<DashboardSkeleton />}>
              <CasaDashboard />
            </Suspense>
          }
        >
          <Route path="nova-atividade/casa" element={<FormAtividadeCasa />} />
          <Route
            path="nova-atividade/casa/:id"
            element={<FormAtividadeCasa />}
          />
        </Route>
        <Route
          path="/lazer"
          element={
            <Suspense fallback={<DashboardSkeleton />}>
              <LazerDashboard />
            </Suspense>
          }
        >
          <Route
            path="nova-atividade/lazer/"
            element={<FormAtividadeLazer />}
          />
          <Route
            path="nova-atividade/lazer/:id"
            element={<FormAtividadeLazer />}
          />
        </Route>
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
