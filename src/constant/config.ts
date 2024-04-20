export const siteConfig = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} - Read novels online and free with swift updates`,
  description:
    'Explore our collection of free online books! Dive into a world of daily updates with a wide array of novels including light novel translations, web novels, Chinese, English, Japanese, and Korean novels available for your reading pleasure',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? '',
  beautyAddressName: process.env.NEXT_PUBLIC_SITE_DOMAIN_NAME ?? '',
  contactEmail: 'contact@antsnovel.com',
  fbPage: 'https://www.facebook.com/antsnovel',
};
