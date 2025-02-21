/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'st4.depositphotos.com','images.meesho.com','tiimg.tistatic.com','thefoomer.in'], // Add your allowed image domains here
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
