module.exports = {
  apps: [
    {
      name: "authenticator",
      script: "node_modules/.bin/ts-node",
      args: "./src/server.ts",
      cwd: "./",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
