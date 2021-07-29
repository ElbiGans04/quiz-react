import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ErrorAlert, Container } from "./style-component";
import { answersAdd } from "./features/questions/questionsSlice";

function Questions(props) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const { register, formState: { errors }, getValues, handleSubmit, setValue} = useForm();
  const [{number, finish, answers}, dispatchReducer] = useReducer(reducer, {
      number: 0,
      finish: false,
      answers: [],
  });

  const question = questions[number];
  const [checked, setChecked] = useState(() => {
      return question?.type === "boolean"
      ? new Array(2).fill(false)
      : new Array(4).fill(false);
  });


  const atLeastOne = () => {
    let value = getValues("question");
    if (value.length > 1) return "can only choose one option";
    if (value.length === 1) return true;
    return "Please Choose at least one question";
  };

  const submitHandle = (value) => {
      // Check Jika ini soal terakhir      
      if ((questions.length - 1) === number) dispatchReducer({type: 'final', payload: {value: value.question[0]}})
      else {
        setValue("question", []);
        setChecked(
          question?.type === "boolean"
            ? new Array(2).fill(false)
            : new Array(4).fill(false)
        );
        dispatchReducer({type: 'next', payload: {value: value.question[0]}})
    }
  };

  useEffect(() => {
    if (finish) dispatch(answersAdd(answers));
  }, [finish, answers, dispatch])

  const checkboxHandle = (target) => {
    const newChecked = checked.map((value, index) =>
      index === target ? !value : value
    );
    setChecked(newChecked);
  };

  return (
    <>
      {questions?.length <= 0 ? (
        <Redirect to="/"></Redirect>
      ) : (
        <>
          {(questions.length === number && finish) ? (
            <Redirect to="/finish"></Redirect>
          ) : (
            <Container>
              <Header>
                <div>Category : </div>
                <div>{question.category}</div>
                <div>Difficult : </div>
                <div>{question.difficulty}</div>
                <div>Type : </div>
                <div>{question.type}</div>
              </Header>
              <Main>
                <MainQuestion>
                  <h1>{question.question}</h1>
                </MainQuestion>
                <MainAnswer onSubmit={handleSubmit(submitHandle)}>
                  {question.type === "boolean" ? (
                    <>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(0)}
                          checked={checked[0]}
                          value="true"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>true</label>
                      </MainAnswerRows>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(1)}
                          checked={checked[1]}
                          value="false"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>false</label>
                      </MainAnswerRows>
                    </>
                  ) : (
                    <>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(0)}
                          checked={checked[0]}
                          value="a"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>A</label>
                      </MainAnswerRows>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(1)}
                          checked={checked[1]}
                          value="b"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>B</label>
                      </MainAnswerRows>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(2)}
                          checked={checked[2]}
                          value="c"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>C</label>
                      </MainAnswerRows>
                      <MainAnswerRows>
                        <input
                          type="checkbox"
                          onClick={() => checkboxHandle(3)}
                          checked={checked[3]}
                          value="d"
                          {...register("question", { validate: atLeastOne })}
                        ></input>
                        <label>D</label>
                      </MainAnswerRows>
                    </>
                  )}
                  {errors.question && (
                    <ErrorAlert>{errors.question.message}</ErrorAlert>
                  )}
                  <Button type="submit">Send</Button>
                </MainAnswer>
              </Main>
            </Container>
          )}
        </>
      )}
    </>
  );
};

function reducer (state, action) {
    switch (action.type) {
        case 'next':
          return { finish: false ,number: state.number + 1, answers: [...state.answers, action.payload.value]};
        case 'final':
            return {finish: true,number: state.number + 1 ,answers: [...state.answers, action.payload.value]}
        default:
          return state
    }
}

//  Styled Component
const Header = styled.div`
  display: grid;
  justify-self: flex-start;
  grid-template-columns: 1fr 1fr;
  justify-content: flex-start;
`;
const Main = styled.div`
  display: grid;
  width: 100%;
`;

const MainQuestion = styled.div`
  width: 100%;
  display: grid;
  justify-content: flex-start;
`;

const MainAnswer = styled.form`
  width: 100%;
`;

const MainAnswerRows = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0.8rem 0;
  & input {
    margin-right: 0.8rem;
  }
`;

export default Questions;
