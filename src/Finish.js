import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'
import { Container } from './style-component'
function Finish () {
    const [result, setResult] = useState({});
    const questions = useSelector(state => state.questions.questions)
    const answers = useSelector(state => state.questions.answers)
    const userID = useSelector(state => state.questions.userID)

    // Kirim Jawaban Ke server
    useEffect(() => {
        async function sendAnswers() {
            try {
                
                if(answers.length > 0) {
                    const urlData = new URLSearchParams();
                    urlData.append('userID', userID);
                    urlData.append('answers', JSON.stringify(answers));
                    const send = await(await fetch('http://localhost:8000/questions', {
                        body: urlData.toString(),
                        method: 'delete', 
                        headers: {
                        'Content-type' : 'application/vnd.api+json'
                        }
                    })).json();
                    
                    setResult(send);
                }
            } catch (err) {
                alert('error')
                console.log(err)
            }
        };

        sendAnswers()
    }, [ answers, userID, questions]);
    
    return (
        <Container>
         {
            result ? 
            (
            <div>
                <h1>Score : {result?.meta?.score}</h1>
            </div>
            ) : (<div className="loader"></div>)
         }
        </Container>
        )
};

export default Finish;