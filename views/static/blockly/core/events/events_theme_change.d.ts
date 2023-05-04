/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a theme change event.
 *
 * @alias Blockly.Events.ThemeChange
 */
export declare class ThemeChange extends UiBase {
    themeName?: string;
    type: string;
    /**
     * @param opt_themeName The theme name. Undefined for a blank event.
     * @param opt_workspaceId The workspace identifier for this event.
     *    event. Undefined for a blank event.
     */
    constructor(opt_themeName?: string, opt_workspaceId?: string);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): ThemeChangeJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: ThemeChangeJson): void;
}
export interface ThemeChangeJson extends AbstractEventJson {
    themeName: string;
}
//# sourceMappingURL=events_theme_change.d.ts.map