import styled from "styled-components";
import {BrowserRouter as Routers, Redirect, Route, Switch} from 'react-router-dom';
import Form from './Form.js';
import Questions from './Questions.js';
import Finish from './Finish.js';
import Score from './Score.js';

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
            <Route path="/score" component={Score}></Route>
            <Route path="*" component={() => (<Redirect to="/"></Redirect>)}></Route>
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
  user-select: none;
  overflow: hidden;
  `;
  
const MainContainer = styled.main`
  display: grid;
  background-color: var(--bg-primary);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  box-shadow: var(--boxShadow);
  padding: 1rem;
  &::-webkit-scrollbar {
    width: .5rem;
  }
  
  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--bg-primary)
  }
  
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background:  rgb(213, 68, 116)
  }
  
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background:  rgb(180, 35, 82)
  }
  `;

const Heading = styled.h1`
  color: var(--header);
  font-size: 3rem;
  font-weight: 900;
`;



//  End Of Styled Components
