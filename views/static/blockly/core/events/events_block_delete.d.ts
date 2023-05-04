/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import * as blocks from '../serialization/blocks.js';
import { BlockBase, BlockBaseJson } from './events_block_base.js';
/**
 * Class for a block deletion event.
 *
 * @alias Blockly.Events.BlockDelete
 */
export declare class BlockDelete extends BlockBase {
    oldXml?: Element | DocumentFragment;
    ids?: string[];
    wasShadow?: boolean;
    oldJson?: blocks.State;
    type: string;
    /** @param opt_block The deleted block.  Undefined for a blank event. */
    constructor(opt_block?: Block);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): BlockDeleteJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: BlockDeleteJson): void;
    /**
     * Run a deletion event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface BlockDeleteJson extends BlockBaseJson {
    oldXml: string;
    ids: string[];
    wasShadow: boolean;
    oldJson: blocks.State;
    recordUndo?: boolean;
}
//# sourceMappingURL=events_block_delete.d.ts.map