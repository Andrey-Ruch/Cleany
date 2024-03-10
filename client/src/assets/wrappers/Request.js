import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .title {
    font-weight: 800;
    font-size: 1.15rem;
  }

  .MuiSvgIcon-root,
  .MuiTableCell-root,
  .title {
    font-family: inherit;
    color: var(--text-color);
  }

  .btn:disabled {
    cursor: auto;
  }

  .btn-outline {
    margin-left: 1rem;
  }

  .MuiTableContainer-root {
    margin: 1rem 0;
    border-radius: var(--border-radius);
  }

  .MuiPaper-elevation {
    background-color: var(--background-secondary-color);
  }

  .MuiTableRow-root {
    background-color: var(--background-secondary-color);
  }

  .MuiTableCell-root {
    border-bottom: none;
  }
`;

export default Wrapper;
