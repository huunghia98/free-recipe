/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  generateRobotsTxt: true,
};
