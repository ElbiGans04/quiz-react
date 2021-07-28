import styled from "styled-components";
import ReactSelect from "react-select";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {sendQuestions} from './features/questions/questionsSlice'
import {Redirect} from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'
import { Form as FormComponent, FormContent, FormContentRows, FormContentRowsMain ,FormFooter, Button, ErrorAlert } from './style-component'


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


function Form (props) {
    const {register, control ,handleSubmit, formState : { errors }, getValues } = useForm();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.questions.loading);
    const results = useSelector(state => state.questions.questions);
    const onSubmit = (data) => {
      const url = `https://opentdb.com/api.php?amount=${data.total}&category=${data.category.value}&difficulty=${data.dificult[0].toLowerCase()}&type=${data.mode[0]}`;

      // Kirim 
      dispatch(sendQuestions({url, userID: uuid4()}))
    };
    const atLeastOne = () => {
      let value = getValues("dificult");
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

    return (
        <>
        {results.length > 0 ? (<Redirect to="/questions"></Redirect>) : (
          <FormComponent onSubmit={handleSubmit(onSubmit)}>
              {
                loading === 'loading' ? (<div className="loader"></div>) : (
                <>
                <FormContent2>
                  <FormContentRows>
                    <FormContentRowsMain>
                      <Label htmlFor="mainTotalQuestions">Number of questions :</Label>
                      <Input {...register("total", {min: {value: 10, message: 'Min Value 10'}, max: {value: 50, message: 'Max Value 50'}})} name="total" title="max value are 50 and min value are 10" id="mainTotalQuestions" step="10" type="range" min="10" max="50"></Input>
                    </FormContentRowsMain>
                        {
                          errors.total && 
                            (<ErrorAlert>
                              <p>{errors.total.message}</p>
                            </ErrorAlert>)
                        }
                  </FormContentRows>
                  <FormContentRows>
                    <FormContentRowsMain>
                      <Label htmlFor="mainCategory">Category :</Label>
                      <Controller
                        defaultValue={category[0]}
                        rules={
                          {validate: (value) => {
                            if(value.value < 9 || value.value > 32) return 'invalid category'
                            return true
                          }}
                        }
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
                        {
                          errors.category && 
                            (<ErrorAlert>
                              <p>{errors.category.message}</p>
                            </ErrorAlert>)
                        }
                  </FormContentRows>
                  <FormContentRows>
                    <FormContentRowsMain>
                      <Label htmlFor="mainDificult">Dificult :</Label>
                      <Checkboxs>
                          {
                            ['Easy', 'Medium', 'Hard'].map((value) => {
                              return (
                                <Checkbox  key={value} >
                                  <Input {...register('dificult', { validate: atLeastOne})} key={value} value={value} type="checkbox"/> 
                                  <Label htmlFor={`mainDificult${value}`}>{value}</Label>
                                </Checkbox>
                              )
                            })
                          }
                      </Checkboxs>
                    </FormContentRowsMain>
                        {
                          errors.dificult && 
                            (<ErrorAlert>
                              <p>{errors.dificult.message}</p>
                            </ErrorAlert>)
                        }
                  </FormContentRows>
                  <FormContentRows>
                    <FormContentRowsMain>
                      <Label htmlFor="mainMode">Mode :</Label>
                      <Checkboxs>
                            {
                              ['boolean', 'Multiple'].map((value) => {
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
                        {
                          errors.mode && 
                            (<ErrorAlert>
                              <p>{errors.mode.message}</p>
                            </ErrorAlert>)
                        }
                  </FormContentRows>
              </FormContent2>
              <FormFooter>
                <Button type="submit" title="start the quiz">Start !!!</Button>
              </FormFooter>
              </>
                )
              }
        </FormComponent>
        )}
      </>
    )
}


export default Form;


// Styled Component
const FormContent2 = styled(FormContent)`
  grid-template-columns: 1fr 1fr;
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



// Akhir Styled Component