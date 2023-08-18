import styled from "styled-components";

const SCApp = styled.div`
  &.light {
    --app-bg: #f5e1e1;
    --underline-bg: #e6688c;
    --control-bg: #4e3f3f55;
  }

  &.dark {
    --app-bg: #3e1515;
    --underline-bg: #f71454;
    --control-bg: #fe4c4c52;
  }

  background: var(--app-bg);
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .fs-hl {
    font-size: 48px;
  }

  .fs-hm {
    font-size: 36px;
  }

  .fs-hs {
    font-size: 32px;
  }

  .fs-bl {
    font-size: 21px;
  }

  .fs-bm {
    font-size: 16px;
  }

  .fs-bs {
    font-size: 13px;
  }

  .ft-s {
    font-family: sin;
  }

  .ft-d {
    font-family: dmt;
  }

  .control {
    background: var(--control-bg);
    color: #f5ecf9;
    border: none;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    transition: transform 0.33s;
    pointer-events: all;

    svg {
      pointer-events: none;
      width: 20px;
      height: 20px;
    }
  }

  .underlined {
    position: relative;
    width: fit-content;
    cursor: pointer;

    &::after {
      background: var(--underline-bg);
      content: "";
      position: absolute;
      top: 110%;
      left: 50%;
      transform: translate(-50%, 0) scale(0, 1);
      transition: transform 0.33s;
      width: 100%;
      height: 2px;
    }

    @media (hover: hover) {
      &:hover::after {
        transform: translate(-50%, 0) scale(1, 1);
      }
    }
  }

  .not-found {
    color: #e66464;
    min-height: 100vh;
    display: grid;
    place-items: center;

    .content {
      background: #6a3131;
      padding: 25px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      a {
        color: #f5e2e2;
        text-decoration: none;
      }
    }
  }
`;

export default SCApp;
