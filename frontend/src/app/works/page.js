// frontend/src/app/works/page.js
import Link from "next/link";

export default function Works() {
  return (
    <div>
      <h1>Découvrez nos œuvres</h1>
      <nav>
        <ul>
          <li>
            <Link href="/works/movies">Films</Link>
          </li>
          <li>
            <Link href="/works/series">Séries</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
