import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import notes from "./readme.md";
const html = String.raw;

storiesOf("Card", module)
  .addDecorator(withKnobs)
  .add(
    "Variants",
    () => html`
      <k-card>
        <span slot="overline">Testing</span>
        <span slot="title">The Name of This Card</span>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          sagittis leo lorem, aliquet consectetur tortor tincidunt non. Mauris
          interdum aliquet tincidunt. Sed a nulla vel quam eleifend euismod.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet
          vulputate ipsum eu dapibus. Cras nec ligula eleifend, mattis velit
          sed, tempus purus. Fusce in mi orci. Proin ornare cursus lectus sed
          iaculis. Sed neque metus, pharetra eget turpis id, sodales ultricies
          augue. Quisque purus dolor, feugiat ac eleifend et, tincidunt nec
          erat. Aliquam sollicitudin sit amet mauris ut elementum. Proin quis
          luctus nisi. Nulla rutrum pharetra lorem, eu molestie elit ultrices a.
          Maecenas porta, mi vitae tempus aliquet, ipsum eros dictum sem, vitae
          efficitur est lacus ac odio. Mauris aliquam finibus diam, auctor
          viverra ligula fringilla consectetur.
        </span>
      </k-card>
    `,
    { notes }
  );
