import styled from "styled-components";

const SCForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  border-radius: 10px;

  &.light {
    --input-bg: #a6082d77;
    --input-hover-bg: #6e0c2377;
    --submit-bg: #e15964;
    --submit-hover-bg: #d14f4f;
    --submit-color: azure;
  }

  &.dark {
    --input-bg: #6d102677;
    --input-hover-bg: #4f0a1a77;
    --submit-bg: #853453;
    --submit-hover-bg: #7a2e58;
    --submit-color: #eacc96;
  }

  .input-section {
    background: var(--input-bg);
    color: #f5dddd;
    display: block;
    position: relative;
    border-radius: 10px;
    transition: background-color 0.33s;
    backdrop-filter: blur(3px);

    input[type="file"] {
      appearance: none;
      inset: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
    }

    svg {
      width: min(80vw, 80vh);
      height: min(80vw, 80vh);
    }

    @media (hover: hover) {
      &:hover {
        background: var(--input-hover-bg);
      }
    }
  }

  .crop-section {
    position: relative;

    .ReactCrop {
      border-radius: 5px;
    }

    img {
      max-width: 80vw;
      max-height: 80vh;
      border-radius: 5px;
    }

    button {
      position: absolute;
      top: 25px;
      right: 25px;
    }
  }

  .submit-button {
    background: var(--submit-bg);
    color: var(--submit-color);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.33s;

    @media (hover: hover) {
      &:hover {
        background: var(--submit-hover-bg);
      }
    }
  }
`;

export default SCForm;
