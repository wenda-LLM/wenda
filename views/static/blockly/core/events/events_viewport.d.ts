/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a viewport change event.
 *
 * @alias Blockly.Events.ViewportChange
 */
export declare class ViewportChange extends UiBase {
    viewTop?: number;
    viewLeft?: number;
    scale?: number;
    oldScale?: number;
    type: string;
    /**
     * @param opt_top Top-edge of the visible portion of the workspace, relative
     *     to the workspace origin. Undefined for a blank event.
     * @param opt_left Left-edge of the visible portion of the workspace relative
     *     to the workspace origin. Undefined for a blank event.
     * @param opt_scale The scale of the workspace. Undefined for a blank event.
     * @param opt_workspaceId The workspace identifier for this event.
     *    Undefined for a blank event.
     * @param opt_oldScale The old scale of the workspace. Undefined for a blank
     *     event.
     */
    constructor(opt_top?: number, opt_left?: number, opt_scale?: number, opt_workspaceId?: string, opt_oldScale?: number);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): ViewportChangeJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: ViewportChangeJson): void;
}
export interface ViewportChangeJson extends AbstractEventJson {
    viewTop: number;
    viewLeft: number;
    scale: number;
    oldScale: number;
}
//# sourceMappingURL=events_viewport.d.ts.map