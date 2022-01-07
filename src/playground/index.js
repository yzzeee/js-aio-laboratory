const { zipObject } = require('lodash');
const req = require.context('./', false, /.js$/);
const modules = req
  .keys()
  .filter(file => file !== './index.js')
  .map(req);

module.exports = modules.reduce((acc, module) => {
  return { ...acc, ...zipObject(Object.keys(module), Object.values(module)) };
}, {});
