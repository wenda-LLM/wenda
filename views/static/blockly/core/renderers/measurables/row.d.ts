/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConstantProvider } from '../common/constants.js';
import type { Measurable } from './base.js';
import type { InRowSpacer } from './in_row_spacer.js';
import type { InputConnection } from './input_connection.js';
/**
 * An object representing a single row on a rendered block and all of its
 * subcomponents.
 *
 * @alias Blockly.blockRendering.Row
 */
export declare class Row {
    /** @internal */
    type: number;
    /**
     * An array of elements contained in this row.
     *
     * @internal
     */
    elements: Measurable[];
    /**
     * The height of the row.
     *
     * @internal
     */
    height: number;
    /**
     * The width of the row, from the left edge of the block to the right.
     * Does not include child blocks unless they are inline.
     *
     * @internal
     */
    width: number;
    /**
     * The minimum height of the row.
     *
     * @internal
     */
    minHeight: number;
    /**
     * The minimum width of the row, from the left edge of the block to the
     * right. Does not include child blocks unless they are inline.
     *
     * @internal
     */
    minWidth: number;
    /**
     * The width of the row, from the left edge of the block to the edge of the
     * block or any connected child blocks.
     *
     * @internal
     */
    widthWithConnectedBlocks: number;
    /**
     * The Y position of the row relative to the origin of the block's svg
     * group.
     *
     * @internal
     */
    yPos: number;
    /**
     * The X position of the row relative to the origin of the block's svg
     * group.
     *
     * @internal
     */
    xPos: number;
    /**
     * Whether the row has any external inputs.
     *
     * @internal
     */
    hasExternalInput: boolean;
    /**
     * Whether the row has any statement inputs.
     *
     * @internal
     */
    hasStatement: boolean;
    /**
     * Where the left edge of all of the statement inputs on the block should
     * be. This makes sure that statement inputs which are proceded by fields
     * of varius widths are all aligned.
     */
    statementEdge: number;
    /**
     * Whether the row has any inline inputs.
     *
     * @internal
     */
    hasInlineInput: boolean;
    /**
     * Whether the row has any dummy inputs.
     *
     * @internal
     */
    hasDummyInput: boolean;
    /**
     * Whether the row has a jagged edge.
     *
     * @internal
     */
    hasJaggedEdge: boolean;
    notchOffset: number;
    /**
     * Alignment of the row.
     *
     * @internal
     */
    align: number | null;
    protected readonly constants_: ConstantProvider;
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
    /**
     * Get the last input on this row, if it has one.
     *
     * @returns The last input on the row, or null.
     * @internal
     */
    getLastInput(): InputConnection | null;
    /**
     * Inspect all subcomponents and populate all size properties on the row.
     *
     * @internal
     */
    measure(): void;
    /**
     * Determines whether this row should start with an element spacer.
     *
     * @returns Whether the row should start with a spacer.
     * @internal
     */
    startsWithElemSpacer(): boolean;
    /**
     * Determines whether this row should end with an element spacer.
     *
     * @returns Whether the row should end with a spacer.
     * @internal
     */
    endsWithElemSpacer(): boolean;
    /**
     * Convenience method to get the first spacer element on this row.
     *
     * @returns The first spacer element on this row.
     * @internal
     */
    getFirstSpacer(): InRowSpacer | null;
    /**
     * Convenience method to get the last spacer element on this row.
     *
     * @returns The last spacer element on this row.
     * @internal
     */
    getLastSpacer(): InRowSpacer | null;
}
//# sourceMappingURL=row.d.ts.map