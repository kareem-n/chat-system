import React, { useState, createContext } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(0);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  const GoogleProdiver = new GoogleAuthProvider();

  const facebookProvider = new FacebookAuthProvider();

  const userListner = async (docId) => {
    await onSnapshot(doc(db, "users", docId), (user) => {
      if (user.data() === undefined) {
        localStorage.removeItem("userInfo");
      }

      setUser(user.data());
    });
  };

  const createDocumentIfNotExists = async (docId, data) => {
    let userData = await getDoc(doc(db, "users", docId));
    console.log(0);
    console.log(userData.data());
    if (userData.data()) {
      userListner(userData.id);
    } else {
      await setDoc(doc(db, "users", docId), data).then(() => {
        userListner(docId);
      });
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, GoogleProdiver)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        createDocumentIfNotExists(user.uid, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        localStorage.setItem("userInfo", JSON.stringify(user.uid));
        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const facebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        createDocumentIfNotExists(user.uid, {
          user_name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
        setUser(user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const value = {
    googleLogin,
    userListner,
    facebookLogin,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
