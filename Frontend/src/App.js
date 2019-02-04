import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux'; 
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import './App.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import OwnerLogin from './components/auth/OwnerLogin';
import Dashboard from './components/dashboard/Dashboard';
import OwnerDashboard from './components/dashboard/OwnerDashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddHomes from './components/add-homes/AddHomes';
import Homes from './components/dashboard/Homes';
import OwnerHomes from './components/owner-homes/OwnerHomes';
import BookedHomes from './components/booked-homes/BookedHomes';
import Home from './components/dashboard/Home';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      
      <div className="App">
        <Navbar/>
          <Route exact path="/" component={ Landing }/>
          <div className="container">
            <Route exact path="/register" component={ Register }/>
            <Route exact path="/login" component={ Login }/>
            <Route exact path="/ownerlogin" component={ OwnerLogin }/>
            <Route exact path="/homes" component={ Homes }/>
            <Route exact path="/home/:_id" component={Home} />
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/ownerdashboard" component={OwnerDashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-homes"
                  component={AddHomes}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/owner-homes"
                  component={OwnerHomes}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/booked-homes"
                  component={BookedHomes}
                />
              </Switch>
          </div>
        <Footer/>
      </div>

      </Router>

      </Provider>
    );
  }
}

export default App;
