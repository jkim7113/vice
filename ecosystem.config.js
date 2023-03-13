module.exports = {
  apps : [{
    name: "vice",
    script: 'server/server.js',
    watch: true,
    ignore_watch: ["node_modules","public"],
  },],
};
