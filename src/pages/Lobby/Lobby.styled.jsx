import styled from "styled-components";

const SCLobby = styled.div`
  &.light {
    --start-bg: #f7545f;
    --start-hover-bg: #d03f55;
    --start-color: #fafcf3;
    --delete-bg: #9f6fc7;
    --delete-hover-bg: #9952a8;
    --delete-color: #d9f0f0;
    --time-color: #412c2c;
    --warning-bg: #ef555555;
    --yes-bg: #e392e3;
    --yes-hover-bg: #d482c5;
    --no-bg: #f08d8d;
    --no-hover-bg: #efa0a5;
  }

  &.dark {
    --start-bg: #7d2743;
    --start-hover-bg: #6a1e37;
    --start-color: #ecd6d6;
    --delete-bg: #7c2a9b;
    --delete-hover-bg: #6c218a;
    --delete-color: #d3ecec;
    --time-color: #e9e9f2;
    --warning-bg: #aa1f1f55;
    --yes-bg: #c653f0;
    --yes-hover-bg: #ae46d3;
    --no-bg: #e97070;
    --no-hover-bg: #dc5e5e;
  }

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;

  .loading {
    background: var(--start-bg);
    color: var(--start-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 25px;
    border-radius: 5px;

    a {
      background: var(--no-bg);
      color: var(--time-color);
      transition: background-color 0.33s;
      padding: 10px 25px;
      text-decoration: none;
      border-radius: 5px;

      @media (hover: hover) {
        &:hover {
          background: var(--no-hover-bg);
        }
      }
    }
  }

  .document {
    display: flex;
    flex-direction: column;
    gap: 50px;

    .set-up {
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        color: var(--time-color);
        display: flex;
        align-items: center;
        gap: 10px;

        .check {
          background: #e49fc2;
          color: #f8ffff;
          width: 26px;
          height: 26px;
          position: relative;
          display: grid;
          place-items: center;
          border-radius: 3px;

          input[type="checkbox"] {
            appearance: none;
            position: absolute;
            inset: 0;

            &:checked ~ svg {
              display: block;
            }
          }

          svg {
            width: 20px;
            height: 20px;
            position: relative;
            display: none;
          }
        }
      }

      @media screen and (max-width: 700px) {
        flex-direction: column;
        gap: 45px;
      }
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;

      a,
      button {
        padding: 10px 20px;
        height: 50px;
        border: none;
        border-radius: 5px;
        display: grid;
        place-items: center;
      }

      a {
        background: var(--start-bg);
        color: var(--start-color);
        text-decoration: none;
        transition: background-color 0.33s;

        @media (hover: hover) {
          &:hover {
            background: var(--start-hover-bg);
          }
        }
      }

      button {
        background: var(--delete-bg);
        color: var(--delete-color);
        transition: background-color 0.33s;

        @media (hover: hover) {
          &:hover {
            background: var(--delete-hover-bg);
          }
        }
      }

      @media screen and (max-width: 550px) {
        flex-direction: column;
        gap: 35px;
      }
    }

    .preview {
      --side-length: 650px;

      position: relative;
      width: fit-content;

      img {
        width: var(--side-length);
        border-radius: 5px;
      }

      .lines {
        position: absolute;
        inset: 0;

        .line {
          background: #40020255;
          outline: 1px solid #f6f8fa99;
          display: block;
          position: absolute;

          &:first-child {
            display: none;
          }
        }

        &.verticals {
          .line {
            width: 2px;
            height: var(--side-length);
          }
        }

        &.horizontals {
          .line {
            width: var(--side-length);
            height: 2px;
          }
        }
      }

      @media screen and (max-width: 700px) {
        --side-length: 90vw;
      }
    }
  }

  .warning-screen {
    background: var(--warning-bg);
    padding: 25px;
    border-radius: 5px;
    width: 500px;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 35px;

    h3 {
      color: azure;
      text-align: center;
    }

    .buttons {
      display: flex;
      gap: 50px;

      button {
        color: azure;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        flex-grow: 1;
        transition: background-color 0.33s;

        &.yes {
          background: var(--yes-bg);

          @media (hover: hover) {
            &:hover {
              background: var(--yes-hover-bg);
            }
          }
        }

        &.no {
          background: var(--no-bg);

          @media (hover: hover) {
            &:hover {
              background: var(--no-hover-bg);
            }
          }
        }
      }
    }

    @media screen and (max-width: 500px) {
      width: 90vw;
    }
  }
`;

export default SCLobby;
