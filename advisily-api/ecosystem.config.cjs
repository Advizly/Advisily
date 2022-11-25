module.exports = {
  apps: [
    {
      name: "advizly api",
      script: "index.js",
      watch: ".",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      ignore_watch: ["node_modules"],
    },
  ],
};
