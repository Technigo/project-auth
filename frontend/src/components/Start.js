import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Start = () => {
return (
<div>
Start
<button>
click <Link to='/register'>here </Link> to register  
</button>
<button>
click <Link to='/login'>here </Link> to sign in  
</button>

</div>
)
}

export default Start;