"use client";

import React, { useState, useEffect, useContext } from "react";
import "../styles/ReviewCard.css";
import AuthContext from "./AuthContext";

function ReviewCard({ review, onUpdate, onDelete }) {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false); // Suivi de l'état d'édition
  const [updatedTitle, setUpdatedTitle] = useState(review.title);
  const [updatedComment, setUpdatedComment] = useState(review.comment);
  const [updatedRating, setUpdatedRating] = useState(review.rating); // Ajout de la note modifiable

  const [username, setUsername] = useState(
    review.User ? review.User.username : ""
  ); // Conserver le username séparément

  useEffect(() => {
    // Met à jour le username si review.User.change (si jamais l'objet `User` change au fil du temps)
    setUsername(review.User ? review.User.username : "");
  }, [review.User]); // Le username changera uniquement si review.User change

  const handleUpdate = () => {
    const updatedReview = {
      ...review,
      title: updatedTitle,
      comment: updatedComment,
      rating: updatedRating, // Inclure la nouvelle note
    };
    onUpdate(updatedReview); // Appel de la fonction onUpdate pour appliquer la modification
    setIsEditing(false); // Fermer le mode édition après la mise à jour
  };

  const isUserReviewOwner = user?.id === review.userId; 

  return (
    <div className="review-card">
      <div className="review-content">
        {isEditing ? (
          <>
            <h4>
              <strong>{username}</strong> a commenté :
            </h4>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="update-title"
            />
            <textarea
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
              className="update-comment"
            />
            <input
              type="number"
              value={updatedRating}
              onChange={(e) => setUpdatedRating(e.target.value)}
              min="1"
              max="10"
              className="update-rating"
            />
            <button onClick={handleUpdate} className="update-btn">
              Valider
            </button>
          </>
        ) : (
          <>
            <h3>
              <strong>{username}</strong> a commenté :
            </h3>
            <h4>{review.title}</h4>
            <p>{review.comment}</p>
            <p>Note: {review.rating} / 10</p>

            {isUserReviewOwner && ( // Afficher les boutons seulement si l'utilisateur est le propriétaire de la critique
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="update-btn"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(review.id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </>
            )}

          </>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
