/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_drag.js';
import type { BlockSvg } from './block_svg.js';
import type { Icon } from './icon.js';
import { InsertionMarkerManager } from './insertion_marker_manager.js';
import type { IBlockDragger } from './interfaces/i_block_dragger.js';
import { Coordinate } from './utils/coordinate.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a block dragger.  It moves blocks around the workspace when they
 * are being dragged by a mouse or touch.
 *
 * @alias Blockly.BlockDragger
 */
export declare class BlockDragger implements IBlockDragger {
    /** The top block in the stack that is being dragged. */
    protected draggingBlock_: BlockSvg;
    protected draggedConnectionManager_: InsertionMarkerManager;
    /** The workspace on which the block is being dragged. */
    protected workspace_: WorkspaceSvg;
    /** Which drag area the mouse pointer is over, if any. */
    private dragTarget_;
    /** Whether the block would be deleted if dropped immediately. */
    protected wouldDeleteBlock_: boolean;
    protected startXY_: Coordinate;
    protected dragIconData_: IconPositionData[];
    /**
     * @param block The block to drag.
     * @param workspace The workspace to drag on.
     */
    constructor(block: BlockSvg, workspace: WorkspaceSvg);
    /**
     * Sever all links from this object.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Start dragging a block.  This includes moving it to the drag surface.
     *
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at mouse down, in pixel units.
     * @param healStack Whether or not to heal the stack after disconnecting.
     */
    startDrag(currentDragDeltaXY: Coordinate, healStack: boolean): void;
    /**
     * Whether or not we should disconnect the block when a drag is started.
     *
     * @param healStack Whether or not to heal the stack after disconnecting.
     * @returns True to disconnect the block, false otherwise.
     */
    protected shouldDisconnect_(healStack: boolean): boolean;
    /**
     * Disconnects the block and moves it to a new location.
     *
     * @param healStack Whether or not to heal the stack after disconnecting.
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at mouse down, in pixel units.
     */
    protected disconnectBlock_(healStack: boolean, currentDragDeltaXY: Coordinate): void;
    /** Fire a UI event at the start of a block drag. */
    protected fireDragStartEvent_(): void;
    /**
     * Execute a step of block dragging, based on the given event.  Update the
     * display accordingly.
     *
     * @param e The most recent move event.
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel units.
     */
    drag(e: Event, currentDragDeltaXY: Coordinate): void;
    /**
     * Finish a block drag and put the block back on the workspace.
     *
     * @param e The mouseup/touchend event.
     * @param currentDragDeltaXY How far the pointer has moved from the position
     *     at the start of the drag, in pixel units.
     */
    endDrag(e: Event, currentDragDeltaXY: Coordinate): void;
    /**
     * Calculates the drag delta and new location values after a block is dragged.
     *
     * @param currentDragDeltaXY How far the pointer has moved from the start of
     *     the drag, in pixel units.
     * @returns New location after drag. delta is in workspace units. newLocation
     *     is the new coordinate where the block should end up.
     */
    protected getNewLocationAfterDrag_(currentDragDeltaXY: Coordinate): {
        delta: Coordinate;
        newLocation: Coordinate;
    };
    /**
     * May delete the dragging block, if allowed. If `this.wouldDeleteBlock_` is
     * not true, the block will not be deleted. This should be called at the end
     * of a block drag.
     *
     * @returns True if the block was deleted.
     */
    protected maybeDeleteBlock_(): boolean;
    /**
     * Updates the necessary information to place a block at a certain location.
     *
     * @param delta The change in location from where the block started the drag
     *     to where it ended the drag.
     */
    protected updateBlockAfterMove_(delta: Coordinate): void;
    /** Fire a UI event at the end of a block drag. */
    protected fireDragEndEvent_(): void;
    /**
     * Adds or removes the style of the cursor for the toolbox.
     * This is what changes the cursor to display an x when a deletable block is
     * held over the toolbox.
     *
     * @param isEnd True if we are at the end of a drag, false otherwise.
     */
    protected updateToolboxStyle_(isEnd: boolean): void;
    /** Fire a move event at the end of a block drag. */
    protected fireMoveEvent_(): void;
    /**
     * Update the cursor (and possibly the trash can lid) to reflect whether the
     * dragging block would be deleted if released immediately.
     */
    protected updateCursorDuringBlockDrag_(): void;
    /**
     * Convert a coordinate object from pixels to workspace units, including a
     * correction for mutator workspaces.
     * This function does not consider differing origins.  It simply scales the
     * input's x and y values.
     *
     * @param pixelCoord A coordinate with x and y values in CSS pixel units.
     * @returns The input coordinate divided by the workspace scale.
     */
    protected pixelsToWorkspaceUnits_(pixelCoord: Coordinate): Coordinate;
    /**
     * Move all of the icons connected to this drag.
     *
     * @param dxy How far to move the icons from their original positions, in
     *     workspace units.
     */
    protected dragIcons_(dxy: Coordinate): void;
    /**
     * Get a list of the insertion markers that currently exist.  Drags have 0, 1,
     * or 2 insertion markers.
     *
     * @returns A possibly empty list of insertion marker blocks.
     */
    getInsertionMarkers(): BlockSvg[];
}
/** Data about the position of a given icon. */
export interface IconPositionData {
    location: Coordinate;
    icon: Icon;
}
//# sourceMappingURL=block_dragger.d.ts.map