/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceComment } from '../workspace_comment.js';
import { CommentBase, CommentBaseJson } from './events_comment_base.js';
/**
 * Class for a comment creation event.
 *
 * @alias Blockly.Events.CommentCreate
 */
export declare class CommentCreate extends CommentBase {
    type: string;
    xml?: Element | DocumentFragment;
    /**
     * @param opt_comment The created comment.
     *     Undefined for a blank event.
     */
    constructor(opt_comment?: WorkspaceComment);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): CommentCreateJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: CommentCreateJson): void;
    /**
     * Run a creation event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface CommentCreateJson extends CommentBaseJson {
    xml: string;
}
//# sourceMappingURL=events_comment_create.d.ts.map