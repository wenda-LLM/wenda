/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../../block_svg.js';
import type { ConstantProvider } from '../../../renderers/common/constants.js';
import { TopRow as BaseTopRow } from '../../../renderers/measurables/top_row.js';
/**
 * An object containing information about what elements are in the top row of a
 * block as well as sizing information for the top row.
 * Elements in a top row can consist of corners, hats, spacers, and previous
 * connections.
 * After this constructor is called, the row will contain all non-spacer
 * elements it needs.
 *
 * @alias Blockly.zelos.TopRow
 */
export declare class TopRow extends BaseTopRow {
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
//# sourceMappingURL=top_row.d.ts.map