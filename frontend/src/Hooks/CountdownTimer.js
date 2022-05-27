import React from 'react';
import TheCountdown from './TheCountdown';
import DateTimeDisplay from './DateTimeDisplay';
import style from "styled-components"

import{
  Expired,
  ExpiredMessage,
  ExpiredNote, 
  Counter,
  Colon

} from "./countdown_style"

const ExpiredNotice = () => {
  return (
    <Expired>
      <ExpiredMessage>Woohoooo</ExpiredMessage>
      <ExpiredNote >We have graduated from the bootcamp</ExpiredNote >
    </Expired>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Counter>
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 29} />
      <Colon>:</Colon>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <Colon>:</Colon>
      <DateTimeDisplay value={minutes} type={'Minutes'} isDanger={false} />
      <Colon>:</Colon>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </Counter>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = TheCountdown(targetDate);
  if (days + hours + minutes + seconds <= 30) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
