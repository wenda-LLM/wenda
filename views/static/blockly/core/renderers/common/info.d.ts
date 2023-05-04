/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Input } from '../../input.js';
import type { Measurable } from '../measurables/base.js';
import { BottomRow } from '../measurables/bottom_row.js';
import { Icon } from '../measurables/icon.js';
import { InputRow } from '../measurables/input_row.js';
import { OutputConnection } from '../measurables/output_connection.js';
import type { Row } from '../measurables/row.js';
import { SpacerRow } from '../measurables/spacer_row.js';
import { TopRow } from '../measurables/top_row.js';
import type { ConstantProvider } from './constants.js';
import type { Renderer } from './renderer.js';
/**
 * An object containing all sizing information needed to draw this block.
 *
 * This measure pass does not propagate changes to the block (although fields
 * may choose to rerender when getSize() is called).  However, calling it
 * repeatedly may be expensive.
 *
 * @alias Blockly.blockRendering.RenderInfo
 */
export declare class RenderInfo {
    block_: BlockSvg;
    protected constants_: ConstantProvider;
    outputConnection: OutputConnection | null;
    isInline: boolean;
    isCollapsed: boolean;
    isInsertionMarker: boolean;
    RTL: boolean;
    /** The block renderer in use. */
    protected readonly renderer_: Renderer;
    /** The height of the rendered block, including child blocks. */
    height: number;
    /** The width of the rendered block, including child blocks. */
    widthWithChildren: number;
    /**
     * The width of the rendered block, excluding child blocks.  This is the
     * right edge of the block when rendered LTR.
     */
    width: number;
    statementEdge: number;
    /** An array of Row objects containing sizing information. */
    rows: Row[];
    /** An array of input rows on the block. */
    inputRows: InputRow[];
    /** An array of measurable objects containing hidden icons. */
    hiddenIcons: Icon[];
    topRow: TopRow;
    bottomRow: BottomRow;
    startX: number;
    startY: number;
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
    /**
     * Populate and return an object containing all sizing information needed to
     * draw this block.
     *
     * This measure pass does not propagate changes to the block (although fields
     * may choose to rerender when getSize() is called).  However, calling it
     * repeatedly may be expensive.
     *
     * @internal
     */
    measure(): void;
    /**
     * Create rows of Measurable objects representing all renderable parts of the
     * block.
     */
    protected createRows_(): void;
    /**
     * Create all non-spacer elements that belong on the top row.
     *
     * @internal
     */
    populateTopRow_(): void;
    /**
     * Create all non-spacer elements that belong on the bottom row.
     *
     * @internal
     */
    populateBottomRow_(): void;
    /**
     * Add an input element to the active row, if needed, and record the type of
     * the input on the row.
     *
     * @param input The input to record information about.
     * @param activeRow The row that is currently being populated.
     */
    protected addInput_(input: Input, activeRow: Row): void;
    /**
     * Decide whether to start a new row between the two Blockly.Inputs.
     *
     * @param input The first input to consider
     * @param lastInput The input that follows.
     * @returns True if the next input should be rendered on a new row.
     */
    protected shouldStartNewRow_(input: Input, lastInput?: Input): boolean;
    /** Add horizontal spacing between and around elements within each row. */
    protected addElemSpacing_(): void;
    /**
     * Calculate the width of a spacer element in a row based on the previous and
     * next elements in that row.  For instance, extra padding is added between
     * two editable fields.
     *
     * @param prev The element before the spacer.
     * @param next The element after the spacer.
     * @returns The size of the spacing between the two elements.
     */
    protected getInRowSpacing_(prev: Measurable | null, next: Measurable | null): number;
    /**
     * Figure out where the right edge of the block and right edge of statement
     * inputs should be placed.
     */
    protected computeBounds_(): void;
    /**
     * Extra spacing may be necessary to make sure that the right sides of all
     * rows line up.  This can only be calculated after a first pass to calculate
     * the sizes of all rows.
     */
    protected alignRowElements_(): void;
    /**
     * Calculate the desired width of an input row.
     *
     * @param _row The input row.
     * @returns The desired width of the input row.
     */
    protected getDesiredRowWidth_(_row: Row): number;
    /**
     * Modify the given row to add the given amount of padding around its fields.
     * The exact location of the padding is based on the alignment property of the
     * last input in the field.
     *
     * @param row The row to add padding to.
     * @param missingSpace How much padding to add.
     */
    protected addAlignmentPadding_(row: Row, missingSpace: number): void;
    /**
     * Align the elements of a statement row based on computed bounds.
     * Unlike other types of rows, statement rows add space in multiple places.
     *
     * @param row The statement row to resize.
     */
    protected alignStatementRow_(row: InputRow): void;
    /** Add spacers between rows and set their sizes. */
    protected addRowSpacing_(): void;
    /**
     * Create a spacer row to go between prev and next, and set its size.
     *
     * @param prev The previous row.
     * @param next The next row.
     * @returns The newly created spacer row.
     */
    protected makeSpacerRow_(prev: Row, next: Row): SpacerRow;
    /**
     * Calculate the width of a spacer row.
     *
     * @param _prev The row before the spacer.
     * @param _next The row after the spacer.
     * @returns The desired width of the spacer row between these two rows.
     */
    protected getSpacerRowWidth_(_prev: Row, _next: Row): number;
    /**
     * Calculate the height of a spacer row.
     *
     * @param _prev The row before the spacer.
     * @param _next The row after the spacer.
     * @returns The desired height of the spacer row between these two rows.
     */
    protected getSpacerRowHeight_(_prev: Row, _next: Row): number;
    /**
     * Calculate the centerline of an element in a rendered row.
     * This base implementation puts the centerline at the middle of the row
     * vertically, with no special cases.  You will likely need extra logic to
     * handle (at minimum) top and bottom rows.
     *
     * @param row The row containing the element.
     * @param elem The element to place.
     * @returns The desired centerline of the given element, as an offset from the
     *     top left of the block.
     */
    protected getElemCenterline_(row: Row, elem: Measurable): number;
    /**
     * Record final position information on elements on the given row, for use in
     * drawing.  At minimum this records xPos and centerline on each element.
     *
     * @param row The row containing the elements.
     */
    protected recordElemPositions_(row: Row): void;
    /**
     * Make any final changes to the rendering information object.  In particular,
     * store the y position of each row, and record the height of the full block.
     */
    protected finalize_(): void;
}
//# sourceMappingURL=info.d.ts.map