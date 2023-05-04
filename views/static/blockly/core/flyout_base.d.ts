/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from './block_svg.js';
import { DeleteArea } from './delete_area.js';
import { FlyoutButton } from './flyout_button.js';
import type { IFlyout } from './interfaces/i_flyout.js';
import type { Options } from './options.js';
import { Coordinate } from './utils/coordinate.js';
import { Svg } from './utils/svg.js';
import * as toolbox from './utils/toolbox.js';
import { WorkspaceSvg } from './workspace_svg.js';
declare enum FlyoutItemType {
    BLOCK = "block",
    BUTTON = "button"
}
/**
 * Class for a flyout.
 *
 * @alias Blockly.Flyout
 */
export declare abstract class Flyout extends DeleteArea implements IFlyout {
    /**
     * Position the flyout.
     */
    abstract position(): void;
    /**
     * Determine if a drag delta is toward the workspace, based on the position
     * and orientation of the flyout. This is used in determineDragIntention_ to
     * determine if a new block should be created or if the flyout should scroll.
     *
     * @param currentDragDeltaXY How far the pointer has
     *     moved from the position at mouse down, in pixel units.
     * @returns True if the drag is toward the workspace.
     */
    abstract isDragTowardWorkspace(currentDragDeltaXY: Coordinate): boolean;
    /**
     * Sets the translation of the flyout to match the scrollbars.
     *
     * @param xyRatio Contains a y property which is a float
     *     between 0 and 1 specifying the degree of scrolling and a
     *     similar x property.
     */
    protected abstract setMetrics_(xyRatio: {
        x?: number;
        y?: number;
    }): void;
    /**
     * Lay out the blocks in the flyout.
     *
     * @param contents The blocks and buttons to lay
     *     out.
     * @param gaps The visible gaps between blocks.
     */
    protected abstract layout_(contents: FlyoutItem[], gaps: number[]): void;
    /**
     * Scroll the flyout.
     *
     * @param e Mouse wheel scroll event.
     */
    protected abstract wheel_(e: WheelEvent): void;
    /**
     * Compute height of flyout.  Position mat under each block.
     * For RTL: Lay out the blocks right-aligned.
     */
    protected abstract reflowInternal_(): void;
    /**
     * Calculates the x coordinate for the flyout position.
     *
     * @returns X coordinate.
     */
    abstract getX(): number;
    /**
     * Calculates the y coordinate for the flyout position.
     *
     * @returns Y coordinate.
     */
    abstract getY(): number;
    /**
     * Scroll the flyout to the beginning of its contents.
     */
    abstract scrollToStart(): void;
    /**
     * The type of a flyout content item.
     */
    static FlyoutItemType: typeof FlyoutItemType;
    protected workspace_: WorkspaceSvg;
    RTL: boolean;
    /**
     * Whether the flyout should be laid out horizontally or not.
     *
     * @internal
     */
    horizontalLayout: boolean;
    protected toolboxPosition_: number;
    /**
     * Opaque data that can be passed to Blockly.unbindEvent_.
     */
    private eventWrappers_;
    /**
     * Function that will be registered as a change listener on the workspace
     * to reflow when blocks in the flyout workspace change.
     */
    private reflowWrapper_;
    /**
     * Function that disables blocks in the flyout based on max block counts
     * allowed in the target workspace. Registered as a change listener on the
     * target workspace.
     */
    private filterWrapper_;
    /**
     * List of background mats that lurk behind each block to catch clicks
     * landing in the blocks' lakes and bays.
     */
    private mats_;
    /**
     * List of visible buttons.
     */
    protected buttons_: FlyoutButton[];
    /**
     * List of event listeners.
     */
    private listeners_;
    /**
     * List of blocks that should always be disabled.
     */
    private permanentlyDisabled_;
    protected readonly tabWidth_: number;
    /**
     * The target workspace.
     *
     * @internal
     */
    targetWorkspace: WorkspaceSvg;
    /**
     * A list of blocks that can be reused.
     */
    private recycledBlocks_;
    /**
     * Does the flyout automatically close when a block is created?
     */
    autoClose: boolean;
    /**
     * Whether the flyout is visible.
     */
    private isVisible_;
    /**
     * Whether the workspace containing this flyout is visible.
     */
    private containerVisible_;
    protected rectMap_: WeakMap<BlockSvg, SVGElement>;
    /**
     * Corner radius of the flyout background.
     */
    readonly CORNER_RADIUS: number;
    readonly MARGIN: number;
    readonly GAP_X: number;
    readonly GAP_Y: number;
    /**
     * Top/bottom padding between scrollbar and edge of flyout background.
     */
    readonly SCROLLBAR_MARGIN: number;
    /**
     * Width of flyout.
     */
    protected width_: number;
    /**
     * Height of flyout.
     */
    protected height_: number;
    /**
     * Range of a drag angle from a flyout considered "dragging toward
     * workspace". Drags that are within the bounds of this many degrees from
     * the orthogonal line to the flyout edge are considered to be "drags toward
     * the workspace".
     *
     * @example
     *
     * ```
     * Flyout                                                 Edge   Workspace
     * [block] /  <-within this angle, drags "toward workspace" |
     * [block] ---- orthogonal to flyout boundary ----          |
     * [block] \                                                |
     * ```
     *
     * The angle is given in degrees from the orthogonal.
     *
     * This is used to know when to create a new block and when to scroll the
     * flyout. Setting it to 360 means that all drags create a new block.
     */
    protected dragAngleRange_: number;
    /**
     * The path around the background of the flyout, which will be filled with a
     * background colour.
     */
    protected svgBackground_: SVGPathElement | null;
    /**
     * The root SVG group for the button or label.
     */
    protected svgGroup_: SVGGElement | null;
    /**
     * @param workspaceOptions Dictionary of options for the
     *     workspace.
     */
    constructor(workspaceOptions: Options);
    /**
     * Creates the flyout's DOM.  Only needs to be called once.  The flyout can
     * either exist as its own SVG element or be a g element nested inside a
     * separate SVG element.
     *
     * @param tagName The type of tag to
     *     put the flyout in. This should be <svg> or <g>.
     * @returns The flyout's SVG group.
     */
    createDom(tagName: string | Svg<SVGSVGElement> | Svg<SVGGElement>): SVGElement;
    /**
     * Initializes the flyout.
     *
     * @param targetWorkspace The workspace in which to
     *     create new blocks.
     */
    init(targetWorkspace: WorkspaceSvg): void;
    /**
     * Dispose of this flyout.
     * Unlink from all DOM elements to prevent memory leaks.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
    /**
     * Get the width of the flyout.
     *
     * @returns The width of the flyout.
     */
    getWidth(): number;
    /**
     * Get the height of the flyout.
     *
     * @returns The width of the flyout.
     */
    getHeight(): number;
    /**
     * Get the scale (zoom level) of the flyout. By default,
     * this matches the target workspace scale, but this can be overridden.
     *
     * @returns Flyout workspace scale.
     */
    getFlyoutScale(): number;
    /**
     * Get the workspace inside the flyout.
     *
     * @returns The workspace inside the flyout.
     * @internal
     */
    getWorkspace(): WorkspaceSvg;
    /**
     * Is the flyout visible?
     *
     * @returns True if visible.
     */
    isVisible(): boolean;
    /**
     * Set whether the flyout is visible. A value of true does not necessarily
     * mean that the flyout is shown. It could be hidden because its container is
     * hidden.
     *
     * @param visible True if visible.
     */
    setVisible(visible: boolean): void;
    /**
     * Set whether this flyout's container is visible.
     *
     * @param visible Whether the container is visible.
     */
    setContainerVisible(visible: boolean): void;
    /**
     * Update the display property of the flyout based whether it thinks it should
     * be visible and whether its containing workspace is visible.
     */
    private updateDisplay_;
    /**
     * Update the view based on coordinates calculated in position().
     *
     * @param width The computed width of the flyout's SVG group
     * @param height The computed height of the flyout's SVG group.
     * @param x The computed x origin of the flyout's SVG group.
     * @param y The computed y origin of the flyout's SVG group.
     */
    protected positionAt_(width: number, height: number, x: number, y: number): void;
    /**
     * Hide and empty the flyout.
     */
    hide(): void;
    /**
     * Show and populate the flyout.
     *
     * @param flyoutDef Contents to display
     *     in the flyout. This is either an array of Nodes, a NodeList, a
     *     toolbox definition, or a string with the name of the dynamic category.
     */
    show(flyoutDef: toolbox.FlyoutDefinition | string): void;
    /**
     * Create the contents array and gaps array necessary to create the layout for
     * the flyout.
     *
     * @param parsedContent The array
     *     of objects to show in the flyout.
     * @returns The list of contents and gaps needed to lay out the flyout.
     */
    private createFlyoutInfo_;
    /**
     * Gets the flyout definition for the dynamic category.
     *
     * @param categoryName The name of the dynamic category.
     * @returns The definition of the
     *     flyout in one of its many forms.
     */
    private getDynamicCategoryContents_;
    /**
     * Creates a flyout button or a flyout label.
     *
     * @param btnInfo The object holding information about a button or a label.
     * @param isLabel True if the button is a label, false otherwise.
     * @returns The object used to display the button in the
     *    flyout.
     */
    private createButton_;
    /**
     * Create a block from the xml and permanently disable any blocks that were
     * defined as disabled.
     *
     * @param blockInfo The info of the block.
     * @returns The block created from the blockInfo.
     */
    private createFlyoutBlock_;
    /**
     * Returns a block from the array of recycled blocks with the given type, or
     * undefined if one cannot be found.
     *
     * @param blockType The type of the block to try to recycle.
     * @returns The recycled block, or undefined if
     *     one could not be recycled.
     */
    private getRecycledBlock_;
    /**
     * Adds a gap in the flyout based on block info.
     *
     * @param blockInfo Information about a block.
     * @param gaps The list of gaps between items in the flyout.
     * @param defaultGap The default gap between one element and the
     *     next.
     */
    private addBlockGap_;
    /**
     * Add the necessary gap in the flyout for a separator.
     *
     * @param sepInfo The object holding
     *    information about a separator.
     * @param gaps The list gaps between items in the flyout.
     * @param defaultGap The default gap between the button and next
     *     element.
     */
    private addSeparatorGap_;
    /**
     * Delete blocks, mats and buttons from a previous showing of the flyout.
     */
    private clearOldBlocks_;
    /**
     * Empties all of the recycled blocks, properly disposing of them.
     */
    private emptyRecycledBlocks_;
    /**
     * Returns whether the given block can be recycled or not.
     *
     * @param _block The block to check for recyclability.
     * @returns True if the block can be recycled. False otherwise.
     */
    protected blockIsRecyclable_(_block: BlockSvg): boolean;
    /**
     * Puts a previously created block into the recycle bin and moves it to the
     * top of the workspace. Used during large workspace swaps to limit the number
     * of new DOM elements we need to create.
     *
     * @param block The block to recycle.
     */
    private recycleBlock_;
    /**
     * Add listeners to a block that has been added to the flyout.
     *
     * @param root The root node of the SVG group the block is in.
     * @param block The block to add listeners for.
     * @param rect The invisible rectangle under the block that acts
     *     as a mat for that block.
     */
    protected addBlockListeners_(root: SVGElement, block: BlockSvg, rect: SVGElement): void;
    /**
     * Handle a mouse-down on an SVG block in a non-closing flyout.
     *
     * @param block The flyout block to copy.
     * @returns Function to call when block is clicked.
     */
    private blockMouseDown_;
    /**
     * Mouse down on the flyout background.  Start a vertical scroll drag.
     *
     * @param e Mouse down event.
     */
    private onMouseDown_;
    /**
     * Does this flyout allow you to create a new instance of the given block?
     * Used for deciding if a block can be "dragged out of" the flyout.
     *
     * @param block The block to copy from the flyout.
     * @returns True if you can create a new instance of the block, false
     *    otherwise.
     * @internal
     */
    isBlockCreatable(block: BlockSvg): boolean;
    /**
     * Create a copy of this block on the workspace.
     *
     * @param originalBlock The block to copy from the flyout.
     * @returns The newly created block.
     * @throws {Error} if something went wrong with deserialization.
     * @internal
     */
    createBlock(originalBlock: BlockSvg): BlockSvg;
    /**
     * Initialize the given button: move it to the correct location,
     * add listeners, etc.
     *
     * @param button The button to initialize and place.
     * @param x The x position of the cursor during this layout pass.
     * @param y The y position of the cursor during this layout pass.
     */
    protected initFlyoutButton_(button: FlyoutButton, x: number, y: number): void;
    /**
     * Create and place a rectangle corresponding to the given block.
     *
     * @param block The block to associate the rect to.
     * @param x The x position of the cursor during this layout pass.
     * @param y The y position of the cursor during this layout pass.
     * @param blockHW The height and width of
     *     the block.
     * @param index The index into the mats list where this rect should
     *     be placed.
     * @returns Newly created SVG element for the rectangle behind
     *     the block.
     */
    protected createRect_(block: BlockSvg, x: number, y: number, blockHW: {
        height: number;
        width: number;
    }, index: number): SVGElement;
    /**
     * Move a rectangle to sit exactly behind a block, taking into account tabs,
     * hats, and any other protrusions we invent.
     *
     * @param rect The rectangle to move directly behind the block.
     * @param block The block the rectangle should be behind.
     */
    protected moveRectToBlock_(rect: SVGElement, block: BlockSvg): void;
    /**
     * Filter the blocks on the flyout to disable the ones that are above the
     * capacity limit.  For instance, if the user may only place two more blocks
     * on the workspace, an "a + b" block that has two shadow blocks would be
     * disabled.
     */
    private filterForCapacity_;
    /**
     * Reflow blocks and their mats.
     */
    reflow(): void;
    /**
     * @returns True if this flyout may be scrolled with a scrollbar or
     *     by dragging.
     * @internal
     */
    isScrollable(): boolean;
    /**
     * Copy a block from the flyout to the workspace and position it correctly.
     *
     * @param oldBlock The flyout block to copy.
     * @returns The new block in the main workspace.
     */
    private placeNewBlock_;
    /**
     * Positions a block on the target workspace.
     *
     * @param oldBlock The flyout block being copied.
     * @param block The block to posiiton.
     */
    private positionNewBlock_;
}
/**
 * A flyout content item.
 */
export interface FlyoutItem {
    type: FlyoutItemType;
    button?: FlyoutButton | undefined;
    block?: BlockSvg | undefined;
}
export {};
//# sourceMappingURL=flyout_base.d.ts.map