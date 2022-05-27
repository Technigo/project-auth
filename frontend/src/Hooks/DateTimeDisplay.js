import React, { Component }  from 'react';
import TheCountdown from "./TheCountdown";


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

class DateTimeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "June, 24, 2022" };
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown Timer</div>
        <div className="App-date">{this.state.deadline}</div>
        <TheCountdown deadline={this.state.deadline} />
      </div>
    );
  }
}
export default DateTimeDisplay;
