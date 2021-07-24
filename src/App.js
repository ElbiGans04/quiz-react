import { useEffect } from "react";
import styled from "styled-components";
import ReactSelect from "react-select";
import "./App.css";

const category = [
    {
      value: 9,
      label: "General Knowledge",
    },
    {
      value: 10,
      label: "Entertainment: Books",
    },
    {
      value: 11,
      label: "Entertainment: Film",
    },
    {
      value: 12,
      label: "Entertainment: Music",
    },
    {
      value: 13,
      label: "Entertainment: Musicals & Theatres",
    },
    {
      value: 14,
      label: "Entertainment: Television",
    },
    {
      value: 15,
      label: "Entertainment: Vvalueeo Games",
    },
    {
      value: 16,
      label: "Entertainment: Board Games",
    },
    {
      value: 17,
      label: "Science & Nature",
    },
    {
      value: 18,
      label: "Science: Computers",
    },
    {
      value: 19,
      label: "Science: Mathematics",
    },
    {
      value: 20,
      label: "Mythology",
    },
    {
      value: 21,
      label: "Sports",
    },
    {
      value: 22,
      label: "Geography",
    },
    {
      value: 23,
      label: "History",
    },
    {
      value: 24,
      label: "Politics",
    },
    {
      value: 25,
      label: "Art",
    },
    {
      value: 26,
      label: "Celebrities",
    },
    {
      value: 27,
      label: "Animals",
    },
    {
      value: 28,
      label: "Vehicles",
    },
    {
      value: 29,
      label: "Entertainment: Comics",
    },
    {
      value: 30,
      label: "Science: Gadgets",
    },
    {
      value: 31,
      label: "Entertainment: Japanese Anime & Manga",
    },
    {
      value: 32,
      label: "Entertainment: Cartoon & Animations",
    },
];

// useEffect(() => {
//   fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple')
//     .then(result => result.json())
//     .then(result => console.log(result))
// }, [])
function App() {
  return (
    <AppContainer>
      <Heading>Quiz Game</Heading>
      <MainContainer>
        <MainContainerMain>
          <Label htmlFor="mainTotalQuestions">Number of questions :</Label>
          <Input name="tota;" title="max value are 50 and min value are 10" id="mainTotalQuestions" step="10" type="range" min="10" max="50"></Input>
        </MainContainerMain>
        <MainContainerMain>
          <Label htmlFor="mainCategory">Category :</Label>
          <ReactSelect name="category" styles={{container: (style, state) => ({...style, width: `100%`}) }} placeholder="Choose Category" id="mainCategory" options={category}></ReactSelect>
        </MainContainerMain>
        <MainContainerMain>
          <Label htmlFor="mainDificult">Dificult :</Label>
          <Checkboxs>
            <Checkbox>
              <Input name="dificult"  id="mainCheckboxEasy" type="checkbox"/> 
              <Label htmlFor="mainCheckboxEasy">Easy</Label>
            </Checkbox>
            <Checkbox>
              <Input name="dificult" id="mainCheckboxMedium" type="checkbox"/> 
              <Label htmlFor="mainCheckboxMedium">Medium</Label>
            </Checkbox>
            <Checkbox>
              <Input name="dificult" id="mainCheckboxHard" type="checkbox"/> 
              <Label id="mainCheckboxHard">Hard</Label>
            </Checkbox>
          </Checkboxs>
        </MainContainerMain>
        <MainContainerMain>
          <Label htmlFor="mainMode">Mode :</Label>
          <Checkboxs>
            <Checkbox>
              <Input id="mainCheckboxTrueOrFalse" type="checkbox"/> 
              <Label htmlFor="mainCheckboxTrueOrFalse">True Or False</Label>
            </Checkbox>
            <Checkbox>
              <Input id="mainCheckboxMultiple" type="checkbox"/> 
              <Label htmlFor="mainCheckboxMultiple">Multiple</Label>
            </Checkbox>
          </Checkboxs>
        </MainContainerMain>
      </MainContainer>
      <FooterContainer>
          <Button title="start the quiz">Start !!!</Button>
      </FooterContainer>
    </AppContainer>
  );
}

export default App;

//  Styled Components

const AppContainer = styled.div`
  width: 80%;
  height: 80%;
  align-items: center;
  box-sizing: border-box;
  box-shadow: var(--boxShadow);
  background-color: var(--bg-secondary);
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  justify-items: center;
  padding: 1rem;
`;

const MainContainer = styled.main`
  background-color: var(--bg-primary);
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  justify-items: center;
`;

const MainContainerMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  label {
    margin: .5rem
  }
`;

const Heading = styled.h1`
  color: var(--header);
  font-size: 3rem;
  font-weight: 900;
`;

const Label = styled.label`
  color: var(--textTitle);
`;

const Input = styled.input`
  border-radius: 1rem;
`;

const Checkboxs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  width: 100%;
  gap: .8rem;
  justify-items: center;
  align-items: center
`;

const Checkbox = styled.div`
  width: 100%;
  padding: .3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const FooterContainer = styled.div`
  display: flex;
`

const Button = styled.button`
  padding: 1rem;
  border: 0;
  // border-radius: .5rem;
  // background-color: var(--textLink);
  background-color: rgb(213, 68, 116);
  border-radius: 24px;
  color: white;
  font-weight: 700;
  box-shadow: var(--boxShadow);
  cursor: pointer;
`;

//  End Of Styled Components
