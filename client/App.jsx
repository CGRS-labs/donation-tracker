import React, { Component } from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import Homepage from './Homepage.jsx';
import './styles/styles.css';

const App = props => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element= {<Layout><Homepage /></Layout>} />
        <Route exact path="/signin" element={ <Layout><Login /></Layout> } />
        <Route exact path="/signup" element={ <Layout><SignUp /></Layout> } />
      </Routes>
    </Router>
  );
};


export default App;
