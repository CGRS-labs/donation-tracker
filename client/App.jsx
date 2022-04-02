import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './Layout.jsx';
import Login from './Login';
import SignUp from './SignUp';
import MapPage from './components/map/MapPage';
import Homepage from './Homepage.jsx';

import './styles/styles.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout><Homepage /></Layout>} />
        <Route exact path="/signin" element={<Layout><Login /></Layout>} />
        <Route exact path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route exact path="/map" element={<Layout><MapPage /></Layout>} />
      </Routes>
    </Router>
  );
};


export default App;
