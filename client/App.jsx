import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';
import MapPage from './components/map/MapPage';

import './styles/styles.css';

const App = props => {

  return (
    <Router>
      <div className="navigation">
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/map'>Map</Link>
          </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/map" element={<MapPage />} />
      </Routes>

    </Router>
  );
};



export default App;
