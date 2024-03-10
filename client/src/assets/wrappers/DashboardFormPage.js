import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 1rem;
  box-shadow: var(--shadow-2);
  margin-bottom: 2rem;

  .map {
    height: 250px;
  }

  .mapboxgl-canvas {
    border-radius: var(--border-radius);
  }

  .form-title {
    margin-bottom: 1rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    /* row-gap: 1rem; */
    margin-bottom: 1rem;
  }

  .form-bottom {
    display: grid;
    row-gap: 1rem;
    margin-bottom: 1rem;
  }

  .job-image-container {
    display: grid;
    gap: 1rem;
  }

  .job-image-preview {
    width: 130px;
    height: 130px;
    border-radius: var(--border-radius);
  }

  .form-btn {
    align-self: end;
    display: grid;
    place-items: center;
  }

  .btn {
    height: 35px;

    label {
      cursor: pointer;
    }
  }

  .actions {
    display: flex;
    column-gap: 1rem;
    margin-top: 1rem;

    /* display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem; */
    /* font-size: 13.3333px; */
  }

  .avatar-preview-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 1rem;
    margin-bottom: 2rem;
  }

  .avatar-preview {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }

  /* @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  } */

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
