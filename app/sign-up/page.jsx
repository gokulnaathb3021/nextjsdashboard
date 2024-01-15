"use client";

import styles from "@/app/ui/login/login.module.css";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { AuthenticationContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { appUser } = useContext(AuthenticationContext);
  if (appUser?.email) {
    console.log("You're already logged in.");
    router.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      // sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Set a password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className={styles.button} type="submit">
          Sign Up
        </button>
        {/* <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link> */}
      </form>
    </div>
  );
}
