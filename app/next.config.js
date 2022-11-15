/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.artblocks.io",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;
