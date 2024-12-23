import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Link from "next/link";
import styles from "./Login.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}> Se connecter</h1>
        <p className={styles.subtitle}>Ca fait plaisir de vous revoir</p>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Nom d'utilisateur ou email"
            name="username"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            className={styles.input}
          />
          <Link href="#" className={styles.link}>
          <span className={styles.highlight_2}> Mot de passe oublié ? </span>
          </Link>
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
        <Link href="/users/register" className={styles.link}>
          Pas encore de compte ? <span className={styles.highlight}>Inscrivez-vous</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
