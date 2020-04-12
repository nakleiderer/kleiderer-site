import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
const html = String.raw;

storiesOf("Typography", module)
  .addDecorator(withKnobs)
  .add(
    "Variants",
    () => html`
      ${borderBox(html`<k-typography variant="h1">Headline 1</k-typography>`)}
      ${borderBox(html`<k-typography variant="h2">Headline 2</k-typography>`)}
      ${borderBox(html`<k-typography variant="h3">Headline 3</k-typography>`)}
      ${borderBox(html`<k-typography variant="h4">Headline 4</k-typography>`)}
      ${borderBox(html`<k-typography variant="h5">Headline 5</k-typography>`)}
      ${borderBox(html`<k-typography variant="h6">Headline 6</k-typography>`)}
      ${borderBox(
        html`<k-typography variant="subtitle1">Subtitle 1</k-typography>`
      )}
      ${borderBox(
        html`<k-typography variant="subtitle2">Subtitle 2</k-typography>`
      )}
      ${borderBox(html`<k-typography variant="body1">Body 1</k-typography>`)}
      ${borderBox(html`<k-typography variant="body2">Body 2</k-typography>`)}
      ${borderBox(html`<k-typography variant="button">Button</k-typography>`)}
      ${borderBox(html`<k-typography variant="caption">Caption</k-typography>`)}
      ${borderBox(
        html`<k-typography variant="overline">Overline</k-typography>`
      )}
      ${borderBox(html`<k-typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        sagittis leo lorem, aliquet consectetur tortor tincidunt non. Mauris
        interdum aliquet tincidunt. Sed a nulla vel quam eleifend euismod. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet vulputate
        ipsum eu dapibus. Cras nec ligula eleifend, mattis velit sed, tempus
        purus. Fusce in mi orci. Proin ornare cursus lectus sed iaculis. Sed
        neque metus, pharetra eget turpis id, sodales ultricies augue. Quisque
        purus dolor, feugiat ac eleifend et, tincidunt nec erat. Aliquam
        sollicitudin sit amet mauris ut elementum. Proin quis luctus nisi. Nulla
        rutrum pharetra lorem, eu molestie elit ultrices a. Maecenas porta, mi
        vitae tempus aliquet, ipsum eros dictum sem, vitae efficitur est lacus
        ac odio. Mauris aliquam finibus diam, auctor viverra ligula fringilla
        consectetur.
      </k-typography>`)}
      ${borderBox(html`<k-typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        sagittis leo lorem, aliquet consectetur tortor tincidunt non. Mauris
        interdum aliquet tincidunt. Sed a nulla vel quam eleifend euismod. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet vulputate
        ipsum eu dapibus. Cras nec ligula eleifend, mattis velit sed, tempus
        purus. Fusce in mi orci. Proin ornare cursus lectus sed iaculis. Sed
        neque metus, pharetra eget turpis id, sodales ultricies augue. Quisque
        purus dolor, feugiat ac eleifend et, tincidunt nec erat. Aliquam
        sollicitudin sit amet mauris ut elementum. Proin quis luctus nisi. Nulla
        rutrum pharetra lorem, eu molestie elit ultrices a. Maecenas porta, mi
        vitae tempus aliquet, ipsum eros dictum sem, vitae efficitur est lacus
        ac odio. Mauris aliquam finibus diam, auctor viverra ligula fringilla
        consectetur.
      </k-typography>`)}
    `,
    {}
  )
  .add(
    "Measure",
    () => html`
      <k-box el="div" inset="l">
        <k-typography
          measure="${select("measure", ["none", "m", "l"], "none")}"
        >
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
        </k-typography>
      </k-box>
    `,
    {}
  );

const borderBox = (el) => {
  return html`<div style="background-color:tan;border:1px solid black;">
      ${el}
    </div>
    <br /><br />`;
};
