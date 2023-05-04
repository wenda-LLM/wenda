/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Scrollbar } from './scrollbar.js';
import type { Metrics } from './utils/metrics.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a pair of scrollbars.  Horizontal and vertical.
 *
 * @alias Blockly.ScrollbarPair
 */
export declare class ScrollbarPair {
    private workspace;
    hScroll: Scrollbar | null;
    vScroll: Scrollbar | null;
    corner_: SVGRectElement | null;
    /** Previously recorded metrics from the workspace. */
    private oldHostMetrics_;
    /**
     * @param workspace Workspace to bind the scrollbars to.
     * @param addHorizontal Whether to add a horizontal scrollbar.
     *    Defaults to true.
     * @param addVertical Whether to add a vertical scrollbar. Defaults to true.
     * @param opt_class A class to be applied to these scrollbars.
     * @param opt_margin The margin to apply to these scrollbars.
     */
    constructor(workspace: WorkspaceSvg, addHorizontal?: boolean, addVertical?: boolean, opt_class?: string, opt_margin?: number);
    /**
     * Dispose of this pair of scrollbars.
     * Unlink from all DOM elements to prevent memory leaks.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
    /**
     * Recalculate both of the scrollbars' locations and lengths.
     * Also reposition the corner rectangle.
     */
    resize(): void;
    /**
     * Returns whether scrolling horizontally is enabled.
     *
     * @returns True if horizontal scroll is enabled.
     */
    canScrollHorizontally(): boolean;
    /**
     * Returns whether scrolling vertically is enabled.
     *
     * @returns True if vertical scroll is enabled.
     */
    canScrollVertically(): boolean;
    /**
     * Record the origin of the workspace that the scrollbar is in, in pixels
     * relative to the injection div origin. This is for times when the scrollbar
     * is used in an object whose origin isn't the same as the main workspace
     * (e.g. in a flyout.)
     *
     * @param x The x coordinate of the scrollbar's origin, in CSS pixels.
     * @param y The y coordinate of the scrollbar's origin, in CSS pixels.
     * @internal
     */
    setOrigin(x: number, y: number): void;
    /**
     * Set the handles of both scrollbars.
     *
     * @param x The horizontal content displacement, relative to the view in
     *     pixels.
     * @param y The vertical content displacement, relative to the view in pixels.
     * @param updateMetrics Whether to update metrics on this set call.
     *    Defaults to true.
     */
    set(x: number, y: number, updateMetrics: boolean): void;
    /**
     * Set the handle of the horizontal scrollbar to be at a certain position in
     *    CSS pixels relative to its parents.
     *
     * @param x Horizontal scroll value.
     */
    setX(x: number): void;
    /**
     * Set the handle of the vertical scrollbar to be at a certain position in
     *    CSS pixels relative to its parents.
     *
     * @param y Vertical scroll value.
     */
    setY(y: number): void;
    /**
     * Set whether this scrollbar's container is visible.
     *
     * @param visible Whether the container is visible.
     */
    setContainerVisible(visible: boolean): void;
    /**
     * If any of the scrollbars are visible. Non-paired scrollbars may disappear
     * when they aren't needed.
     *
     * @returns True if visible.
     */
    isVisible(): boolean;
    /**
     * Recalculates the scrollbars' locations within their path and length.
     * This should be called when the contents of the workspace have changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeContent(hostMetrics: Metrics): void;
    /**
     * Recalculates the scrollbars' locations on the screen and path length.
     * This should be called when the layout or size of the window has changed.
     *
     * @param hostMetrics A data structure describing all the required dimensions,
     *     possibly fetched from the host object.
     */
    resizeView(hostMetrics: Metrics): void;
}
//# sourceMappingURL=scrollbar_pair.d.ts.map