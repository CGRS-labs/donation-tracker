import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/layout/Layout';
import Login from './Login';
import SignUp from './SignUp';
import MapPage from './components/map/MapPage';
import Homepage from './Homepage.jsx';
import Dashboard from './components/dashboard/Dashboard';
// import Add from './components/dashboard/AddItem.jsx';
// import ItemTable from './components/dashboard/ItemTable.jsx';

import './styles/styles.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout><Homepage /></Layout>} />
        <Route exact path="/signin" element={<Layout><Login /></Layout>} />
        <Route exact path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route exact path="/map" element={<Layout><MapPage /></Layout>} />
        <Route exact path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        {/* <Route exact path="/test" element={<Layout><ItemTable /></Layout>} />  */}
      </Routes>
    </Router>
  );
};


export default App;
