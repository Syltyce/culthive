import './style_mentions-legales.css';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const MentionsLegales = () => {
  return (
    <div>
      <Header />
      <main className="content-container">
        <h1>Mentions légales</h1>

        <section className="site-info">
          <h2>Site</h2>
          <p>
            CultHive, accessible via <a href="https://www.culthive.fictyverse.com/">https://www.culthive.fictyverse.com/</a> ou <a href="https://www.fictyverse.com/culthive">https://www.fictyverse.com/culthive</a>.
          </p>
        </section>

        <section className="editor-info">
          <h2>Éditeur du site</h2>
          <p>
            CultHive - Sylvain, Indépendant à Paris
          </p>
          <p>Email : <a href="mailto:sylvain.gg.fr@gmail.com">sylvain.gg.fr@gmail.com</a></p>
        </section>

        <section className="host-info">
          <h2>Hébergeur du site</h2>
          <p>
            Le site est hébergé par <strong>Hostinger</strong>.
          </p>
          <p>
            La partie Front est hébergée sur <strong>Vercel</strong>.
          </p>
          <p>
            La partie Back et la base de données sont hébergées sur <strong>Railway</strong>.
          </p>
        </section>

        <section className="headquarters">
          <h2>Siège social</h2>
          <p>
            Hostinger International Ltd<br />
            61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
            Pour contacter Hostinger, veuillez visiter leur <a href="https://www.hostinger.fr/contact">page de contact</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default MentionsLegales
