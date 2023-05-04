/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Drawer as BaseDrawer } from '../common/drawer.js';
import type { RenderInfo } from './info.js';
/**
 * An object that draws a block based on the given rendering information.
 *
 * @alias Blockly.minimalist.Drawer
 */
export declare class Drawer extends BaseDrawer {
    /**
     * @param block The block to render.
     * @param info An object containing all information needed to render this
     *     block.
     * @internal
     */
    constructor(block: BlockSvg, info: RenderInfo);
}
//# sourceMappingURL=drawer.d.ts.map