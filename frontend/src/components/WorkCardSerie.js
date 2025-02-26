import React from 'react'
import Link from 'next/link'
import '../styles/WorkCard.css'

function WorkCardSerie({ work }) {
  const link = `/works/series/${work.id}`

  return (
    <Link href={link}>
      <div className="work-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
          alt={work.name} // Notez que les séries utilisent généralement `name` au lieu de `title`
          className="work-card__image"
        />
        <div className="work-card__info">
          <h2 className="work-card__title">{work.name}</h2>
          <p className="work-card__release-date">{work.first_air_date}</p>
          <p className="work-card__overview">
            {work.overview.slice(0, 100)}...
          </p>
          <p className="work-card__rating">Rating: {work.vote_average}/10</p>
        </div>
      </div>
    </Link>
  )
}

export default WorkCardSerie
