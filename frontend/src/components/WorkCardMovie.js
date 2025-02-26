import React from 'react'
import Link from 'next/link'
import '../styles/WorkCard.css'

function WorkCardMovie({ work }) {
  if (!work || !work.id) {
    return <div>Chargement...</div> // Si `work` est inexistant ou mal formé, affiche un message
  }

  const link = `/works/movies/${work.id}`

  return (
    <Link href={link}>
      <div className="work-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
          alt={work.title}
          className="work-card__image"
        />
        <div className="work-card__info">
          <h2 className="work-card__title">{work.title}</h2>
          <p className="work-card__release-date">{work.release_date}</p>
          <p className="work-card__overview">
            {work.overview.slice(0, 100)}...
          </p>
          <p className="work-card__rating">Rating: {work.vote_average}/10</p>
        </div>
      </div>
    </Link>
  )
}

export default WorkCardMovie
