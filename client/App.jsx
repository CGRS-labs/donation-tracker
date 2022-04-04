import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/layout/Layout';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MapPage from './components/map/MapPage';
import Homepage from './Homepage.jsx';
import Dashboard from './components/dashboard/Dashboard';
// import Add from './components/dashboard/AddItem.jsx';
// import ItemTable from './components/dashboard/ItemTable.jsx';
import Sunflower from './components/layout/Sunflower';

import './styles/styles.css';
// import './styles/sunflower.svg';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout><Homepage /></Layout>} />
        <Route exact path="/signin" element={<Layout><Login /></Layout>} />
        <Route exact path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route exact path="/map" element={<Layout><MapPage /></Layout>} />
        <Route exact path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route exact path="/test" element={<Layout><Sunflower /></Layout>} /> 
      </Routes>
    </Router>
  );
};


export default App;
