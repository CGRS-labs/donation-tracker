import React, { useContext } from 'react';
import { UserContext } from '../../hooks/userContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  /*
  useContext
  Accepts a context object (The value from React.createContext)
  The current context value is determined by the value prop of the
  nearest <MyContext.Provider> above the calling component in the tree.
  UserContext must be an obj
  */
  const { user, isLoading } = useContext(UserContext);
  // get the location the user is trying to go to so we can pass it to login
  const location = useLocation();

  if (isLoading) return <div>Loading</div>;

  if (user) return children;

  return <Navigate to="/signin" replace state={{ path: location.pathname }} />;
};
