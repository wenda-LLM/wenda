/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ASTNode } from './ast_node.js';
import { Marker } from './marker.js';
/**
 * Class for a cursor.
 * A cursor controls how a user navigates the Blockly AST.
 *
 * @alias Blockly.Cursor
 */
export declare class Cursor extends Marker {
    type: string;
    /** @alias Blockly.Cursor */
    constructor();
    /**
     * Find the next connection, field, or block.
     *
     * @returns The next element, or null if the current node is not set or there
     *     is no next value.
     */
    next(): ASTNode | null;
    /**
     * Find the in connection or field.
     *
     * @returns The in element, or null if the current node is not set or there is
     *     no in value.
     */
    in(): ASTNode | null;
    /**
     * Find the previous connection, field, or block.
     *
     * @returns The previous element, or null if the current node is not set or
     *     there is no previous value.
     */
    prev(): ASTNode | null;
    /**
     * Find the out connection, field, or block.
     *
     * @returns The out element, or null if the current node is not set or there
     *     is no out value.
     */
    out(): ASTNode | null;
}
//# sourceMappingURL=cursor.d.ts.map