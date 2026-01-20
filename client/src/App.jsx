import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import CasaDashboard from './components/CasaPanels/CasaDashboard';
import EducacaoDashboard from './components/EducacaoPanels/EducacaoDashboard';
import FormAtividadeCasa from './components/FormAtividadeCasa';
import FormAtividadeEducacao from './components/FormAtividadeEducacao';
import FormAtividadeLazer from './components/FormAtividadeLazer';
import LazerDashboard from './components/LazerPanels/LazerDashboard';
import Navbar from './components/Navbar';
import VisaoGeralDashboard from './components/VisaoGeralPanels/VisaoGeralDashboard';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<VisaoGeralDashboard />}></Route>
        <Route path="/educacao" element={<EducacaoDashboard />}>
          <Route
            path="nova-atividade/educacao/:id"
            element={<FormAtividadeEducacao />}
          />
          <Route
            path="nova-atividade/educacao/"
            element={<FormAtividadeEducacao />}
          />
        </Route>
        <Route path="/casa" element={<CasaDashboard />}>
          <Route path="nova-atividade/casa" element={<FormAtividadeCasa />} />
          <Route
            path="nova-atividade/casa/:id"
            element={<FormAtividadeCasa />}
          />
        </Route>
        <Route path="/lazer" element={<LazerDashboard />}>
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
