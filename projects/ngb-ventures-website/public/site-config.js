/*
 * NGB Ventures: runtime settings. Edit this one file and save (no rebuild needed).
 *
 *   gaId           Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ9". Leave "" to switch analytics off.
 *   formEndpoint   Optional form backend URL (e.g. Formspree "https://formspree.io/f/xxxxxxx" or
 *                  Web3Forms "https://api.web3forms.com/submit"). Leave "" to use one-tap email/WhatsApp sending.
 *   formAccessKey  Only for Web3Forms: your access key (it is designed to be public).
 *   social         Full https:// links to your profiles. Icons appear in the footer, Contact page and /links
 *                  as soon as a link is filled in. Leave "" to hide that network.
 *
 * On GitHub Pages: open the gh-pages branch → site-config.js → pencil icon → edit → Commit changes.
 */
window.NGB_CONFIG = {
  gaId: "",
  formEndpoint: "",
  formAccessKey: "",
  social: {
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    linkedin: "",  // e.g. "https://www.linkedin.com/company/yourcompany"
    facebook: "",
    youtube: "",
    x: "",
    pinterest: "",
  },
};
