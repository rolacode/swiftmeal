// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  getIdToken
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state and load role from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
          role: snap.exists() ? snap.data().role : null,
          emailVerified: u.emailVerified
        });
      } catch (err) {
        console.error("Failed loading user doc:", err);
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName,
          photoURL: u.photoURL,
          role: null,
          emailVerified: u.emailVerified
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  // Create account, save role, send verification
  const signup = async ({ email, password, displayName, role }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });

    // Save Firestore doc
    await setDoc(doc(db, "users", cred.user.uid), {
      displayName,
      email,
      role,
      createdAt: Date.now()
    });

    // Send verification email
    await sendEmailVerification(cred.user);

    // Force token refresh (if you later check claims)
    await getIdToken(cred.user, true);

    return cred.user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Google login/signup. Accepts role (if calling from Signup page pass selected role)
  const loginWithGoogle = async (role = null) => {
    const res = await signInWithPopup(auth, googleProvider);

    // On first sign-in we create/merge a user doc with role if provided
    await setDoc(
      doc(db, "users", res.user.uid),
      {
        email: res.user.email,
        displayName: res.user.displayName,
        role: role || undefined, // if null, don't set role
        lastLogin: Date.now()
      },
      { merge: true }
    );

    // Refresh token to see claims/changes
    await getIdToken(res.user, true);

    return res.user;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
