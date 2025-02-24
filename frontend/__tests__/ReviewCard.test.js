import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReviewCard from '@/components/ReviewCard';

describe('ReviewCard', () => {
  const mockReview = {
    id: 1,
    title: 'Super film',
    comment: 'J’ai adoré ce film !',
    rating: 9,
    User: { username: 'JohnDoe' },
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(
      <ReviewCard 
        review={mockReview} 
        onUpdate={mockOnUpdate} 
        onDelete={mockOnDelete} 
      />
    );
  });

  it('affiche correctement les informations de la review', () => {
    expect(screen.getByText('Super film')).toBeInTheDocument();
    expect(screen.getByText('J’ai adoré ce film !')).toBeInTheDocument();
    expect(screen.getByText('Note: 9 / 10')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /JohnDoe a commenté/i })).toBeInTheDocument();
});

  it('passe en mode édition lorsqu’on clique sur "Modifier"', () => {
    fireEvent.click(screen.getByText('Modifier'));
    
    expect(screen.getByDisplayValue('Super film')).toBeInTheDocument();
    expect(screen.getByDisplayValue('J’ai adoré ce film !')).toBeInTheDocument();
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
  });

  it('met à jour la review et appelle onUpdate', () => {
    fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));

    const titleInput = screen.getByDisplayValue('Super film');
    const commentInput = screen.getByDisplayValue('J’ai adoré ce film !');
    const ratingInput = screen.getByDisplayValue('9');

    fireEvent.change(titleInput, { target: { value: 'Film incroyable' } });
    fireEvent.change(commentInput, { target: { value: 'Vraiment un chef-d’œuvre !' } });
    fireEvent.change(ratingInput, { target: { value: '10' } });

    fireEvent.click(screen.getByText('Valider'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockReview,
      title: 'Film incroyable',
      comment: 'Vraiment un chef-d’œuvre !',
      rating: '10',
    });
  });

  it('supprime la review lorsque l’on clique sur "Supprimer"', () => {
    fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
