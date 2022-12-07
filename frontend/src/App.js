import React from 'react';
import { OuterWrapper, InnerWrapper } from 'components/GlobalStyles';
import  Shapes  from 'components/Shapes';
import { SignIn } from 'components/SignIn';

export const App = () => {
  return (
    <OuterWrapper> 
        <SignIn />
      <Shapes />
    </OuterWrapper>
  );
}
