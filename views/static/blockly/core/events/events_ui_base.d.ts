/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Abstract as AbstractEvent } from './events_abstract.js';
/**
 * Base class for a UI event.
 * UI events are events that don't need to be sent over the wire for multi-user
 * editing to work (e.g. scrolling the workspace, zooming, opening toolbox
 * categories).
 * UI events do not undo or redo.
 *
 * @alias Blockly.Events.UiBase
 */
export declare class UiBase extends AbstractEvent {
    isBlank: boolean;
    workspaceId: string;
    recordUndo: boolean;
    /** Whether or not the event is a UI event. */
    isUiEvent: boolean;
    /**
     * @param opt_workspaceId The workspace identifier for this event.
     *    Undefined for a blank event.
     */
    constructor(opt_workspaceId?: string);
}
//# sourceMappingURL=events_ui_base.d.ts.map