import './style_mentions-legales.css';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const MentionsLegales = () => {
  return (
    <div>
      <Header />
      <main className="mention-legales-container">
        <h1>Mentions légales</h1>

        <section className="site-info">
          <h2>Site</h2>
          <p>
            CultHive, accessible via <a href="https://culthive.fictyverse.com/">https://culthive.fictyverse.com/</a> ou <a href="https://culthive-frontend.vercel.app/">https://culthive-frontend.vercel.app/</a>
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
            Le nom de domaine est fourni par <strong>Hostinger</strong>.
            Pour contacter Hostinger, veuillez visiter leur <strong> <a href="https://www.hostinger.fr/contact">page de contact.</a> </strong>
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
            CultHive - Fictyverse <br />
            75 001 Paris, France<br />
            Pour contacter CultHive, veuillez envoyer un mail à <strong> <a href="mailto:contact@culthive.fictyverse.com">contact@culthive.fictyverse.com</a> </strong>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default MentionsLegales
