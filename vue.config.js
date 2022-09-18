module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'i18n',
      enableInSFC: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: 
          `@import "@/assets/scss/main.scss";`
      }
    },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  },
  devServer: {
    proxy: {
      '^/api/v1': {
        target: 'https://dev-api.splashwithdolphin.com',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
