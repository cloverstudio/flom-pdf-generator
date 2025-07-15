module.exports = {
  apps: [
    {
      name: "pdf-generator",
      script: "./src/app.js",
      watch: false,
      interpreter: "/home/pm2user/.nvm/versions/node/v22.17.0/bin/node",
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    },
  ],
};
