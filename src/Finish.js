import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Finish () {
    const results = useState({});
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
                    })).text();
                    console.log(send)
                }
            } catch (err) {
                alert('error')
                console.log(err)
            }
        };

        sendAnswers()
    }, [ answers, userID, questions]);
    
    return (
        <>
         
        </>
        )
};
// {/* {
//    results ? <div></div> : (<div className="loader"></div>)
// } */}

export default Finish;