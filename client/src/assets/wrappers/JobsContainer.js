import styled from "styled-components";

const Wrapper = styled.section`
  /* margin-top: 4rem; */

  .search-result-buttons {
    display: flex;
    justify-content: center;
    height: 30px;
  }

  .toggle {
    font-size: 23px;
  }

  .map {
    height: 500px;
    box-shadow: var(--shadow-2);
  }

  .mapboxgl-canvas {
    border-radius: var(--border-radius);
  }

  .mapboxgl-map {
    color: var(--black);
    font-family: inherit;
  }

  .mapboxgl-marker {
    cursor: pointer;
  }

  .mapboxgl-popup-content {
    border-radius: var(--border-radius);

    .map-link {
      margin: 5px 5px 0 0;
      padding: 5px;
      border-radius: var(--border-radius);
      border: 1px solid var(--primary-500);
      box-shadow: var(--shadow-2);
    }

    .map-link:hover {
      transition: var(--transition);
      background-color: var(--grey-100);
    }

    p {
      color: var(--grey-500);
      font-size: var(--small-text);
    }

    .mapboxgl-popup-close-button {
      font-size: 1.5rem;
      color: var(--primary-500);
    }
  }

  .search-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  strong {
    color: var(--primary-500);
  }

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .jobs {
    display: grid;
    /* grid-template-columns: 1fr; */
    /* row-gap: 2rem; */
    gap: 2rem;
  }

  @media (min-width: 0px) {
    .jobs {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (min-width: 769px) {
    .jobs {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* @media (min-width: 1201px) {
    .jobs {
      grid-template-columns: repeat(3, 1fr);
    }
  } */
`;
export default Wrapper;
