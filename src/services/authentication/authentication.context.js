import { useState, createContext, useEffect } from "react";
import { auth } from "../../../firebaseConfig";
import { loginRequest, registerRequest } from "./authentication.service";

import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthenticationContext = createContext();

const getErrorMessage = (error) => {
  // Check if error has a code property, if not, use the message directly
  const errorCode = error.code || "";

  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please check and try again.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/missing-password":
      return "Please fill the Password field.";
    case "auth/email-already-in-use":
      return "This email address is already registered. Try logging in or use a different email.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    case "auth/operation-not-allowed":
      return "User registration is currently disabled. Please contact support.";
    default:
      // Fallback to the error message if no specific code matches
      return error.message || "An unexpected error occurred. Please try again.";
  }
};

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
      setIsLoading(false);
    });
  }, [user]);

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
        setError(getErrorMessage(e));
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    setIsLoading(true);
    registerRequest(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(getErrorMessage(e));
      });
  };
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        clearError,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
