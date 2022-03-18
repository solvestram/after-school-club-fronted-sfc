const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === "production" ? "/after-school-club-fronted-sfc/" : "/",

  devServer: {
    proxy: '*',
  }
})
