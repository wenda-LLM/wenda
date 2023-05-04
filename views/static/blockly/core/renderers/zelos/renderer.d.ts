/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { Connection } from '../../connection.js';
import { InsertionMarkerManager } from '../../insertion_marker_manager.js';
import type { Marker } from '../../keyboard_nav/marker.js';
import type { RenderedConnection } from '../../rendered_connection.js';
import type { BlockStyle } from '../../theme.js';
import type { WorkspaceSvg } from '../../workspace_svg.js';
import type { RenderInfo as BaseRenderInfo } from '../common/info.js';
import { Renderer as BaseRenderer } from '../common/renderer.js';
import { ConstantProvider } from './constants.js';
import { Drawer } from './drawer.js';
import { RenderInfo } from './info.js';
import { MarkerSvg } from './marker_svg.js';
import { PathObject } from './path_object.js';
/**
 * The zelos renderer.
 *
 * @alias Blockly.zelos.Renderer
 */
export declare class Renderer extends BaseRenderer {
    protected constants_: ConstantProvider;
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
    /**
     * Create a new instance of the renderer's cursor drawer.
     *
     * @param workspace The workspace the cursor belongs to.
     * @param marker The marker.
     * @returns The object in charge of drawing the marker.
     * @internal
     */
    makeMarkerDrawer(workspace: WorkspaceSvg, marker: Marker): MarkerSvg;
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
     * Get the current renderer's constant provider.  We assume that when this is
     * called, the renderer has already been initialized.
     *
     * @returns The constant provider.
     */
    getConstants(): ConstantProvider;
    shouldHighlightConnection(conn: Connection): boolean;
    getConnectionPreviewMethod(closest: RenderedConnection, local: RenderedConnection, topBlock: BlockSvg): InsertionMarkerManager.PREVIEW_TYPE;
}
//# sourceMappingURL=renderer.d.ts.map