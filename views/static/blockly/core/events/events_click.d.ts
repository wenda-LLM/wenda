/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a click event.
 *
 * @alias Blockly.Events.Click
 */
export declare class Click extends UiBase {
    blockId?: string;
    targetType?: ClickTarget;
    type: string;
    /**
     * @param opt_block The affected block. Null for click events that do not have
     *     an associated block (i.e. workspace click). Undefined for a blank
     *     event.
     * @param opt_workspaceId The workspace identifier for this event.
     *    Not used if block is passed. Undefined for a blank event.
     * @param opt_targetType The type of element targeted by this click event.
     *     Undefined for a blank event.
     */
    constructor(opt_block?: Block | null, opt_workspaceId?: string | null, opt_targetType?: ClickTarget);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): ClickJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: ClickJson): void;
}
export declare enum ClickTarget {
    BLOCK = "block",
    WORKSPACE = "workspace",
    ZOOM_CONTROLS = "zoom_controls"
}
export interface ClickJson extends AbstractEventJson {
    targetType: ClickTarget;
    blockId?: string;
}
//# sourceMappingURL=events_click.d.ts.map