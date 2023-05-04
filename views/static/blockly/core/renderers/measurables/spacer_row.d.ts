/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConstantProvider } from '../common/constants.js';
import { InRowSpacer } from './in_row_spacer.js';
import { Row } from './row.js';
/**
 * An object containing information about a spacer between two rows.
 *
 * @alias Blockly.blockRendering.SpacerRow
 */
export declare class SpacerRow extends Row {
    height: number;
    width: number;
    followsStatement: boolean;
    precedesStatement: boolean;
    widthWithConnectedBlocks: number;
    elements: InRowSpacer[];
    /**
     * @param constants The rendering constants provider.
     * @param height The height of the spacer.
     * @param width The width of the spacer.
     * @internal
     */
    constructor(constants: ConstantProvider, height: number, width: number);
    measure(): void;
}
//# sourceMappingURL=spacer_row.d.ts.map