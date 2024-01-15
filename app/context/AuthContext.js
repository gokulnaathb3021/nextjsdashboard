// import { onAuthStateChanged, getAuth } from "firebase/auth";

// import { auth } from "../firebase/config";

// onAuthStateChanged is a function that will be triggered everytime there's a change in the auth state.
// If I go to a page and Firebase recognizes that I was logged in, it will automatically change the value of onAuthStateChanged to contain the user who is logged in.

import { createContext } from "react";

export const AuthenticationContext = createContext({});
