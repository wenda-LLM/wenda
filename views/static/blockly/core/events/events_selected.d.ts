/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a selected event.
 *
 * @alias Blockly.Events.Selected
 */
export declare class Selected extends UiBase {
    oldElementId?: string;
    newElementId?: string;
    type: string;
    /**
     * @param opt_oldElementId The ID of the previously selected element. Null if
     *     no element last selected. Undefined for a blank event.
     * @param opt_newElementId The ID of the selected element. Null if no element
     *     currently selected (deselect). Undefined for a blank event.
     * @param opt_workspaceId The workspace identifier for this event.
     *    Null if no element previously selected. Undefined for a blank event.
     */
    constructor(opt_oldElementId?: string | null, opt_newElementId?: string | null, opt_workspaceId?: string);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): SelectedJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: SelectedJson): void;
}
export interface SelectedJson extends AbstractEventJson {
    oldElementId?: string;
    newElementId?: string;
}
//# sourceMappingURL=events_selected.d.ts.map