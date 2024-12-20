/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'st4.depositphotos.com'], // Add your allowed image domains here
  },
  eslint: {
    ignoreDuringBuilds: true,  // This will ignore ESLint errors during the build
  },
};

export default nextConfig;
