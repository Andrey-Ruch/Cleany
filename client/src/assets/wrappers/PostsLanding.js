import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    width: 80%;
    text-align: center;

    h2 {
      font-weight: 700;
      margin-bottom: 2rem;

      span {
        color: var(--primary-500);
      }
    }

    /* p {
      font-size: 1.1rem;
    } */

    .links {
      display: grid;
      place-items: center;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin: auto;
      margin-bottom: 4rem;

      .btn {
        display: grid;
        place-items: center;
        max-width: 380px;
        width: 100%;
        height: var(--input-height);
      }
    }

    .container {
      display: grid;
      place-items: center;
      grid-template-columns: 1fr;
      gap: 2rem;

      .container-element {
        width: 100%;
        display: grid;
        place-items: center;
      }

      .img {
        width: 220px;
      }

      ul {
        display: grid;
        row-gap: 1rem;
        list-style-type: disc;
        list-style-position: inside;
        margin: auto;
      }

      li {
        text-align: start;
      }

      @media (min-width: 769px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

export default Wrapper;
