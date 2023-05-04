/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Coordinate } from '../../utils.js';
import type { Field } from '../measurables/field.js';
import type { Icon } from '../measurables/icon.js';
import type { InlineInput } from '../measurables/inline_input.js';
import type { Row } from '../measurables/row.js';
import type { ConstantProvider } from './constants.js';
import type { RenderInfo } from './info.js';
/**
 * An object that draws a block based on the given rendering information.
 *
 * @alias Blockly.blockRendering.Drawer
 */
export declare class Drawer {
    block_: BlockSvg;
    info_: RenderInfo;
    topLeft_: Coordinate;
    outlinePath_: string;
    inlinePath_: string;
    protected constants_: ConstantProvider;
    /**
     * @param block The block to render.
     * @param info An object containing all information needed to render this
     *     block.
     * @internal
     */
    constructor(block: BlockSvg, info: RenderInfo);
    /**
     * Draw the block to the workspace. Here "drawing" means setting SVG path
     * elements and moving fields, icons, and connections on the screen.
     *
     * The pieces of the paths are pushed into arrays of "steps", which are then
     * joined with spaces and set directly on the block.  This guarantees that
     * the steps are separated by spaces for improved readability, but isn't
     * required.
     *
     * @internal
     */
    draw(): void;
    /**
     * Save sizing information back to the block
     * Most of the rendering information can be thrown away at the end of the
     * render. Anything that needs to be kept around should be set in this
     * function.
     */
    protected recordSizeOnBlock_(): void;
    /** Hide icons that were marked as hidden. */
    protected hideHiddenIcons_(): void;
    /** Create the outline of the block.  This is a single continuous path. */
    protected drawOutline_(): void;
    /**
     * Add steps for the top corner of the block, taking into account
     * details such as hats and rounded corners.
     */
    protected drawTop_(): void;
    /**
     * Add steps for the jagged edge of a row on a collapsed block.
     *
     * @param row The row to draw the side of.
     */
    protected drawJaggedEdge_(row: Row): void;
    /**
     * Add steps for an external value input, rendered as a notch in the side
     * of the block.
     *
     * @param row The row that this input belongs to.
     */
    protected drawValueInput_(row: Row): void;
    /**
     * Add steps for a statement input.
     *
     * @param row The row that this input belongs to.
     */
    protected drawStatementInput_(row: Row): void;
    /**
     * Add steps for the right side of a row that does not have value or
     * statement input connections.
     *
     * @param row The row to draw the side of.
     */
    protected drawRightSideRow_(row: Row): void;
    /**
     * Add steps for the bottom edge of a block, possibly including a notch
     * for the next connection.
     */
    protected drawBottom_(): void;
    /**
     * Add steps for the left side of the block, which may include an output
     * connection
     */
    protected drawLeft_(): void;
    /**
     * Draw the internals of the block: inline inputs, fields, and icons.  These
     * do not depend on the outer path for placement.
     */
    protected drawInternals_(): void;
    /**
     * Push a field or icon's new position to its SVG root.
     *
     * @param fieldInfo The rendering information for the field or icon.
     */
    protected layoutField_(fieldInfo: Icon | Field): void;
    /**
     * Add steps for an inline input.
     *
     * @param input The information about the input to render.
     */
    protected drawInlineInput_(input: InlineInput): void;
    /**
     * Position the connection on an inline value input, taking into account
     * RTL and the small gap between the parent block and child block which lets
     * the parent block's dark path show through.
     *
     * @param input The information about the input that the connection is on.
     */
    protected positionInlineInputConnection_(input: InlineInput): void;
    /**
     * Position the connection on a statement input, taking into account
     * RTL and the small gap between the parent block and child block which lets
     * the parent block's dark path show through.
     *
     * @param row The row that the connection is on.
     */
    protected positionStatementInputConnection_(row: Row): void;
    /**
     * Position the connection on an external value input, taking into account
     * RTL and the small gap between the parent block and child block which lets
     * the parent block's dark path show through.
     *
     * @param row The row that the connection is on.
     */
    protected positionExternalValueConnection_(row: Row): void;
    /** Position the previous connection on a block. */
    protected positionPreviousConnection_(): void;
    /** Position the next connection on a block. */
    protected positionNextConnection_(): void;
    /** Position the output connection on a block. */
    protected positionOutputConnection_(): void;
}
//# sourceMappingURL=drawer.d.ts.map