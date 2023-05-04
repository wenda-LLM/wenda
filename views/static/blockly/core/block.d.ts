/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_change.js';
import './events/events_block_create.js';
import './events/events_block_delete.js';
import type { Comment } from './comment.js';
import { Connection } from './connection.js';
import type { Abstract } from './events/events_abstract.js';
import type { Field } from './field.js';
import { Input } from './input.js';
import type { IASTNodeLocation } from './interfaces/i_ast_node_location.js';
import type { IDeletable } from './interfaces/i_deletable.js';
import type { Mutator } from './mutator.js';
import * as Tooltip from './tooltip.js';
import { Coordinate } from './utils/coordinate.js';
import { Size } from './utils/size.js';
import type { VariableModel } from './variable_model.js';
import type { Workspace } from './workspace.js';
/**
 * Class for one block.
 * Not normally called directly, workspace.newBlock() is preferred.
 *
 * @alias Blockly.Block
 */
export declare class Block implements IASTNodeLocation, IDeletable {
    /**
     * An optional callback method to use whenever the block's parent workspace
     * changes. This is usually only called from the constructor, the block type
     * initializer function, or an extension initializer function.
     */
    onchange?: ((p1: Abstract) => any) | null;
    /** The language-neutral ID given to the collapsed input. */
    static readonly COLLAPSED_INPUT_NAME: string;
    /** The language-neutral ID given to the collapsed field. */
    static readonly COLLAPSED_FIELD_NAME: string;
    /**
     * Optional text data that round-trips between blocks and XML.
     * Has no effect. May be used by 3rd parties for meta information.
     */
    data: string | null;
    /**
     * Has this block been disposed of?
     *
     * @internal
     */
    disposed: boolean;
    /**
     * Colour of the block as HSV hue value (0-360)
     * This may be null if the block colour was not set via a hue number.
     */
    private hue_;
    /** Colour of the block in '#RRGGBB' format. */
    protected colour_: string;
    /** Name of the block style. */
    protected styleName_: string;
    /** An optional method called during initialization. */
    init?: (() => any) | null;
    /**
     * An optional serialization method for defining how to serialize the
     * mutation state to XML. This must be coupled with defining
     * `domToMutation`.
     */
    mutationToDom?: ((...p1: any[]) => Element) | null;
    /**
     * An optional deserialization method for defining how to deserialize the
     * mutation state from XML. This must be coupled with defining
     * `mutationToDom`.
     */
    domToMutation?: ((p1: Element) => any) | null;
    /**
     * An optional serialization method for defining how to serialize the
     * block's extra state (eg mutation state) to something JSON compatible.
     * This must be coupled with defining `loadExtraState`.
     */
    saveExtraState?: (() => any) | null;
    /**
     * An optional serialization method for defining how to deserialize the
     * block's extra state (eg mutation state) from something JSON compatible.
     * This must be coupled with defining `saveExtraState`.
     */
    loadExtraState?: ((p1: any) => any) | null;
    /**
     * An optional property for suppressing adding STATEMENT_PREFIX and
     * STATEMENT_SUFFIX to generated code.
     */
    suppressPrefixSuffix: boolean | null;
    /**
     * An optional property for declaring developer variables.  Return a list of
     * variable names for use by generators.  Developer variables are never
     * shown to the user, but are declared as global variables in the generated
     * code.
     */
    getDeveloperVariables?: (() => string[]);
    /**
     * An optional function that reconfigures the block based on the contents of
     * the mutator dialog.
     */
    compose?: ((p1: Block) => void);
    /**
     * An optional function that populates the mutator's dialog with
     * this block's components.
     */
    decompose?: ((p1: Workspace) => Block);
    id: string;
    outputConnection: Connection;
    nextConnection: Connection;
    previousConnection: Connection;
    inputList: Input[];
    inputsInline?: boolean;
    private disabled;
    tooltip: Tooltip.TipInfo;
    contextMenu: boolean;
    protected parentBlock_: this | null;
    protected childBlocks_: this[];
    private deletable_;
    private movable_;
    private editable_;
    private isShadow_;
    protected collapsed_: boolean;
    protected outputShape_: number | null;
    /**
     * Is the current block currently in the process of being disposed?
     */
    private disposing;
    /**
     * A string representing the comment attached to this block.
     *
     * @deprecated August 2019. Use getCommentText instead.
     */
    comment: string | Comment | null;
    /** @internal */
    commentModel: CommentModel;
    private readonly xy_;
    isInFlyout: boolean;
    isInMutator: boolean;
    RTL: boolean;
    /** True if this block is an insertion marker. */
    protected isInsertionMarker_: boolean;
    /** Name of the type of hat. */
    hat?: string;
    rendered: boolean | null;
    /**
     * String for block help, or function that returns a URL. Null for no help.
     */
    helpUrl: string | Function;
    /** A bound callback function to use when the parent workspace changes. */
    private onchangeWrapper_;
    /**
     * A count of statement inputs on the block.
     *
     * @internal
     */
    statementInputCount: number;
    type: string;
    inputsInlineDefault?: boolean;
    workspace: Workspace;
    /**
     * @param workspace The block's workspace.
     * @param prototypeName Name of the language object containing type-specific
     *     functions for this block.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     * @throws When the prototypeName is not valid or not allowed.
     */
    constructor(workspace: Workspace, prototypeName: string, opt_id?: string);
    /** Calls the init() function and handles associated event firing, etc. */
    protected doInit_(): void;
    /**
     * Dispose of this block.
     *
     * @param healStack If true, then try to heal any gap by connecting the next
     *     statement with the previous statement.  Otherwise, dispose of all
     *     children of this block.
     * @suppress {checkTypes}
     */
    dispose(healStack: boolean): void;
    /**
     * Returns true if the block is either in the process of being disposed, or
     * is disposed.
     *
     * @internal
     */
    isDeadOrDying(): boolean;
    /**
     * Call initModel on all fields on the block.
     * May be called more than once.
     * Either initModel or initSvg must be called after creating a block and
     * before the first interaction with it.  Interactions include UI actions
     * (e.g. clicking and dragging) and firing events (e.g. create, delete, and
     * change).
     */
    initModel(): void;
    /**
     * Unplug this block from its superior block.  If this block is a statement,
     * optionally reconnect the block underneath with the block on top.
     *
     * @param opt_healStack Disconnect child statement and reconnect stack.
     *     Defaults to false.
     */
    unplug(opt_healStack?: boolean): void;
    /**
     * Unplug this block's output from an input on another block.  Optionally
     * reconnect the block's parent to the only child block, if possible.
     *
     * @param opt_healStack Disconnect right-side block and connect to left-side
     *     block.  Defaults to false.
     */
    private unplugFromRow_;
    /**
     * Returns the connection on the value input that is connected to another
     * block. When an insertion marker is connected to a connection with a block
     * already attached, the connected block is attached to the insertion marker.
     * Since only one block can be displaced and attached to the insertion marker
     * this should only ever return one connection.
     *
     * @returns The connection on the value input, or null.
     */
    private getOnlyValueConnection_;
    /**
     * Unplug this statement block from its superior block.  Optionally reconnect
     * the block underneath with the block on top.
     *
     * @param opt_healStack Disconnect child statement and reconnect stack.
     *     Defaults to false.
     */
    private unplugFromStack_;
    /**
     * Returns all connections originating from this block.
     *
     * @param _all If true, return all connections even hidden ones.
     * @returns Array of connections.
     * @internal
     */
    getConnections_(_all: boolean): Connection[];
    /**
     * Walks down a stack of blocks and finds the last next connection on the
     * stack.
     *
     * @param ignoreShadows If true,the last connection on a non-shadow block will
     *     be returned. If false, this will follow shadows to find the last
     *     connection.
     * @returns The last next connection on the stack, or null.
     * @internal
     */
    lastConnectionInStack(ignoreShadows: boolean): Connection | null;
    /**
     * Bump unconnected blocks out of alignment.  Two blocks which aren't actually
     * connected should not coincidentally line up on screen.
     */
    bumpNeighbours(): void;
    /**
     * Return the parent block or null if this block is at the top level. The
     * parent block is either the block connected to the previous connection (for
     * a statement block) or the block connected to the output connection (for a
     * value block).
     *
     * @returns The block (if any) that holds the current block.
     */
    getParent(): this | null;
    /**
     * Return the input that connects to the specified block.
     *
     * @param block A block connected to an input on this block.
     * @returns The input (if any) that connects to the specified block.
     */
    getInputWithBlock(block: Block): Input | null;
    /**
     * Return the parent block that surrounds the current block, or null if this
     * block has no surrounding block.  A parent block might just be the previous
     * statement, whereas the surrounding block is an if statement, while loop,
     * etc.
     *
     * @returns The block (if any) that surrounds the current block.
     */
    getSurroundParent(): this | null;
    /**
     * Return the next statement block directly connected to this block.
     *
     * @returns The next statement block or null.
     */
    getNextBlock(): Block | null;
    /**
     * Returns the block connected to the previous connection.
     *
     * @returns The previous statement block or null.
     */
    getPreviousBlock(): Block | null;
    /**
     * Return the connection on the first statement input on this block, or null
     * if there are none.
     *
     * @returns The first statement connection or null.
     * @internal
     */
    getFirstStatementConnection(): Connection | null;
    /**
     * Return the top-most block in this block's tree.
     * This will return itself if this block is at the top level.
     *
     * @returns The root block.
     */
    getRootBlock(): this;
    /**
     * Walk up from the given block up through the stack of blocks to find
     * the top block of the sub stack. If we are nested in a statement input only
     * find the top-most nested block. Do not go all the way to the root block.
     *
     * @returns The top block in a stack.
     * @internal
     */
    getTopStackBlock(): this;
    /**
     * Find all the blocks that are directly nested inside this one.
     * Includes value and statement inputs, as well as any following statement.
     * Excludes any connection on an output tab or any preceding statement.
     * Blocks are optionally sorted by position; top to bottom.
     *
     * @param ordered Sort the list if true.
     * @returns Array of blocks.
     */
    getChildren(ordered: boolean): Block[];
    /**
     * Set parent of this block to be a new block or null.
     *
     * @param newParent New parent block.
     * @internal
     */
    setParent(newParent: this | null): void;
    /**
     * Find all the blocks that are directly or indirectly nested inside this one.
     * Includes this block in the list.
     * Includes value and statement inputs, as well as any following statements.
     * Excludes any connection on an output tab or any preceding statements.
     * Blocks are optionally sorted by position; top to bottom.
     *
     * @param ordered Sort the list if true.
     * @returns Flattened array of blocks.
     */
    getDescendants(ordered: boolean): this[];
    /**
     * Get whether this block is deletable or not.
     *
     * @returns True if deletable.
     */
    isDeletable(): boolean;
    /**
     * Set whether this block is deletable or not.
     *
     * @param deletable True if deletable.
     */
    setDeletable(deletable: boolean): void;
    /**
     * Get whether this block is movable or not.
     *
     * @returns True if movable.
     */
    isMovable(): boolean;
    /**
     * Set whether this block is movable or not.
     *
     * @param movable True if movable.
     */
    setMovable(movable: boolean): void;
    /**
     * Get whether is block is duplicatable or not. If duplicating this block and
     * descendants will put this block over the workspace's capacity this block is
     * not duplicatable. If duplicating this block and descendants will put any
     * type over their maxInstances this block is not duplicatable.
     *
     * @returns True if duplicatable.
     */
    isDuplicatable(): boolean;
    /**
     * Get whether this block is a shadow block or not.
     *
     * @returns True if a shadow.
     */
    isShadow(): boolean;
    /**
     * Set whether this block is a shadow block or not.
     *
     * @param shadow True if a shadow.
     * @internal
     */
    setShadow(shadow: boolean): void;
    /**
     * Get whether this block is an insertion marker block or not.
     *
     * @returns True if an insertion marker.
     */
    isInsertionMarker(): boolean;
    /**
     * Set whether this block is an insertion marker block or not.
     * Once set this cannot be unset.
     *
     * @param insertionMarker True if an insertion marker.
     * @internal
     */
    setInsertionMarker(insertionMarker: boolean): void;
    /**
     * Get whether this block is editable or not.
     *
     * @returns True if editable.
     */
    isEditable(): boolean;
    /**
     * Set whether this block is editable or not.
     *
     * @param editable True if editable.
     */
    setEditable(editable: boolean): void;
    /**
     * Returns if this block has been disposed of / deleted.
     *
     * @returns True if this block has been disposed of / deleted.
     */
    isDisposed(): boolean;
    /**
     * Find the connection on this block that corresponds to the given connection
     * on the other block.
     * Used to match connections between a block and its insertion marker.
     *
     * @param otherBlock The other block to match against.
     * @param conn The other connection to match.
     * @returns The matching connection on this block, or null.
     * @internal
     */
    getMatchingConnection(otherBlock: Block, conn: Connection): Connection | null;
    /**
     * Set the URL of this block's help page.
     *
     * @param url URL string for block help, or function that returns a URL.  Null
     *     for no help.
     */
    setHelpUrl(url: string | Function): void;
    /**
     * Sets the tooltip for this block.
     *
     * @param newTip The text for the tooltip, a function that returns the text
     *     for the tooltip, or a parent object whose tooltip will be used. To not
     *     display a tooltip pass the empty string.
     */
    setTooltip(newTip: Tooltip.TipInfo): void;
    /**
     * Returns the tooltip text for this block.
     *
     * @returns The tooltip text for this block.
     */
    getTooltip(): string;
    /**
     * Get the colour of a block.
     *
     * @returns #RRGGBB string.
     */
    getColour(): string;
    /**
     * Get the name of the block style.
     *
     * @returns Name of the block style.
     */
    getStyleName(): string;
    /**
     * Get the HSV hue value of a block.  Null if hue not set.
     *
     * @returns Hue value (0-360).
     */
    getHue(): number | null;
    /**
     * Change the colour of a block.
     *
     * @param colour HSV hue value (0 to 360), #RRGGBB string, or a message
     *     reference string pointing to one of those two values.
     */
    setColour(colour: number | string): void;
    /**
     * Set the style and colour values of a block.
     *
     * @param blockStyleName Name of the block style.
     */
    setStyle(blockStyleName: string): void;
    /**
     * Sets a callback function to use whenever the block's parent workspace
     * changes, replacing any prior onchange handler. This is usually only called
     * from the constructor, the block type initializer function, or an extension
     * initializer function.
     *
     * @param onchangeFn The callback to call when the block's workspace changes.
     * @throws {Error} if onchangeFn is not falsey and not a function.
     */
    setOnChange(onchangeFn: (p1: Abstract) => any): void;
    /**
     * Returns the named field from a block.
     *
     * @param name The name of the field.
     * @returns Named field, or null if field does not exist.
     */
    getField(name: string): Field | null;
    /**
     * Return all variables referenced by this block.
     *
     * @returns List of variable ids.
     */
    getVars(): string[];
    /**
     * Return all variables referenced by this block.
     *
     * @returns List of variable models.
     * @internal
     */
    getVarModels(): VariableModel[];
    /**
     * Notification that a variable is renaming but keeping the same ID.  If the
     * variable is in use on this block, rerender to show the new name.
     *
     * @param variable The variable being renamed.
     * @internal
     */
    updateVarName(variable: VariableModel): void;
    /**
     * Notification that a variable is renaming.
     * If the ID matches one of this block's variables, rename it.
     *
     * @param oldId ID of variable to rename.
     * @param newId ID of new variable.  May be the same as oldId, but with an
     *     updated name.
     */
    renameVarById(oldId: string, newId: string): void;
    /**
     * Returns the language-neutral value of the given field.
     *
     * @param name The name of the field.
     * @returns Value of the field or null if field does not exist.
     */
    getFieldValue(name: string): any;
    /**
     * Sets the value of the given field for this block.
     *
     * @param newValue The value to set.
     * @param name The name of the field to set the value of.
     */
    setFieldValue(newValue: any, name: string): void;
    /**
     * Set whether this block can chain onto the bottom of another block.
     *
     * @param newBoolean True if there can be a previous statement.
     * @param opt_check Statement type or list of statement types.  Null/undefined
     *     if any type could be connected.
     */
    setPreviousStatement(newBoolean: boolean, opt_check?: string | string[] | null): void;
    /**
     * Set whether another block can chain onto the bottom of this block.
     *
     * @param newBoolean True if there can be a next statement.
     * @param opt_check Statement type or list of statement types.  Null/undefined
     *     if any type could be connected.
     */
    setNextStatement(newBoolean: boolean, opt_check?: string | string[] | null): void;
    /**
     * Set whether this block returns a value.
     *
     * @param newBoolean True if there is an output.
     * @param opt_check Returned type or list of returned types.  Null or
     *     undefined if any type could be returned (e.g. variable get).
     */
    setOutput(newBoolean: boolean, opt_check?: string | string[] | null): void;
    /**
     * Set whether value inputs are arranged horizontally or vertically.
     *
     * @param newBoolean True if inputs are horizontal.
     */
    setInputsInline(newBoolean: boolean): void;
    /**
     * Get whether value inputs are arranged horizontally or vertically.
     *
     * @returns True if inputs are horizontal.
     */
    getInputsInline(): boolean;
    /**
     * Set the block's output shape.
     *
     * @param outputShape Value representing an output shape.
     */
    setOutputShape(outputShape: number | null): void;
    /**
     * Get the block's output shape.
     *
     * @returns Value representing output shape if one exists.
     */
    getOutputShape(): number | null;
    /**
     * Get whether this block is enabled or not.
     *
     * @returns True if enabled.
     */
    isEnabled(): boolean;
    /**
     * Set whether the block is enabled or not.
     *
     * @param enabled True if enabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Get whether the block is disabled or not due to parents.
     * The block's own disabled property is not considered.
     *
     * @returns True if disabled.
     */
    getInheritedDisabled(): boolean;
    /**
     * Get whether the block is collapsed or not.
     *
     * @returns True if collapsed.
     */
    isCollapsed(): boolean;
    /**
     * Set whether the block is collapsed or not.
     *
     * @param collapsed True if collapsed.
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Create a human-readable text representation of this block and any children.
     *
     * @param opt_maxLength Truncate the string to this length.
     * @param opt_emptyToken The placeholder string used to denote an empty field.
     *     If not specified, '?' is used.
     * @returns Text of block.
     */
    toString(opt_maxLength?: number, opt_emptyToken?: string): string;
    /**
     * Shortcut for appending a value input row.
     *
     * @param name Language-neutral identifier which may used to find this input
     *     again.  Should be unique to this block.
     * @returns The input object created.
     */
    appendValueInput(name: string): Input;
    /**
     * Shortcut for appending a statement input row.
     *
     * @param name Language-neutral identifier which may used to find this input
     *     again.  Should be unique to this block.
     * @returns The input object created.
     */
    appendStatementInput(name: string): Input;
    /**
     * Shortcut for appending a dummy input row.
     *
     * @param opt_name Language-neutral identifier which may used to find this
     *     input again.  Should be unique to this block.
     * @returns The input object created.
     */
    appendDummyInput(opt_name?: string): Input;
    /**
     * Initialize this block using a cross-platform, internationalization-friendly
     * JSON description.
     *
     * @param json Structured data describing the block.
     */
    jsonInit(json: any): void;
    /**
     * Initialize the colour of this block from the JSON description.
     *
     * @param json Structured data describing the block.
     * @param warningPrefix Warning prefix string identifying block.
     */
    private jsonInitColour_;
    /**
     * Initialize the style of this block from the JSON description.
     *
     * @param json Structured data describing the block.
     * @param warningPrefix Warning prefix string identifying block.
     */
    private jsonInitStyle_;
    /**
     * Add key/values from mixinObj to this block object. By default, this method
     * will check that the keys in mixinObj will not overwrite existing values in
     * the block, including prototype values. This provides some insurance against
     * mixin / extension incompatibilities with future block features. This check
     * can be disabled by passing true as the second argument.
     *
     * @param mixinObj The key/values pairs to add to this block object.
     * @param opt_disableCheck Option flag to disable overwrite checks.
     */
    mixin(mixinObj: any, opt_disableCheck?: boolean): void;
    /**
     * Interpolate a message description onto the block.
     *
     * @param message Text contains interpolation tokens (%1, %2, ...) that match
     *     with fields or inputs defined in the args array.
     * @param args Array of arguments to be interpolated.
     * @param lastDummyAlign If a dummy input is added at the end, how should it
     *     be aligned?
     * @param warningPrefix Warning prefix string identifying block.
     */
    private interpolate_;
    /**
     * Validates that the tokens are within the correct bounds, with no
     * duplicates, and that all of the arguments are referred to. Throws errors if
     * any of these things are not true.
     *
     * @param tokens An array of tokens to validate
     * @param argsCount The number of args that need to be referred to.
     */
    private validateTokens_;
    /**
     * Inserts args in place of numerical tokens. String args are converted to
     * JSON that defines a label field. If necessary an extra dummy input is added
     * to the end of the elements.
     *
     * @param tokens The tokens to interpolate
     * @param args The arguments to insert.
     * @param lastDummyAlign The alignment the added dummy input should have, if
     *     we are required to add one.
     * @returns The JSON definitions of field and inputs to add to the block.
     */
    private interpolateArguments_;
    /**
     * Creates a field from the JSON definition of a field. If a field with the
     * given type cannot be found, this attempts to create a different field using
     * the 'alt' property of the JSON definition (if it exists).
     *
     * @param element The element to try to turn into a field.
     * @returns The field defined by the JSON, or null if one couldn't be created.
     */
    private fieldFromJson_;
    /**
     * Creates an input from the JSON definition of an input. Sets the input's
     * check and alignment if they are provided.
     *
     * @param element The JSON to turn into an input.
     * @param warningPrefix The prefix to add to warnings to help the developer
     *     debug.
     * @returns The input that has been created, or null if one could not be
     *     created for some reason (should never happen).
     */
    private inputFromJson_;
    /**
     * Returns true if the given string matches one of the input keywords.
     *
     * @param str The string to check.
     * @returns True if the given string matches one of the input keywords, false
     *     otherwise.
     */
    private isInputKeyword_;
    /**
     * Turns a string into the JSON definition of a label field. If the string
     * becomes an empty string when trimmed, this returns null.
     *
     * @param str String to turn into the JSON definition of a label field.
     * @returns The JSON definition or null.
     */
    private stringToFieldJson_;
    /**
     * Add a value input, statement input or local variable to this block.
     *
     * @param type One of Blockly.inputTypes.
     * @param name Language-neutral identifier which may used to find this input
     *     again.  Should be unique to this block.
     * @returns The input object created.
     */
    protected appendInput_(type: number, name: string): Input;
    /**
     * Move a named input to a different location on this block.
     *
     * @param name The name of the input to move.
     * @param refName Name of input that should be after the moved input, or null
     *     to be the input at the end.
     */
    moveInputBefore(name: string, refName: string | null): void;
    /**
     * Move a numbered input to a different location on this block.
     *
     * @param inputIndex Index of the input to move.
     * @param refIndex Index of input that should be after the moved input.
     */
    moveNumberedInputBefore(inputIndex: number, refIndex: number): void;
    /**
     * Remove an input from this block.
     *
     * @param name The name of the input.
     * @param opt_quiet True to prevent an error if input is not present.
     * @returns True if operation succeeds, false if input is not present and
     *     opt_quiet is true.
     * @throws {Error} if the input is not present and opt_quiet is not true.
     */
    removeInput(name: string, opt_quiet?: boolean): boolean;
    /**
     * Fetches the named input object.
     *
     * @param name The name of the input.
     * @returns The input object, or null if input does not exist.
     */
    getInput(name: string): Input | null;
    /**
     * Fetches the block attached to the named input.
     *
     * @param name The name of the input.
     * @returns The attached value block, or null if the input is either
     *     disconnected or if the input does not exist.
     */
    getInputTargetBlock(name: string): Block | null;
    /**
     * Returns the comment on this block (or null if there is no comment).
     *
     * @returns Block's comment.
     */
    getCommentText(): string | null;
    /**
     * Set this block's comment text.
     *
     * @param text The text, or null to delete.
     */
    setCommentText(text: string | null): void;
    /**
     * Set this block's warning text.
     *
     * @param _text The text, or null to delete.
     * @param _opt_id An optional ID for the warning text to be able to maintain
     *     multiple warnings.
     */
    setWarningText(_text: string | null, _opt_id?: string): void;
    /**
     * Give this block a mutator dialog.
     *
     * @param _mutator A mutator dialog instance or null to remove.
     */
    setMutator(_mutator: Mutator): void;
    /**
     * Return the coordinates of the top-left corner of this block relative to the
     * drawing surface's origin (0,0), in workspace units.
     *
     * @returns Object with .x and .y properties.
     */
    getRelativeToSurfaceXY(): Coordinate;
    /**
     * Move a block by a relative offset.
     *
     * @param dx Horizontal offset, in workspace units.
     * @param dy Vertical offset, in workspace units.
     */
    moveBy(dx: number, dy: number): void;
    /**
     * Create a connection of the specified type.
     *
     * @param type The type of the connection to create.
     * @returns A new connection of the specified type.
     */
    protected makeConnection_(type: number): Connection;
    /**
     * Recursively checks whether all statement and value inputs are filled with
     * blocks. Also checks all following statement blocks in this stack.
     *
     * @param opt_shadowBlocksAreFilled An optional argument controlling whether
     *     shadow blocks are counted as filled. Defaults to true.
     * @returns True if all inputs are filled, false otherwise.
     */
    allInputsFilled(opt_shadowBlocksAreFilled?: boolean): boolean;
    /**
     * This method returns a string describing this Block in developer terms (type
     * name and ID; English only).
     *
     * Intended to on be used in console logs and errors. If you need a string
     * that uses the user's native language (including block text, field values,
     * and child blocks), use [toString()]{@link Block#toString}.
     *
     * @returns The description.
     */
    toDevString(): string;
}
export declare namespace Block {
    interface CommentModel {
        text: string | null;
        pinned: boolean;
        size: Size;
    }
}
export declare type CommentModel = Block.CommentModel;
//# sourceMappingURL=block.d.ts.map