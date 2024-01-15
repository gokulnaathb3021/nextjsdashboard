import Link from "next/link";
import styles from "./notLoggedIn.module.css";

export default function NotLoggedInPage() {
  return (
    <div className={styles.container}>
      <h1>You have not logged in!</h1>
      <Link href="/login">
        <button className={styles.button}>Login</button>
      </Link>
    </div>
  );
}
