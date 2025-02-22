// src/components/TarteConsent.js
"use client"; // Pour indiquer que ce fichier doit être exécuté côté client

import { useEffect } from "react";

const TarteConsent = () => {
  useEffect(() => {

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/tarteaucitron/css/tarteaucitron.min.css"; // Chemin du fichier CSS
    document.head.appendChild(link);

    // Dynamically import the script only on the client
    const script = document.createElement("script");
    script.src = "/tarteaucitron/tarteaucitron.min.js"; // Chemin du fichier tarteaucitron.min.js
    script.async = false; // Charger le script de façon asynchrone

    document.head.appendChild(script);

    script.onload = () => {
      console.log("Tarteaucitron script loaded"); // Vérifie si le script se charge

      // Initialisation après le chargement du script
      if (window.tarteaucitron) {
        console.log("Tarteaucitron initialized"); // Vérifie si l'initialisation fonctionne

        window.tarteaucitron.init({
          privacyUrl: "", // Lien vers la politique de confidentialité
          bodyPosition: "top",
          hashtag: "#tarteaucitron",
          cookieName: "tarteaucitron",
          orientation: "middle",
          groupServices: true,
          showDetailsOnClick: true,
          serviceDefaultState: "wait",
          showAlertSmall: false,
          cookieslist: false,
          closePopup: true,
          showIcon: true,
          iconPosition: "BottomRight",
          adblocker: false,
          DenyAllCta: true,
          AcceptAllCta: true,
          highPrivacy: true,
          alwaysNeedConsent: false,
          handleBrowserDNTRequest: false,
          removeCredit: false,
          moreInfoLink: true,
          useExternalCss: false,
          useExternalJs: false,
          readmoreLink: "",
          mandatory: true,
          mandatoryCta: false,
          googleConsentMode: true,
          partnersList: true,
        });
      }
    };

    // Nettoyage en cas de départ du composant
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Ce composant n'affiche rien à l'écran, il se charge uniquement du script
};

export default TarteConsent;
