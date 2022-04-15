import { useState } from 'react';
//useToken return an obj with setToken which requires an argument, it will set a token string and store it inside sessionStorage
export default function useToken() {
  //getToken will get the token string from sessionStorage and return the token
  const getToken = () => {
    //sessionStorage stores data inside the brwser similarly to localStorage but sessionStorage will expired once the page session end
    const tokenString = sessionStorage.getItem("token");
    //values that store inside sessionStorage is stringify so he parse the data
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken === null) {
      sessionStorage.removeItem('token');
    } else {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    }
  };


  return {
    setToken: saveToken,
    token
  };
}
