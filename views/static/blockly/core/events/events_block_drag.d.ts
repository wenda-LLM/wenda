/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a block drag event.
 *
 * @alias Blockly.Events.BlockDrag
 */
export declare class BlockDrag extends UiBase {
    blockId?: string;
    isStart?: boolean;
    blocks?: Block[];
    type: string;
    /**
     * @param opt_block The top block in the stack that is being dragged.
     *     Undefined for a blank event.
     * @param opt_isStart Whether this is the start of a block drag.
     *    Undefined for a blank event.
     * @param opt_blocks The blocks affected by this drag. Undefined for a blank
     *     event.
     */
    constructor(opt_block?: Block, opt_isStart?: boolean, opt_blocks?: Block[]);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): BlockDragJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: BlockDragJson): void;
}
export interface BlockDragJson extends AbstractEventJson {
    isStart: boolean;
    blockId: string;
    blocks?: Block[];
}
//# sourceMappingURL=events_block_drag.d.ts.map