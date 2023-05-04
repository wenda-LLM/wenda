/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IBubble } from './interfaces/i_bubble.js';
import { Coordinate } from './utils/coordinate.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a bubble dragger.  It moves things on the bubble canvas around the
 * workspace when they are being dragged by a mouse or touch.  These can be
 * block comments, mutators, warnings, or workspace comments.
 *
 * @alias Blockly.BubbleDragger
 */
export declare class BubbleDragger {
    private bubble;
    private workspace;
    /** Which drag target the mouse pointer is over, if any. */
    private dragTarget_;
    /** Whether the bubble would be deleted if dropped immediately. */
    private wouldDeleteBubble_;
    private readonly startXY_;
    private dragSurface_;
    /**
     * @param bubble The item on the bubble canvas to drag.
     * @param workspace The workspace to drag on.
     */
    constructor(bubble: IBubble, workspace: WorkspaceSvg);
    /**
     * Start dragging a bubble.  This includes moving it to the drag surface.
     *
     * @internal
     */
    startBubbleDrag(): void;
    /**
     * Execute a step of bubble dragging, based on the given event.  Update the
     * display accordingly.
     *
     * @param e The most recent move event.
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel units.
     * @internal
     */
    dragBubble(e: Event, currentDragDeltaXY: Coordinate): void;
    /**
     * Whether ending the drag would delete the bubble.
     *
     * @param dragTarget The drag target that the bubblee is currently over.
     * @returns Whether dropping the bubble immediately would delete the block.
     */
    private shouldDelete_;
    /**
     * Update the cursor (and possibly the trash can lid) to reflect whether the
     * dragging bubble would be deleted if released immediately.
     */
    private updateCursorDuringBubbleDrag_;
    /**
     * Finish a bubble drag and put the bubble back on the workspace.
     *
     * @param e The mouseup/touchend event.
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel units.
     * @internal
     */
    endBubbleDrag(e: Event, currentDragDeltaXY: Coordinate): void;
    /** Fire a move event at the end of a bubble drag. */
    private fireMoveEvent_;
    /**
     * Convert a coordinate object from pixels to workspace units, including a
     * correction for mutator workspaces.
     * This function does not consider differing origins.  It simply scales the
     * input's x and y values.
     *
     * @param pixelCoord A coordinate with x and y values in CSS pixel units.
     * @returns The input coordinate divided by the workspace scale.
     */
    private pixelsToWorkspaceUnits_;
}
//# sourceMappingURL=bubble_dragger.d.ts.map