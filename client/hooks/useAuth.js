import { useState, useEffect } from 'react';
import useToken from '../hooks/useToken';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { token } = useToken();

  useEffect(async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
