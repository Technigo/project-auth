import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

export default ({ component: Component, ...params }) => {
  const auth = useSelector((store) => store.session.accessToken);
  const history = useHistory();

  React.useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth, history]);

  return <Route {...params} render={(props) => <Component {...props} />} />;
};
