const pluginSEO = require("eleventy-plugin-seo");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));

  return {
    dir: {
      input: "src",
      output: "build/11ty"
    }
  };
};
