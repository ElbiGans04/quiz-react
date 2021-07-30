import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Container, Button } from './style-component'
import styled from 'styled-components'
function Finish () {
    const [result, setResult] = useState({});
    const [again, setAgain] = useState(false);
    const questions = useSelector(state => state.questions)

    // Kirim Jawaban Ke server
    useEffect(() => {
        async function sendAnswers() {
            try {
                
                if(questions.answers.length > 0) {
                    const urlData = new URLSearchParams();
                    urlData.append('userId', questions.userID);
                    urlData.append('answers', JSON.stringify(questions.answers));
                    const send = await(await fetch('http://localhost:8000/user/quiz', {
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
    }, [ questions, again ]);
    
    return (
        <Container2>
         {
            result ? 
            (
                <>
            <ContainerMain>
                <Heading>Congratulations 🎉!</Heading>
                <ContainerMainContent>
                    <span>Name :</span>
                    <span>{" "}{questions.name}</span>
                    <span>Score :</span>
                    <span>{" "}{result?.meta?.score}</span>
                </ContainerMainContent>
            </ContainerMain>
            <ContainerFooter>
                <Button onClick={() => setAgain(state => !state)}>See the highest score</Button>
                <Button onClick={() => setAgain(state => !state)}>Play Again</Button>
            </ContainerFooter>
            </>
            ) : (<div className="loader"></div>)
         }
        </Container2>
        )
};

const Container2 = styled(Container)`
    grid-template-rows: 1fr;
`;

const Heading = styled.h1`
   @media (max-width: 576px) {
       & {
           font-size: 1.5rem;
       }
   }
 
`;
const ContainerMain = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
 
`;

const ContainerMainContent = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
`;

const ContainerFooter = styled.div`
    display: grid;
    align-items: center;
    gap: .8rem;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`;

export default Finish;