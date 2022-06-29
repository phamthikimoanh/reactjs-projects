import styled, { ThemeProvider } from "styled-components";


export const Input = styled.input`
  padding: 8px 0;
  border: 0px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;
export const InputCheckbox = styled.input`
  /* create custom checkbox appearance */
  display: inline-block;
  width: 25px;
  height: 25px;
  padding: 6px;
  /* background-color only for content */
  background-clip: content-box;
  border: 1.5px solid #bbbbbb;
  border-radius: 6px;
  background-color: #e7e6e7;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;

  &:checked {
    background-color: #0d6efd;
  }

  &:focus {
    outline: none !important;
  }
`;

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  border: 2px solid ${(props) => props.theme.bg};
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border-radius: 3px;
  cursor: pointer;
  width: max-content;
`;