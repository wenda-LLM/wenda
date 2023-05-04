/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { RenderInfo as BaseRenderInfo } from '../common/info.js';
import { Renderer as BaseRenderer } from '../common/renderer.js';
import { ConstantProvider } from './constants.js';
import { Drawer } from './drawer.js';
import { RenderInfo } from './info.js';
/**
 * The minimalist renderer.
 *
 * @alias Blockly.minimalist.Renderer
 */
export declare class Renderer extends BaseRenderer {
    /**
     * @param name The renderer name.
     * @internal
     */
    constructor(name: string);
    /**
     * Create a new instance of the renderer's constant provider.
     *
     * @returns The constant provider.
     */
    protected makeConstants_(): ConstantProvider;
    /**
     * Create a new instance of the renderer's render info object.
     *
     * @param block The block to measure.
     * @returns The render info object.
     */
    protected makeRenderInfo_(block: BlockSvg): RenderInfo;
    /**
     * Create a new instance of the renderer's drawer.
     *
     * @param block The block to render.
     * @param info An object containing all information needed to render this
     *     block.
     * @returns The drawer.
     */
    protected makeDrawer_(block: BlockSvg, info: BaseRenderInfo): Drawer;
}
//# sourceMappingURL=renderer.d.ts.map