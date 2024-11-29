import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import HomePage from "./features/homepage/pages/HomePage";
import PomodoroTimer from "./features/pomodoro/pages/PomodoroPage";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
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