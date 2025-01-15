// src/components/WorkCard.js
import React from 'react';
import Link from 'next/link'; // Import du lien de Next.js
import '../styles/WorkCard.css'; // Import du CSS de la carte

function WorkCard({ work }) {
  return (
    
    <Link href={`/works/${work.id}`}>

    <div className="work-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
        alt={work.title}
        className="work-card__image"
      />
      <div className="work-card__info">
        <h2 className="work-card__title">{work.title}</h2>
        <p className="work-card__release-date">{work.release_date}</p>
        <p className="work-card__overview">{work.overview.slice(0, 100)}...</p>
        <p className="work-card__rating">Rating: {work.vote_average}/10</p>
      </div>
    </div>

    </Link>

  );
}

export default WorkCard;
