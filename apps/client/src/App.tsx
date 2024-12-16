import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import HomePage from "./features/homepage/pages/HomePage";
import PomodoroPage from "./features/pomodoro/pages/PomodoroPage";
import AuthPage from "./features/user/pages/AuthPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./features/globalFeatures/components/ProtectedRoutes";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Container className="bg-gray-100 overflow-x-hidden">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/pomodoro" element={<PomodoroPage />} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
width: 100vw;
min-height: 100vh;
margin: 0 !important;


`