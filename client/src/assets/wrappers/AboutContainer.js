import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    width: 80%;
    text-align: center;

    h1 {
      font-weight: 700;
      margin-bottom: 1.5rem;

      span {
        color: var(--primary-500);
      }
    }

    /* p {
      font-size: 1.1rem;
    } */
  }
`;

export default Wrapper;
