/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from './utils/coordinate.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a workspace dragger.  It moves the workspace around when it is
 * being dragged by a mouse or touch.
 * Note that the workspace itself manages whether or not it has a drag surface
 * and how to do translations based on that.  This simply passes the right
 * commands based on events.
 *
 * @alias Blockly.WorkspaceDragger
 */
export declare class WorkspaceDragger {
    private workspace;
    private readonly horizontalScrollEnabled_;
    private readonly verticalScrollEnabled_;
    protected startScrollXY_: Coordinate;
    /** @param workspace The workspace to drag. */
    constructor(workspace: WorkspaceSvg);
    /**
     * Sever all links from this object.
     *
     * @suppress {checkTypes}
     * @internal
     */
    dispose(): void;
    /**
     * Start dragging the workspace.
     *
     * @internal
     */
    startDrag(): void;
    /**
     * Finish dragging the workspace and put everything back where it belongs.
     *
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel coordinates.
     * @internal
     */
    endDrag(currentDragDeltaXY: Coordinate): void;
    /**
     * Move the workspace based on the most recent mouse movements.
     *
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel coordinates.
     * @internal
     */
    drag(currentDragDeltaXY: Coordinate): void;
}
//# sourceMappingURL=workspace_dragger.d.ts.map