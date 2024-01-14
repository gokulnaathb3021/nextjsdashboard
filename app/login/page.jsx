"use client";
import { useState } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/login/login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [areCredentialsInvalid, setAreCredentialsInvalid] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        sessionStorage.setItem("user", true);
        setEmail("");
        setPassword("");
        setAreCredentialsInvalid(false);
        router.push("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(`${errorMessage} - Code is ${errorCode}`);
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
        {areCredentialsInvalid && <p>Invalid Credentials!</p>}
      </form>
    </div>
  );
}
