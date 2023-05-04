/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { RenderedConnection } from '../../rendered_connection.js';
import type { Measurable } from '../measurables/base.js';
import type { InRowSpacer } from '../measurables/in_row_spacer.js';
import type { Row } from '../measurables/row.js';
import type { ConstantProvider } from './constants.js';
import type { RenderInfo } from './info.js';
/**
 * An object that renders rectangles and dots for debugging rendering code.
 *
 * @alias Blockly.blockRendering.Debug
 */
export declare class Debug {
    private readonly constants;
    /**
     * Configuration object containing booleans to enable and disable debug
     * rendering of specific rendering components.
     */
    static config: {
        rowSpacers: boolean;
        elemSpacers: boolean;
        rows: boolean;
        elems: boolean;
        connections: boolean;
        blockBounds: boolean;
        connectedBlockBounds: boolean;
        render: boolean;
    };
    /** An array of SVG elements that have been created by this object. */
    private debugElements_;
    /**
     * The SVG root of the block that is being rendered.  Debug elements will
     * be attached to this root.
     */
    private svgRoot_;
    private randomColour_;
    /**
     * @param constants The renderer's constants.
     * @internal
     */
    constructor(constants: ConstantProvider);
    /**
     * Remove all elements the this object created on the last pass.
     *
     * @internal
     */
    clearElems(): void;
    /**
     * Draw a debug rectangle for a spacer (empty) row.
     *
     * @param row The row to render.
     * @param cursorY The y position of the top of the row.
     * @param isRtl Whether the block is rendered RTL.
     * @internal
     */
    drawSpacerRow(row: Row, cursorY: number, isRtl: boolean): void;
    /**
     * Draw a debug rectangle for a horizontal spacer.
     *
     * @param elem The spacer to render.
     * @param rowHeight The height of the container row.
     * @param isRtl Whether the block is rendered RTL.
     * @internal
     */
    drawSpacerElem(elem: InRowSpacer, rowHeight: number, isRtl: boolean): void;
    /**
     * Draw a debug rectangle for an in-row element.
     *
     * @param elem The element to render.
     * @param isRtl Whether the block is rendered RTL.
     * @internal
     */
    drawRenderedElem(elem: Measurable, isRtl: boolean): void;
    /**
     * Draw a circle at the location of the given connection.  Inputs and outputs
     * share the same colours, as do previous and next.  When positioned correctly
     * a connected pair will look like a bullseye.
     *
     * @param conn The connection to circle.
     * @suppress {visibility} Suppress visibility of conn.offsetInBlock_ since
     * this is a debug module.
     * @internal
     */
    drawConnection(conn: RenderedConnection): void;
    /**
     * Draw a debug rectangle for a non-empty row.
     *
     * @param row The non-empty row to render.
     * @param cursorY The y position of the top of the row.
     * @param isRtl Whether the block is rendered RTL.
     * @internal
     */
    drawRenderedRow(row: Row, cursorY: number, isRtl: boolean): void;
    /**
     * Draw debug rectangles for a non-empty row and all of its subcomponents.
     *
     * @param row The non-empty row to render.
     * @param cursorY The y position of the top of the row.
     * @param isRtl Whether the block is rendered RTL.
     * @internal
     */
    drawRowWithElements(row: Row, cursorY: number, isRtl: boolean): void;
    /**
     * Draw a debug rectangle around the entire block.
     *
     * @param info Rendering information about the block to debug.
     * @internal
     */
    drawBoundingBox(info: RenderInfo): void;
    /**
     * Do all of the work to draw debug information for the whole block.
     *
     * @param block The block to draw debug information for.
     * @param info Rendering information about the block to debug.
     * @internal
     */
    drawDebug(block: BlockSvg, info: RenderInfo): void;
    /**
     * Show a debug filter to highlight that a block has been rendered.
     *
     * @param svgPath The block's SVG path.
     * @internal
     */
    drawRender(svgPath: SVGElement): void;
}
//# sourceMappingURL=debugger.d.ts.map