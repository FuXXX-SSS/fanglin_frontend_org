"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV == 'production' ? '/mgt/' : '/',
  outputDir: 'mgt',
  devServer: {
    port: 3000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@view": resolve("src/views"),
        "@com": resolve("src/components"),
        "@http": resolve("src/http/modules"),
      }
    }
  }
};
