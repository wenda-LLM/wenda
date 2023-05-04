/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ASTNode } from './ast_node.js';
import { BasicCursor } from './basic_cursor.js';
/**
 * A cursor for navigating between tab navigable fields.
 *
 * @alias Blockly.TabNavigateCursor
 */
export declare class TabNavigateCursor extends BasicCursor {
    /**
     * Skip all nodes except for tab navigable fields.
     *
     * @param node The AST node to check whether it is valid.
     * @returns True if the node should be visited, false otherwise.
     */
    validNode_(node: ASTNode | null): boolean;
}
//# sourceMappingURL=tab_navigate_cursor.d.ts.map