import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './Layout';
import Login from './Login';
import SignUp from './SignUp';
import MapPage from './components/map/MapPage';
import Homepage from './Homepage';
import ChapterPage from './components/ChapterPage';
import AllChaptersPage from './components/AllChaptersPage';

import './styles/styles.css';

const App = () => {

  return (

    <Router>
      <Routes>
        <Route exact path={'/'} element={<Layout><AllChaptersPage /></Layout>} />
        <Route exact path={'/chapters'} element={<Layout><AllChaptersPage /></Layout>} />
        {/* <Route exact path="/" element={<Layout><Homepage /></Layout>} /> */}
        <Route exact path="/signin" element={<Layout><Login /></Layout>} />
        <Route exact path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route exact path="/map" element={<Layout><MapPage /></Layout>} />
        <Route exact path="/chapter/:id" element={<Layout><ChapterPage /></Layout>} />
      </Routes>
    </Router>
  );
};


export default App;
