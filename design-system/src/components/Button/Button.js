import ElixButton from "../../../node_modules/elix/src/base/Button.js";
import { ButtonMixin } from "../../mixins/ButtonMixin.js";

/**
 * Button component in the Plain reference design system
 *
 * @inherits Button
 */
export class Button extends ButtonMixin(ElixButton) {}
