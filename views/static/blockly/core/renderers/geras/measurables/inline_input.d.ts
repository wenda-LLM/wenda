/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Input } from '../../../input.js';
import type { ConstantProvider as BaseConstantProvider } from '../../../renderers/common/constants.js';
import { InlineInput as BaseInlineInput } from '../../../renderers/measurables/inline_input.js';
import type { ConstantProvider as GerasConstantProvider } from '../constants.js';
/**
 * An object containing information about the space an inline input takes up
 * during rendering.
 *
 * @alias Blockly.geras.InlineInput
 */
export declare class InlineInput extends BaseInlineInput {
    constants_: GerasConstantProvider;
    /**
     * @param constants The rendering constants provider.
     * @param input The inline input to measure and store information for.
     * @internal
     */
    constructor(constants: BaseConstantProvider, input: Input);
}
//# sourceMappingURL=inline_input.d.ts.map