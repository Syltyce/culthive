import './style_politique-de-confidentialite.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PolitiqueConfidentialite = () => {
  return (
    <div>
      <Header />

      <main className="policy-content">
        <h1 className="policy-title">Politique de Confidentialité</h1>

        <section className="policy-section">
          <h2 className="policy-subtitle">ARTICLE 1 : PRÉAMBULE</h2>
          <p>
            La présente politique de confidentialité a pour but d’informer les
            utilisateurs du site CultHive :
          </p>
          <ul className="policy-list">
            <li>Sur la manière dont sont collectées leurs données personnelles.</li>
            <li>Sur les droits dont ils disposent concernant ces données.</li>
            <li>Sur la personne responsable du traitement des données à caractère personnel collectées et traitées.</li>
            <li>Sur les destinataires de ces données personnelles.</li>
            <li>Sur la politique du site en matière de cookies.</li>
          </ul>
          <p>
            Cette politique complète les mentions légales et les Conditions
            Générales d’Utilisation consultables à l’adresse suivante :
          </p>
          <ul className="policy-links">
            <li>
              <a href="/rgpd/mentions-legales" target="_blank" rel="noopener noreferrer">
                Mentions Légales
              </a>
            </li>
            <li>
              <a href="/rgpd/cgu" target="_blank" rel="noopener noreferrer">
                CGU
              </a>
            </li>
          </ul>
        </section>

        <section className="policy-section">
          <h2 className="policy-subtitle">
            ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES DONNÉES PERSONNELLES
          </h2>
          <p>
            Conformément à l’article 5 du Règlement européen 2016/679, les données à caractère personnel sont :
          </p>
          <ul className="policy-list">
            <li>Traitées de manière licite, loyale et transparente.</li>
            <li>Collectées pour des finalités déterminées (cf. Article 3.1) et légitimes.</li>
            <li>Adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités du traitement.</li>
            <li>Exactes et tenues à jour si nécessaire.</li>
            <li>Conservées pour une durée n'excédant pas celle nécessaire aux finalités du traitement.</li>
            <li>Traitées de façon à garantir une sécurité appropriée.</li>
          </ul>
          <p>
            Le traitement n'est licite que si, et dans la mesure où, au moins une des conditions suivantes est remplie :
          </p>
          <ul className="policy-list">
            <li>La personne concernée a consenti au traitement de ses données pour une bonne utilisation du site internet.</li>
            <li>Le traitement est nécessaire pour la création de compte.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2 className="policy-subtitle">
            ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES
          </h2>
          <h3 className="policy-subsection">3.1 : Données collectées</h3>
          <p>
            Les données personnelles collectées dans le cadre de l’utilisation du site CultHive sont les suivantes :
          </p>
          <ul className="policy-list">
            <li>Adresse e-mail</li>
            <li>Nom d'utilisateur</li>
            <li>Préférences et activités sur la plateforme</li>
          </ul>
          <p>La collecte et le traitement de ces données ont pour finalité :</p>
          <ul className="policy-list">
            <li>La gestion des comptes utilisateurs.</li>
            <li>L'amélioration de l'expérience utilisateur.</li>
          </ul>

          <h3 className="policy-subsection">3.2 : Mode de collecte des données</h3>
          <p>
            Lorsque vous utilisez notre site, nous collectons automatiquement certaines informations via des cookies :
          </p>
          <ul className="policy-list">
            <li>Adresse IP</li>
            <li>Données de navigation</li>
          </ul>

          <h3 className="policy-subsection">3.3 : Hébergement des données</h3>
          <p>
            Le site CultHive est hébergé par les services suivants :
          </p>
          <ul className="policy-list">
            <li><strong>Frontend (site web) :</strong> Vercel (<a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>)</li>
            <li><strong>Backend (serveur) :</strong> Railway (<a href="https://railway.app" target="_blank" rel="noopener noreferrer">https://railway.app</a>)</li>
          </ul>
          <p>
            Le nom de domaine du site est : <strong><a href="https://culthive.fictyverse.com" target="_blank" rel="noopener noreferrer">culthive.fictyverse.com</a></strong>.
          </p>

          <h3 className="policy-subsection">3.4 : Politique en matière de cookies</h3>
          <p>
            Des cookies sont utilisés pour améliorer l’expérience utilisateur et analyser l’activité du site. Vous pouvez gérer vos préférences dans les paramètres de votre navigateur.
          </p>
        </section>

        <section className="policy-section">
          <h2 className="policy-subtitle">ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES</h2>
          <p>Le responsable du traitement des données est :</p>
          <p>
            <strong>Sylvain GONCALVES</strong>
            <br />
            Email : <a href="mailto:contact@culthive.fictyverse.com">contact@culthive.fictyverse.com</a>
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une plainte à la CNIL.
          </p>
        </section>

        <section className="policy-section">
          <h2 className="policy-subtitle">ARTICLE 5 : DROITS DES UTILISATEURS</h2>
          <p>
            Tout utilisateur concerné par le traitement de ses données personnelles peut se prévaloir des droits suivants :
          </p>
          <ul className="policy-list">
            <li>Droit d’accès, de rectification et droit à l’effacement des données.</li>
            <li>Droit à la portabilité des données.</li>
            <li>Droit à la limitation et à l’opposition du traitement.</li>
            <li>Droit de déterminer le sort des données après la mort.</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:contact@fictyverse.com">contact@fictyverse.com</a>
          </p>
        </section>

        <section className="policy-section">
          <h2 className="policy-subtitle">ARTICLE 6 : MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications seront mises à jour sur cette page.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default PolitiqueConfidentialite
