import styled from "styled-components"

export const Container = styled.form`

  h1 { 
    color: var(--text-title);
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    font-weight: 400;
  }

  #bt-edit {
    background: #6060cb;
  }

  select {
    width: 100%;
    background: #e7e9ee;
    margin-bottom: 1rem;
    height: 2rem;
    border: 1px solid #d7d7d7;
    padding: 0 0.5rem;

  }

  input {
    display: flex;
    width: 100%;
    padding: 0 0.5rem;
    height: 2rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    margin-bottom: 1rem;

    &::placeholder{
      color: var(--text-body);

      & + input {
        margin-top: 1rem;
      }
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--Btgreen);
    border-radius: 0.25rem;
    border: 0;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 1.5rem
  }

`