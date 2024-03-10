import styled from "styled-components";

const Wrapper = styled.section`
  /* height: 6rem; */
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;

  .btn-container {
    /* background: var(--background-secondary-color); */
    border-radius: var(--border-radius);
    display: flex;
  }

  .page-btn {
    background: var(--background-secondary-color);
    border-color: transparent;
    margin: 0 3px;
    /* width: 50px; */
    /* height: 40px; */
    font-weight: 700;
    /* font-size: 1.25rem; */
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .prev-btn,
  .next-btn {
    background: var(--background-secondary-color);
    border-color: transparent;
    border-radius: var(--border-radius);

    /* width: 100px;
    height: 40px; */
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
    transition: var(--transition);
  }

  .dots {
    color: var(--primary-500);
    display: grid;
    place-items: center;
    cursor: text;
    margin: 0 3px;
  }
`;
export default Wrapper;
