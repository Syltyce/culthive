// src/components/WorkCard.js

function WorkCard({ work }) {
  return (
    <div className="work-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${work.poster_path}`}
        alt={work.title}
        className="work-card__image"
      />
      <div className="work-card__details">
        <h2>{work.title}</h2>
        <p>{work.overview}</p>
      </div>
    </div>
  );
}

export default WorkCard;
