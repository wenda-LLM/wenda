/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Drawer as BaseDrawer } from '../common/drawer.js';
import type { InlineInput } from '../measurables/inline_input.js';
import type { Row } from '../measurables/row.js';
import type { RenderInfo } from './info.js';
/**
 * An object that draws a block based on the given rendering information.
 *
 * @alias Blockly.zelos.Drawer
 */
export declare class Drawer extends BaseDrawer {
    info_: RenderInfo;
    /**
     * @param block The block to render.
     * @param info An object containing all information needed to render this
     *     block.
     * @internal
     */
    constructor(block: BlockSvg, info: RenderInfo);
    draw(): void;
    drawOutline_(): void;
    drawLeft_(): void;
    /**
     * Add steps for the right side of a row that does not have value or
     * statement input connections.
     *
     * @param row The row to draw the side of.
     */
    protected drawRightSideRow_(row: Row): void;
    /**
     * Add steps to draw the right side of an output with a dynamic connection.
     */
    protected drawRightDynamicConnection_(): void;
    /**
     * Add steps to draw the left side of an output with a dynamic connection.
     */
    protected drawLeftDynamicConnection_(): void;
    /** Add steps to draw a flat top row. */
    protected drawFlatTop_(): void;
    /** Add steps to draw a flat bottom row. */
    protected drawFlatBottom_(): void;
    drawInlineInput_(input: InlineInput): void;
    drawStatementInput_(row: Row): void;
}
//# sourceMappingURL=drawer.d.ts.map