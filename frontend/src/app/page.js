import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bienvenue sur l'application de films et séries</h1>
        <nav>
          <ul>
            <li>
              <Link href="/works"> Films et Séries </Link>
            </li>
            <li>
              <Link href="/works/movies">Films</Link>
            </li>
            <li>
              <Link href="/works/series">Séries</Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
