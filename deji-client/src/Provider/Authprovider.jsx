import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,

  getAuth,

  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase_init/firebase";




export const AuthContext = createContext(null);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // CreateUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user-SignIn user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user-logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // updatephoto
  const updateUserProfile =(name,photo)=>{
    return updateProfile(auth.currentUser,{
      displayName:name,photoURL:photo
    })

  }
  // Google_login
  const GoogleLogin =()=>{
    setLoading(true)
    return signInWithPopup(auth,provider)
  }

  // onAuthStateChanged
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
     console.log('Current-user =>',currentUser)
     
    
  });

  return () => unsubscribe();
}, []);


 
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    GoogleLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    {/* {loading ? (
      <div className="fixed inset-0 flex justify-center items-center bg-accent bg-opacity-50">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    ) : (
      children
    )} */}
  </AuthContext.Provider>
  );
}

export default AuthProvider;
