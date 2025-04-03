import './style_gestion-cookies.css';

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const GestionCookies = () => {
  return (
    <div>
      <Header />
      <main className="cookie-container">
        <h1>Gestion des Cookies</h1>

        <section className="cookie-info">
          <h2>Qu'est-ce qu'un cookie ?</h2>
          <p>
            Les cookies sont des fichiers stockés sur votre appareil permettant d'améliorer votre expérience sur CultHive.
          </p>
        </section>

        <section className="cookie-types">
          <h2>Cookies utilisés sur CultHive</h2>
          <ul>
            <li><strong>Cookies essentiels :</strong> Assurent le bon fonctionnement du site (connexion, navigation).</li>
            <li><strong>Cookies analytiques :</strong> Permettent de mesurer l'audience du site via Google Analytics.</li>
          </ul>
        </section>

        <section className="cookie-management">
          <h2>Gestion des cookies</h2>
          <p>
            Vous pouvez accepter ou refuser les cookies via la bannière dédiée lors de votre première visite. Vous avez également la possibilité de modifier vos préférences à tout moment dans les paramètres de votre navigateur.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default GestionCookies
