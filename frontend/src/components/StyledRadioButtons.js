import styled from "styled-components";

export const RadioButtonsContainer = styled.div`
  font-size: 16px;
`;

export const RadioButtonsLabel = styled.label`
  cursor: pointer;
`;

export const RadioButtonsOverlay = styled.div`
  gap: 10px;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
  -webkit-tap-highlight-color: transparent;
`;

export const RadioButtons = styled.input`
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: none;
  border: 0;
  box-shadow: inset 0 0 0 1px #75ceab;
  box-shadow: inset 0 0 0 1.5px #75ceab;
  appearance: none;
  padding: 0;
  transition: box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25);
  pointer-events: none;
  margin: 0 5px 0 0;
  :focus {
    outline: none;
  }
  :checked {
    box-shadow: inset 0 0 0 6px #75ceab;
  }
`;
