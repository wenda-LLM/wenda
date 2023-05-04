/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { BlockStyle, Theme } from '../../theme.js';
import type { RenderInfo as BaseRenderInfo } from '../common/info.js';
import { Renderer as BaseRenderer } from '../common/renderer.js';
import { ConstantProvider } from './constants.js';
import { Drawer } from './drawer.js';
import { HighlightConstantProvider } from './highlight_constants.js';
import { RenderInfo } from './info.js';
import { PathObject } from './path_object.js';
/**
 * The geras renderer.
 *
 * @alias Blockly.geras.Renderer
 */
export declare class Renderer extends BaseRenderer {
    /** The renderer's highlight constant provider. */
    private highlightConstants_;
    /**
     * @param name The renderer name.
     * @internal
     */
    constructor(name: string);
    /**
     * Initialize the renderer.  Geras has a highlight provider in addition to
     * the normal constant provider.
     *
     * @internal
     */
    init(theme: Theme, opt_rendererOverrides?: {
        [rendererConstant: string]: any;
    }): void;
    refreshDom(svg: SVGElement, theme: Theme): void;
    makeConstants_(): ConstantProvider;
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
    /**
     * Create a new instance of a renderer path object.
     *
     * @param root The root SVG element.
     * @param style The style object to use for colouring.
     * @returns The renderer path object.
     * @internal
     */
    makePathObject(root: SVGElement, style: BlockStyle): PathObject;
    /**
     * Create a new instance of the renderer's highlight constant provider.
     *
     * @returns The highlight constant provider.
     */
    protected makeHighlightConstants_(): HighlightConstantProvider;
    /**
     * Get the renderer's highlight constant provider.  We assume that when this
     * is called, the renderer has already been initialized.
     *
     * @returns The highlight constant provider.
     * @internal
     */
    getHighlightConstants(): HighlightConstantProvider;
}
//# sourceMappingURL=renderer.d.ts.map