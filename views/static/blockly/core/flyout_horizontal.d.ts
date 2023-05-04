/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Flyout, FlyoutItem } from './flyout_base.js';
import type { Options } from './options.js';
import type { Coordinate } from './utils/coordinate.js';
import { Rect } from './utils/rect.js';
/**
 * Class for a flyout.
 *
 * @alias Blockly.HorizontalFlyout
 */
export declare class HorizontalFlyout extends Flyout {
    horizontalLayout: boolean;
    /** @param workspaceOptions Dictionary of options for the workspace. */
    constructor(workspaceOptions: Options);
    /**
     * Sets the translation of the flyout to match the scrollbars.
     *
     * @param xyRatio Contains a y property which is a float between 0 and 1
     *     specifying the degree of scrolling and a similar x property.
     */
    protected setMetrics_(xyRatio: {
        x: number;
        y: number;
    }): void;
    /**
     * Calculates the x coordinate for the flyout position.
     *
     * @returns X coordinate.
     */
    getX(): number;
    /**
     * Calculates the y coordinate for the flyout position.
     *
     * @returns Y coordinate.
     */
    getY(): number;
    /** Move the flyout to the edge of the workspace. */
    position(): void;
    /**
     * Create and set the path for the visible boundaries of the flyout.
     *
     * @param width The width of the flyout, not including the rounded corners.
     * @param height The height of the flyout, not including rounded corners.
     */
    private setBackgroundPath_;
    /** Scroll the flyout to the top. */
    scrollToStart(): void;
    /**
     * Scroll the flyout.
     *
     * @param e Mouse wheel scroll event.
     */
    protected wheel_(e: WheelEvent): void;
    /**
     * Lay out the blocks in the flyout.
     *
     * @param contents The blocks and buttons to lay out.
     * @param gaps The visible gaps between blocks.
     */
    protected layout_(contents: FlyoutItem[], gaps: number[]): void;
    /**
     * Determine if a drag delta is toward the workspace, based on the position
     * and orientation of the flyout. This is used in determineDragIntention_ to
     * determine if a new block should be created or if the flyout should scroll.
     *
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at mouse down, in pixel units.
     * @returns True if the drag is toward the workspace.
     * @internal
     */
    isDragTowardWorkspace(currentDragDeltaXY: Coordinate): boolean;
    /**
     * Returns the bounding rectangle of the drag target area in pixel units
     * relative to viewport.
     *
     * @returns The component's bounding box. Null if drag target area should be
     *     ignored.
     */
    getClientRect(): Rect | null;
    /**
     * Compute height of flyout.  toolbox.Position mat under each block.
     * For RTL: Lay out the blocks right-aligned.
     */
    protected reflowInternal_(): void;
}
//# sourceMappingURL=flyout_horizontal.d.ts.map