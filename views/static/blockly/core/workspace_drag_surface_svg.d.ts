/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Coordinate } from './utils/coordinate.js';
/**
 * Blocks are moved into this SVG during a drag, improving performance.
 * The entire SVG is translated using CSS transforms instead of SVG so the
 * blocks are never repainted during drag improving performance.
 *
 * @alias Blockly.WorkspaceDragSurfaceSvg
 */
export declare class WorkspaceDragSurfaceSvg {
    private readonly container;
    /**
     * The SVG drag surface. Set once by WorkspaceDragSurfaceSvg.createDom.
     */
    private SVG;
    /**
     * The element to insert the block canvas and bubble canvas after when it
     * goes back in the DOM at the end of a drag.
     */
    private previousSibling;
    /** @param container Containing element. */
    constructor(container: Element);
    /** Create the drag surface and inject it into the container. */
    createDom(): void;
    /**
     * Translate the entire drag surface during a drag.
     * We translate the drag surface instead of the blocks inside the surface
     * so that the browser avoids repainting the SVG.
     * Because of this, the drag coordinates must be adjusted by scale.
     *
     * @param x X translation for the entire surface
     * @param y Y translation for the entire surface
     * @internal
     */
    translateSurface(x: number, y: number): void;
    /**
     * Reports the surface translation in scaled workspace coordinates.
     * Use this when finishing a drag to return blocks to the correct position.
     *
     * @returns Current translation of the surface
     * @internal
     */
    getSurfaceTranslation(): Coordinate;
    /**
     * Move the blockCanvas and bubbleCanvas out of the surface SVG and on to
     * newSurface.
     *
     * @param newSurface The element to put the drag surface contents into.
     * @internal
     */
    clearAndHide(newSurface: SVGElement): void;
    /**
     * Set the SVG to have the block canvas and bubble canvas in it and then
     * show the surface.
     *
     * @param blockCanvas The block canvas <g> element from the
     *     workspace.
     * @param bubbleCanvas The <g> element that contains the
       bubbles.
     * @param previousSibling The element to insert the block canvas and
             bubble canvas after when it goes back in the DOM at the end of a
       drag.
     * @param width The width of the workspace SVG element.
     * @param height The height of the workspace SVG element.
     * @param scale The scale of the workspace being dragged.
     * @internal
     */
    setContentsAndShow(blockCanvas: SVGElement, bubbleCanvas: SVGElement, previousSibling: Element, width: number, height: number, scale: number): void;
}
//# sourceMappingURL=workspace_drag_surface_svg.d.ts.map