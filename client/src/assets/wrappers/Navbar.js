import styled from "styled-components";

const Wrapper = styled.nav`
  z-index: 999;
  position: sticky;
  top: 0;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.11);
  /* background: var(--background-secondary-color); */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  .nav-center {
    display: flex;
    max-width: var(--max-width);
    width: 90%;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-weight: bold;
    }
  }

  .toggle-btn {
    position: relative;
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;

    @media (min-width: 992px) {
      display: none;
    }
  }

  .left-arrows {
    display: none;
  }

  .menu-icon-sc {
    display: block;
  }

  /* .logo {
    display: flex;
    align-items: center;
    width: 100px;
  } */

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    /* position: sticky;
    top: 0; */

    /* .nav-center {
      width: 90%;
    } */

    .menu-icon-sc {
      display: none;
    }

    .left-arrows {
      display: block;
    }
  }
`;
export default Wrapper;
