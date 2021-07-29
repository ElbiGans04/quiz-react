import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ErrorAlert } from "./style-component";
import { answersAdd } from "./features/questions/questionsSlice";

function Questions(props) {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
//   const [state, dispatch] = useReducer(reducer, {
//       number:
//   })
  const [number, setNumber] = useState(0);
  const question = questions[number];
  const [finish, setFinish] = useState(false);
  const [answers, setAnswers] = useState([]);
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
    //  Saat Masih Ada soal
    setAnswers((state) => {
      let newAnswers = [...state];
      newAnswers[number] = value.question[0];

      if (questions.length - 1 == number) { 
          setFinish(true)
      }
      return newAnswers;
    });

    setValue("question", []);
    setChecked(
      question?.type === "boolean"
        ? new Array(2).fill(false)
        : new Array(4).fill(false)
    );

    if (questions.length - 1 == number) {
    //   setFinish(true);
    //   dispatch(answersAdd(answers));
    } else {
      setNumber((state) => state + 1);
    }
  };

  useEffect(() => {
    dispatch(answersAdd(answers));
  }, [finish])

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
          {finish ? (
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
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          return state
    }
}

//  Styled Component
const Container = styled.div`
    display: grid;
    justify-items: center;
    align-center;
    box-shadow: var(--boxShadow);
    padding: 3rem;
    width: 100%;;
    box-sizing: border-box;
    grid-template-rows: 1fr 2fr;
    color: var(--textNormal);
    gap: 1.5rem 0;
    height: 100%;
`;

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
