// admin/page.js
import Header from '@/components/Header'
import Footer from '@/components/Footer' 
import Link from 'next/link'

import './styles/AdminDashboard.css' // Import du CSS de la liste de films


export default function AdminDashboard() {
  return (
    <div className='page-container'>
      <Header />
      <div className='admin-dashboard'>
      <h1>Tableau de bord administrateur</h1>
      <Link href="/admin/reviews">Voir les critiques</Link>
      <Link href="/admin/users">Gestion des utilisateurs</Link>
      </div>
      <Footer />
    </div>
  )
}
