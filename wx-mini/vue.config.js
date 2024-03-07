const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  pluginOptions: {
    mpx: {
      srcMode: 'wx',
      plugin: {
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require('path')
          const packageJSONPath = path.resolve('package.json')
          if (files.has(packageJSONPath)) files.delete(packageJSONPath)
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath)
          }
        },
        transRpxRules: [
          {
            mode: 'all', // 所有样式都启用转换rpx，除了注释为'use px'的样式不转换
            comment: 'use px', // mode为'all'时，默认值为'use px'
            designWidth: 375,
            include: path.resolve('src')
          }
        ]
      },
      loader: {},
      urlLoader: {
        name: 'img/[name][hash].[ext]'
      }
    }
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {
    return {
      resolve: {
        alias: {
          '@': require('path').resolve(__dirname, './src')
        }
      }
    }
  }
})
