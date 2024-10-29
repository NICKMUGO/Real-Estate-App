import React, { createContext, useState, useEffect } from 'react';

export const Usercontext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }); 

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Usercontext.Provider value={[user, setUser]}>
      {children}
    </Usercontext.Provider>
  );
}

export default UserContextProvider;
