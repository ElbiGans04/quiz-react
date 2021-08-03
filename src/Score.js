import {useEffect, useState} from 'react';
import styled from 'styled-components'
// import {Container} from './style-component';

function Score () {
    const [results, setResults] = useState(false);
    useEffect(() => {
        async function fetchData () {
            let data  = await (await fetch('http://localhost:8000/user/quiz')).json();
            setResults(data);
        }

        if (!results) fetchData()
    }, [results]);


    useEffect(() => {
        document.title = 'Score'
    }, [])

    return (
        <Container>
            <ContainerMain>
                <ContainerMainHeader>
                    <Header>Name</Header>
                    <Header>Date</Header>
                    <Header>Score</Header>
                    <Header>Difficult</Header>
                    <Header>Length</Header>
                </ContainerMainHeader>
                <ContainerMainMain>
                    {
                        results && results.map((result, index) => {
                            return (
                                <ContainerMainMainRow key={index}>
                                    <ContainerMainMainRowContent>
                                        <MainText>{result.name}</MainText>
                                        <MainText>{`${new Date(result.createdAt).getDate()}-${new Date(result.createdAt).getMonth()}-${new Date(result.createdAt).getFullYear()}`}</MainText>
                                        <MainText>{result.score || '0'}</MainText>
                                        <MainText>{result.questions[0].difficulty}</MainText>
                                        <MainText>{result.questions.length}</MainText>
                                    </ContainerMainMainRowContent>
                                    <ContainerMainMainRowDetail></ContainerMainMainRowDetail>
                                </ContainerMainMainRow>
                            )
                        })
                    }
                </ContainerMainMain>
            </ContainerMain>
        </Container>
    )
}

export default Score

export const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    color: var(--textNormal);
    
    @media (min-width: 768px) {
        & {
            overflow: hidden;
        }
    }
    @media (max-width: 768px) {
        & {
            // width: 200%;
            // overflow: auto;
        }
    }
`;


const ContainerMain = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 0 ;
    display: grid;
    @media (max-width: 768px) {
        & {
            // overflow: auto;
            width: 300%;
        }
    }
`;

const ContainerMainHeader = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
`;
    
const ContainerMainMain = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    overflow: auto;
    
    &::-webkit-scrollbar {
        width: .5rem;
      }
      
      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--bg-primary)
      }
      
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background:  rgb(213, 68, 116)
      }
      
      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background:  rgb(180, 35, 82)
      }
`;

const ContainerMainMainRow = styled.div`
    width: 100%;
    heightL 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
`;

const ContainerMainMainRowContent = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
`;

const ContainerMainMainRowDetail = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const Header = styled.h1`    
    @media (max-width: 768px) {
        & {
            font-size: 1.5rem;
        }
    }
`;

const MainText = styled.h1`
    font-size: 1.3rem;
    @media (max-width: 768px) {
        & {
            font-size: 1rem;
        }
    }
`;