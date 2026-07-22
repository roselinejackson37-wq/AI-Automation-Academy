import { createContext, useContext, useEffect, useState } from "react";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

// Where we temporarily remember the email the person typed in, so that when
// they click the magic link (often on the same device, sometimes not) we can
// complete sign-in without asking them to type it again.
const PENDING_EMAIL_KEY = "academy_pending_email";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user?.email) {
        await checkEnrollment(user.email);
      } else {
        setIsEnrolled(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Checks the "students" collection in Firestore for a document keyed by
  // the person's lowercased email. That document is what marks someone as a
  // paying student — see README.md "Connecting Selar purchases" for how
  // that collection gets populated.
  async function checkEnrollment(email) {
    try {
      const ref = doc(db, "students", email.toLowerCase());
      const snap = await getDoc(ref);
      setIsEnrolled(snap.exists());
    } catch (err) {
      console.error("Enrollment check failed:", err);
      setIsEnrolled(false);
    }
  }

  async function sendMagicLink(email) {
    const actionCodeSettings = {
      url: `${window.location.origin}/verify`,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem(PENDING_EMAIL_KEY, email);
  }

  async function completeSignIn(currentUrl) {
    if (!isSignInWithEmailLink(auth, currentUrl)) {
      throw new Error("This link is not a valid sign-in link.");
    }
    let email = window.localStorage.getItem(PENDING_EMAIL_KEY);
    if (!email) {
      // They opened the link on a different device than they requested it
      // from — ask once, then continue.
      email = window.prompt("Please confirm your email to finish signing in:");
    }
    const result = await signInWithEmailLink(auth, email, currentUrl);
    window.localStorage.removeItem(PENDING_EMAIL_KEY);
    await checkEnrollment(result.user.email);
    return result.user;
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    isEnrolled,
    loading,
    sendMagicLink,
    completeSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
