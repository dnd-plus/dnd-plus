// Mostly inlined from within `customize-cra` https://www.npmjs.com/package/customize-cra
const getBabelLoader = (config) => {
  // Filtering out rules that don't define babel plugins.
  const babelLoaderFilter = (rule) =>
    rule.loader &&
    rule.loader.includes('babel') &&
    rule.options &&
    rule.options.plugins

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf))
    .oneOf

  let babelLoader = loaders.find(babelLoaderFilter)

  // If the loader was not found, try to find it inside of the "use" array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), [])
    babelLoader = loaders.find(babelLoaderFilter)
  }
  return babelLoader
}

// Curried function that uses config to search for babel loader and pushes new plugin to options list.
// const addBabelPlugin = (plugin) => (config) => {
//   getBabelLoader(config).options.plugins.push(plugin)
//   return config
// }

module.exports = function override(config) {
  const babelPlugin = getBabelLoader(config)

  babelPlugin.options.babelrc = true

  // add files to load from /common
  babelPlugin.include = [].concat(
    babelPlugin.include,
    require('path').resolve(__dirname, '../common'),
  )

  // add hot loader
  if (process.env.NODE_ENV !== 'production') {
    config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
    babelPlugin.options.plugins.push('react-hot-loader/babel')

    // Find a rule which contains eslint-loader
    const condition = (u) =>
      typeof u === 'object' && u.loader && u.loader.includes('eslint-loader')
    const rule = config.module.rules.find(
      (rule) => rule.use && rule.use.some(condition),
    )

    if (rule) {
      const use = rule.use.find(condition)

      if (use) {
        // Inject the option for eslint-loader
        use.options.emitWarning = true
      }
    }

    // const TsCheckerPlugin = config.plugins.find(
    //   (plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin',
    // )
    // TsCheckerPlugin.options.compilerOptions = {
    //   noUnusedLocals: true,
    //   noUnusedParameters: true,
    // }
    // TsCheckerPlugin.options.silent = false
    // config.plugins.splice(
    //   config.plugins.findIndex(
    //     (plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin',
    //   ),
    //   1,
    // )

    const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
    const _getCompilerHooks = ForkTsCheckerWebpackPlugin.getCompilerHooks
    ForkTsCheckerWebpackPlugin.getCompilerHooks = (compiler) => {
      const hooks = _getCompilerHooks(compiler)
      const _tap = hooks.receive.tap.bind(hooks.receive)
      hooks.receive.tap = (name, listener) => {
        if (name !== 'afterTypeScriptCheck') return _tap(name, listener)

        return _tap(name, (diagnostics, lints) => {
          diagnostics.forEach((msg) => (msg.severity = 'warning'))
          lints.forEach((msg) => (msg.severity = 'warning'))
          return listener(diagnostics, lints)
        })
      }
      return hooks
    }

    // resolve common folder not from node_modules
    config.resolve.modules.unshift(require('path').resolve(__dirname, '../'))
  }

  return config
}
