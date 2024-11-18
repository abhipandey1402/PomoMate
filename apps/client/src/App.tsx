import styled from "styled-components";
import "./App.css";
import Pomodoro from "./features/homepage/pages/Pomodoro";

function App() {
  return (
    <Container>
      <Pomodoro />
    </Container>
  );
}

export default App;

const Container = styled.div`
width: 100%;
margin: 0 !important;

`