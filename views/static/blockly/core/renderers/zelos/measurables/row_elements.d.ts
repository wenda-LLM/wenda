/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConstantProvider } from '../../../renderers/common/constants.js';
import { Measurable } from '../../../renderers/measurables/base.js';
/**
 * An object containing information about the space a right connection shape
 * takes up during rendering.
 *
 * @alias Blockly.zelos.RightConnectionShape
 */
export declare class RightConnectionShape extends Measurable {
    height: number;
    width: number;
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
}
//# sourceMappingURL=row_elements.d.ts.map