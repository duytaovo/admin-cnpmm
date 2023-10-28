const apiProduction = "https://jsonserv.glitch.me";
const apiDev = "http://localhost:4000";
const config = {
  baseUrl: import.meta.env.MODE === "production" ? apiProduction : apiDev,
  maxSizeUploadImage: 2048576, // bytes
};
export default config;
