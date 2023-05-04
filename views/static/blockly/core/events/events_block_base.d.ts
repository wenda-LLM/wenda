/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import { Abstract as AbstractEvent, AbstractEventJson } from './events_abstract.js';
/**
 * Abstract class for a block event.
 *
 * @alias Blockly.Events.BlockBase
 */
export declare class BlockBase extends AbstractEvent {
    isBlank: boolean;
    blockId?: string;
    /**
     * @param opt_block The block this event corresponds to.
     *     Undefined for a blank event.
     */
    constructor(opt_block?: Block);
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
    fromJson(json: BlockBaseJson): void;
}
export interface BlockBaseJson extends AbstractEventJson {
    blockId: string;
}
//# sourceMappingURL=events_block_base.d.ts.map