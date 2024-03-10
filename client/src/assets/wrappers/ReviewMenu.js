import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    gap: 0 0.5rem;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .btn {
    color: var(--grey-400);
    background: transparent;
    box-shadow: none;
    user-select: none;
    appearance: none;
    text-decoration: none;
  }

  /* .btn:hover,
  .btn:focus {
    background: rgba(145, 158, 171, 0.08);
  } */

  .dropdown {
    position: absolute;
    top: 40px;
    right: 15px;
    /* width: 100%; */
    width: 100px;
    box-shadow: var(--shadow-4);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0 0.5rem;
    font-family: inherit;
    font-size: var(--btn-text);
    font-weight: 400;
    /* transition: var(--transition); */

    // --------------------------------
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    /* color: var(--white); */
    color: var(--text-color);
    /* letter-spacing: var(--letter-spacing); */
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 30px;
  }

  .dropdown-btn:hover {
    text-decoration: none;
    background-color: rgba(145, 158, 171, 0.08);
  }

  .danger-btn {
    color: var(--red);
    /* background: var(--red-hover); */
  }

  /* .danger-btn:hover {
    background: var(--red-hover);
  } */

  /* .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
  }

  .edit-btn {
    margin-right: 0.5rem;
  } */
`;

export default Wrapper;
