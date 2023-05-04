/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from './block_svg.js';
import type { IDragTarget } from './interfaces/i_drag_target.js';
import type { Coordinate } from './utils/coordinate.js';
/**
 * Class that controls updates to connections during drags.  It is primarily
 * responsible for finding the closest eligible connection and highlighting or
 * unhighlighting it as needed during a drag.
 *
 * @alias Blockly.InsertionMarkerManager
 */
export declare class InsertionMarkerManager {
    private readonly topBlock_;
    private readonly workspace_;
    /**
     * The last connection on the stack, if it's not the last connection on the
     * first block.
     * Set in initAvailableConnections, if at all.
     */
    private lastOnStack_;
    /**
     * The insertion marker corresponding to the last block in the stack, if
     * that's not the same as the first block in the stack.
     * Set in initAvailableConnections, if at all
     */
    private lastMarker_;
    private firstMarker_;
    /**
     * The connection that this block would connect to if released immediately.
     * Updated on every mouse move.
     * This is not on any of the blocks that are being dragged.
     */
    private closestConnection_;
    /**
     * The connection that would connect to this.closestConnection_ if this
     * block were released immediately. Updated on every mouse move. This is on
     * the top block that is being dragged or the last block in the dragging
     * stack.
     */
    private localConnection_;
    /**
     * Whether the block would be deleted if it were dropped immediately.
     * Updated on every mouse move.
     */
    private wouldDeleteBlock_;
    /**
     * Connection on the insertion marker block that corresponds to
     * this.localConnection_ on the currently dragged block.
     */
    private markerConnection_;
    /** The block that currently has an input being highlighted, or null. */
    private highlightedBlock_;
    /** The block being faded to indicate replacement, or null. */
    private fadedBlock_;
    private availableConnections_;
    /** @param block The top block in the stack being dragged. */
    constructor(block: BlockSvg);
    /**
     * Sever all links from this object.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Update the available connections for the top block. These connections can
     * change if a block is unplugged and the stack is healed.
     *
     * @internal
     */
    updateAvailableConnections(): void;
    /**
     * Return whether the block would be deleted if dropped immediately, based on
     * information from the most recent move event.
     *
     * @returns True if the block would be deleted if dropped immediately.
     * @internal
     */
    wouldDeleteBlock(): boolean;
    /**
     * Return whether the block would be connected if dropped immediately, based
     * on information from the most recent move event.
     *
     * @returns True if the block would be connected if dropped immediately.
     * @internal
     */
    wouldConnectBlock(): boolean;
    /**
     * Connect to the closest connection and render the results.
     * This should be called at the end of a drag.
     *
     * @internal
     */
    applyConnections(): void;
    /**
     * Update connections based on the most recent move location.
     *
     * @param dxy Position relative to drag start, in workspace units.
     * @param dragTarget The drag target that the block is currently over.
     * @internal
     */
    update(dxy: Coordinate, dragTarget: IDragTarget | null): void;
    /**
     * Create an insertion marker that represents the given block.
     *
     * @param sourceBlock The block that the insertion marker will represent.
     * @returns The insertion marker that represents the given block.
     */
    private createMarkerBlock_;
    /**
     * Populate the list of available connections on this block stack.  This
     * should only be called once, at the beginning of a drag. If the stack has
     * more than one block, this function will populate lastOnStack_ and create
     * the corresponding insertion marker.
     *
     * @returns A list of available connections.
     */
    private initAvailableConnections_;
    /**
     * Whether the previews (insertion marker and replacement marker) should be
     * updated based on the closest candidate and the current drag distance.
     *
     * @param candidate An object containing a local connection, a closest
     *     connection, and a radius.  Returned by getCandidate_.
     * @param dxy Position relative to drag start, in workspace units.
     * @returns Whether the preview should be updated.
     */
    private shouldUpdatePreviews_;
    /**
     * Find the nearest valid connection, which may be the same as the current
     * closest connection.
     *
     * @param dxy Position relative to drag start, in workspace units.
     * @returns An object containing a local connection, a closest connection, and
     *     a radius.
     */
    private getCandidate_;
    /**
     * Decide the radius at which to start searching for the closest connection.
     *
     * @returns The radius at which to start the search for the closest
     *     connection.
     */
    private getStartRadius_;
    /**
     * Whether ending the drag would delete the block.
     *
     * @param candidate An object containing a local connection, a closest
     *     connection, and a radius.
     * @param dragTarget The drag target that the block is currently over.
     * @returns Whether dropping the block immediately would delete the block.
     */
    private shouldDelete_;
    /**
     * Show an insertion marker or replacement highlighting during a drag, if
     * needed.
     * At the beginning of this function, this.localConnection_ and
     * this.closestConnection_ should both be null.
     *
     * @param candidate An object containing a local connection, a closest
     *     connection, and a radius.
     */
    private maybeShowPreview_;
    /**
     * A preview should be shown.  This function figures out if it should be a
     * block highlight or an insertion marker, and shows the appropriate one.
     */
    private showPreview_;
    /**
     * Show an insertion marker or replacement highlighting during a drag, if
     * needed.
     * At the end of this function, this.localConnection_ and
     * this.closestConnection_ should both be null.
     *
     * @param candidate An object containing a local connection, a closest
     *     connection, and a radius.
     */
    private maybeHidePreview_;
    /**
     * A preview should be hidden.  This function figures out if it is a block
     *  highlight or an insertion marker, and hides the appropriate one.
     */
    private hidePreview_;
    /**
     * Shows an insertion marker connected to the appropriate blocks (based on
     * manager state).
     */
    private showInsertionMarker_;
    /**
     * Disconnects and hides the current insertion marker. Should return the
     * blocks to their original state.
     */
    private hideInsertionMarker_;
    /** Shows an outline around the input the closest connection belongs to. */
    private showInsertionInputOutline_;
    /** Hides any visible input outlines. */
    private hideInsertionInputOutline_;
    /**
     * Shows a replacement fade affect on the closest connection's target block
     * (the block that is currently connected to it).
     */
    private showReplacementFade_;
    /** Hides/Removes any visible fade affects. */
    private hideReplacementFade_;
    /**
     * Get a list of the insertion markers that currently exist.  Drags have 0, 1,
     * or 2 insertion markers.
     *
     * @returns A possibly empty list of insertion marker blocks.
     * @internal
     */
    getInsertionMarkers(): BlockSvg[];
}
export declare namespace InsertionMarkerManager {
    /**
     * An enum describing different kinds of previews the InsertionMarkerManager
     * could display.
     */
    enum PREVIEW_TYPE {
        INSERTION_MARKER = 0,
        INPUT_OUTLINE = 1,
        REPLACEMENT_FADE = 2
    }
}
export declare type PreviewType = InsertionMarkerManager.PREVIEW_TYPE;
export declare const PreviewType: typeof InsertionMarkerManager.PREVIEW_TYPE;
//# sourceMappingURL=insertion_marker_manager.d.ts.map