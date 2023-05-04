/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { AbstractEventJson } from './events_abstract.js';
import type { BlockSvg } from '../block_svg.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a bubble open event.
 *
 * @alias Blockly.Events.BubbleOpen
 */
export declare class BubbleOpen extends UiBase {
    blockId?: string;
    isOpen?: boolean;
    bubbleType?: BubbleType;
    type: string;
    /**
     * @param opt_block The associated block. Undefined for a blank event.
     * @param opt_isOpen Whether the bubble is opening (false if closing).
     *     Undefined for a blank event.
     * @param opt_bubbleType The type of bubble. One of 'mutator', 'comment' or
     *     'warning'. Undefined for a blank event.
     */
    constructor(opt_block?: BlockSvg, opt_isOpen?: boolean, opt_bubbleType?: BubbleType);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): BubbleOpenJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: BubbleOpenJson): void;
}
export declare enum BubbleType {
    MUTATOR = "mutator",
    COMMENT = "comment",
    WARNING = "warning"
}
export interface BubbleOpenJson extends AbstractEventJson {
    isOpen: boolean;
    bubbleType: BubbleType;
    blockId: string;
}
//# sourceMappingURL=events_bubble_open.d.ts.map