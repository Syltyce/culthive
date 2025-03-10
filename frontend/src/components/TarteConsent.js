'use client'

import { useEffect } from 'react'

const TarteConsent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = '/tarteaucitron/tarteaucitron.min.js'
      script.async = true

      script.onload = () => {
        console.log('Script Tarteaucitron bien chargé')
        // Maintenant que le script est chargé, on peut l'initialiser
        if (typeof tarteaucitron !== 'undefined') {
          console.log('Tarteaucitron disponible et défini')
          tarteaucitron.init({
            privacyUrl:
              'https://culthive-frontend.vercel.app/rgpd/politique-de-confidentialite', // URL de la politique de confidentialité
            bodyPosition: 'bottom', // Position de la bannière
            hashtag: '#tarteaucitron', // Hashtag pour ouvrir le panneau
            cookieName: 'tarteaucitron', // Nom du cookie
            orientation: 'middle', // Position de la bannière
            groupServices: false, // Grouper les services par catégorie
            showDetailsOnClick: true, // Cliquer pour ouvrir la description
            serviceDefaultState: 'wait', // Statut par défaut
            showAlertSmall: false, // Afficher la petite bannière
            cookieslist: false, // Afficher la liste des cookies
            closePopup: true, // Afficher un X pour fermer
            showIcon: true, // Afficher l'icône pour ouvrir le panneau
            iconPosition: 'BottomRight', // Position de l'icône
            DenyAllCta: true, // Bouton pour refuser tout
            AcceptAllCta: true, // Bouton pour accepter tout
            highPrivacy: true, // Attendre le consentement
            alwaysNeedConsent: false, // Demander le consentement même pour les services "Privacy by design"
            handleBrowserDNTRequest: false, // Refuser tout si Do Not Track est activé
            removeCredit: false, // Retirer le lien de crédit vers tarteaucitron.io
            moreInfoLink: true, // Lien "En savoir plus"
            useExternalCss: false, // Ne pas utiliser un CSS externe
            useExternalJs: false, // Ne pas utiliser un JS externe
            mandatory: true, // Afficher un message pour les cookies obligatoires
            mandatoryCta: true, // Ne pas afficher de bouton pour les cookies obligatoires
            googleConsentMode: true, // Activer le Google Consent Mode
            partnersList: false, // Afficher le nombre de partenaires
          })
        } else {
          console.error(
            "Le script Tarteaucitron n'a pas été chargé correctement."
          )
        }
      }

      script.onerror = () => {
        console.error('Erreur de chargement du script Tarteaucitron')
      }

      document.head.appendChild(script)
    }
  }, [])

  return <div></div> // Tu peux aussi ajouter un message ou un autre contenu dans ce div
}

export default TarteConsent;
