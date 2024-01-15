"use client";
import { useState } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/login/login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import Link from "next/link";

export default function Login() {
  const { appUser } = useContext(AuthenticationContext);
  const router = useRouter();
  if (appUser?.email) {
    console.log("You're already logged-in");
    router.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        setAreCredentialsInvalid(false);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorMessage} - Code is ${errorCode}`);
        setAreCredentialsInvalid(true);
      });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          id="email"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
        <Link href="/sign-up">
          <button className={styles.button}>Signup</button>
        </Link>
        {areCredentialsInvalid && <p>Invalid Credentials!</p>}
      </form>
    </div>
  );
}
