/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ASTNode } from './ast_node.js';
import { Cursor } from './cursor.js';
/**
 * Class for a basic cursor.
 * This will allow the user to get to all nodes in the AST by hitting next or
 * previous.
 *
 * @alias Blockly.BasicCursor
 */
export declare class BasicCursor extends Cursor {
    /** Name used for registering a basic cursor. */
    static readonly registrationName = "basicCursor";
    /** @alias Blockly.BasicCursor */
    constructor();
    /**
     * Find the next node in the pre order traversal.
     *
     * @returns The next node, or null if the current node is not set or there is
     *     no next value.
     */
    next(): ASTNode | null;
    /**
     * For a basic cursor we only have the ability to go next and previous, so
     * in will also allow the user to get to the next node in the pre order
     * traversal.
     *
     * @returns The next node, or null if the current node is not set or there is
     *     no next value.
     */
    in(): ASTNode | null;
    /**
     * Find the previous node in the pre order traversal.
     *
     * @returns The previous node, or null if the current node is not set or there
     *     is no previous value.
     */
    prev(): ASTNode | null;
    /**
     * For a basic cursor we only have the ability to go next and previous, so
     * out will allow the user to get to the previous node in the pre order
     * traversal.
     *
     * @returns The previous node, or null if the current node is not set or there
     *     is no previous value.
     */
    out(): ASTNode | null;
    /**
     * Uses pre order traversal to navigate the Blockly AST. This will allow
     * a user to easily navigate the entire Blockly AST without having to go in
     * and out levels on the tree.
     *
     * @param node The current position in the AST.
     * @param isValid A function true/false depending on whether the given node
     *     should be traversed.
     * @returns The next node in the traversal.
     */
    protected getNextNode_(node: ASTNode | null, isValid: (p1: ASTNode | null) => boolean): ASTNode | null;
    /**
     * Reverses the pre order traversal in order to find the previous node. This
     * will allow a user to easily navigate the entire Blockly AST without having
     * to go in and out levels on the tree.
     *
     * @param node The current position in the AST.
     * @param isValid A function true/false depending on whether the given node
     *     should be traversed.
     * @returns The previous node in the traversal or null if no previous node
     *     exists.
     */
    protected getPreviousNode_(node: ASTNode | null, isValid: (p1: ASTNode | null) => boolean): ASTNode | null;
    /**
     * Decides what nodes to traverse and which ones to skip. Currently, it
     * skips output, stack and workspace nodes.
     *
     * @param node The AST node to check whether it is valid.
     * @returns True if the node should be visited, false otherwise.
     */
    protected validNode_(node: ASTNode | null): boolean;
    /**
     * From the given node find either the next valid sibling or parent.
     *
     * @param node The current position in the AST.
     * @returns The parent AST node or null if there are no valid parents.
     */
    private findSiblingOrParent_;
    /**
     * Get the right most child of a node.
     *
     * @param node The node to find the right most child of.
     * @returns The right most child of the given node, or the node if no child
     *     exists.
     */
    private getRightMostChild_;
}
//# sourceMappingURL=basic_cursor.d.ts.map