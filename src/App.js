import { useEffect } from "react";
import styled from "styled-components";
import ReactSelect from "react-select";
import { useForm, Controller } from 'react-hook-form';
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
  const {register, control ,handleSubmit, formState : { errors }, getValues } = useForm();
  const atLeastOne = () => {
    let value = getValues("checkbox");
    if(value.length > 1) return "can only choose one option"
    if(value.length === 1)  return true
    return "Please Choose at least one dificult"
  };
  const atLeastOneMode = () => {
    let value = getValues("mode");
    if(value.length > 1) return "can only choose one option"
    if(value.length === 1)  return true
    return "Please Choose at least one Mode"
  };
  
  console.log(errors)
  return (
    <AppContainer>
      <Heading>Quiz Game</Heading>
      <MainContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormContent>
              <FormContentRows>
                <FormContentRowsMain>
                  <Label htmlFor="mainTotalQuestions">Number of questions :</Label>
                  <Input {...register("total", {min: {value: 10, message: 'Min Value 10'}, max: {value: 50, message: 'Max Value 50'}})} name="total" title="max value are 50 and min value are 10" id="mainTotalQuestions" step="10" type="range" min="10" max="50"></Input>
                </FormContentRowsMain>
                <FormContentRowsError>
                    {
                      errors.total && <p style={{color: 'white'}}>Error Bro</p>
                    }
                </FormContentRowsError>
              </FormContentRows>
              <FormContentRows>
                <FormContentRowsMain>
                  <Label htmlFor="mainCategory">Category :</Label>
                  <Controller
                    defaultValue={category[0]}
                    name="category"
                    control={control}
                    render={({ field }) => <ReactSelect {...field} 
                        styles={{container: (style, state) => ({...style, width: `100%`}) }}
                        placeholder="Choose Category" 
                        id="mainCategory" 
                        options={category}
                    />}
                  />
                </FormContentRowsMain>
                <FormContentRowsError>
                    {
                      errors.category && <p style={{color: 'white'}}>{errors.category.message}</p>
                    }
                </FormContentRowsError>
              </FormContentRows>
              <FormContentRows>
                <FormContentRowsMain>
                  <Label htmlFor="mainDificult">Dificult :</Label>
                  <Checkboxs>
                      {
                        ['Easy', 'Medium', 'Hard'].map((value) => {
                          return (
                            <Checkbox  key={value} >
                              <Input {...register('checkbox', { validate: atLeastOne})} key={value} value={value} type="checkbox"/> 
                              <Label htmlFor={`mainCheckbox${value}`}>{value}</Label>
                            </Checkbox>
                          )
                        })
                      }
                  </Checkboxs>
                </FormContentRowsMain>
                <FormContentRowsError>
                    {
                      errors.checkbox && <p style={{color: 'white'}}>{errors.checkbox.message}</p>
                    }
                </FormContentRowsError>
              </FormContentRows>
              <FormContentRows>
                <FormContentRowsMain>
                  <Label htmlFor="mainMode">Mode :</Label>
                  <Checkboxs>
                        {
                          ['TrueOrFalse', 'Multiple'].map((value) => {
                            return (
                              <Checkbox  key={value} >
                                <Input {...register('mode', { validate: atLeastOneMode})} key={value} value={value} type="checkbox"/> 
                                <Label htmlFor={`mainMode${value}`}>{value}</Label>
                              </Checkbox>
                            )
                          })
                        }
                  </Checkboxs>
                </FormContentRowsMain>
                <FormContentRowsError>
                  { 
                      errors.mode && <p style={{color: 'white'}}>{errors.mode.message}</p>
                    }
                </FormContentRowsError>
              </FormContentRows>
            </FormContent>
            <FormFooter>
              <Button type="submit" title="start the quiz">Start !!!</Button>
            </FormFooter>
          </Form>
      </MainContainer>
    </AppContainer>
  );
}

const onSubmit = (data) => {
 console.group(data)
};

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
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  padding: 1rem;
  user-select: none
  `;
  
const MainContainer = styled.main`
  display: grid;
  background-color: var(--bg-primary);
  width: 100%;
  `;
  
  
const FormContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
  `;
  
  const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

const FormContentRows = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  width: 100%;
`;

const FormContentRowsMain = styled.div`
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

const FormContentRowsError = styled.div`
  display: flex;
  justify-content: center;
  align-center: center;
  width: 100%;
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
