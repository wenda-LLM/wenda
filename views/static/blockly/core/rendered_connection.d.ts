/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import type { BlockSvg } from './block_svg.js';
import { Connection } from './connection.js';
import { Coordinate } from './utils/coordinate.js';
/**
 * Class for a connection between blocks that may be rendered on screen.
 *
 * @alias Blockly.RenderedConnection
 */
export declare class RenderedConnection extends Connection {
    sourceBlock_: BlockSvg;
    private readonly db_;
    private readonly dbOpposite_;
    private readonly offsetInBlock_;
    private trackedState_;
    private highlightPath;
    /** Connection this connection connects to.  Null if not connected. */
    targetConnection: RenderedConnection | null;
    /**
     * @param source The block establishing this connection.
     * @param type The type of the connection.
     */
    constructor(source: BlockSvg, type: number);
    /**
     * Dispose of this connection. Remove it from the database (if it is
     * tracked) and call the super-function to deal with connected blocks.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Get the source block for this connection.
     *
     * @returns The source block.
     */
    getSourceBlock(): BlockSvg;
    /**
     * Returns the block that this connection connects to.
     *
     * @returns The connected block or null if none is connected.
     */
    targetBlock(): BlockSvg | null;
    /**
     * Returns the distance between this connection and another connection in
     * workspace units.
     *
     * @param otherConnection The other connection to measure the distance to.
     * @returns The distance between connections, in workspace units.
     */
    distanceFrom(otherConnection: Connection): number;
    /**
     * Move the block(s) belonging to the connection to a point where they don't
     * visually interfere with the specified connection.
     *
     * @param staticConnection The connection to move away from.
     * @internal
     */
    bumpAwayFrom(staticConnection: RenderedConnection): void;
    /**
     * Change the connection's coordinates.
     *
     * @param x New absolute x coordinate, in workspace coordinates.
     * @param y New absolute y coordinate, in workspace coordinates.
     */
    moveTo(x: number, y: number): void;
    /**
     * Change the connection's coordinates.
     *
     * @param dx Change to x coordinate, in workspace units.
     * @param dy Change to y coordinate, in workspace units.
     */
    moveBy(dx: number, dy: number): void;
    /**
     * Move this connection to the location given by its offset within the block
     * and the location of the block's top left corner.
     *
     * @param blockTL The location of the top left corner of the block, in
     *     workspace coordinates.
     */
    moveToOffset(blockTL: Coordinate): void;
    /**
     * Set the offset of this connection relative to the top left of its block.
     *
     * @param x The new relative x, in workspace units.
     * @param y The new relative y, in workspace units.
     */
    setOffsetInBlock(x: number, y: number): void;
    /**
     * Get the offset of this connection relative to the top left of its block.
     *
     * @returns The offset of the connection.
     * @internal
     */
    getOffsetInBlock(): Coordinate;
    /**
     * Move the blocks on either side of this connection right next to each other.
     *
     * @internal
     */
    tighten(): void;
    /**
     * Find the closest compatible connection to this connection.
     * All parameters are in workspace units.
     *
     * @param maxLimit The maximum radius to another connection.
     * @param dxy Offset between this connection's location in the database and
     *     the current location (as a result of dragging).
     * @returns Contains two properties: 'connection' which is either another
     *     connection or null, and 'radius' which is the distance.
     */
    closest(maxLimit: number, dxy: Coordinate): {
        connection: RenderedConnection | null;
        radius: number;
    };
    /** Add highlighting around this connection. */
    highlight(): void;
    /** Remove the highlighting around this connection. */
    unhighlight(): void;
    /**
     * Set whether this connections is tracked in the database or not.
     *
     * @param doTracking If true, start tracking. If false, stop tracking.
     * @internal
     */
    setTracking(doTracking: boolean): void;
    /**
     * Stop tracking this connection, as well as all down-stream connections on
     * any block attached to this connection. This happens when a block is
     * collapsed.
     *
     * Also closes down-stream icons/bubbles.
     *
     * @internal
     */
    stopTrackingAll(): void;
    /**
     * Start tracking this connection, as well as all down-stream connections on
     * any block attached to this connection. This happens when a block is
     * expanded.
     *
     * @returns List of blocks to render.
     */
    startTrackingAll(): Block[];
    /**
     * Behavior after a connection attempt fails.
     * Bumps this connection away from the other connection. Called when an
     * attempted connection fails.
     *
     * @param otherConnection Connection that this connection failed to connect
     *     to.
     * @internal
     */
    onFailedConnect(otherConnection: Connection): void;
    /**
     * Disconnect two blocks that are connected by this connection.
     *
     * @param parentBlock The superior block.
     * @param childBlock The inferior block.
     */
    protected disconnectInternal_(parentBlock: Block, childBlock: Block): void;
    /**
     * Respawn the shadow block if there was one connected to the this connection.
     * Render/rerender blocks as needed.
     */
    protected respawnShadow_(): void;
    /**
     * Find all nearby compatible connections to this connection.
     * Type checking does not apply, since this function is used for bumping.
     *
     * @param maxLimit The maximum radius to another connection, in workspace
     *     units.
     * @returns List of connections.
     * @internal
     */
    neighbours(maxLimit: number): RenderedConnection[];
    /**
     * Connect two connections together.  This is the connection on the superior
     * block.  Rerender blocks as needed.
     *
     * @param childConnection Connection on inferior block.
     */
    protected connect_(childConnection: Connection): void;
    /**
     * Function to be called when this connection's compatible types have changed.
     */
    protected onCheckChanged_(): void;
}
export declare namespace RenderedConnection {
    /**
     * Enum for different kinds of tracked states.
     *
     * WILL_TRACK means that this connection will add itself to
     * the db on the next moveTo call it receives.
     *
     * UNTRACKED means that this connection will not add
     * itself to the database until setTracking(true) is explicitly called.
     *
     * TRACKED means that this connection is currently being tracked.
     */
    enum TrackedState {
        WILL_TRACK = -1,
        UNTRACKED = 0,
        TRACKED = 1
    }
}
export declare type TrackedState = RenderedConnection.TrackedState;
export declare const TrackedState: typeof RenderedConnection.TrackedState;
//# sourceMappingURL=rendered_connection.d.ts.map