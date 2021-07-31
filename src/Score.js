import {useEffect, useState} from 'react';

function Score () {
    const [results, setResults] = useState(false);
    useEffect(() => {
        async function fetchData () {
            let data  = await (await fetch('http://localhost:8000/user/quiz')).json();
            setResults(data);
        }

        if (!results) fetchData()
    }, [results]);

    return (<h1>Hello</h1>)
}



export default Score