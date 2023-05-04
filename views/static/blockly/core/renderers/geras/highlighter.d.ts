/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConstantProvider } from '../common/constants.js';
import type { BottomRow } from '../measurables/bottom_row.js';
import type { Row } from '../measurables/row.js';
import type { TopRow } from '../measurables/top_row.js';
import type { HighlightConstantProvider, InsideCorner, JaggedTeeth, Notch, OutsideCorner, PuzzleTab, StartHat } from './highlight_constants.js';
import type { RenderInfo } from './info.js';
import type { InlineInput } from './measurables/inline_input.js';
/**
 * An object that adds highlights to a block based on the given rendering
 * information.
 *
 * Highlighting is interesting because the highlights do not fully enclose the
 * block.  Instead, they are positioned based on a light source in the top left.
 * This means that rendering highlights requires exact information about the
 * position of each part of the block.  The resulting paths are not continuous
 * or closed paths.  The highlights for tabs and notches are loosely based on
 * tab and notch shapes, but are not exactly the same.
 *
 * @alias Blockly.geras.Highlighter
 */
export declare class Highlighter {
    info_: RenderInfo;
    steps_: string;
    inlineSteps_: string;
    RTL_: boolean;
    constants_: ConstantProvider;
    highlightConstants_: HighlightConstantProvider;
    private readonly highlightOffset_;
    outsideCornerPaths_: OutsideCorner;
    insideCornerPaths_: InsideCorner;
    puzzleTabPaths_: PuzzleTab;
    notchPaths_: Notch;
    startPaths_: StartHat;
    jaggedTeethPaths_: JaggedTeeth;
    /**
     * @param info An object containing all information needed to render this
     *     block.
     * @internal
     */
    constructor(info: RenderInfo);
    /**
     * Get the steps for the highlight path.
     *
     * @returns The steps for the highlight path.
     * @internal
     */
    getPath(): string;
    /**
     * Add a highlight to the top corner of a block.
     *
     * @param row The top row of the block.
     * @internal
     */
    drawTopCorner(row: TopRow): void;
    /**
     * Add a highlight on a jagged edge for a collapsed block.
     *
     * @param row  The row to highlight.
     * @internal
     */
    drawJaggedEdge_(row: Row): void;
    /**
     * Add a highlight on a value input.
     *
     * @param row The row the input belongs to.
     * @internal
     */
    drawValueInput(row: Row): void;
    /**
     * Add a highlight on a statement input.
     *
     * @param row The row to highlight.
     * @internal
     */
    drawStatementInput(row: Row): void;
    /**
     * Add a highlight on the right side of a row.
     *
     * @param row The row to highlight.
     * @internal
     */
    drawRightSideRow(row: Row): void;
    /**
     * Add a highlight to the bottom row.
     *
     * @param row The row to highlight.
     * @internal
     */
    drawBottomRow(row: BottomRow): void;
    /**
     * Draw the highlight on the left side of the block.
     *
     * @internal
     */
    drawLeft(): void;
    /**
     * Add a highlight to an inline input.
     *
     * @param input The input to highlight.
     * @internal
     */
    drawInlineInput(input: InlineInput): void;
}
//# sourceMappingURL=highlighter.d.ts.map