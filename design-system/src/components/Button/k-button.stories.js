import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
const html = String.raw;

storiesOf("k-button", module)
  .addDecorator(withKnobs)
  .add(
    "Variants",
    () =>
      html`
        <script
          type="module"
          src="./components/Button/define.js"
        ></script>
        <k-button>Primary</k-button>
        <k-button variant="alternate">Alternate</k-button>
      `,
    {}
  );
