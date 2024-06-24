import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    remotePatterns: [
      {hostname: 'lh3.googleusercontent.com', protocol: 'https'},
      {hostname: 'avatars.githubusercontent.com', protocol: 'https'},
    ],
  },
};

export default MillionLint.next({rsc: true})(nextConfig);
