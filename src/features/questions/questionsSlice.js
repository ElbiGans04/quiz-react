import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

//  Thunk Funtions
export const sendQuestions = createAsyncThunk('questions/sendQuestions', async ({url, userID, name}) => {
    try {
        const data = await (await fetch(url)).json();

        // Buat url
        const urlData = new URLSearchParams();
        urlData.append('id', userID);
        urlData.append('name', name);
        urlData.append('questions', JSON.stringify(data.results));

        // Send to server
        if(data.results.length === 0) alert("soal tidak ditemukan, coba lagi")
        else {
          await fetch(`http://localhost:8000/user/quiz`, {
            body: urlData.toString(), 
            method: 'post', 
            headers: {
                'Content-type' : 'application/vnd.api+json'
            }
          });

        }

        return ({results: data.results, userID, name})

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
        loading : 'iddle',
        name: '',
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
                console.log(action)
                state.questions = [...action.payload.results];
                state.userID = `${action.payload.userID}`;
                state.loading = 'iddle';
                state.name = action.payload.name;
            }).addCase(sendQuestions.rejected, (state, action) => {
                state.loading = 'iddle';
            })


    },
});

export const { questionsAdd, answersAdd } = questionsSlice.actions;


export default questionsSlice.reducer;