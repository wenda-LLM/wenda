/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IASTNodeLocation } from './i_ast_node_location.js';
import type { Block } from '../block.js';
/**
 * An AST node location that has an associated block.
 *
 * @alias Blockly.IASTNodeLocationWithBlock
 */
export interface IASTNodeLocationWithBlock extends IASTNodeLocation {
    /**
     * Get the source block associated with this node.
     *
     * @returns The source block.
     */
    getSourceBlock(): Block | null;
}
//# sourceMappingURL=i_ast_node_location_with_block.d.ts.map