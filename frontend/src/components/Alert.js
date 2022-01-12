import React from 'react';
import Swal from 'sweetalert2';

const Alert = () => {
  const el = document.createElement('div');
  el.innerHTML = "Here's a <a href='http://google.com'>link</a>";

  new Swal({
    title: 'User created',
    content: 'el',
  });
};

// const el = document.createElement('div');
// el.innerHTML = "Here's a <a href='http://google.com'>link</a>";

// swal({
//   title: "Hello!",
//   content: el,
// })
export default Alert;
