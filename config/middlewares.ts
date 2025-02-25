export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true, // deprecated in v4.25.8
      headers: '*',
      origin: ['http://localhost:1337', 'http://localhost:3000', 'https://ecommerce-backend-gy2q.onrender.com']
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              'ecommerce-strapi-two.s3.us-east-2.amazonaws.com',
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              'ecommerce-strapi-two.s3.us-east-2.amazonaws.com',
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
];
