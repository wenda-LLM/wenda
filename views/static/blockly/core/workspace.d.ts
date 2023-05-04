/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './connection_checker.js';
import type { Block } from './block.js';
import type { ConnectionDB } from './connection_db.js';
import type { Abstract } from './events/events_abstract.js';
import type { IASTNodeLocation } from './interfaces/i_ast_node_location.js';
import type { IConnectionChecker } from './interfaces/i_connection_checker.js';
import { Options } from './options.js';
import type * as toolbox from './utils/toolbox.js';
import { VariableMap } from './variable_map.js';
import type { VariableModel } from './variable_model.js';
import type { WorkspaceComment } from './workspace_comment.js';
import { IProcedureMap } from './interfaces/i_procedure_map.js';
/**
 * Class for a workspace.  This is a data structure that contains blocks.
 * There is no UI, and can be created headlessly.
 *
 * @alias Blockly.Workspace
 */
export declare class Workspace implements IASTNodeLocation {
    /**
     * Angle away from the horizontal to sweep for blocks.  Order of execution is
     * generally top to bottom, but a small angle changes the scan to give a bit
     * of a left to right bias (reversed in RTL).  Units are in degrees. See:
     * https://tvtropes.org/pmwiki/pmwiki.php/Main/DiagonalBilling
     */
    static SCAN_ANGLE: number;
    id: string;
    options: Options;
    RTL: boolean;
    horizontalLayout: boolean;
    toolboxPosition: toolbox.Position;
    /**
     * Returns `true` if the workspace is visible and `false` if it's headless.
     */
    rendered: boolean;
    /**
     * Is this workspace the surface for a flyout?
     *
     * @internal
     */
    internalIsFlyout: boolean;
    /** Is this workspace the surface for a flyout? */
    get isFlyout(): boolean;
    /**
     * Is this workspace the surface for a mutator?
     *
     * @internal
     */
    internalIsMutator: boolean;
    /** Is this workspace the surface for a mutator? */
    get isMutator(): boolean;
    /**
     * Returns `true` if the workspace is currently in the process of a bulk
     * clear.
     *
     * @internal
     */
    isClearing: boolean;
    /**
     * Maximum number of undo events in stack. `0` turns off undo, `Infinity`
     * sets it to unlimited.
     */
    MAX_UNDO: number;
    /** Set of databases for rapid lookup of connection locations. */
    connectionDBList: ConnectionDB[];
    connectionChecker: IConnectionChecker;
    private readonly topBlocks;
    private readonly topComments;
    private readonly commentDB;
    private readonly listeners;
    protected undoStack_: Abstract[];
    protected redoStack_: Abstract[];
    private readonly blockDB;
    private readonly typedBlocksDB;
    private variableMap;
    private procedureMap;
    /**
     * Blocks in the flyout can refer to variables that don't exist in the main
     * workspace.  For instance, the "get item in list" block refers to an
     * "item" variable regardless of whether the variable has been created yet.
     * A FieldVariable must always refer to a VariableModel.  We reconcile
     * these by tracking "potential" variables in the flyout.  These variables
     * become real when references to them are dragged into the main workspace.
     */
    private potentialVariableMap;
    /** @param opt_options Dictionary of options. */
    constructor(opt_options?: Options);
    /**
     * Dispose of this workspace.
     * Unlink from all DOM elements to prevent memory leaks.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
    /**
     * Compare function for sorting objects (blocks, comments, etc) by position;
     *    top to bottom (with slight LTR or RTL bias).
     *
     * @param a The first object to compare.
     * @param b The second object to compare.
     * @returns The comparison value. This tells Array.sort() how to change object
     *     a's index.
     */
    private sortObjects_;
    /**
     * Adds a block to the list of top blocks.
     *
     * @param block Block to add.
     */
    addTopBlock(block: Block): void;
    /**
     * Removes a block from the list of top blocks.
     *
     * @param block Block to remove.
     */
    removeTopBlock(block: Block): void;
    /**
     * Finds the top-level blocks and returns them.  Blocks are optionally sorted
     * by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param ordered Sort the list if true.
     * @returns The top-level block objects.
     */
    getTopBlocks(ordered: boolean): Block[];
    /**
     * Add a block to the list of blocks keyed by type.
     *
     * @param block Block to add.
     */
    addTypedBlock(block: Block): void;
    /**
     * Remove a block from the list of blocks keyed by type.
     *
     * @param block Block to remove.
     */
    removeTypedBlock(block: Block): void;
    /**
     * Finds the blocks with the associated type and returns them. Blocks are
     * optionally sorted by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param type The type of block to search for.
     * @param ordered Sort the list if true.
     * @returns The blocks of the given type.
     */
    getBlocksByType(type: string, ordered: boolean): Block[];
    /**
     * Adds a comment to the list of top comments.
     *
     * @param comment comment to add.
     * @internal
     */
    addTopComment(comment: WorkspaceComment): void;
    /**
     * Removes a comment from the list of top comments.
     *
     * @param comment comment to remove.
     * @internal
     */
    removeTopComment(comment: WorkspaceComment): void;
    /**
     * Finds the top-level comments and returns them.  Comments are optionally
     * sorted by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param ordered Sort the list if true.
     * @returns The top-level comment objects.
     * @internal
     */
    getTopComments(ordered: boolean): WorkspaceComment[];
    /**
     * Find all blocks in workspace.  Blocks are optionally sorted
     * by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param ordered Sort the list if true.
     * @returns Array of blocks.
     */
    getAllBlocks(ordered: boolean): Block[];
    /** Dispose of all blocks and comments in workspace. */
    clear(): void;
    /**
     * Rename a variable by updating its name in the variable map. Identify the
     * variable to rename with the given ID.
     *
     * @param id ID of the variable to rename.
     * @param newName New variable name.
     */
    renameVariableById(id: string, newName: string): void;
    /**
     * Create a variable with a given name, optional type, and optional ID.
     *
     * @param name The name of the variable. This must be unique across variables
     *     and procedures.
     * @param opt_type The type of the variable like 'int' or 'string'.
     *     Does not need to be unique. Field_variable can filter variables based
     * on their type. This will default to '' which is a specific type.
     * @param opt_id The unique ID of the variable. This will default to a UUID.
     * @returns The newly created variable.
     */
    createVariable(name: string, opt_type?: string | null, opt_id?: string | null): VariableModel;
    /**
     * Find all the uses of the given variable, which is identified by ID.
     *
     * @param id ID of the variable to find.
     * @returns Array of block usages.
     */
    getVariableUsesById(id: string): Block[];
    /**
     * Delete a variables by the passed in ID and all of its uses from this
     * workspace. May prompt the user for confirmation.
     *
     * @param id ID of variable to delete.
     */
    deleteVariableById(id: string): void;
    /**
     * Find the variable by the given name and return it. Return null if not
     * found.
     *
     * @param name The name to check for.
     * @param opt_type The type of the variable.  If not provided it defaults to
     *     the empty string, which is a specific type.
     * @returns The variable with the given name.
     */
    getVariable(name: string, opt_type?: string): VariableModel | null;
    /**
     * Find the variable by the given ID and return it. Return null if not found.
     *
     * @param id The ID to check for.
     * @returns The variable with the given ID.
     */
    getVariableById(id: string): VariableModel | null;
    /**
     * Find the variable with the specified type. If type is null, return list of
     *     variables with empty string type.
     *
     * @param type Type of the variables to find.
     * @returns The sought after variables of the passed in type. An empty array
     *     if none are found.
     */
    getVariablesOfType(type: string | null): VariableModel[];
    /**
     * Return all variable types.
     *
     * @returns List of variable types.
     * @internal
     */
    getVariableTypes(): string[];
    /**
     * Return all variables of all types.
     *
     * @returns List of variable models.
     */
    getAllVariables(): VariableModel[];
    /**
     * Returns all variable names of all types.
     *
     * @returns List of all variable names of all types.
     */
    getAllVariableNames(): string[];
    /**
     * Returns the horizontal offset of the workspace.
     * Intended for LTR/RTL compatibility in XML.
     * Not relevant for a headless workspace.
     *
     * @returns Width.
     */
    getWidth(): number;
    /**
     * Obtain a newly created block.
     *
     * @param prototypeName Name of the language object containing type-specific
     *     functions for this block.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     * @returns The created block.
     */
    newBlock(prototypeName: string, opt_id?: string): Block;
    /**
     * The number of blocks that may be added to the workspace before reaching
     *     the maxBlocks.
     *
     * @returns Number of blocks left.
     */
    remainingCapacity(): number;
    /**
     * The number of blocks of the given type that may be added to the workspace
     *    before reaching the maxInstances allowed for that type.
     *
     * @param type Type of block to return capacity for.
     * @returns Number of blocks of type left.
     */
    remainingCapacityOfType(type: string): number;
    /**
     * Check if there is remaining capacity for blocks of the given counts to be
     *    created. If the total number of blocks represented by the map is more
     * than the total remaining capacity, it returns false. If a type count is
     * more than the remaining capacity for that type, it returns false.
     *
     * @param typeCountsMap A map of types to counts (usually representing blocks
     *     to be created).
     * @returns True if there is capacity for the given map, false otherwise.
     */
    isCapacityAvailable(typeCountsMap: any): boolean;
    /**
     * Checks if the workspace has any limits on the maximum number of blocks,
     *    or the maximum number of blocks of specific types.
     *
     * @returns True if it has block limits, false otherwise.
     */
    hasBlockLimits(): boolean;
    /**
     * Gets the undo stack for workplace.
     *
     * @returns undo stack
     * @internal
     */
    getUndoStack(): Abstract[];
    /**
     * Gets the redo stack for workplace.
     *
     * @returns redo stack
     * @internal
     */
    getRedoStack(): Abstract[];
    /**
     * Undo or redo the previous action.
     *
     * @param redo False if undo, true if redo.
     */
    undo(redo: boolean): void;
    /** Clear the undo/redo stacks. */
    clearUndo(): void;
    /**
     * When something in this workspace changes, call a function.
     * Note that there may be a few recent events already on the stack.  Thus the
     * new change listener might be called with events that occurred a few
     * milliseconds before the change listener was added.
     *
     * @param func Function to call.
     * @returns Obsolete return value, ignore.
     */
    addChangeListener(func: Function): Function;
    /**
     * Stop listening for this workspace's changes.
     *
     * @param func Function to stop calling.
     */
    removeChangeListener(func: Function): void;
    /**
     * Fire a change event.
     *
     * @param event Event to fire.
     */
    fireChangeListener(event: Abstract): void;
    /**
     * Find the block on this workspace with the specified ID.
     *
     * @param id ID of block to find.
     * @returns The sought after block, or null if not found.
     */
    getBlockById(id: string): Block | null;
    /**
     * Set a block on this workspace with the specified ID.
     *
     * @param id ID of block to set.
     * @param block The block to set.
     * @internal
     */
    setBlockById(id: string, block: Block): void;
    /**
     * Delete a block off this workspace with the specified ID.
     *
     * @param id ID of block to delete.
     * @internal
     */
    removeBlockById(id: string): void;
    /**
     * Find the comment on this workspace with the specified ID.
     *
     * @param id ID of comment to find.
     * @returns The sought after comment, or null if not found.
     * @internal
     */
    getCommentById(id: string): WorkspaceComment | null;
    /**
     * Checks whether all value and statement inputs in the workspace are filled
     * with blocks.
     *
     * @param opt_shadowBlocksAreFilled An optional argument controlling whether
     *     shadow blocks are counted as filled. Defaults to true.
     * @returns True if all inputs are filled, false otherwise.
     */
    allInputsFilled(opt_shadowBlocksAreFilled?: boolean): boolean;
    /**
     * Return the variable map that contains "potential" variables.
     * These exist in the flyout but not in the workspace.
     *
     * @returns The potential variable map.
     * @internal
     */
    getPotentialVariableMap(): VariableMap | null;
    /**
     * Create and store the potential variable map for this workspace.
     *
     * @internal
     */
    createPotentialVariableMap(): void;
    /**
     * Return the map of all variables on the workspace.
     *
     * @returns The variable map.
     */
    getVariableMap(): VariableMap;
    /**
     * Set the map of all variables on the workspace.
     *
     * @param variableMap The variable map.
     * @internal
     */
    setVariableMap(variableMap: VariableMap): void;
    /** Returns the map of all procedures on the workpace. */
    getProcedureMap(): IProcedureMap;
    /**
     * Find the workspace with the specified ID.
     *
     * @param id ID of workspace to find.
     * @returns The sought after workspace or null if not found.
     */
    static getById(id: string): Workspace | null;
    /**
     * Find all workspaces.
     *
     * @returns Array of workspaces.
     */
    static getAll(): Workspace[];
}
//# sourceMappingURL=workspace.d.ts.map