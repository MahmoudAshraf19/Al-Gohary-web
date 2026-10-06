import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  prerender: {
    crawlLinks: true,
    routes: [
      '/',
      '/about',
      '/features',
      '/how-it-works',
      '/download',
      '/contact',
      '/help',
      '/faq',
      '/legal/privacy',
      '/legal/terms',
      '/legal/cookies'
    ]
  }
});
