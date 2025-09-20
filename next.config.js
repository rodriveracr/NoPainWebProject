const createNextIntlPlugin = require('next-intl/plugin');

const nextConfig = {
  experimental: {
    serverActions: {},
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
module.exports = withNextIntl(nextConfig);