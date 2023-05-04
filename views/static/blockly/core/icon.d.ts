/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from './block_svg.js';
import type { Bubble } from './bubble.js';
import { Coordinate } from './utils/coordinate.js';
import { Size } from './utils/size.js';
/**
 * Class for an icon.
 *
 * @alias Blockly.Icon
 */
export declare abstract class Icon {
    protected block_: BlockSvg | null;
    /** The icon SVG group. */
    iconGroup_: SVGGElement | null;
    /** Whether this icon gets hidden when the block is collapsed. */
    collapseHidden: boolean;
    /** Height and width of icons. */
    readonly SIZE = 17;
    /** Bubble UI (if visible). */
    protected bubble_: Bubble | null;
    /** Absolute coordinate of icon's center. */
    protected iconXY_: Coordinate | null;
    /** @param block The block associated with this icon. */
    constructor(block: BlockSvg | null);
    /** Create the icon on the block. */
    createIcon(): void;
    /** Dispose of this icon. */
    dispose(): void;
    /** Add or remove the UI indicating if this icon may be clicked or not. */
    updateEditable(): void;
    /**
     * Is the associated bubble visible?
     *
     * @returns True if the bubble is visible.
     */
    isVisible(): boolean;
    /**
     * Clicking on the icon toggles if the bubble is visible.
     *
     * @param e Mouse click event.
     */
    protected iconClick_(e: MouseEvent): void;
    /** Change the colour of the associated bubble to match its block. */
    applyColour(): void;
    /**
     * Notification that the icon has moved.  Update the arrow accordingly.
     *
     * @param xy Absolute location in workspace coordinates.
     */
    setIconLocation(xy: Coordinate): void;
    /**
     * Notification that the icon has moved, but we don't really know where.
     * Recompute the icon's location from scratch.
     */
    computeIconLocation(): void;
    /**
     * Returns the center of the block's icon relative to the surface.
     *
     * @returns Object with x and y properties in workspace coordinates.
     */
    getIconLocation(): Coordinate | null;
    /**
     * Get the size of the icon as used for rendering.
     * This differs from the actual size of the icon, because it bulges slightly
     * out of its row rather than increasing the height of its row.
     *
     * @returns Height and width.
     */
    getCorrectedSize(): Size;
    /**
     * Draw the icon.
     *
     * @param _group The icon group.
     */
    protected drawIcon_(_group: Element): void;
    /**
     * Show or hide the icon.
     *
     * @param _visible True if the icon should be visible.
     */
    setVisible(_visible: boolean): void;
    /**
     * Returns the block this icon is attached to.
     */
    protected getBlock(): BlockSvg;
}
//# sourceMappingURL=icon.d.ts.map