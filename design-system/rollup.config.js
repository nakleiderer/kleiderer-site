import sass from "rollup-plugin-sass";

import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/components/Button/define.js",
  output: {
    dir: "./build",
    format: "es",
  },
  preserveModules: true,
  plugins: [sass(), terser()],
};
