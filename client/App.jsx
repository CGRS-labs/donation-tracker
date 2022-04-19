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
import AddAdmin from './components/AddAdmin';
import Dashboard from './components/dashboard/Dashboard';
import GlobalDashboard from './components/dashboard/GlobalDashboard';
import AddChapterPage from './components/chapters/AddChapterPage';
import { UserContext } from './hooks/userContext';
import useAuth from './hooks/useAuth';
import PrivateRoute from './components/layout/PrivateRoute';

import './styles/styles.css';

const App = () => {
  
  const { user, setUser, isLoading } = useAuth();

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path={"/chapters"} element={<AllChaptersPage />} />
            <Route exact path="/signin" element={<Login />} />
            <Route
              exact
              path="/signup"
              element={
                <PrivateRoute>
                  <AddAdmin />
                </PrivateRoute>
              }
            />
            <Route exact path="/map" element={<MapPage />} />
            <Route exact path="/chapter/:id" element={<ChapterPage />} />
            <Route
              exact
              path="/chapter/add"
              element={
                <PrivateRoute>
                  <AddChapterPage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/chapter/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <GlobalDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </Router>
  );
};


export default App;
