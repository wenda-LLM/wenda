/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { Connection } from '../../connection.js';
import { PreviewType } from '../../insertion_marker_manager.js';
import type { IRegistrable } from '../../interfaces/i_registrable.js';
import type { Marker } from '../../keyboard_nav/marker.js';
import type { RenderedConnection } from '../../rendered_connection.js';
import type { BlockStyle, Theme } from '../../theme.js';
import type { WorkspaceSvg } from '../../workspace_svg.js';
import { ConstantProvider } from './constants.js';
import { Debug } from './debugger.js';
import { Drawer } from './drawer.js';
import type { IPathObject } from './i_path_object.js';
import { RenderInfo } from './info.js';
import { MarkerSvg } from './marker_svg.js';
/**
 * The base class for a block renderer.
 *
 * @alias Blockly.blockRendering.Renderer
 */
export declare class Renderer implements IRegistrable {
    /** The renderer's constant provider. */
    protected constants_: ConstantProvider;
    /** @internal */
    name: string;
    /**
     * Rendering constant overrides, passed in through options.
     *
     * @internal
     */
    overrides: object | null;
    /**
     * @param name The renderer name.
     * @internal
     */
    constructor(name: string);
    /**
     * Gets the class name that identifies this renderer.
     *
     * @returns The CSS class name.
     * @internal
     */
    getClassName(): string;
    /**
     * Initialize the renderer.
     *
     * @param theme The workspace theme object.
     * @param opt_rendererOverrides Rendering constant overrides.
     * @internal
     */
    init(theme: Theme, opt_rendererOverrides?: {
        [rendererConstant: string]: any;
    }): void;
    /**
     * Create any DOM elements that this renderer needs.
     *
     * @param svg The root of the workspace's SVG.
     * @param theme The workspace theme object.
     * @internal
     */
    createDom(svg: SVGElement, theme: Theme): void;
    /**
     * Refresh the renderer after a theme change.
     *
     * @param svg The root of the workspace's SVG.
     * @param theme The workspace theme object.
     * @internal
     */
    refreshDom(svg: SVGElement, theme: Theme): void;
    /**
     * Dispose of this renderer.
     * Delete all DOM elements that this renderer and its constants created.
     *
     * @internal
     */
    dispose(): void;
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
    protected makeDrawer_(block: BlockSvg, info: RenderInfo): Drawer;
    /**
     * Create a new instance of the renderer's debugger.
     *
     * @returns The renderer debugger.
     * @suppress {strictModuleDepCheck} Debug renderer only included in
     * playground.
     */
    protected makeDebugger_(): Debug;
    /**
     * Create a new instance of the renderer's marker drawer.
     *
     * @param workspace The workspace the marker belongs to.
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
    makePathObject(root: SVGElement, style: BlockStyle): IPathObject;
    /**
     * Get the current renderer's constant provider.  We assume that when this is
     * called, the renderer has already been initialized.
     *
     * @returns The constant provider.
     * @internal
     */
    getConstants(): ConstantProvider;
    /**
     * Determine whether or not to highlight a connection.
     *
     * @param _conn The connection to determine whether or not to highlight.
     * @returns True if we should highlight the connection.
     * @internal
     */
    shouldHighlightConnection(_conn: Connection): boolean;
    /**
     * Checks if an orphaned block can connect to the "end" of the topBlock's
     * block-clump. If the clump is a row the end is the last input. If the clump
     * is a stack, the end is the last next connection. If the clump is neither,
     * then this returns false.
     *
     * @param topBlock The top block of the block clump we want to try and connect
     *     to.
     * @param orphanBlock The orphan block that wants to find a home.
     * @param localType The type of the connection being dragged.
     * @returns Whether there is a home for the orphan or not.
     * @internal
     */
    orphanCanConnectAtEnd(topBlock: BlockSvg, orphanBlock: BlockSvg, localType: number): boolean;
    /**
     * Chooses a connection preview method based on the available connection, the
     * current dragged connection, and the block being dragged.
     *
     * @param closest The available connection.
     * @param local The connection currently being dragged.
     * @param topBlock The block currently being dragged.
     * @returns The preview type to display.
     * @internal
     */
    getConnectionPreviewMethod(closest: RenderedConnection, local: RenderedConnection, topBlock: BlockSvg): PreviewType;
    /**
     * Render the block.
     *
     * @param block The block to render.
     * @internal
     */
    render(block: BlockSvg): void;
}
//# sourceMappingURL=renderer.d.ts.map