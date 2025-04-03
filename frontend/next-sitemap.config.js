/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://culthive.fictyverse.com/', 
    generateRobotsTxt: true, // Générer également un fichier robots.txt
    changefreq: 'daily', // Fréquence de mise à jour des pages
    priority: 0.7, // Priorité des pages
    exclude: ['/404', '/500'], // Exclure certaines pages (par exemple 404, 500)
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://www.culthive.fictyverse.com/sitemap-0.xml', // Sitemaps supplémentaires si nécessaire
      ],
    },
  }
  