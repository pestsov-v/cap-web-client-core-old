const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {

        config.resolve.alias['@Core/Types'] = path.resolve(path.join(process.cwd(), '/types/core/index.ts'))
        config.resolve.alias['@Container'] = path.resolve(path.join(process.cwd(), '/src/core/ioc/container.ioc.ts'))
        config.resolve.alias['@Packages'] = path.resolve(path.join(process.cwd(), '/src/core/packages/packages.ts'))
        config.resolve.alias['@Packages/Types'] = path.resolve(path.join(process.cwd(), '/types/core/packages/packages.d.ts'))
        config.resolve.alias['@WebClientSymbols'] = path.resolve(path.join(process.cwd(), '/src/core/ioc/web-client.ioc.symbols.ts'))

        return config;
    },
    experimental: {
        typedRoutes: true,
        optimizeServerReact: true,
    }
}

module.exports = nextConfig
