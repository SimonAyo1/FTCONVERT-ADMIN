import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState();
  // const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
        setPending(false);
        
    });
    
  

     

  }, []);

  if (pending) {
    return (
      <>
        {' '}
        <div className="spinner">
          <div className="circle one"/>
          <div className="circle two" />
          <div className="circle three"/>
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
