// components/Footer.js
'use client' // Marquer ce fichier comme un composant côté client

import React from 'react'
import Link from 'next/link'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          {/* <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li> */}
          <Link href="/rgpd/mentions-legales" className="footer-link">
            Mentions légales
          </Link>
          <Link
            href="/rgpd/politique-de-confidentialite"
            className="footer-link"
          >
            Politique de confidentialité
          </Link>
          <Link href="/rgpd/gestion-cookies" className="footer-link">
            Gestion des cookies
          </Link>
          <Link href="/rgpd/cgu" className="footer-link">
            CGU
          </Link>
          <Link href="/rgpd/cgv" className="footer-link">
            CGV
          </Link>
        </ul>
      </nav>

      <p>&copy; 2025 CultHive - All Rights Reserved </p>
    </footer>
  )
}
