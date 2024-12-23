import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Link from "next/link";
import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.subtitle}>Rejoignez-nous et découvrez de nouvelles œuvres passionnantes.</p>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            className={styles.input}
          />
                  <input
          className={styles.input}
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          className={styles.input}
          type="tel"
          placeholder="Téléphone"
          name="phone"
        />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            S'inscrire
          </button>
        </form>
        <Link href="/users/login" className={styles.link}>
          Vous avez déjà un compte ? <span className={styles.highlight}>Je me connecte</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
