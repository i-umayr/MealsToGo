import { useState, createContext, useContext } from "react";
import { getAuth } from "firebase/auth";
import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Get the Firebase auth instance
  const auth = getAuth();

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
