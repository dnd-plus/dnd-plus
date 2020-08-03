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
const addBabelPlugin = (plugin) => (config) => {
  getBabelLoader(config).options.plugins.push(plugin)
  return config
}

module.exports = function override(config, env) {
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
  }

  return config
}
