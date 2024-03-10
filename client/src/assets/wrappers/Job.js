import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem;
    display: grid;
    gap: 1rem;
    align-items: center;

    .img-wrapper {
      overflow: hidden;
      display: inline-block;
      width: 100%;
      border-radius: var(--border-radius);
    }
  }

  .job-header {
    position: relative;
    grid-template-columns: 1fr;

    .img {
      height: 100%;
    }

    .img-wrapper {
      height: 200px;
    }

    .extended-img-wrapper {
      height: 250px;
    }
  }

  .employee-header {
    grid-template-columns: auto 1fr;
  }

  .info {
    h5 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: var(--small-text);
      color: var(--text-secondary-color);
    }
  }

  .content {
    display: grid;
    gap: 1rem;
    padding: 0 1rem 1rem;

    .extended-gap {
      gap: 2rem;
    }
  }

  .extended-gap {
    gap: 2rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .date {
    margin-bottom: 0.5rem;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: var(--small-text);
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
  }

  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
