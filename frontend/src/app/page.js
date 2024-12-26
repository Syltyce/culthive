import styles from "./page.module.css"; // Import du fichier CSS spécifique à cette page
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenue sur CultHive</h1>
        <p className={styles.paragraph}>Archivez vos découvertes, listez vos envies.</p>
        <p className={styles.paragraph}>Explorez les recommandations de votre réseau.</p>
        <p className={styles.paragraph}>Partagez ce qui vous fait vibrer.</p>

        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Culthive vous permet de...</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <Image
                src="/icons/track.svg"
                alt="Suivi des activités"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Garder une trace de tout ce que vous regardez, lisez ou écoutez.</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/icons/like.svg"
                alt="Aimer"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Montrer votre appréciation pour vos œuvres, critiques et listes préférées.</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/icons/review.svg"
                alt="Critiques"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Écrire et partager vos avis, et suivre vos amis ainsi que d'autres membres pour découvrir les leurs.</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/icons/rate.svg"
                alt="Notations"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Noter chaque œuvre sur une échelle de 1 à 10 pour enregistrer et partager vos impressions.</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/icons/journal.svg"
                alt="Journal"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Tenir un journal de vos activités culturelles (et passer à la version Premium pour accéder à des statistiques complètes).</p>
            </div>
            <div className={styles.card}>
              <Image
                src="/icons/list.svg"
                alt="Listes"
                width={50}
                height={50}
              />
              <p className={styles.paragraph}>Créer et partager des listes thématiques et conserver une liste de vos envies culturelles.</p>
            </div>
          </div>
          <div className={styles.callToAction}>
            Avec Culthive, exploitez votre passion pour la culture !
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
