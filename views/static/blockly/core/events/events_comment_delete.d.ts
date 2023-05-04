/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceComment } from '../workspace_comment.js';
import { CommentBase } from './events_comment_base.js';
/**
 * Class for a comment deletion event.
 *
 * @alias Blockly.Events.CommentDelete
 */
export declare class CommentDelete extends CommentBase {
    type: string;
    xml?: Element;
    /**
     * @param opt_comment The deleted comment.
     *     Undefined for a blank event.
     */
    constructor(opt_comment?: WorkspaceComment);
    /**
     * Run a creation event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
//# sourceMappingURL=events_comment_delete.d.ts.map