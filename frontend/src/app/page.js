import styles from "./page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Bienvenue sur CultHive</h1>
      </main>
      <Footer />
    </div>
  );
}
