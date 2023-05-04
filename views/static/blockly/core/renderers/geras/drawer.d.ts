/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Drawer as BaseDrawer } from '../common/drawer.js';
import type { Row } from '../measurables/row.js';
import type { ConstantProvider } from './constants.js';
import { Highlighter } from './highlighter.js';
import type { RenderInfo } from './info.js';
import type { InlineInput } from './measurables/inline_input.js';
/**
 * An object that draws a block based on the given rendering information.
 *
 * @alias Blockly.geras.Drawer
 */
export declare class Drawer extends BaseDrawer {
    highlighter_: Highlighter;
    constants_: ConstantProvider;
    /**
     * @param block The block to render.
     * @param info An object containing all information needed to render this
     *     block.
     * @internal
     */
    constructor(block: BlockSvg, info: RenderInfo);
    draw(): void;
    drawTop_(): void;
    drawJaggedEdge_(row: Row): void;
    drawValueInput_(row: Row): void;
    drawStatementInput_(row: Row): void;
    drawRightSideRow_(row: Row): void;
    drawBottom_(): void;
    /**
     * Add steps for the left side of the block, which may include an output
     * connection
     */
    protected drawLeft_(): void;
    drawInlineInput_(input: InlineInput): void;
    positionInlineInputConnection_(input: InlineInput): void;
    positionStatementInputConnection_(row: Row): void;
    positionExternalValueConnection_(row: Row): void;
    positionNextConnection_(): void;
}
//# sourceMappingURL=drawer.d.ts.map