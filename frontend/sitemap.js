export default function handler(req, res) {
  const baseUrl = 'https://culthive.fictyverse.com/'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/</loc>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/works/movies</loc>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/works/series</loc>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/paiement</loc>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/users/login</loc>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/users/register</loc>
          <priority>0.8</priority>
        </url>
      </urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.status(200).send(sitemap)
}
