/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from '../utils/coordinate.js';
import type { WorkspaceComment } from '../workspace_comment.js';
import { CommentBase, CommentBaseJson } from './events_comment_base.js';
/**
 * Class for a comment move event.  Created before the move.
 *
 * @alias Blockly.Events.CommentMove
 */
export declare class CommentMove extends CommentBase {
    type: string;
    comment_?: WorkspaceComment;
    oldCoordinate_?: Coordinate;
    /** The location after the move, in workspace coordinates. */
    newCoordinate_?: Coordinate;
    /**
     * @param opt_comment The comment that is being moved.  Undefined for a blank
     *     event.
     */
    constructor(opt_comment?: WorkspaceComment);
    /**
     * Record the comment's new location.  Called after the move.  Can only be
     * called once.
     */
    recordNew(): void;
    /**
     * Override the location before the move.  Use this if you don't create the
     * event until the end of the move, but you know the original location.
     *
     * @param xy The location before the move, in workspace coordinates.
     */
    setOldCoordinate(xy: Coordinate): void;
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): CommentMoveJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: CommentMoveJson): void;
    /**
     * Does this event record any change of state?
     *
     * @returns False if something changed.
     */
    isNull(): boolean;
    /**
     * Run a move event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface CommentMoveJson extends CommentBaseJson {
    oldCoordinate: string;
    newCoordinate: string;
}
//# sourceMappingURL=events_comment_move.d.ts.map