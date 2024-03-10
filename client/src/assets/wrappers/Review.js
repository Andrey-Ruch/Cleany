import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--grey-500);

  .review-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: center;

    .info {
      h5 {
        margin-bottom: 0.5rem;
      }
    }
  }

  .review-content {
    font-size: var(--small-text);
    display: grid;
    gap: 1rem;
    padding-top: 1rem;
  }
`;

export default Wrapper;
