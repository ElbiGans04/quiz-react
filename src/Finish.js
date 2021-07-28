import { useEffect, useState } from "react";
function Finish () {
    const results = useState({});

    // Kirim Jawaban Ke server
    useEffect(() => {
        async function sendQuestions() {
            try {
                
            } catch (err) {
                alert('error')
                console.log(err)
            }
        };

        sendQuestions()
    }, []);
    
    return (
        <>
         {
            results ? <div></div> : (<div className="loader"></div>)
         }
        </>
    )
};

export default Finish;