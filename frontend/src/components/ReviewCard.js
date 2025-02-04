import React from "react";
import "../styles/ReviewCard.css";


function ReviewCard({ review, onUpdate, onDelete }) {

  return (
    <div className="review-card">
      {/* Affiche du film */}

      <div className="review-content">

        {/* Note de l'utilisateur */}
        <p className="rating">⭐ {review.rating} / 10</p>

        {/* Avis (Titre + Commentaire) */}
        <h4> <strong> {review.User.username} </strong> a commenté : </h4>
        <h4>{review.title}</h4>
        <p>{review.comment}</p>

        {/* Boutons Update / Delete */}
        <div className="actions">            
          <button onClick={() => onUpdate(review)} className="update-btn">Modifier</button>
          <button onClick={() => onDelete(review.id)} className="delete-btn">Supprimer</button>
        </div>
      </div>
    </div>
  );
  
}

export default ReviewCard;
