"use client";
import Link from "next/link";
import styles from "./homepage.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";
// import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";

export default function HomePage() {
  // const [user] = useAuthState(auth);
  const router = useRouter();
  // const userSession = sessionStorage.getItem("user");
  // if (!user && !userSession) {
  // if (!user) {
  //   router.push("/sign-up");
  // }
  const { appUser } = useContext(AuthenticationContext);
  if (!appUser) {
    console.log("not loggedin");
    router.push("/login");
  }
  return (
    <div className={styles.container}>
      <Link href="/dashboard">
        <button className={styles.button}>Go To Your Dashboard</button>
      </Link>
      <button
        onClick={() => {
          signOut(auth);
        }}
        className={styles.logout}
      >
        Log Out
      </button>
    </div>
  );
}
