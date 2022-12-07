import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { REGISTER_URL } from 'utils/urls';

const Register = () => {
return (
<div>
Register here!
<button> Click!
<Link to='/main'></Link> 
</button>
</div>
)
}

export default Register;