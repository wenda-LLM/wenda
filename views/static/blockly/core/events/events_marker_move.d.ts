/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import { ASTNode } from '../keyboard_nav/ast_node.js';
import { AbstractEventJson } from './events_abstract.js';
import { UiBase } from './events_ui_base.js';
/**
 * Class for a marker move event.
 *
 * @alias Blockly.Events.MarkerMove
 */
export declare class MarkerMove extends UiBase {
    blockId?: string;
    oldNode?: ASTNode;
    newNode?: ASTNode;
    isCursor?: boolean;
    type: string;
    /**
     * @param opt_block The affected block. Null if current node is of type
     *     workspace. Undefined for a blank event.
     * @param isCursor Whether this is a cursor event. Undefined for a blank
     *     event.
     * @param opt_oldNode The old node the marker used to be on.
     *    Undefined for a blank event.
     * @param opt_newNode The new node the marker is now on.
     *    Undefined for a blank event.
     */
    constructor(opt_block?: Block | null, isCursor?: boolean, opt_oldNode?: ASTNode | null, opt_newNode?: ASTNode);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): MarkerMoveJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: MarkerMoveJson): void;
}
export interface MarkerMoveJson extends AbstractEventJson {
    isCursor: boolean;
    blockId?: string;
    oldNode?: ASTNode;
    newNode: ASTNode;
}
//# sourceMappingURL=events_marker_move.d.ts.map