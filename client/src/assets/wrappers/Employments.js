import styled from "styled-components";

const Wrapper = styled.section`
  .tab-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px;
    width: fit-content;
    background-color: var(--background-secondary-color);
    border-radius: var(--border-radius);

    .tab_label {
      width: 100px;
      height: 30px;
      position: relative;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      font-size: var(--small-text);
      color: var(--text-color);
      /* opacity: 0.6; */
      cursor: pointer;
      transition: var(--transition);
    }

    .tab {
      width: 100px;
      height: 30px;
      position: absolute;
      z-index: 99;
      outline: none;
      opacity: 0;
    }

    .indicator {
      content: "";
      width: 100px;
      height: 30px;
      background: var(--primary-500);
      position: absolute;
      top: 2px;
      left: 2px;
      z-index: 9;
      border: 0.5px solid rgba(0, 0, 0, 0.04);
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12),
        0px 3px 1px rgba(0, 0, 0, 0.04);
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    .tab--1:checked ~ .indicator {
      left: 2px;
    }

    .tab--2:checked ~ .indicator {
      left: calc(100px + 2px);
    }

    .tab--3:checked ~ .indicator {
      left: calc(100px * 2 + 2px);
    }

    // labels color when tab checked
    .tab--1:checked ~ .tab_label[for="tab1"],
    .tab--2:checked ~ .tab_label[for="tab2"],
    .tab--3:checked ~ .tab_label[for="tab3"] {
      color: var(--white);
    }
  }
`;

export default Wrapper;
