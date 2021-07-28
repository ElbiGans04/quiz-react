import styled from "styled-components";
import {BrowserRouter as Routers, Route, Switch} from 'react-router-dom';
import Form from './Form.js';
import Questions from './Questions.js';
import Finish from './Finish.js';

function App() {  
  return (
    <Routers>
      <AppContainer>
        <Heading>Quiz Game</Heading>
        <MainContainer>
          <Switch>
            <Route exact path="/" component={Form}></Route>
            <Route path="/questions" component={Questions}></Route>
            <Route path="/finish" component={Finish}></Route>
          </Switch>
        </MainContainer>
      </AppContainer>
    </Routers>

  );
};

export default App;

//  Styled Components

const AppContainer = styled.div`
  width: 80%;
  height: 90vh;
  align-items: center;
  box-sizing: border-box;
  box-shadow: var(--boxShadow);
  background-color: var(--bg-secondary);
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  padding: 1rem;
  user-select: none;
  overflow: auto
  `;
  
const MainContainer = styled.main`
  display: grid;
  background-color: var(--bg-primary);
  width: 100%;
  `;

const Heading = styled.h1`
  color: var(--header);
  font-size: 3rem;
  font-weight: 900;
`;



//  End Of Styled Components
