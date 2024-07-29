const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
 
const nextConfig = withPWA({
  reactStrictMode: true,
  
});
 

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM(nextConfig)

 