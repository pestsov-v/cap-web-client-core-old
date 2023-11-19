const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        return config;
    },
    experimental: {
        typedRoutes: true
    }
}

module.exports = nextConfig
