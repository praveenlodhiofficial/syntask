/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // This allows any domain
        },
      ],
    },
  };
  
  export default nextConfig;
  



// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
//         { hostname: "utfs.io", port: "", protocol: "https" },
//         {
//           hostname: "avatars.githubusercontent.com",
//           port: "",
//           protocol: "https",
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;
  