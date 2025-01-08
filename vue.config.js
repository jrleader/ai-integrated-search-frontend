const { defineConfig } = require('@vue/cli-service')

// vue.config.js
// module.exports = {
//   devServer: {
//     host: '0.0.0.0',  // Allow external access
//     port: 8080,
//     https: false,     // Set to true if using HTTPS
//     allowedHosts: 'all',
//     client: {
//       webSocketURL: 'auto://0.0.0.0:0/ws'
//     },
//     proxy: {
//       '/api': {
//         target: 'http://your-backend-url:8101',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: '0.0.0.0',  // Allow external access
  //   port: 8080,
  //   https: false,     // Set to true if using HTTPS
  //   allowedHosts: 'all',
  //   client: {
  //     webSocketURL: 'auto://0.0.0.0:0/ws'
  //   },
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8101/api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
})
