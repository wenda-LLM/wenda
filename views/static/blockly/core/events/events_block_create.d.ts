/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import * as blocks from '../serialization/blocks.js';
import { BlockBase, BlockBaseJson } from './events_block_base.js';
/**
 * Class for a block creation event.
 *
 * @alias Blockly.Events.BlockCreate
 */
export declare class BlockCreate extends BlockBase {
    type: string;
    xml?: Element | DocumentFragment;
    ids?: string[];
    json?: blocks.State;
    /** @param opt_block The created block.  Undefined for a blank event. */
    constructor(opt_block?: Block);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): BlockCreateJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: BlockCreateJson): void;
    /**
     * Run a creation event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface BlockCreateJson extends BlockBaseJson {
    xml: string;
    ids: string[];
    json: object;
    recordUndo?: boolean;
}
//# sourceMappingURL=events_block_create.d.ts.map