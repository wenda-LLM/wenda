/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_selected.js';
import { Block } from './block.js';
import { Comment } from './comment.js';
import type { Connection } from './connection.js';
import { ContextMenuOption, LegacyContextMenuOption } from './contextmenu_registry.js';
import type { Field } from './field.js';
import type { Icon } from './icon.js';
import type { Input } from './input.js';
import type { IASTNodeLocationSvg } from './interfaces/i_ast_node_location_svg.js';
import type { IBoundedElement } from './interfaces/i_bounded_element.js';
import type { CopyData, ICopyable } from './interfaces/i_copyable.js';
import type { IDraggable } from './interfaces/i_draggable.js';
import type { Mutator } from './mutator.js';
import { RenderedConnection } from './rendered_connection.js';
import type { Debug as BlockRenderingDebug } from './renderers/common/debugger.js';
import type { IPathObject } from './renderers/common/i_path_object.js';
import type { BlockStyle } from './theme.js';
import { Coordinate } from './utils/coordinate.js';
import { Rect } from './utils/rect.js';
import { Warning } from './warning.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a block's SVG representation.
 * Not normally called directly, workspace.newBlock() is preferred.
 *
 * @alias Blockly.BlockSvg
 */
export declare class BlockSvg extends Block implements IASTNodeLocationSvg, IBoundedElement, ICopyable, IDraggable {
    /**
     * Constant for identifying rows that are to be rendered inline.
     * Don't collide with Blockly.inputTypes.
     */
    static readonly INLINE = -1;
    /**
     * ID to give the "collapsed warnings" warning. Allows us to remove the
     * "collapsed warnings" warning without removing any warnings that belong to
     * the block.
     */
    static readonly COLLAPSED_WARNING_ID = "TEMP_COLLAPSED_WARNING_";
    decompose?: ((p1: Workspace) => BlockSvg);
    saveConnections?: ((p1: BlockSvg) => any);
    customContextMenu?: ((p1: Array<ContextMenuOption | LegacyContextMenuOption>) => any) | null;
    /**
     * An property used internally to reference the block's rendering debugger.
     *
     * @internal
     */
    renderingDebugger: BlockRenderingDebug | null;
    /**
     * Height of this block, not including any statement blocks above or below.
     * Height is in workspace units.
     */
    height: number;
    /**
     * Width of this block, including any connected value blocks.
     * Width is in workspace units.
     */
    width: number;
    /**
     * Map from IDs for warnings text to PIDs of functions to apply them.
     * Used to be able to maintain multiple warnings.
     */
    private warningTextDb;
    /** Block's mutator icon (if any). */
    mutator: Mutator | null;
    /** Block's comment icon (if any). */
    private commentIcon_;
    /** Block's warning icon (if any). */
    warning: Warning | null;
    private svgGroup_;
    style: BlockStyle;
    /** @internal */
    pathObject: IPathObject;
    rendered: boolean;
    /**
     * Is this block currently rendering? Used to stop recursive render calls
     * from actually triggering a re-render.
     */
    private renderIsInProgress_;
    /** Whether mousedown events have been bound yet. */
    private eventsInit_;
    workspace: WorkspaceSvg;
    outputConnection: RenderedConnection;
    nextConnection: RenderedConnection;
    previousConnection: RenderedConnection;
    private readonly useDragSurface_;
    /**
     * @param workspace The block's workspace.
     * @param prototypeName Name of the language object containing type-specific
     *     functions for this block.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     */
    constructor(workspace: WorkspaceSvg, prototypeName: string, opt_id?: string);
    /**
     * Create and initialize the SVG representation of the block.
     * May be called more than once.
     */
    initSvg(): void;
    /**
     * Get the secondary colour of a block.
     *
     * @returns #RRGGBB string.
     */
    getColourSecondary(): string | undefined;
    /**
     * Get the tertiary colour of a block.
     *
     * @returns #RRGGBB string.
     */
    getColourTertiary(): string | undefined;
    /**
     * Selects this block. Highlights the block visually and fires a select event
     * if the block is not already selected.
     */
    select(): void;
    /**
     * Unselects this block. Unhighlights the block and fires a select (false)
     * event if the block is currently selected.
     */
    unselect(): void;
    /**
     * Returns a list of mutator, comment, and warning icons.
     *
     * @returns List of icons.
     */
    getIcons(): Icon[];
    /**
     * Sets the parent of this block to be a new block or null.
     *
     * @param newParent New parent block.
     * @internal
     */
    setParent(newParent: this | null): void;
    /**
     * Return the coordinates of the top-left corner of this block relative to the
     * drawing surface's origin (0,0), in workspace units.
     * If the block is on the workspace, (0, 0) is the origin of the workspace
     * coordinate system.
     * This does not change with workspace scale.
     *
     * @returns Object with .x and .y properties in workspace coordinates.
     */
    getRelativeToSurfaceXY(): Coordinate;
    /**
     * Move a block by a relative offset.
     *
     * @param dx Horizontal offset in workspace units.
     * @param dy Vertical offset in workspace units.
     */
    moveBy(dx: number, dy: number): void;
    /**
     * Transforms a block by setting the translation on the transform attribute
     * of the block's SVG.
     *
     * @param x The x coordinate of the translation in workspace units.
     * @param y The y coordinate of the translation in workspace units.
     */
    translate(x: number, y: number): void;
    /**
     * Move this block to its workspace's drag surface, accounting for
     * positioning. Generally should be called at the same time as
     * setDragging_(true). Does nothing if useDragSurface_ is false.
     *
     * @internal
     */
    moveToDragSurface(): void;
    /**
     * Move a block to a position.
     *
     * @param xy The position to move to in workspace units.
     */
    moveTo(xy: Coordinate): void;
    /**
     * Move this block back to the workspace block canvas.
     * Generally should be called at the same time as setDragging_(false).
     * Does nothing if useDragSurface_ is false.
     *
     * @param newXY The position the block should take on on the workspace canvas,
     *     in workspace coordinates.
     * @internal
     */
    moveOffDragSurface(newXY: Coordinate): void;
    /**
     * Move this block during a drag, taking into account whether we are using a
     * drag surface to translate blocks.
     * This block must be a top-level block.
     *
     * @param newLoc The location to translate to, in workspace coordinates.
     * @internal
     */
    moveDuringDrag(newLoc: Coordinate): void;
    /**
     * Clear the block of transform="..." attributes.
     * Used when the block is switching from 3d to 2d transform or vice versa.
     */
    private clearTransformAttributes_;
    /** Snap this block to the nearest grid point. */
    snapToGrid(): void;
    /**
     * Returns the coordinates of a bounding box describing the dimensions of this
     * block and any blocks stacked below it.
     * Coordinate system: workspace coordinates.
     *
     * @returns Object with coordinates of the bounding box.
     */
    getBoundingRectangle(): Rect;
    /**
     * Notify every input on this block to mark its fields as dirty.
     * A dirty field is a field that needs to be re-rendered.
     */
    markDirty(): void;
    /**
     * Set whether the block is collapsed or not.
     *
     * @param collapsed True if collapsed.
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Makes sure that when the block is collapsed, it is rendered correctly
     * for that state.
     */
    private updateCollapsed_;
    /**
     * Open the next (or previous) FieldTextInput.
     *
     * @param start Current field.
     * @param forward If true go forward, otherwise backward.
     */
    tab(start: Field, forward: boolean): void;
    /**
     * Handle a mouse-down on an SVG block.
     *
     * @param e Mouse down event or touch start event.
     */
    private onMouseDown_;
    /**
     * Load the block's help page in a new window.
     *
     * @internal
     */
    showHelp(): void;
    /**
     * Generate the context menu for this block.
     *
     * @returns Context menu options or null if no menu.
     */
    protected generateContextMenu(): Array<ContextMenuOption | LegacyContextMenuOption> | null;
    /**
     * Show the context menu for this block.
     *
     * @param e Mouse event.
     * @internal
     */
    showContextMenu(e: Event): void;
    /**
     * Move the connections for this block and all blocks attached under it.
     * Also update any attached bubbles.
     *
     * @param dx Horizontal offset from current location, in workspace units.
     * @param dy Vertical offset from current location, in workspace units.
     * @internal
     */
    moveConnections(dx: number, dy: number): void;
    /**
     * Recursively adds or removes the dragging class to this node and its
     * children.
     *
     * @param adding True if adding, false if removing.
     * @internal
     */
    setDragging(adding: boolean): void;
    /**
     * Set whether this block is movable or not.
     *
     * @param movable True if movable.
     */
    setMovable(movable: boolean): void;
    /**
     * Set whether this block is editable or not.
     *
     * @param editable True if editable.
     */
    setEditable(editable: boolean): void;
    /**
     * Sets whether this block is a shadow block or not.
     *
     * @param shadow True if a shadow.
     * @internal
     */
    setShadow(shadow: boolean): void;
    /**
     * Set whether this block is an insertion marker block or not.
     * Once set this cannot be unset.
     *
     * @param insertionMarker True if an insertion marker.
     * @internal
     */
    setInsertionMarker(insertionMarker: boolean): void;
    /**
     * Return the root node of the SVG or null if none exists.
     *
     * @returns The root SVG node (probably a group).
     */
    getSvgRoot(): SVGGElement;
    /**
     * Dispose of this block.
     *
     * @param healStack If true, then try to heal any gap by connecting the next
     *     statement with the previous statement.  Otherwise, dispose of all
     *     children of this block.
     * @param animate If true, show a disposal animation and sound.
     * @suppress {checkTypes}
     */
    dispose(healStack?: boolean, animate?: boolean): void;
    /**
     * Delete a block and hide chaff when doing so. The block will not be deleted
     * if it's in a flyout. This is called from the context menu and keyboard
     * shortcuts as the full delete action. If you are disposing of a block from
     * the workspace and don't need to perform flyout checks, handle event
     * grouping, or hide chaff, then use `block.dispose()` directly.
     */
    checkAndDelete(): void;
    /**
     * Encode a block for copying.
     *
     * @returns Copy metadata, or null if the block is an insertion marker.
     * @internal
     */
    toCopyData(): CopyData | null;
    /**
     * Updates the colour of the block to match the block's state.
     *
     * @internal
     */
    applyColour(): void;
    /**
     * Updates the colour of the block (and children) to match the current
     * disabled state.
     *
     * @internal
     */
    updateDisabled(): void;
    /**
     * Get the comment icon attached to this block, or null if the block has no
     * comment.
     *
     * @returns The comment icon attached to this block, or null.
     */
    getCommentIcon(): Comment | null;
    /**
     * Set this block's comment text.
     *
     * @param text The text, or null to delete.
     */
    setCommentText(text: string | null): void;
    /**
     * Set this block's warning text.
     *
     * @param text The text, or null to delete.
     * @param opt_id An optional ID for the warning text to be able to maintain
     *     multiple warnings.
     */
    setWarningText(text: string | null, opt_id?: string): void;
    /**
     * Give this block a mutator dialog.
     *
     * @param mutator A mutator dialog instance or null to remove.
     */
    setMutator(mutator: Mutator | null): void;
    /**
     * Set whether the block is enabled or not.
     *
     * @param enabled True if enabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Set whether the block is highlighted or not.  Block highlighting is
     * often used to visually mark blocks currently being executed.
     *
     * @param highlighted True if highlighted.
     */
    setHighlighted(highlighted: boolean): void;
    /**
     * Adds the visual "select" effect to the block, but does not actually select
     * it or fire an event.
     *
     * @see BlockSvg#select
     */
    addSelect(): void;
    /**
     * Removes the visual "select" effect from the block, but does not actually
     * unselect it or fire an event.
     *
     * @see BlockSvg#unselect
     */
    removeSelect(): void;
    /**
     * Update the cursor over this block by adding or removing a class.
     *
     * @param enable True if the delete cursor should be shown, false otherwise.
     * @internal
     */
    setDeleteStyle(enable: boolean): void;
    /**
     * Get the colour of a block.
     *
     * @returns #RRGGBB string.
     */
    getColour(): string;
    /**
     * Change the colour of a block.
     *
     * @param colour HSV hue value, or #RRGGBB string.
     */
    setColour(colour: number | string): void;
    /**
     * Set the style and colour values of a block.
     *
     * @param blockStyleName Name of the block style.
     * @throws {Error} if the block style does not exist.
     */
    setStyle(blockStyleName: string): void;
    /**
     * Move this block to the front of the visible workspace.
     * <g> tags do not respect z-index so SVG renders them in the
     * order that they are in the DOM.  By placing this block first within the
     * block group's <g>, it will render on top of any other blocks.
     *
     * @internal
     */
    bringToFront(): void;
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
     * Remove an input from this block.
     *
     * @param name The name of the input.
     * @param opt_quiet True to prevent error if input is not present.
     * @returns True if operation succeeds, false if input is not present and
     *     opt_quiet is true
     * @throws {Error} if the input is not present and opt_quiet is not true.
     */
    removeInput(name: string, opt_quiet?: boolean): boolean;
    /**
     * Move a numbered input to a different location on this block.
     *
     * @param inputIndex Index of the input to move.
     * @param refIndex Index of input that should be after the moved input.
     */
    moveNumberedInputBefore(inputIndex: number, refIndex: number): void;
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
     * Sets whether this block's connections are tracked in the database or not.
     *
     * Used by the deserializer to be more efficient. Setting a connection's
     * tracked_ value to false keeps it from adding itself to the db when it
     * gets its first moveTo call, saving expensive ops for later.
     *
     * @param track If true, start tracking. If false, stop tracking.
     * @internal
     */
    setConnectionTracking(track: boolean): void;
    /**
     * Returns connections originating from this block.
     *
     * @param all If true, return all connections even hidden ones.
     *     Otherwise, for a non-rendered block return an empty list, and for a
     * collapsed block don't return inputs connections.
     * @returns Array of connections.
     * @internal
     */
    getConnections_(all: boolean): RenderedConnection[];
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
    lastConnectionInStack(ignoreShadows: boolean): RenderedConnection | null;
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
    getMatchingConnection(otherBlock: Block, conn: Connection): RenderedConnection | null;
    /**
     * Create a connection of the specified type.
     *
     * @param type The type of the connection to create.
     * @returns A new connection of the specified type.
     */
    protected makeConnection_(type: number): RenderedConnection;
    /**
     * Return the next statement block directly connected to this block.
     *
     * @returns The next statement block or null.
     */
    getNextBlock(): BlockSvg | null;
    /**
     * Returns the block connected to the previous connection.
     *
     * @returns The previous statement block or null.
     */
    getPreviousBlock(): BlockSvg | null;
    /**
     * Bumps unconnected blocks out of alignment.
     *
     * Two blocks which aren't actually connected should not coincidentally line
     * up on screen, because that creates confusion for end-users.
     */
    bumpNeighbours(): void;
    /**
     * Bumps unconnected blocks out of alignment.
     */
    private bumpNeighboursInternal;
    /**
     * Schedule snapping to grid and bumping neighbours to occur after a brief
     * delay.
     *
     * @internal
     */
    scheduleSnapAndBump(): void;
    /**
     * Position a block so that it doesn't move the target block when connected.
     * The block to position is usually either the first block in a dragged stack
     * or an insertion marker.
     *
     * @param sourceConnection The connection on the moving block's stack.
     * @param targetConnection The connection that should stay stationary as this
     *     block is positioned.
     * @internal
     */
    positionNearConnection(sourceConnection: RenderedConnection, targetConnection: RenderedConnection): void;
    /**
     * @returns The first statement connection or null.
     * @internal
     */
    getFirstStatementConnection(): RenderedConnection | null;
    /**
     * Find all the blocks that are directly nested inside this one.
     * Includes value and statement inputs, as well as any following statement.
     * Excludes any connection on an output tab or any preceding statement.
     * Blocks are optionally sorted by position; top to bottom.
     *
     * @param ordered Sort the list if true.
     * @returns Array of blocks.
     */
    getChildren(ordered: boolean): BlockSvg[];
    /**
     * Lays out and reflows a block based on its contents and settings.
     *
     * @param opt_bubble If false, just render this block.
     *   If true, also render block's parent, grandparent, etc.  Defaults to true.
     */
    render(opt_bubble?: boolean): void;
    /** Redraw any attached marker or cursor svgs if needed. */
    protected updateMarkers_(): void;
    /**
     * Update all of the connections on this block with the new locations
     * calculated during rendering.  Also move all of the connected blocks based
     * on the new connection locations.
     */
    private updateConnectionLocations_;
    /**
     * Add the cursor SVG to this block's SVG group.
     *
     * @param cursorSvg The SVG root of the cursor to be added to the block SVG
     *     group.
     * @internal
     */
    setCursorSvg(cursorSvg: SVGElement): void;
    /**
     * Add the marker SVG to this block's SVG group.
     *
     * @param markerSvg The SVG root of the marker to be added to the block SVG
     *     group.
     * @internal
     */
    setMarkerSvg(markerSvg: SVGElement): void;
    /**
     * Returns a bounding box describing the dimensions of this block
     * and any blocks stacked below it.
     *
     * @returns Object with height and width properties in workspace units.
     * @internal
     */
    getHeightWidth(): {
        height: number;
        width: number;
    };
    /**
     * Visual effect to show that if the dragging block is dropped, this block
     * will be replaced.  If a shadow block, it will disappear.  Otherwise it will
     * bump.
     *
     * @param add True if highlighting should be added.
     * @internal
     */
    fadeForReplacement(add: boolean): void;
    /**
     * Visual effect to show that if the dragging block is dropped it will connect
     * to this input.
     *
     * @param conn The connection on the input to highlight.
     * @param add True if highlighting should be added.
     * @internal
     */
    highlightShapeForInput(conn: RenderedConnection, add: boolean): void;
}
//# sourceMappingURL=block_svg.d.ts.map