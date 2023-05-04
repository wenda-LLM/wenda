/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import type { Connection } from '../connection.js';
import type { Field } from '../field.js';
import type { Input } from '../input.js';
import type { IASTNodeLocation } from '../interfaces/i_ast_node_location.js';
import { Coordinate } from '../utils/coordinate.js';
import type { Workspace } from '../workspace.js';
/**
 * Class for an AST node.
 * It is recommended that you use one of the createNode methods instead of
 * creating a node directly.
 *
 * @alias Blockly.ASTNode
 */
export declare class ASTNode {
    /**
     * True to navigate to all fields. False to only navigate to clickable fields.
     */
    static NAVIGATE_ALL_FIELDS: boolean;
    /**
     * The default y offset to use when moving the cursor from a stack to the
     * workspace.
     */
    private static readonly DEFAULT_OFFSET_Y;
    private readonly type_;
    private readonly isConnection_;
    private readonly location_;
    /** The coordinate on the workspace. */
    private wsCoordinate_;
    /**
     * @param type The type of the location.
     *     Must be in ASTNode.types.
     * @param location The position in the AST.
     * @param opt_params Optional dictionary of options.
     * @alias Blockly.ASTNode
     */
    constructor(type: string, location: IASTNodeLocation, opt_params?: Params);
    /**
     * Parse the optional parameters.
     *
     * @param params The user specified parameters.
     */
    private processParams_;
    /**
     * Gets the value pointed to by this node.
     * It is the callers responsibility to check the node type to figure out what
     * type of object they get back from this.
     *
     * @returns The current field, connection, workspace, or block the cursor is
     *     on.
     */
    getLocation(): IASTNodeLocation;
    /**
     * The type of the current location.
     * One of ASTNode.types
     *
     * @returns The type of the location.
     */
    getType(): string;
    /**
     * The coordinate on the workspace.
     *
     * @returns The workspace coordinate or null if the location is not a
     *     workspace.
     */
    getWsCoordinate(): Coordinate;
    /**
     * Whether the node points to a connection.
     *
     * @returns [description]
     * @internal
     */
    isConnection(): boolean;
    /**
     * Given an input find the next editable field or an input with a non null
     * connection in the same block. The current location must be an input
     * connection.
     *
     * @returns The AST node holding the next field or connection or null if there
     *     is no editable field or input connection after the given input.
     */
    private findNextForInput_;
    /**
     * Given a field find the next editable field or an input with a non null
     * connection in the same block. The current location must be a field.
     *
     * @returns The AST node pointing to the next field or connection or null if
     *     there is no editable field or input connection after the given input.
     */
    private findNextForField_;
    /**
     * Given an input find the previous editable field or an input with a non null
     * connection in the same block. The current location must be an input
     * connection.
     *
     * @returns The AST node holding the previous field or connection.
     */
    private findPrevForInput_;
    /**
     * Given a field find the previous editable field or an input with a non null
     * connection in the same block. The current location must be a field.
     *
     * @returns The AST node holding the previous input or field.
     */
    private findPrevForField_;
    /**
     * Navigate between stacks of blocks on the workspace.
     *
     * @param forward True to go forward. False to go backwards.
     * @returns The first block of the next stack or null if there are no blocks
     *     on the workspace.
     */
    private navigateBetweenStacks_;
    /**
     * Finds the top most AST node for a given block.
     * This is either the previous connection, output connection or block
     * depending on what kind of connections the block has.
     *
     * @param block The block that we want to find the top connection on.
     * @returns The AST node containing the top connection.
     */
    private findTopASTNodeForBlock_;
    /**
     * Get the AST node pointing to the input that the block is nested under or if
     * the block is not nested then get the stack AST node.
     *
     * @param block The source block of the current location.
     * @returns The AST node pointing to the input connection or the top block of
     *     the stack this block is in.
     */
    private getOutAstNodeForBlock_;
    /**
     * Find the first editable field or input with a connection on a given block.
     *
     * @param block The source block of the current location.
     * @returns An AST node pointing to the first field or input.
     * Null if there are no editable fields or inputs with connections on the
     * block.
     */
    private findFirstFieldOrInput_;
    /**
     * Finds the source block of the location of this node.
     *
     * @returns The source block of the location, or null if the node is of type
     *     workspace.
     */
    getSourceBlock(): Block | null;
    /**
     * Find the element to the right of the current element in the AST.
     *
     * @returns An AST node that wraps the next field, connection, block, or
     *     workspace. Or null if there is no node to the right.
     */
    next(): ASTNode | null;
    /**
     * Find the element one level below and all the way to the left of the current
     * location.
     *
     * @returns An AST node that wraps the next field, connection, workspace, or
     *     block. Or null if there is nothing below this node.
     */
    in(): ASTNode | null;
    /**
     * Find the element to the left of the current element in the AST.
     *
     * @returns An AST node that wraps the previous field, connection, workspace
     *     or block. Or null if no node exists to the left. null.
     */
    prev(): ASTNode | null;
    /**
     * Find the next element that is one position above and all the way to the
     * left of the current location.
     *
     * @returns An AST node that wraps the next field, connection, workspace or
     *     block. Or null if we are at the workspace level.
     */
    out(): ASTNode | null;
    /**
     * Whether an AST node of the given type points to a connection.
     *
     * @param type The type to check.  One of ASTNode.types.
     * @returns True if a node of the given type points to a connection.
     */
    private static isConnectionType_;
    /**
     * Create an AST node pointing to a field.
     *
     * @param field The location of the AST node.
     * @returns An AST node pointing to a field.
     */
    static createFieldNode(field: Field): ASTNode | null;
    /**
     * Creates an AST node pointing to a connection. If the connection has a
     * parent input then create an AST node of type input that will hold the
     * connection.
     *
     * @param connection This is the connection the node will point to.
     * @returns An AST node pointing to a connection.
     */
    static createConnectionNode(connection: Connection): ASTNode | null;
    /**
     * Creates an AST node pointing to an input. Stores the input connection as
     * the location.
     *
     * @param input The input used to create an AST node.
     * @returns An AST node pointing to a input.
     */
    static createInputNode(input: Input): ASTNode | null;
    /**
     * Creates an AST node pointing to a block.
     *
     * @param block The block used to create an AST node.
     * @returns An AST node pointing to a block.
     */
    static createBlockNode(block: Block): ASTNode | null;
    /**
     * Create an AST node of type stack. A stack, represented by its top block, is
     *     the set of all blocks connected to a top block, including the top
     * block.
     *
     * @param topBlock A top block has no parent and can be found in the list
     *     returned by workspace.getTopBlocks().
     * @returns An AST node of type stack that points to the top block on the
     *     stack.
     */
    static createStackNode(topBlock: Block): ASTNode | null;
    /**
     * Creates an AST node pointing to a workspace.
     *
     * @param workspace The workspace that we are on.
     * @param wsCoordinate The position on the workspace for this node.
     * @returns An AST node pointing to a workspace and a position on the
     *     workspace.
     */
    static createWorkspaceNode(workspace: Workspace | null, wsCoordinate: Coordinate | null): ASTNode | null;
    /**
     * Creates an AST node for the top position on a block.
     * This is either an output connection, previous connection, or block.
     *
     * @param block The block to find the top most AST node on.
     * @returns The AST node holding the top most position on the block.
     */
    static createTopNode(block: Block): ASTNode | null;
}
export declare namespace ASTNode {
    interface Params {
        wsCoordinate: Coordinate;
    }
    enum types {
        FIELD = "field",
        BLOCK = "block",
        INPUT = "input",
        OUTPUT = "output",
        NEXT = "next",
        PREVIOUS = "previous",
        STACK = "stack",
        WORKSPACE = "workspace"
    }
}
export declare type Params = ASTNode.Params;
//# sourceMappingURL=ast_node.d.ts.map