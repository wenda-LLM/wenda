/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from './utils/coordinate.js';
/**
 * Class for a drag surface for the currently dragged block. This is a separate
 * SVG that contains only the currently moving block, or nothing.
 *
 * @alias Blockly.BlockDragSurfaceSvg
 */
export declare class BlockDragSurfaceSvg {
    private readonly container;
    /**
     * The root element of the drag surface.
     */
    private svg;
    /**
     * This is where blocks live while they are being dragged if the drag
     * surface is enabled.
     */
    private dragGroup;
    /**
     * Cached value for the scale of the drag surface.
     * Used to set/get the correct translation during and after a drag.
     */
    private scale;
    /**
     * Cached value for the translation of the drag surface.
     * This translation is in pixel units, because the scale is applied to the
     * drag group rather than the top-level SVG.
     */
    private surfaceXY;
    /**
     * Cached value for the translation of the child drag surface in pixel
     * units. Since the child drag surface tracks the translation of the
     * workspace this is ultimately the translation of the workspace.
     */
    private readonly childSurfaceXY;
    /** @param container Containing element. */
    constructor(container: Element);
    /**
     * Create the drag surface and inject it into the container.
     *
     * @deprecated The DOM is automatically created by the constructor.
     */
    createDom(): void;
    /**
     * Set the SVG blocks on the drag surface's group and show the surface.
     * Only one block group should be on the drag surface at a time.
     *
     * @param blocks Block or group of blocks to place on the drag surface.
     */
    setBlocksAndShow(blocks: SVGElement): void;
    /**
     * Translate and scale the entire drag surface group to the given position, to
     * keep in sync with the workspace.
     *
     * @param x X translation in pixel coordinates.
     * @param y Y translation in pixel coordinates.
     * @param scale Scale of the group.
     */
    translateAndScaleGroup(x: number, y: number, scale: number): void;
    /**
     * Translate the drag surface's SVG based on its internal state.
     *
     * @internal
     */
    translateSurfaceInternal_(): void;
    /**
     * Translates the entire surface by a relative offset.
     *
     * @param deltaX Horizontal offset in pixel units.
     * @param deltaY Vertical offset in pixel units.
     */
    translateBy(deltaX: number, deltaY: number): void;
    /**
     * Translate the entire drag surface during a drag.
     * We translate the drag surface instead of the blocks inside the surface
     * so that the browser avoids repainting the SVG.
     * Because of this, the drag coordinates must be adjusted by scale.
     *
     * @param x X translation for the entire surface.
     * @param y Y translation for the entire surface.
     */
    translateSurface(x: number, y: number): void;
    /**
     * Reports the surface translation in scaled workspace coordinates.
     * Use this when finishing a drag to return blocks to the correct position.
     *
     * @returns Current translation of the surface.
     */
    getSurfaceTranslation(): Coordinate;
    /**
     * Provide a reference to the drag group (primarily for
     * BlockSvg.getRelativeToSurfaceXY).
     *
     * @returns Drag surface group element.
     */
    getGroup(): SVGElement;
    /**
     * Returns the SVG drag surface.
     *
     * @returns The SVG drag surface.
     */
    getSvgRoot(): SVGElement;
    /**
     * Get the current blocks on the drag surface, if any (primarily
     * for BlockSvg.getRelativeToSurfaceXY).
     *
     * @returns Drag surface block DOM element, or null if no blocks exist.
     */
    getCurrentBlock(): Element | null;
    /**
     * Gets the translation of the child block surface
     * This surface is in charge of keeping track of how much the workspace has
     * moved.
     *
     * @returns The amount the workspace has been moved.
     */
    getWsTranslation(): Coordinate;
    /**
     * Clear the group and hide the surface; move the blocks off onto the provided
     * element.
     * If the block is being deleted it doesn't need to go back to the original
     * surface, since it would be removed immediately during dispose.
     *
     * @param opt_newSurface Surface the dragging blocks should be moved to, or
     *     null if the blocks should be removed from this surface without being
     *     moved to a different surface.
     */
    clearAndHide(opt_newSurface?: Element): void;
}
//# sourceMappingURL=block_drag_surface.d.ts.map