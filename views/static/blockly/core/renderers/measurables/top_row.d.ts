/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { ConstantProvider } from '../common/constants.js';
import type { PreviousConnection } from './previous_connection.js';
import { Row } from './row.js';
/**
 * An object containing information about what elements are in the top row of a
 * block as well as sizing information for the top row.
 * Elements in a top row can consist of corners, hats, spacers, and previous
 * connections.
 * After this constructor is called, the row will contain all non-spacer
 * elements it needs.
 *
 * @alias Blockly.blockRendering.TopRow
 */
export declare class TopRow extends Row {
    /**
     * The starting point for drawing the row, in the y direction.
     * This allows us to draw hats and similar shapes that don't start at the
     * origin. Must be non-negative (see #2820).
     *
     * @internal
     */
    capline: number;
    /** How much the row extends up above its capline. */
    ascenderHeight: number;
    /** Whether the block has a previous connection. */
    hasPreviousConnection: boolean;
    /** The previous connection on the block, if any. */
    connection: PreviousConnection | null;
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
    /**
     * Returns whether or not the top row has a left square corner.
     *
     * @param block The block whose top row this represents.
     * @returns Whether or not the top row has a left square corner.
     * @internal
     */
    hasLeftSquareCorner(block: BlockSvg): boolean;
    /**
     * Returns whether or not the top row has a right square corner.
     *
     * @param _block The block whose top row this represents.
     * @returns Whether or not the top row has a right square corner.
     */
    hasRightSquareCorner(_block: BlockSvg): boolean;
    measure(): void;
    startsWithElemSpacer(): boolean;
    endsWithElemSpacer(): boolean;
}
//# sourceMappingURL=top_row.d.ts.map