/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IConnectionChecker } from './interfaces/i_connection_checker.js';
import type { RenderedConnection } from './rendered_connection.js';
import type { Coordinate } from './utils/coordinate.js';
/**
 * Database of connections.
 * Connections are stored in order of their vertical component.  This way
 * connections in an area may be looked up quickly using a binary search.
 *
 * @alias Blockly.ConnectionDB
 */
export declare class ConnectionDB {
    private readonly connectionChecker;
    /** Array of connections sorted by y position in workspace units. */
    private readonly connections_;
    /**
     * @param connectionChecker The workspace's connection type checker, used to
     *     decide if connections are valid during a drag.
     */
    constructor(connectionChecker: IConnectionChecker);
    /**
     * Add a connection to the database. Should not already exist in the database.
     *
     * @param connection The connection to be added.
     * @param yPos The y position used to decide where to insert the connection.
     * @internal
     */
    addConnection(connection: RenderedConnection, yPos: number): void;
    /**
     * Finds the index of the given connection.
     *
     * Starts by doing a binary search to find the approximate location, then
     * linearly searches nearby for the exact connection.
     *
     * @param conn The connection to find.
     * @param yPos The y position used to find the index of the connection.
     * @returns The index of the connection, or -1 if the connection was not
     *     found.
     */
    private findIndexOfConnection_;
    /**
     * Finds the correct index for the given y position.
     *
     * @param yPos The y position used to decide where to insert the connection.
     * @returns The candidate index.
     */
    private calculateIndexForYPos_;
    /**
     * Remove a connection from the database.  Must already exist in DB.
     *
     * @param connection The connection to be removed.
     * @param yPos The y position used to find the index of the connection.
     * @throws {Error} If the connection cannot be found in the database.
     */
    removeConnection(connection: RenderedConnection, yPos: number): void;
    /**
     * Find all nearby connections to the given connection.
     * Type checking does not apply, since this function is used for bumping.
     *
     * @param connection The connection whose neighbours should be returned.
     * @param maxRadius The maximum radius to another connection.
     * @returns List of connections.
     */
    getNeighbours(connection: RenderedConnection, maxRadius: number): RenderedConnection[];
    /**
     * Is the candidate connection close to the reference connection.
     * Extremely fast; only looks at Y distance.
     *
     * @param index Index in database of candidate connection.
     * @param baseY Reference connection's Y value.
     * @param maxRadius The maximum radius to another connection.
     * @returns True if connection is in range.
     */
    private isInYRange_;
    /**
     * Find the closest compatible connection to this connection.
     *
     * @param conn The connection searching for a compatible mate.
     * @param maxRadius The maximum radius to another connection.
     * @param dxy Offset between this connection's location in the database and
     *     the current location (as a result of dragging).
     * @returns Contains two properties: 'connection' which is either another
     *     connection or null, and 'radius' which is the distance.
     */
    searchForClosest(conn: RenderedConnection, maxRadius: number, dxy: Coordinate): {
        connection: RenderedConnection | null;
        radius: number;
    };
    /**
     * Initialize a set of connection DBs for a workspace.
     *
     * @param checker The workspace's connection checker, used to decide if
     *     connections are valid during a drag.
     * @returns Array of databases.
     */
    static init(checker: IConnectionChecker): ConnectionDB[];
}
//# sourceMappingURL=connection_db.d.ts.map