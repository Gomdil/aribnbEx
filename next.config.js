/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains:[
            "avaters.githubusercontent.com",
            "res.cloudinary.com",
        ]
    }

}

module.exports = nextConfig
