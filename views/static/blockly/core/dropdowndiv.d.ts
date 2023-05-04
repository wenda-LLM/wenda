/**
 * @license
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from './block_svg.js';
import type { Field } from './field.js';
/**
 * Arrow size in px. Should match the value in CSS
 * (need to position pre-render).
 */
export declare const ARROW_SIZE = 16;
/**
 * Drop-down border size in px. Should match the value in CSS (need to position
 * the arrow).
 */
export declare const BORDER_SIZE = 1;
/**
 * Amount the arrow must be kept away from the edges of the main drop-down div,
 * in px.
 */
export declare const ARROW_HORIZONTAL_PADDING = 12;
/** Amount drop-downs should be padded away from the source, in px. */
export declare const PADDING_Y = 16;
/** Length of animations in seconds. */
export declare const ANIMATION_TIME = 0.25;
/**
 * Dropdown bounds info object used to encapsulate sizing information about a
 * bounding element (bounding box and width/height).
 */
export interface BoundsInfo {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}
/** Dropdown position metrics. */
export interface PositionMetrics {
    initialX: number;
    initialY: number;
    finalX: number;
    finalY: number;
    arrowX: number | null;
    arrowY: number | null;
    arrowAtTop: boolean | null;
    arrowVisible: boolean;
}
/**
 * Create and insert the DOM element for this div.
 *
 * @internal
 */
export declare function createDom(): void;
/**
 * Set an element to maintain bounds within. Drop-downs will appear
 * within the box of this element if possible.
 *
 * @param boundsElem Element to bind drop-down to.
 */
export declare function setBoundsElement(boundsElem: Element | null): void;
/**
 * Provide the div for inserting content into the drop-down.
 *
 * @returns Div to populate with content.
 */
export declare function getContentDiv(): Element;
/** Clear the content of the drop-down. */
export declare function clearContent(): void;
/**
 * Set the colour for the drop-down.
 *
 * @param backgroundColour Any CSS colour for the background.
 * @param borderColour Any CSS colour for the border.
 */
export declare function setColour(backgroundColour: string, borderColour: string): void;
/**
 * Shortcut to show and place the drop-down with positioning determined
 * by a particular block. The primary position will be below the block,
 * and the secondary position above the block. Drop-down will be
 * constrained to the block's workspace.
 *
 * @param field The field showing the drop-down.
 * @param block Block to position the drop-down around.
 * @param opt_onHide Optional callback for when the drop-down is hidden.
 * @param opt_secondaryYOffset Optional Y offset for above-block positioning.
 * @returns True if the menu rendered below block; false if above.
 */
export declare function showPositionedByBlock(field: Field, block: BlockSvg, opt_onHide?: Function, opt_secondaryYOffset?: number): boolean;
/**
 * Shortcut to show and place the drop-down with positioning determined
 * by a particular field. The primary position will be below the field,
 * and the secondary position above the field. Drop-down will be
 * constrained to the block's workspace.
 *
 * @param field The field to position the dropdown against.
 * @param opt_onHide Optional callback for when the drop-down is hidden.
 * @param opt_secondaryYOffset Optional Y offset for above-block positioning.
 * @returns True if the menu rendered below block; false if above.
 */
export declare function showPositionedByField(field: Field, opt_onHide?: Function, opt_secondaryYOffset?: number): boolean;
/**
 * Show and place the drop-down.
 * The drop-down is placed with an absolute "origin point" (x, y) - i.e.,
 * the arrow will point at this origin and box will positioned below or above
 * it.  If we can maintain the container bounds at the primary point, the arrow
 * will point there, and the container will be positioned below it.
 * If we can't maintain the container bounds at the primary point, fall-back to
 * the secondary point and position above.
 *
 * @param newOwner The object showing the drop-down
 * @param rtl Right-to-left (true) or left-to-right (false).
 * @param primaryX Desired origin point x, in absolute px.
 * @param primaryY Desired origin point y, in absolute px.
 * @param secondaryX Secondary/alternative origin point x, in absolute px.
 * @param secondaryY Secondary/alternative origin point y, in absolute px.
 * @param opt_onHide Optional callback for when the drop-down is hidden.
 * @returns True if the menu rendered at the primary origin point.
 * @internal
 */
export declare function show(newOwner: Field, rtl: boolean, primaryX: number, primaryY: number, secondaryX: number, secondaryY: number, opt_onHide?: Function): boolean;
/**
 * Get the x positions for the left side of the DropDownDiv and the arrow,
 * accounting for the bounds of the workspace.
 *
 * @param sourceX Desired origin point x, in absolute px.
 * @param boundsLeft The left edge of the bounding element, in absolute px.
 * @param boundsRight The right edge of the bounding element, in absolute px.
 * @param divWidth The width of the div in px.
 * @returns An object containing metrics for the x positions of the left side of
 *     the DropDownDiv and the arrow.
 * @internal
 */
export declare function getPositionX(sourceX: number, boundsLeft: number, boundsRight: number, divWidth: number): {
    divX: number;
    arrowX: number;
};
/**
 * Is the container visible?
 *
 * @returns True if visible.
 */
export declare function isVisible(): boolean;
/**
 * Hide the menu only if it is owned by the provided object.
 *
 * @param divOwner Object which must be owning the drop-down to hide.
 * @param opt_withoutAnimation True if we should hide the dropdown without
 *     animating.
 * @returns True if hidden.
 */
export declare function hideIfOwner(divOwner: Field, opt_withoutAnimation?: boolean): boolean;
/** Hide the menu, triggering animation. */
export declare function hide(): void;
/** Hide the menu, without animation. */
export declare function hideWithoutAnimation(): void;
/**
 * Repositions the dropdownDiv on window resize. If it doesn't know how to
 * calculate the new position, it will just hide it instead.
 *
 * @internal
 */
export declare function repositionForWindowResize(): void;
export declare const TEST_ONLY: {
    /**
     * Get sizing info about the bounding element.
     *
     * @returns An object containing size information about the bounding element
     *     (bounding box and width/height).
     */
    getBoundsInfo: () => BoundsInfo;
    /**
     * Helper to position the drop-down and the arrow, maintaining bounds.
     * See explanation of origin points in show.
     *
     * @param primaryX Desired origin point x, in absolute px.
     * @param primaryY Desired origin point y, in absolute px.
     * @param secondaryX Secondary/alternative origin point x, in absolute px.
     * @param secondaryY Secondary/alternative origin point y, in absolute px.
     * @returns Various final metrics, including rendered positions for drop-down
     *     and arrow.
     */
    getPositionMetrics: (primaryX: number, primaryY: number, secondaryX: number, secondaryY: number) => PositionMetrics;
};
//# sourceMappingURL=dropdowndiv.d.ts.map