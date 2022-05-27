import React, { Component }  from 'react';
import TheCountdown from "./TheCountdown"
import { Date } from '../components/main_style'


class DateTimeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "June, 23, 2022" };
  }
  render() {
    return (
      <div>
        <Date>{this.state.deadline}</Date>
        <TheCountdown deadline={this.state.deadline} />
      </div>
    );
  }
}
export default DateTimeDisplay;
