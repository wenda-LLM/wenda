/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceComment } from '../workspace_comment.js';
import { CommentBase, CommentBaseJson } from './events_comment_base.js';
/**
 * Class for a comment change event.
 *
 * @alias Blockly.Events.CommentChange
 */
export declare class CommentChange extends CommentBase {
    type: string;
    oldContents_?: string;
    newContents_?: string;
    /**
     * @param opt_comment The comment that is being changed.  Undefined for a
     *     blank event.
     * @param opt_oldContents Previous contents of the comment.
     * @param opt_newContents New contents of the comment.
     */
    constructor(opt_comment?: WorkspaceComment, opt_oldContents?: string, opt_newContents?: string);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): CommentChangeJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: CommentChangeJson): void;
    /**
     * Does this event record any change of state?
     *
     * @returns False if something changed.
     */
    isNull(): boolean;
    /**
     * Run a change event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface CommentChangeJson extends CommentBaseJson {
    oldContents: string;
    newContents: string;
}
//# sourceMappingURL=events_comment_change.d.ts.map