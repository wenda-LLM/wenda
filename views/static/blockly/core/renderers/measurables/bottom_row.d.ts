/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { ConstantProvider } from '../common/constants.js';
import type { NextConnection } from './next_connection.js';
import { Row } from './row.js';
/**
 * An object containing information about what elements are in the bottom row of
 * a block as well as spacing information for the bottom row.
 * Elements in a bottom row can consist of corners, spacers and next
 * connections.
 *
 * @alias Blockly.blockRendering.BottomRow
 */
export declare class BottomRow extends Row {
    /**
     * Whether this row has a next connection.
     *
     * @internal
     */
    hasNextConnection: boolean;
    /**
     * The next connection on the row, if any.
     *
     * @internal
     */
    connection: NextConnection | null;
    /**
     * The amount that the bottom of the block extends below the horizontal
     * edge, e.g. because of a next connection.  Must be non-negative (see
     * #2820).
     *
     * @internal
     */
    descenderHeight: number;
    /**
     * The Y position of the bottom edge of the block, relative to the origin
     * of the block rendering.
     */
    baseline: number;
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
    /**
     * Returns whether or not the bottom row has a left square corner.
     *
     * @param block The block whose bottom row this represents.
     * @returns Whether or not the bottom row has a left square corner.
     */
    hasLeftSquareCorner(block: BlockSvg): boolean;
    /**
     * Returns whether or not the bottom row has a right square corner.
     *
     * @param _block The block whose bottom row this represents.
     * @returns Whether or not the bottom row has a right square corner.
     */
    hasRightSquareCorner(_block: BlockSvg): boolean;
    measure(): void;
    startsWithElemSpacer(): boolean;
    endsWithElemSpacer(): boolean;
}
//# sourceMappingURL=bottom_row.d.ts.map