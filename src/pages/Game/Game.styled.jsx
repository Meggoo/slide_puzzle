import styled from "styled-components";

const SCGame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  padding: 25px;

  &.light {
    --tracking-bg: #de7b8a;
    --tracking-color: #fccae6;
    --timer-bg: #f3d6d6;
    --timer-color: #e07cab;
    --pause-bg: #ea6868;
    --pause-color: #f4d1d1;
    --resume-bg: #e94242;
    --resume-hover-bg: #df2b2b;
    --party-color: #fff0f0;
  }

  &.dark {
    --tracking-bg: #9c1a36;
    --tracking-color: #ffdfdf;
    --timer-bg: #f4c3c3;
    --timer-color: #984747;
    --pause-bg: #ce3434;
    --pause-color: #ffe9e9;
    --resume-bg: #e06c6c;
    --resume-hover-bg: #d15a5a;
    --party-color: #fec2c2;
  }

  --play-again-bg: #c52a2a;
  --play-again-hover-bg: #ad1a24;
  --play-again-color: #f7eeee;
  --home-bg: #764e89;
  --home-hover-bg: #624076;
  --home-color: #ececf9;

  .loading {
    background: var(--pause-bg);
    color: var(--pause-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 25px;
    border-radius: 5px;

    a {
      background: var(--resume-bg);
      color: var(--party-color);
      transition: background-color 0.33s;
      padding: 10px 25px;
      text-decoration: none;
      border-radius: 5px;

      @media (hover: hover) {
        &:hover {
          background: var(--resume-hover-bg);
        }
      }
    }
  }

  .tracking {
    color: var(--tracking-color);
    background: var(--tracking-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80vh;
    padding: 5px 25px;
    border-radius: 5px;
    position: relative;

    &.not-seeing {
      width: auto;
    }

    .eye {
      &.light {
        --eye-color: #f7ecec;

        &.closed {
          --eye-color: #c551b6;
        }
      }

      &.dark {
        --eye-color: #f3cfcf;

        &.closed {
          --eye-color: #d4dafa;
        }
      }

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;

      svg {
        color: var(--eye-color);
        width: 35px;
        height: 35px;
      }

      input[type="checkbox"] {
        appearance: none;
        position: absolute;
        inset: 0;
      }
    }

    .timer {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        background: var(--timer-bg);
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: none;
        display: grid;
        place-items: center;

        svg {
          color: var(--timer-color);
          width: 26px;
          height: 26px;
        }
      }

      &.hidden {
        display: none;
      }
    }

    .moves.hidden {
      display: none;
    }

    @media screen and (max-width: 600px) {
      width: auto;
      padding: 5px;
      flex-direction: column;
      gap: 50px;
    }
  }

  .board {
    width: 80vh;
    height: 80vh;
    position: relative;
    border-radius: 5px;
    overflow: hidden;

    .tile {
      position: absolute;
      display: block;
      outline: 1px solid #5e0c1886;
      transition: top 0.33s, left 0.33s;
    }

    @media screen and (max-width: 800px) {
      width: 90vw;
      height: 90vw;
    }
  }

  @media screen and (max-width: 500px) {
    flex-grow: 1;
    gap: 25px;
    justify-content: center;
  }

  .dialog-backdrop {
    backdrop-filter: blur(10px);
  }

  .pause-screen {
    background: var(--pause-bg);
    color: var(--pause-color);
    padding: 25px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    button {
      background: var(--resume-bg);
      color: var(--pause-color);
      padding: 10px 25px;
      border: none;
      border-radius: 5px;
      transition: background-color 0.33s;

      @media (hover: hover) {
        &:hover {
          background: var(--resume-hover-bg);
        }
      }
    }
  }

  .party-container {
    color: var(--party-color);
    width: 500px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    h1 {
      text-align: center;

      @media screen and (max-width: 500px) {
        font-size: 26px;
      }
    }

    p {
      text-align: center;
    }

    .is-over-buttons {
      display: flex;
      gap: 50px;

      a,
      button {
        padding: 10px;
        border-radius: 5px;
        border: none;
        text-decoration: none;
        width: 150px;
        display: grid;
        place-items: center;
      }

      a {
        background: var(--home-bg);
        color: var(--home-color);
        transition: background-color 0.33s;

        @media (hover: hover) {
          &:hover {
            background: var(--home-hover-bg);
          }
        }
      }

      button {
        background: var(--play-again-bg);
        color: var(--play-again-color);
        transition: background-color 0.33s;

        @media (hover: hover) {
          &:hover {
            background: var(--play-again-hover-bg);
          }
        }
      }

      @media screen and (max-width: 500px) {
        gap: 10px;
      }
    }

    @media screen and (max-width: 500px) {
      width: 90vw;
    }
  }

  .bottom-dialog {
    z-index: 1;
  }

  .sidebar {
    z-index: 2;
  }

  .top-dialog {
    z-index: 3;
  }
`;

export default SCGame;
