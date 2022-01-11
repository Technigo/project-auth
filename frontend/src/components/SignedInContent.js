import React, { useState, useEffect } from 'react';

import { URL_CATS } from 'utils/urls';

const SignedInContent = data => {
  const [cat, setCat] = useState({});

  useEffect(() => {
    fetch(URL_CATS)
      .then(res => res.json())
      .then(data => setCat(data));
  }, []);

  return (
    <div>
      <img src={cat.file} />
      <button>SIGN OUT</button>
    </div>
  );
};
export default SignedInContent;
