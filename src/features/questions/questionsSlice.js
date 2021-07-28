import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

//  Thunk Funtions
export const sendQuestions = createAsyncThunk('questions/sendQuestions', async ({url, userID}) => {
    try {
        const data = await (await fetch(url)).json();

        // Buat url
        const urlData = new URLSearchParams();
        urlData.append('id', userID);
        urlData.append('questions', JSON.stringify(data.results));

        // Send to server
        if(data.results.length > 0) await fetch(`http://localhost:8000/questions`, {
          body: urlData.toString(), 
          method: 'post', 
          headers: {
            'Content-type' : 'application/vnd.api+json'
          }
        });


        return ({results: data.results, userID})

      } catch (err) {
        console.log(err)
      }
});

const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions : [],
        answers: [],
        userID: '',
        loading : 'iddle'
    },
    reducers: {
        questionsAdd (state, action) {
            return {value: [...action.payload.value]}
        },

        answersAdd(state, action) {
            state.answers = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(sendQuestions.pending, (state, action) => {
                state.loading = 'loading';
            }).addCase(sendQuestions.fulfilled, (state, action) => {
                state.questions = [...action.payload.results];
                state.userID = `${action.payload.userID}`;
                state.loading = 'iddle';
            }).addCase(sendQuestions.rejected, (state, action) => {
                state.loading = 'iddle';
            })


    },
});

export const { questionsAdd, answersAdd } = questionsSlice.actions;


export default questionsSlice.reducer;