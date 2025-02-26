import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CancelPage() {
  return (
    <div>
      <Header />
      <div className="cancel-container">
        <h1>❌ Paiement annulé</h1>
        <p>
          Votre paiement a été annulé. Vous pouvez réessayer si vous le
          souhaitez.
        </p>
      </div>
      <Footer />
    </div>
  )
}
