import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import notes from "./readme.md";
const html = String.raw;

storiesOf("Box", module)
  .addDecorator(withKnobs)
  .add(
    "Inset",
    () => html`
      <k-box
        el="span"
        ${select(
          "type",
          ["none", "inset", "inset-squish", "inset-stretch", "stack", "inline"],
          "none"
        )}="${select("size", ["none", "s", "m", "l", "xl", "xxl"], "none")}"
        style="background-color:aliceblue;"
      >
        <k-typography el="span" style="background-color: grey"
          >I am a span</k-typography
        >
      </k-box>

      <k-box
        el="span"
        ${select(
          "type",
          ["none", "inset", "inset-squish", "inset-stretch", "stack", "inline"],
          "none"
        )}="${select("size", ["none", "s", "m", "l", "xl", "xxl"], "none")}"
        style="background-color:lightyellow;"
      >
        <k-typography el="span" style="background-color: grey"
          >I am a span</k-typography
        >
      </k-box>

      <k-box
        el="div"
        ${select(
          "type",
          ["none", "inset", "inset-squish", "inset-stretch", "stack", "inline"],
          "none"
        )}="${select("size", ["none", "s", "m", "l", "xl", "xxl"], "none")}"
        style="background-color:lightyellow;"
      >
        <k-typography el="span" style="background-color: grey"
          >I am a div</k-typography
        >
      </k-box>

      <k-box
        el="div"
        ${select(
          "type",
          ["none", "inset", "inset-squish", "inset-stretch", "stack", "inline"],
          "none"
        )}="${select("size", ["none", "s", "m", "l", "xl", "xxl"], "none")}"
        style="background-color:lightyellow;"
      >
        <k-typography el="span" style="background-color: grey"
          >I am a div</k-typography
        >
      </k-box>

      <p>
        Negative Space 1:
        <span
          style="display:inline-block;background-color:aliceblue;width:2rem;height:2rem;"
        >
        </span>
      </p>
      <p>
        Content
        <span
          style="display:inline-block;background-color:black;width:2rem;height:2rem;"
        >
        </span>
      </p>
      <p>
        Negative Space 2:
        <span
          style="display:inline-block;background-color:lightyellow;width:2rem;height:2rem;"
        >
        </span>
      </p>
    `,
    { notes }
  )
  .add(
    "Classes",
    () =>
      html`
        <div>
          <k-typography variant="subtitle2">Legend:</k-typography>
          <ul>
            ${generateLegend("Margin", "#FDFFDF")}
            ${generateLegend("Padding", "#E3DCFF")}
            ${generateLegend("Content", "#CFF0FB")}
          </ul>
        </div>
        <hr />

        ${generateVariants()}

        <br /><br />
        ${generateBox("k-space-stack-l k-space-inline-l k-space-inset-l")}
      `
  );

const generateVariants = () => {
  const variants = ["xs", "s", "m", "l", "xl", "xxl"];
  const styles = ["stack", "inline", "inset", "inset-squish", "inset-stretch"];

  const boxes = [];

  styles.forEach((s) => {
    variants.forEach((v) => {
      boxes.push(generateBox(`k-space-${s}-${v}`));
    });
  });

  return boxes.join("<br><br>");
};

const generateBox = (classes) => {
  return html`
    <div
      style="width:50%;margin:0 auto;border:0.01px solid white;background-color:#FDFFDF;"
    >
      <div class="${classes}" style="background-color:#E3DCFF">
        <div style="background-color:#CFF0FB;">
          <k-typography>${classes}</k-typography>
        </div>
      </div>
    </div>
  `;
};

const generateLegend = (name, color) => {
  return html`
    <li>
      <label>
        ${name}
        <input disabled type="color" value="${color}" />
      </label>
    </li>
  `;
};
