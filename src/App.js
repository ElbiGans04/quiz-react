import React from 'react';
import styled from "styled-components";
import {BrowserRouter as Routers, Redirect, Route, Switch} from 'react-router-dom';
import Form from './Form.js';
// import Questions from './Questions.js';
// import Finish from './Finish.js';
// import Score from './Score.js';

const Questions = React.lazy(() => import(`./Questions.js`));
const Finish = React.lazy(() => import(`./Finish.js`));
const Score = React.lazy(() => import(`./Score.js`));

function App() {  
  return (
    <Routers>
      <AppContainer>
        <Heading>
          <a href="/" style={{color: 'var(--header)'}}>Quiz Game</a>
        </Heading>
        <MainContainer>
          <Switch>
            <Route exact path="/" component={Form}></Route>
            <Route path="/questions" component={() => (<React.Suspense fallback={<div className="loader"></div>}><Questions></Questions></React.Suspense>)}></Route>
            <Route path="/finish"  component={() => (<React.Suspense fallback={<div className="loader"></div>}><Finish></Finish></React.Suspense>)}></Route>
            <Route path="/score"  component={() => (<React.Suspense fallback={<div className="loader"></div>}><Score></Score></React.Suspense>)}></Route>
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
    grid-template-rows: 1fr 3fr;
    justify-items: center;
    user-select: none;
    overflow: auto;

    @media (max-width: 768px) {
      & {
        height: 100%;
      }
    }
  `;
  
const MainContainer = styled.main`
  display: grid;
  background-color: var(--bg-primary);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  box-sizing: border-box;
  box-shadow: var(--boxShadow);
  padding: 1rem;
  &::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
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
