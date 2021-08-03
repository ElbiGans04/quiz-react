import styled from "styled-components";

export const Container = styled.div`
    width: 100%;;
    height: 100%;
    display: grid;
    justify-items: center;
    align-center;
    padding: 3rem;
    box-sizing: border-box;
    grid-template-rows: 1fr 2fr;
    color: var(--textNormal);
    gap: 1.5rem 0;
`;

export const Heading = styled.h1`
   @media (max-width: 576px) {
       & {
           font-size: 1.5rem;
       }
   }
 
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export const FormContent = styled.div`
  display: grid;
  width: 100%;
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export const FormContentRows = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

export const FormContentRowsMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  label {
    margin: .5rem
  };

  @media (max-width: 576px) {
    & {
      justify-items: flex-start;
    }
  }
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
`;

export const Button = styled.button`
  padding: 1rem;
  border: 0;
  // border-radius: .5rem;
  // background-color: var(--textLink);
  background-color: rgb(213, 68, 116);
  border-radius: 24px;
  color: white;
  font-weight: 700;
  box-shadow: var(--boxShadow);
  cursor: pointer;
`;

export const ErrorAlert = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: .25rem .75rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
`;