import { createGlobalStyle } from 'styled-components'


export const GlobalStyles = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --blue: #3264ff;
    --Btgreen: #33cc95;
    --Btpurple: #a749d3;
    
    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #ffffff;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
  }

  body, input, button {
    font-family: sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
    width: 12rem;
    border: 0;
    color: white;
    border-radius: 0.5rem;
    height: 3rem;
    padding: 0 1.5rem;

    &:hover {
      filter: brightness(0.9)
    }
  }

  .warning {
    color: red;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background-color: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
  }

  .react-modal-close {
    width: 1rem;
    position: absolute;
    right: 0;
    font-weight: bold;
    top: 0;
    border: 0;
    background: transparent;
    color: black;

    &:hover {
      filter: brightness(0.9)
    }
  }


`