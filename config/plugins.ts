module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          baseUrl: env('CDN_URL'),
          rootPath: env('CDN_ROOT_PATH'),
          s3Options: {
            credentials: {
              accessKeyId: "ACCESS_KEY_ID",
              secretAccessKey: 'SECRET_ACCESS_KEY',
            },
            region: 'us-east-2',
            params: {
              ACL: env('AWS_ACL', 'public-read'),
              signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
              Bucket: 'ecommerce-strapi-two',
            },
          },
        },
      },
    },
  });