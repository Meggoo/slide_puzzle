import styled from "styled-components";

const SCPartyCard = styled.div`
  &.light {
    --party-background: #e84444;
  }

  &.dark {
    --party-background: #7e080e;
  }

  padding: 2px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  .party-background {
    background: conic-gradient(
      hsl(0, 100%, 50%),
      hsl(45, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(135, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(225, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(315, 100%, 50%),
      hsl(360, 100%, 50%)
    );
    position: absolute;
    width: 100vh;
    height: 100vh;
    animation: party 1s linear infinite;
  }

  .party-container {
    background: var(--party-background);
    border-radius: 10px;
    position: relative;
  }

  @keyframes party {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default SCPartyCard;
