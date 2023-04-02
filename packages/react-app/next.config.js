module.exports = {
  trailingSlash: true,
  images: {
        unoptimized: true
    },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/Dashboard': { page: '/Dashboard' },
      '/CreateAccount': { page: '/CreateAccount' },
      '/Support': { page: '/Support' },
      '/Withdraw': { page: '/Withdraw' },
    }
  },
}
