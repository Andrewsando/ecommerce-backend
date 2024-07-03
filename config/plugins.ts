module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          baseUrl: env('CDN_URL'),
          rootPath: env('CDN_ROOT_PATH'),
          s3Options: {
            credentials: {
              accessKeyId: 'AKIAZQ3DTERCNVSMBTXO',
              secretAccessKey: '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',
            },
            region: 'eu-west-1',
            params: {
              ACL: env('AWS_ACL', 'public-read'),
              signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
              Bucket: 'ecommerce-strapi-one',
            },
          },
        },
      },
    },
  });