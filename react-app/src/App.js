import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './components/Login';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import InputTest from './components/InputTest';
import { Input } from '@mui/material';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // console.log('app component mounted');
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <Route path='/signup' exact={true}>
          <Signup />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <SplashPage/>
        </Route>
        <ProtectedRoute path='/home' exact={true}>
          <HomePage/>
        </ProtectedRoute>
        <Route path='/test' exact={true}>
          <InputTest />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
