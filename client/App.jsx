import React, { Component } from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Router>
        <div className="navigation">
          <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/login'>Register</Link>
            </li>
          </ul>
          <hr />
          <div>
            <Routes>
              <Route exact path="/login" element={ <Login /> } />
              <Route exact path="/register" element={ <SignUp /> } />
            </Routes>
          </div>
        </div>

      </Router>
    )
  }
}



export default App;
