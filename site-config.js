/* =====================================================================
   SITE CONFIGURATION — edit your personal details here.
   ---------------------------------------------------------------------
   Everything in this file is PUBLIC once the site is deployed.
   Never put passwords, API keys, phone numbers or your home address here.

   Rules used by assets/js/main.js:
   • A value that still starts with "YOUR_" is treated as "not configured":
     the link is shown, but disabled and marked as a placeholder, so
     visitors never land on a broken URL.
   • An empty string ("") hides that link completely (useful for optional
     profiles such as Upwork).
   • When you open the site on localhost, a small banner lists every value
     that still needs to be filled in. The banner never appears online.

   If you change your name or domain, also update the <head> of index.html
   (title, meta description, canonical URL, social tags, structured data).
   ===================================================================== */

window.SITE_CONFIG = {
  // Your full name as you want it shown publicly, e.g. "Jane Rahman".
  name: "Tofail Alam",

  // Short label shown under your name and in the hero.
  role: "Software Engineer · .NET Developer",

  // City / country shown publicly (no street address).
  location: "Dhaka, Bangladesh",

  // Year your professional career started. Used for "since 2018" text.
  careerStartYear: 2018,

  // Availability line in the hero and contact section. Keep it honest.
  availability: "Open to freelance projects and remote opportunities",

  // Email used for the mailto: links. It is publicly visible, so expect
  // some spam; a separate address just for work enquiries is a good idea.
  email: "tofailalamtushar123@gmail.com",

  // Full profile URLs, including https://
  github: "https://github.com/tofailalamtushar",
  linkedin: "https://www.linkedin.com/in/tofail-alam-tushar-99a923119",
  upwork: "",                     // optional — add a URL to show it
  fiverr: "https://www.fiverr.com/tushar_alam",

  // Path to your CV, relative to index.html. assets/cv.pdf is a web-safe
  // version generated from your CV (no phone, address, birth date or
  // personal details). Review it; to use your own PDF, replace the file.
  cvFile: "assets/cv.pdf",
  cvReady: true
};
