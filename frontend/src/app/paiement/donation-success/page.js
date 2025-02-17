import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function SuccessPage() {
  return (
    <div>
      <Header />
      <div className="success-container">
        <h1>🎉 Merci pour votre don !</h1>
        <p>Votre soutien est très apprécié. ❤️</p>
      </div>
      <Footer />
    </div>
  );
}
