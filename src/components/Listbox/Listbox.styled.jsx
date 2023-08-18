import styled from "styled-components";

const SCListbox = styled.div`
  position: relative;
  width: fit-content;

  &.light {
    --bg: #f1657a;
  }

  &.dark {
    --bg: #ba3045;
  }

  .current {
    background: var(--bg);
    color: azure;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 3px 5px;
    border-radius: 5px;
    width: 300px;

    .chevron {
      margin-left: 30px;
      width: 30px;
      height: 30px;
      transition: transform 0.33s;
      display: grid;
      place-items: center;

      &.open {
        transform: rotate(90deg);
      }

      span {
        width: 25px;
        height: 25px;
      }
    }
  }

  .options {
    background: var(--bg);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 100%;
    transition: bottom 0.33s, transform 0.33s;
    z-index: 1;
    padding: 10px;
    border-radius: 5px;

    .option {
      color: azure;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 25px;
      border-radius: 5px;

      &.candidate {
        background: #ed97ac;
      }

      span {
        width: 30px;
        height: 30px;

        &.current-option {
          svg {
            display: block;
          }
        }

        svg {
          display: none;
          width: 25px;
          height: 25px;
        }
      }
    }

    &.uninitted {
      visibility: hidden;
    }

    &.closed {
      animation: hide 0.33s forwards;
    }

    &.open {
      bottom: 0;
      transform: translateY(105%);
      visibility: visible;
      animation: show 0.33s forwards, byme 1s forwards;
    }

    @keyframes show {
      from {
        opacity: 0;
        pointer-events: none;
      }

      99% {
        pointer-events: none;
      }

      to {
        opacity: 1;
        pointer-events: all;
      }
    }

    @keyframes hide {
      from {
        visibility: visible;
        opacity: 1;
      }
      to {
        visibility: hidden;
        opacity: 0;
      }
    }
  }
`;

export default SCListbox;
