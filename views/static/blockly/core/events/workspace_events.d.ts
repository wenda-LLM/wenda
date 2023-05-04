/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Workspace } from '../workspace.js';
import { Abstract as AbstractEvent, AbstractEventJson } from './events_abstract.js';
/**
 * Class for a finished loading event.
 * Used to notify the developer when the workspace has finished loading (i.e
 * domToWorkspace).
 * Finished loading events do not record undo or redo.
 *
 * @alias Blockly.Events.FinishedLoading
 */
export declare class FinishedLoading extends AbstractEvent {
    isBlank: boolean;
    recordUndo: boolean;
    type: string;
    /**
     * @param opt_workspace The workspace that has finished loading.  Undefined
     *     for a blank event.
     */
    constructor(opt_workspace?: Workspace);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): FinishedLoadingJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: FinishedLoadingJson): void;
}
export interface FinishedLoadingJson extends AbstractEventJson {
    workspaceId: string;
}
//# sourceMappingURL=workspace_events.d.ts.map