import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    background: var(--background-secondary-color); */

    /* .logo {
      display: flex;
      align-items: center;
      width: 100px;
    } */
  }

  .page {
    min-height: calc(100dvh - var(--nav-height));
    display: grid;
    align-items: center;
    /* padding-top: 2rem; */
    /* margin-top: -3rem; */
  }

  h1 {
    font-weight: 700;
    margin-bottom: 1.5rem;

    span {
      color: var(--primary-500);
    }
  }

  p {
    line-height: 1.5;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
    background: none;
  }

  .register-link:hover {
    color: var(--white);
    background: var(--primary-500);
  }

  /* .register-link:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  } */

  .main-img {
    display: none;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
