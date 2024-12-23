import React from "react";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">Culthive</div>
      <nav className="header-nav">
        <Link href="/">Accueil</Link>
        <Link href="/works/movies">Films</Link>
        <Link href="/works/series">Séries</Link>
        <Link href="#members">Membres</Link>
      </nav>
      <div className="header-actions">
        <input type="text" className="search-bar" placeholder="Rechercher..." />
        <Link href="/users/login">
        <button className="btn login">Connexion</button>
        </Link>
        <Link href="/users/register">
        <button className="btn signup">Inscription</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
