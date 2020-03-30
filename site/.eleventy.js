module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/_includes/styles": "styles"
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
