// components/Footer.js
import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2024 CultHive </p>
      <nav>
        <ul>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Politique de confidentialité</a></li>
        </ul>
      </nav>
    </footer>
  );
}
