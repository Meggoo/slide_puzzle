import styled from "styled-components";

const SCHome = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &.light {
    --index-bg: #f47676;
    --index-hover-bg: #db5757;
    --index-color: #f7ebee;
    --start-color: #ed6565;
  }

  &.dark {
    --index-bg: #e96e6e;
    --index-hover-bg: #df4949;
    --index-color: #f7ebee;
    --start-color: #f39a9a;
  }

  .get-started {
    color: var(--start-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 50px;

    img {
      max-width: 90vw;
    }

    p {
      text-align: center;
    }

    button {
      background: var(--index-bg);
      color: var(--index-color);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
    }
  }

  .images {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding: 25px;

    img {
      width: 300px;
      border-radius: 3px;
    }
  }

  .indices {
    padding: 10px;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      background: var(--index-bg);
      color: var(--index-color);
      transition: background-color 0.33s;
      width: 35px;
      height: 35px;
      border: none;
      display: grid;
      place-items: center;
      border-radius: 5px;

      &:disabled {
        opacity: 0.5;
      }

      svg {
        width: 26px;
        height: 26px;
        pointer-events: none;
      }

      @media (hover: hover) {
        &:hover:not(:disabled) {
          background: var(--index-hover-bg);
        }
      }
    }
  }
`;

export default SCHome;
