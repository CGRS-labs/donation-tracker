import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './components/layout/Layout';
import MapPage from './components/map/MapPage';
import Homepage from './Homepage';
import ChapterPage from './components/chapters/ChapterPage';
import AllChaptersPage from './components/chapters/AllChaptersPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import GlobalDashboard from './components/dashboard/GlobalDashboard';
import AddChapterPage from './components/chapters/AddChapterPage';
import { UserContext } from './hooks/userContext';
import useAuth from './hooks/useAuth';

import './styles/styles.css';

const App = () => {
  const { user, setUser } = useAuth();

  return (

    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/" element={<Layout><Homepage /></Layout>} />
          <Route exact path={'/chapters'} element={<Layout><AllChaptersPage /></Layout>} />
          <Route exact path="/signin" element={<Layout><Login /></Layout>} />
          <Route exact path="/signup" element={<Layout><SignUp /></Layout>} />
          <Route exact path="/map" element={<Layout><MapPage /></Layout>} />
          <Route exact path="/chapter/:id" element={<Layout><ChapterPage /></Layout>} />
          <Route exact path={'/dashboard/:id'} element={<Layout><Dashboard /></Layout>} />
          <Route exact path="/dashboard" element={<Layout><GlobalDashboard /></Layout>} />
          <Route exact path="/chapter/add" element={<Layout><AddChapterPage /></Layout>} />
          <Route exact path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes >
      </UserContext.Provider>
    </Router >
  );
};


export default App;
