// next.config.js
const withPlugins = require("next-compose-plugins");
const typescript = require("@zeit/next-typescript");
const css = require("@zeit/next-css");

module.exports = withPlugins([[typescript], [css]]);
