'use client'
import { useEffect, useState } from 'react'

import Header from '@/components/Header'
import Footer from '@/components/Footer' 

import '../styles/AdminUsers.css'

export default function UsersPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [users, setUsers] = useState([])

  // Fonction pour récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (!response.ok)
          throw new Error('Erreur lors de la récupération des utilisateurs')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  // Fonction pour bannir un utilisateur
  const handleBanUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/ban/${userId}`, {
        method: 'PATCH', // ou "PUT" selon la méthode utilisée
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok)
        throw new Error("Erreur lors du bannissement de l'utilisateur")

      const data = await response.json()
      console.log('Utilisateur banni : ', data)

      // Mettre à jour l'état des utilisateurs après bannissement
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    } catch (error) {
      console.error('Erreur lors du bannissement :', error)
    }
  }

  return (
    <div className='page-container'>
      <Header />
      <div className='admin-users'>
        <h1>Gestion des Utilisateurs</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.email}</strong> 
              {user.banned ? (
                <span> (Banni)</span>
              ) : (
                <button onClick={() => handleBanUser(user.id)}>Bannir</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
