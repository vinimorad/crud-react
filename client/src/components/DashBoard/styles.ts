import styled from 'styled-components'

export const Container = styled.main`
  max-width: 990px;
  margin: 2rem auto;

  input {
    width: 100%;
    height: 2rem;
    padding: 1rem;
  }

  h2 {
    text-align: center;
  }

  #table {
    overflow-X: scroll;
  }

  table {
    border-spacing: 0 0.5rem;
    width: 100%;

    th {
      color: black;
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem
    }

    td {
      padding: 1rem 2rem;
      background-color: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;
    }

    td:last-child {
      display: flex;
      gap: 0.5rem;
      
      button {
        width: 5rem;
        height: 2rem;
        padding: 0.1rem;

      }

      button:first-child {
          background: #ee6565;
        }

        button:last-child {
          background: #6b6be2;
        }
    }
  }

  input::placeholder {
    color: #B2AAAA;
    font-size: 0.9rem;
  }
  


`

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 3rem;

`