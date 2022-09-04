/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cnd.sanity.io"]
    },
    reactStrictMode: true,
    swcMinify: true
}

module.exports = nextConfig
