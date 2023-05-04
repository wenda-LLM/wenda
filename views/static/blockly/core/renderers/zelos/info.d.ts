/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Input } from '../../input.js';
import { RenderInfo as BaseRenderInfo } from '../common/info.js';
import type { Measurable } from '../measurables/base.js';
import type { Row } from '../measurables/row.js';
import type { ConstantProvider } from './constants.js';
import { BottomRow } from './measurables/bottom_row.js';
import { RightConnectionShape } from './measurables/row_elements.js';
import { TopRow } from './measurables/top_row.js';
import type { Renderer } from './renderer.js';
/**
 * An object containing all sizing information needed to draw this block.
 *
 * This measure pass does not propagate changes to the block (although fields
 * may choose to rerender when getSize() is called).  However, calling it
 * repeatedly may be expensive.
 *
 * @alias Blockly.zelos.RenderInfo
 */
export declare class RenderInfo extends BaseRenderInfo {
    topRow: TopRow;
    bottomRow: BottomRow;
    constants_: ConstantProvider;
    renderer_: Renderer;
    isInline: boolean;
    isMultiRow: boolean;
    hasStatementInput: boolean;
    rightSide: RightConnectionShape | null;
    private readonly rightAlignedDummyInputs_;
    /**
     * @param renderer The renderer in use.
     * @param block The block to measure.
     * @internal
     */
    constructor(renderer: Renderer, block: BlockSvg);
    /**
     * Get the block renderer in use.
     *
     * @returns The block renderer in use.
     * @internal
     */
    getRenderer(): Renderer;
    measure(): void;
    shouldStartNewRow_(input: Input, lastInput: Input): boolean;
    getDesiredRowWidth_(row: Row): number;
    getInRowSpacing_(prev: Measurable | null, next: Measurable | null): number;
    getSpacerRowHeight_(prev: Row, next: Row): number;
    getSpacerRowWidth_(prev: Row, next: Row): number;
    getElemCenterline_(row: Row, elem: Measurable): number;
    addInput_(input: Input, activeRow: Row): void;
    addAlignmentPadding_(row: Row, missingSpace: number): void;
    /**
     * Adjust the x position of fields to bump all non-label fields in the first
     * row past the notch position.  This must be called before `computeBounds`
     * is called.
     */
    protected adjustXPosition_(): void;
    /**
     * Finalize the output connection info.  In particular, set the height of the
     * output connection to match that of the block.  For the right side, add a
     * right connection shape element and have it match the dimensions of the
     * output connection.
     */
    protected finalizeOutputConnection_(): void;
    /**
     * Finalize horizontal alignment of elements on the block.  In particular,
     * reduce the implicit spacing created by the left and right output connection
     * shapes by adding setting negative spacing onto the leftmost and rightmost
     * spacers.
     */
    protected finalizeHorizontalAlignment_(): void;
    /**
     * Calculate the spacing to reduce the left and right edges by based on the
     * outer and inner connection shape.
     *
     * @param elem The first or last element on a block.
     * @returns The amount of spacing to reduce the first or last spacer.
     */
    protected getNegativeSpacing_(elem: Measurable): number;
    /**
     * Finalize vertical alignment of rows on a block.  In particular, reduce the
     * implicit spacing when a non-shadow block is connected to any of an input
     * row's inline inputs.
     */
    protected finalizeVerticalAlignment_(): void;
    finalize_(): void;
}
//# sourceMappingURL=info.d.ts.map