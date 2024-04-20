export const siteConfig = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} - Free recipe for meals`,
  description:
    'Discover Delicious Recipes. Explore a world of culinary inspiration',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? '',
  beautyAddressName: process.env.NEXT_PUBLIC_SITE_DOMAIN_NAME ?? '',
  contactEmail: 'nghianh.w@gmai.com',
  fbPage: 'https://www.facebook.com/huunghia198',
};
