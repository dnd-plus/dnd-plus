const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  if (process.env.NODE_ENV !== 'production') {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
    config = rewireReactHotLoader(config, env)
  }
  return config
}
