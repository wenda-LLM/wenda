/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Workspace } from '../workspace.js';
/**
 * Abstract class for an event.
 *
 * @alias Blockly.Events.Abstract
 */
export declare abstract class Abstract {
    /** Whether or not the event is blank (to be populated by fromJson). */
    abstract isBlank: boolean;
    /** The workspace identifier for this event. */
    workspaceId?: string;
    group: string;
    recordUndo: boolean;
    /** Whether or not the event is a UI event. */
    isUiEvent: boolean;
    /** Type of this event. */
    type: string;
    /** @alias Blockly.Events.Abstract */
    constructor();
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): AbstractEventJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: AbstractEventJson): void;
    /**
     * Does this event record any change of state?
     *
     * @returns True if null, false if something changed.
     */
    isNull(): boolean;
    /**
     * Run an event.
     *
     * @param _forward True if run forward, false if run backward (undo).
     */
    run(_forward: boolean): void;
    /**
     * Get workspace the event belongs to.
     *
     * @returns The workspace the event belongs to.
     * @throws {Error} if workspace is null.
     * @internal
     */
    getEventWorkspace_(): Workspace;
}
export interface AbstractEventJson {
    type: string;
    group: string;
}
//# sourceMappingURL=events_abstract.d.ts.map