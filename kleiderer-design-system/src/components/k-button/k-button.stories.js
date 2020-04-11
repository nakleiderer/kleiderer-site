import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import notes from "./readme.md";
const html = String.raw;

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add(
    "Variants",
    () =>
      html`
        <k-button
          color="${select("color", ["primary", "alternate"], "primary")}"
          >View</k-button
        >
      `,
    { notes }
  );
