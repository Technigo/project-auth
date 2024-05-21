import styled from "styled-components";

export const StyledHeading = styled.div`
  font-size: ${(props) => props.size || "2.2em"};
  color: #ffffff;
  font-weight: ${(props) => (props.fontWeight === "bold" ? "bold" : "normal")};
  text-align: center;
`;

export const SmallText = styled.p`
  font-size: 0.85em;
  color: #000000;
`;
