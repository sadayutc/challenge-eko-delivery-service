import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from './components/Main';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import PageNotFound from './pages/errors/PageNotFound';
import { useUser } from './contexts/userContext';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const {
    state: { isAuthenticated },
  } = useUser();

  const PrivateRoute = ({ component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );

  const PublicRoute = ({ component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  };

  return (
    <>
      <ToastContainer />
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/route/set" />}
          />
          <Route
            exact
            path="/route"
            render={() => <Redirect to="/route/set" />}
          />

          <PrivateRoute path="/route" component={Main} />
          <PrivateRoute path="/logout" component={Logout} />

          <PublicRoute path="/login" component={Login} />

          <Route component={PageNotFound} />
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;
