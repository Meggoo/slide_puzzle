import styled from "styled-components";

const SCSidebar = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;

  &.light {
    --sidebar-bg: #f48989;
    --color: #f1d7ee;
    --toggle-bg: #4e3f3f55;
    --top-button-bg: #da6a6a;
    --top-button-hover-bg: #c95763;
  }

  &.dark {
    --sidebar-bg: #460909;
    --color: #e5c8c9;
    --toggle-bg: #fe4c4c52;
    --top-button-bg: #6f1f1f;
    --top-button-hover-bg: #843030;
  }

  &.open {
    pointer-events: all;

    .sidebar-backdrop {
      opacity: 0.5;
    }

    .sidebar-content {
      transform: translate(0);

      .sidebar-toggle {
        transform: translate(25px, 25px);

        @media screen and (max-width: 500px) {
          transform: translate(25px, -25px);
        }
      }
    }
  }

  .sidebar-backdrop {
    background: #f58d8d;
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.33s;
  }

  .sidebar-content {
    background: var(--sidebar-bg);
    width: 300px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform: translate(100%);
    transition: transform 0.33s;

    .sidebar-toggle {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50px, 25px);

      @media screen and (max-width: 500px) {
        top: auto;
        bottom: 0;
        transform: translate(-65px, -25px);
      }
    }

    .top,
    .bottom {
      padding: 25px;
    }

    .top {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      a,
      button {
        background: var(--top-button-bg);
        color: var(--color);
        text-decoration: none;
        border: none;
        padding: 10px;
        border-radius: 5px;
        transition: background-color 0.33s;

        @media screen and (hover: hover) {
          &:hover {
            background: var(--top-button-hover-bg);
          }
        }
      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      gap: 40px;

      .links {
        display: flex;
        flex-direction: column;
        gap: 20px;

        a {
          color: var(--color);
          text-decoration: none;
        }
      }

      .toggle {
        background: #e4b8b8;
        align-self: center;
      }
    }
  }
`;

export default SCSidebar;
