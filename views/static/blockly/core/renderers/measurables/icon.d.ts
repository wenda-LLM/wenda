/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Icon as BlocklyIcon } from '../../icon.js';
import type { ConstantProvider } from '../common/constants.js';
import { Measurable } from './base.js';
/**
 * An object containing information about the space an icon takes up during
 * rendering
 *
 * @alias Blockly.blockRendering.Icon
 */
export declare class Icon extends Measurable {
    icon: BlocklyIcon;
    isVisible: boolean;
    flipRtl: boolean;
    /**
     * An object containing information about the space an icon takes up during
     * rendering
     *
     * @param constants The rendering constants provider.
     * @param icon The icon to measure and store information for.
     * @internal
     */
    constructor(constants: ConstantProvider, icon: BlocklyIcon);
}
//# sourceMappingURL=icon.d.ts.map