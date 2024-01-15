"use client";

import { Inter } from "next/font/google";
import "./ui/globals.css";
import { AuthenticationContext } from "./context/AuthContext";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import NotLoggedInPage from "./ui/notLoggedIn";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "GK Next.js Admin Dashboard",
//   description: "Next.js Tutorial",
// };

export default function RootLayout({ children }) {
  const [appUser, setAppUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setAppUser(currentUser);
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticationContext.Provider value={{ appUser }}>
          {/* <h1>Hi!</h1> */}
          {children}
        </AuthenticationContext.Provider>
      </body>
    </html>
  );
}
