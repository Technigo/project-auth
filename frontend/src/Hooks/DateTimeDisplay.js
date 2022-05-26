import React from 'react';

import styled from "styled-components"

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${days => days.isDanger ? 'red' : 'green'}
`
export const Value = styled.p`
  font-size: 20px;
  margin: 5px;
`

export const Type = styled.span`
  font-size: 20px;
  text-transform: uppercase;
  line-height: 1rem;
`


const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <TimeDisplay >
      <Value>{value}</Value>
      <Type>{type}</Type>
    </TimeDisplay>
  );
};

export default DateTimeDisplay;
