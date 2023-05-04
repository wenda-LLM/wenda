/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as browserEvents from './browser_events.js';
import { Coordinate } from './utils/coordinate.js';
import type { Metrics } from './utils/metrics.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * A note on units: most of the numbers that are in CSS pixels are scaled if the
 * scrollbar is in a mutator.
 */
/**
 * Class for a pure SVG scrollbar.
 * This technique offers a scrollbar that is guaranteed to work, but may not
 * look or behave like the system's scrollbars.
 *
 * @alias Blockly.Scrollbar
 */
export declare class Scrollbar {
    private workspace;
    private readonly horizontal;
    /**
     * Width of vertical scrollbar or height of horizontal scrollbar in CSS
     * pixels. Scrollbars should be larger on touch devices.
     */
    static scrollbarThickness: number;
    /**
     * Default margin around the scrollbar (between the scrollbar and the edge of
     * the viewport in pixels).
     *
     * @internal
     */
    static readonly DEFAULT_SCROLLBAR_MARGIN = 0.5;
    /** Whether this scrollbar is part of a pair. */
    private readonly pair;
    /**
     * Margin around the scrollbar (between the scrollbar and the edge of the
     * viewport in pixels).
     */
    private readonly margin;
    /** Previously recorded metrics from the workspace. */
    private oldHostMetrics;
    /**
     * The ratio of handle position offset to workspace content displacement.
     *
     * @internal
     */
    ratio: number;
    /**
     * The location of the origin of the workspace that the scrollbar is in,
     * measured in CSS pixels relative to the injection div origin.  This is
     * usually (0, 0).  When the scrollbar is in a flyout it may have a
     * different origin.
     */
    private origin;
    /**
     * The position of the mouse along this scrollbar's major axis at the start
     * of the most recent drag. Units are CSS pixels, with (0, 0) at the top
     * left of the browser window. For a horizontal scrollbar this is the x
     * coordinate of the mouse down event; for a vertical scrollbar it's the y
     * coordinate of the mouse down event.
     */
    private startDragMouse;
    /**
     * The length of the scrollbars (including the handle and the background),
     * in CSS pixels. This is equivalent to scrollbar background length and the
     * area within which the scrollbar handle can move.
     */
    private scrollbarLength;
    /** The length of the scrollbar handle in CSS pixels. */
    private handleLength;
    /**
     * The offset of the start of the handle from the scrollbar position, in CSS
     * pixels.
     */
    private handlePosition;
    private startDragHandle;
    /** Whether the scrollbar handle is visible. */
    private isHandleVisible;
    /** Whether the workspace containing this scrollbar is visible. */
    private containerVisible;
    /** The transparent background behind the handle. */
    private svgBackground;
    /** The visible handle that can be dragged around. */
    private svgHandle;
    /** The outermost SVG element, which contains all parts of the scrollbar. */
    private outerSvg;
    /**
     * The upper left corner of the scrollbar's SVG group in CSS pixels relative
     * to the scrollbar's origin.  This is usually relative to the injection div
     * origin.
     *
     * @internal
     */
    position: Coordinate;
    /**
     * The DOM attribute that controls the length of the scrollbar. Different
     * for horizontal and vertical scrollbars.
     */
    lengthAttribute_: string;
    /**
     * The DOM attribute that controls the position of the scrollbar.
     * Different for horizontal and vertical scrollbars.
     */
    positionAttribute_: string;
    /** Handler for mouse down events on the background of the scrollbar. */
    onMouseDownBarWrapper_: browserEvents.Data;
    /** Handler for mouse down events on the handle of the scrollbar. */
    onMouseDownHandleWrapper_: browserEvents.Data;
    /** Handler for mouse move events during scrollbar drags. */
    onMouseUpWrapper_: browserEvents.Data | null;
    /** Handler for mouse up events to end scrollbar drags. */
    onMouseMoveWrapper_: browserEvents.Data | null;
    /**
     * @param workspace Workspace to bind the scrollbar to.
     * @param horizontal True if horizontal, false if vertical.
     * @param opt_pair True if scrollbar is part of a horiz/vert pair.
     * @param opt_class A class to be applied to this scrollbar.
     * @param opt_margin The margin to apply to this scrollbar.
     */
    constructor(workspace: WorkspaceSvg, horizontal: boolean, opt_pair?: boolean, opt_class?: string, opt_margin?: number);
    /**
     * Set the size of the scrollbar DOM elements along the minor axis.
     */
    private setInitialThickness;
    /**
     * Dispose of this scrollbar. Remove DOM elements, event listeners,
     * and theme subscriptions.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
    /**
     * Constrain the handle's length within the minimum (0) and maximum
     * (scrollbar background) values allowed for the scrollbar.
     *
     * @param value Value that is potentially out of bounds, in CSS pixels.
     * @returns Constrained value, in CSS pixels.
     */
    private constrainHandleLength;
    /**
     * Set the length of the scrollbar's handle and change the SVG attribute
     * accordingly.
     *
     * @param newLength The new scrollbar handle length in CSS pixels.
     */
    private setHandleLength;
    /**
     * Constrain the handle's position within the minimum (0) and maximum values
     * allowed for the scrollbar.
     *
     * @param value Value that is potentially out of bounds, in CSS pixels.
     * @returns Constrained value, in CSS pixels.
     */
    private constrainHandlePosition;
    /**
     * Set the offset of the scrollbar's handle from the scrollbar's position, and
     * change the SVG attribute accordingly.
     *
     * @param newPosition The new scrollbar handle offset in CSS pixels.
     */
    setHandlePosition(newPosition: number): void;
    /**
     * Set the size of the scrollbar's background and change the SVG attribute
     * accordingly.
     *
     * @param newSize The new scrollbar background length in CSS pixels.
     */
    private setScrollbarLength;
    /**
     * Set the position of the scrollbar's SVG group in CSS pixels relative to the
     * scrollbar's origin.  This sets the scrollbar's location within the
     * workspace.
     *
     * @param x The new x coordinate.
     * @param y The new y coordinate.
     * @internal
     */
    setPosition(x: number, y: number): void;
    /**
     * Recalculate the scrollbar's location and its length.
     *
     * @param opt_metrics A data structure of from the describing all the required
     *     dimensions.  If not provided, it will be fetched from the host object.
     */
    resize(opt_metrics?: Metrics): void;
    /**
     * Returns whether the a resizeView is necessary by comparing the passed
     * hostMetrics with cached old host metrics.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     * @returns Whether a resizeView is necessary.
     */
    private requiresViewResize;
    /**
     * Recalculate a horizontal scrollbar's location and length.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    private resizeHorizontal;
    /**
     * Recalculate a horizontal scrollbar's location on the screen and path
     * length. This should be called when the layout or size of the window has
     * changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeViewHorizontal(hostMetrics: Metrics): void;
    /**
     * Recalculate a horizontal scrollbar's location within its path and length.
     * This should be called when the contents of the workspace have changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeContentHorizontal(hostMetrics: Metrics): void;
    /**
     * Recalculate a vertical scrollbar's location and length.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    private resizeVertical;
    /**
     * Recalculate a vertical scrollbar's location on the screen and path length.
     * This should be called when the layout or size of the window has changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeViewVertical(hostMetrics: Metrics): void;
    /**
     * Recalculate a vertical scrollbar's location within its path and length.
     * This should be called when the contents of the workspace have changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeContentVertical(hostMetrics: Metrics): void;
    /**
     * Is the scrollbar visible.  Non-paired scrollbars disappear when they aren't
     * needed.
     *
     * @returns True if visible.
     */
    isVisible(): boolean;
    /**
     * Set whether the scrollbar's container is visible and update
     * display accordingly if visibility has changed.
     *
     * @param visible Whether the container is visible
     */
    setContainerVisible(visible: boolean): void;
    /**
     * Set whether the scrollbar is visible.
     * Only applies to non-paired scrollbars.
     *
     * @param visible True if visible.
     */
    setVisible(visible: boolean): void;
    /**
     * Update visibility of scrollbar based on whether it thinks it should
     * be visible and whether its containing workspace is visible.
     * We cannot rely on the containing workspace being hidden to hide us
     * because it is not necessarily our parent in the DOM.
     */
    updateDisplay_(): void;
    /**
     * Scroll by one pageful.
     * Called when scrollbar background is clicked.
     *
     * @param e Mouse down event.
     */
    private onMouseDownBar;
    /**
     * Start a dragging operation.
     * Called when scrollbar handle is clicked.
     *
     * @param e Mouse down event.
     */
    private onMouseDownHandle;
    /**
     * Drag the scrollbar's handle.
     *
     * @param e Mouse move event.
     */
    private onMouseMoveHandle;
    /** Release the scrollbar handle and reset state accordingly. */
    private onMouseUpHandle;
    /**
     * Hide chaff and stop binding to mouseup and mousemove events.  Call this to
     * wrap up loose ends associated with the scrollbar.
     */
    private cleanUp;
    /**
     * Helper to calculate the ratio of handle position to scrollbar view size.
     *
     * @returns Ratio.
     * @internal
     */
    getRatio_(): number;
    /**
     * Updates workspace metrics based on new scroll ratio. Called when scrollbar
     * is moved.
     */
    private updateMetrics;
    /**
     * Set the scrollbar handle's position.
     *
     * @param value The content displacement, relative to the view in pixels.
     * @param updateMetrics Whether to update metrics on this set call.
     *    Defaults to true.
     */
    set(value: number, updateMetrics?: boolean): void;
    /**
     * Record the origin of the workspace that the scrollbar is in, in pixels
     * relative to the injection div origin. This is for times when the scrollbar
     * is used in an object whose origin isn't the same as the main workspace
     * (e.g. in a flyout.)
     *
     * @param x The x coordinate of the scrollbar's origin, in CSS pixels.
     * @param y The y coordinate of the scrollbar's origin, in CSS pixels.
     */
    setOrigin(x: number, y: number): void;
    /**
     * @param first An object containing computed measurements of a workspace.
     * @param second Another object containing computed measurements of a
     *     workspace.
     * @returns Whether the two sets of metrics are equivalent.
     */
    private static metricsAreEquivalent;
}
//# sourceMappingURL=scrollbar.d.ts.map