import styled from "styled-components";

const SCDialog = styled.div`
  --duration: 0.33s;

  &.light {
    --backdrop-bg: #e7979755;
  }

  &.dark {
    --backdrop-bg: #ab303055;
  }

  position: fixed;
  inset: 0;
  transition: opacity var(--duration);

  .dialog-backdrop {
    background: var(--backdrop-bg);
    position: absolute;
    inset: 0;
  }

  .dialog-container {
    position: absolute;
    top: -100vh;
    left: 50%;
    transform: translateX(-50%);
    transition: transform var(--duration);
    display: grid;
    place-items: center;
  }

  .dialog-container::-webkit-scrollbar {
    display: none;
  }

  &.hidden {
    pointer-events: none;
    opacity: 0;
  }

  &.shown {
    .dialog-container {
      transform: translate(-50%, calc(150vh - 50%));
    }
  }
`;

export default SCDialog;
