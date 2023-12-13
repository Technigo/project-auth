
// src/App.js
import 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import Dashboard from '../components/Dashboard';

const App = () => {
  return (
    <div className="container mx-auto">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
