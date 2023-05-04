/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a toolbox item select event.
 *
 * @alias Blockly.Events.ToolboxItemSelect
 */
export declare class ToolboxItemSelect extends UiBase {
    oldItem?: string;
    newItem?: string;
    type: string;
    /**
     * @param opt_oldItem The previously selected toolbox item.
     *     Undefined for a blank event.
     * @param opt_newItem The newly selected toolbox item. Undefined for a blank
     *     event.
     * @param opt_workspaceId The workspace identifier for this event.
     *    Undefined for a blank event.
     */
    constructor(opt_oldItem?: string | null, opt_newItem?: string | null, opt_workspaceId?: string);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): ToolboxItemSelectJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: ToolboxItemSelectJson): void;
}
export interface ToolboxItemSelectJson extends AbstractEventJson {
    oldItem?: string;
    newItem?: string;
}
//# sourceMappingURL=events_toolbox_item_select.d.ts.map