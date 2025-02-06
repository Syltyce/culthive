// admin/page.js
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Tableau de bord administrateur</h1>
      <Link href="/admin/reviews">Voir les critiques</Link>
      <Link href="/admin/users">Gestion des utilisateurs</Link>
    </div>
  );
}
