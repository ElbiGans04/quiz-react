import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ErrorAlert, Container, Heading} from "./style-component";
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

  // satuan soal
  const question = questions[number];

  // Random Jawaban
  const answer = randomAnswer(question?.correct_answer, question?.incorrect_answers);


  const atLeastOne = () => {
    let value = getValues("question");
    console.log(value)
    if (value.length > 1) return "can only choose one option";
    if (value.length === 1) return true;
    return "Please Choose at least one question";
  };

  const submitHandle = (value) => {
      // Check Jika ini soal terakhir      
      if ((questions.length - 1) === number) dispatchReducer({type: 'final', payload: {value: value.question[0]}})
      else {
        setValue("question", []);
        dispatchReducer({type: 'next', payload: {value: value.question[0]}})
    }
  };

  useEffect(() => {
    if (finish) dispatch(answersAdd(answers));
  }, [finish, answers, dispatch])

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
                  <Heading>{question.question}</Heading>
                </MainQuestion>
                <MainAnswer onSubmit={handleSubmit(submitHandle)}>
                  {
                    answer.map((value, index) => {
                      return (
                        <MainAnswerRows key={index}>
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            value={value}
                            {...register('question', {validate: atLeastOne})}
                          ></input>
                          <label>{value}</label>
                        </MainAnswerRows>
                      )
                    })
                  }
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

const random = (min = 0, max = 50) => {
  let num = Math.random() * (max - min) + min;

  return Math.round(num);
};

function randomAnswer(correct, incorrect) {
  if(correct && incorrect) {
    let result = [...incorrect];
    
    
    // Dimana seharusnya correct value berada
    const correctIndex = random(0, incorrect.length);
    
    // Check Jika memang nilainya undefined
    if(result[correctIndex] === undefined) result[correctIndex] = correct
    else {
      result.push(result[correctIndex]);
      result[correctIndex] = correct;
    }
    
    return result
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
