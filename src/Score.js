import {useEffect, useState} from 'react';
import styled from 'styled-components'
import {Container} from './style-component';

function Score () {
    const [results, setResults] = useState(false);
    useEffect(() => {
        async function fetchData () {
            let data  = await (await fetch('http://localhost:8000/user/quiz')).json();
            setResults(data);
        }

        if (!results) fetchData()
    }, [results]);

    return (
        <Container>
            <ContainerMain>
                <ContainerMainHeader>
                    <Header>Name</Header>
                    <Header>Date</Header>
                    <Header>Score</Header>
                    <Header>Difficult</Header>
                </ContainerMainHeader>
                <ContainerMainMain>
                    <ContainerMainMainRow>
                        <ContainerMainMainRowContent>
                            
                        </ContainerMainMainRowContent>
                        <ContainerMainMainRowDetail>
                            <MainText></MainText>
                        </ContainerMainMainRowDetail>

                    </ContainerMainMainRow>
                </ContainerMainMain>
            </ContainerMain>
        </Container>
    )
}

export default Score


const ContainerMain = styled.div`
width: 100%;
`;

const ContainerMainHeader = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
`;

const ContainerMainMain = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const ContainerMainMainRow = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const ContainerMainMainRowContent = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const ContainerMainMainRowDetail = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const Header = styled.h1`

`;

const MainText = styled.h1`

`;