module.exports = {
  // ctrl + s 保存时不进行 lint 检查
  lintOnSave: false,
  // webpack 单个 bundle 体积大小限制
  configureWebpack: {
    optimization: {
      splitChunks: {
        // 10kb
        minSize: 10000,
        // 500kb
        maxSize: 500000,
      },
    },
  },
  // 生产环境不生成 source map
  productionSourceMap: false,
};
