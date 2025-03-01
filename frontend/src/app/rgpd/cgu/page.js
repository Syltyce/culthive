import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CGU = () => {
  return (
    <div>
      <Header />
      
      <div className="container">
        <h1 className="title">Conditions Générales d'Utilisation</h1>
        
        <section>
          <h2>ARTICLE 1 : PRÉAMBULE</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site web CultHive (ci-après « le site »). En accédant ou en utilisant ce site, l'utilisateur accepte sans réserve les présentes conditions. Si vous n'acceptez pas ces conditions, vous ne pouvez pas utiliser ce site. Le site CultHive est une plateforme de gestion de films et séries, permettant aux utilisateurs de créer des listes personnelles (Watchlist/Favorites) et d’interagir avec des contenus culturels.
          </p>
        </section>
        
        <section>
          <h2>ARTICLE 2 : ACCÈS AU SITE</h2>
          <h3>2.1. Conditions d'accès</h3>
          <p>
            L'accès au site est gratuit avec la possibilité de faire un don.
          </p>

          <h3>2.2. Disponibilité du site</h3>
          <p>
            Nous nous efforçons de garantir la disponibilité continue du site, mais ne pouvons être tenus responsables de toute interruption de service temporaire pour maintenance, problème technique ou autre raison indépendante de notre volonté.
          </p>
        </section>

        <section>
          <h2>ARTICLE 3 : CRÉATION D'UN COMPTE UTILISATEUR</h2>
          <h3>3.1. Inscription</h3>
          <p>
            Pour accéder à certaines fonctionnalités du site, l'utilisateur doit créer un compte. L'utilisateur s'engage à fournir des informations exactes et à les mettre à jour en cas de changement.
          </p>

          <h3>3.2. Responsabilité du compte</h3>
          <p>
            L'utilisateur est responsable de la confidentialité de ses identifiants de connexion (nom d'utilisateur, mot de passe). En cas de perte ou de vol, l'utilisateur devra immédiatement notifier le support technique du site.
          </p>
        </section>

        <section>
          <h2>ARTICLE 4 : UTILISATION DU SITE</h2>
          <h3>4.1. Accès aux services</h3>
          <p>
            L'utilisateur peut créer et gérer des listes personnelles (Watchlist/Favorites) sur le site, ajouter des œuvres à ses listes, commenter des films ou des séries, et interagir avec d'autres utilisateurs selon les fonctionnalités offertes par la plateforme.
          </p>

          <h3>4.2. Responsabilité de l'utilisateur</h3>
          <p>
            L'utilisateur s'engage à utiliser le site conformément à sa finalité et à respecter les lois en vigueur. Il est interdit d'utiliser le site pour diffuser du contenu illégal, haineux, raciste ou portant atteinte aux droits de tiers.
          </p>
        </section>

        <section>
          <h2>ARTICLE 5 : PROPRIÉTÉ INTELLECTUELLE</h2>
          <h3>5.1. Contenus du site</h3>
          <p>
            Tous les éléments présents sur le site, tels que les textes, images, logos, et bases de données, sont protégés par des droits de propriété intellectuelle. Ces éléments sont la propriété exclusive de CultHive ou de ses partenaires.
          </p>

          <h3>5.2. Utilisation du contenu</h3>
          <p>
            L'utilisateur s'engage à ne pas copier, reproduire, distribuer, ou utiliser de manière non autorisée le contenu du site sans l'accord préalable de CultHive.
          </p>
        </section>

        <section>
          <h2>ARTICLE 6 : DONNÉES PERSONNELLES</h2>
          <h3>6.1. Collecte de données</h3>
          <p>
            Les données personnelles collectées sont régies par la politique de confidentialité du site, disponible <a href="/politique-confidentialite">ici</a>. En utilisant ce site, vous acceptez la collecte et le traitement de vos données personnelles conformément à cette politique.
          </p>
        </section>

        <section>
          <h2>ARTICLE 7 : COOKIES</h2>
          <p>
            Le site utilise des cookies pour améliorer l’expérience utilisateur et analyser l’activité. Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur. Pour plus d'informations, consultez notre <a href="/cookies">politique en matière de cookies</a>.
          </p>
        </section>

        <section>
          <h2>ARTICLE 8 : LIMITATION DE RESPONSABILITÉ</h2>
          <h3>8.1. Fonctionnement du site</h3>
          <p>
            CultHive s'engage à maintenir le site en bon état de fonctionnement. Toutefois, nous ne pourrons être tenus responsables des éventuels dommages causés par des erreurs de programmation, des interruptions ou des dysfonctionnements techniques.
          </p>

          <h3>8.2. Contenus des utilisateurs</h3>
          <p>
            CultHive ne peut être tenu responsable des contenus publiés par les utilisateurs, notamment les commentaires ou les critiques. Chaque utilisateur est responsable des informations qu'il publie sur la plateforme.
          </p>
        </section>

        <section>
          <h2>ARTICLE 9 : MODIFICATION DES CGU</h2>
          <p>
            CultHive se réserve le droit de modifier les présentes Conditions Générales d'Utilisation à tout moment. Les utilisateurs seront informés de ces modifications, et leur utilisation continue du site après modification constituera une acceptation des nouvelles conditions.
          </p>
        </section>

        <section>
          <h2>ARTICLE 10 : LOI APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation sont régies par la législation en vigueur en France. En cas de litige, les tribunaux compétents seront ceux du ressort de Athis-Mons.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default CGU
