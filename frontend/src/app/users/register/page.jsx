"use client";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Link from "next/link";
import styles from "./Register.module.css";
import { useState } from "react";

export default function Register() {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerTel, setRegisterTel] = useState('');

  const register = async () => {
    console.log(registerUsername);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        phone: registerTel,
      }),
  });

  const data = await response.json();
    if (response.ok) {
      console.log("Inscription réussie :", data);
    } else {
      console.error("Erreur :", data.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.subtitle}>Rejoignez-nous et découvrez de nouvelles œuvres passionnantes.</p>
        <form onSubmit={(e) => { e.preventDefault(); register(); }} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            onChange={e => setRegisterUsername(e.target.value)}
          />
                  <input
          className={styles.input}
          type="email"
          placeholder="Email"
          name="email"
          onChange={e => setRegisterEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="tel"
          placeholder="Téléphone"
          name="phone"
          onChange={e => setRegisterTel(e.target.value)}
        />
          <input
            className={styles.input}
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={e => setRegisterPassword(e.target.value)}
          />
          <button onClick={register} type="submit" className={styles.button}>
            S'inscrire
          </button>
        </form>
        <Link href="/users/login" className={styles.link}>
          Vous avez déjà un compte ? <span className={styles.highlight}>Je me connecte</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
