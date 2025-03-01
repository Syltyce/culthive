import './style_cgv.css';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CGV = () => {
  return (
    <div>
      <Header />
      <main className="content-container">
        <h1>Conditions Générales de Vente</h1>
        
        <section className="donations">
          <h2>Dons via Stripe</h2>
          <p>
            Vous avez la possibilité de faire des dons de montants libres grâce à Stripe.
            Ces dons sont utilisés pour soutenir le développement du site et améliorer
            les services proposés. Tous les paiements sont sécurisés.
          </p>
        </section>

        <section className="refund-policy">
          <h2>Politique de Remboursement</h2>
          <p>
            Les dons effectués sont non remboursables, sauf en cas de double facturation
            ou problème technique. Si vous rencontrez un problème, veuillez contacter
            notre support.
          </p>
        </section>

        <section className="jurisdiction">
          <h2>Loi Applicable et Juridiction Compétente</h2>
          <p>
            Les présentes Conditions Générales de Vente sont régies par la législation
            française. En cas de litige, les tribunaux compétents seront ceux d'Athis-Mons.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CGV
