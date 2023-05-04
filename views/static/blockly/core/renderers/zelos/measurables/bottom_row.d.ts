/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../../block_svg.js';
import type { ConstantProvider } from '../../../renderers/common/constants.js';
import { BottomRow as BaseBottomRow } from '../../../renderers/measurables/bottom_row.js';
/**
 * An object containing information about what elements are in the bottom row of
 * a block as well as spacing information for the top row.
 * Elements in a bottom row can consist of corners, spacers and next
 * connections.
 *
 * @alias Blockly.zelos.BottomRow
 */
export declare class BottomRow extends BaseBottomRow {
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
    endsWithElemSpacer(): boolean;
    /** Render a round corner unless the block has an output connection. */
    hasLeftSquareCorner(block: BlockSvg): boolean;
    /** Render a round corner unless the block has an output connection. */
    hasRightSquareCorner(block: BlockSvg): false;
}
//# sourceMappingURL=bottom_row.d.ts.map