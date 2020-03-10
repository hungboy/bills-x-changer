const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc(), useOverride);

function useOverride(config, env) {
  console.log('Overriden...');

  let loaders = config.module.rules[1];
  return config;
}
