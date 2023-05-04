/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Workspace } from '../workspace.js';
/**
 * Returns the state of the workspace as a plain JavaScript object.
 *
 * @param workspace The workspace to serialize.
 * @returns The serialized state of the workspace.
 * @alias Blockly.serialization.workspaces.save
 */
export declare function save(workspace: Workspace): {
    [key: string]: any;
};
/**
 * Loads the variable represented by the given state into the given workspace.
 *
 * @param state The state of the workspace to deserialize into the workspace.
 * @param workspace The workspace to add the new state to.
 * @param param1 recordUndo: If true, events triggered by this function will be
 *     undo-able by the user. False by default.
 * @alias Blockly.serialization.workspaces.load
 */
export declare function load(state: {
    [key: string]: any;
}, workspace: Workspace, { recordUndo }?: {
    recordUndo?: boolean;
}): void;
//# sourceMappingURL=workspaces.d.ts.map