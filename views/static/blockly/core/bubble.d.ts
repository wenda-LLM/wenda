/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockDragSurfaceSvg } from './block_drag_surface.js';
import type { BlockSvg } from './block_svg.js';
import type { IBubble } from './interfaces/i_bubble.js';
import { Coordinate } from './utils/coordinate.js';
import { Size } from './utils/size.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for UI bubble.
 *
 * @alias Blockly.Bubble
 */
export declare class Bubble implements IBubble {
    /** Width of the border around the bubble. */
    static BORDER_WIDTH: number;
    /**
     * Determines the thickness of the base of the arrow in relation to the size
     * of the bubble.  Higher numbers result in thinner arrows.
     */
    static ARROW_THICKNESS: number;
    /** The number of degrees that the arrow bends counter-clockwise. */
    static ARROW_ANGLE: number;
    /**
     * The sharpness of the arrow's bend.  Higher numbers result in smoother
     * arrows.
     */
    static ARROW_BEND: number;
    /** Distance between arrow point and anchor point. */
    static ANCHOR_RADIUS: number;
    /** Mouse up event data. */
    private static onMouseUpWrapper;
    /** Mouse move event data. */
    private static onMouseMoveWrapper;
    workspace_: WorkspaceSvg;
    content_: SVGElement;
    shape_: SVGElement;
    /** Flag to stop incremental rendering during construction. */
    private readonly rendered;
    /** The SVG group containing all parts of the bubble. */
    private bubbleGroup;
    /**
     * The SVG path for the arrow from the bubble to the icon on the block.
     */
    private bubbleArrow;
    /** The SVG rect for the main body of the bubble. */
    private bubbleBack;
    /** The SVG group for the resize hash marks on some bubbles. */
    private resizeGroup;
    /** Absolute coordinate of anchor point, in workspace coordinates. */
    private anchorXY;
    /**
     * Relative X coordinate of bubble with respect to the anchor's centre,
     * in workspace units.
     * In RTL mode the initial value is negated.
     */
    private relativeLeft;
    /**
     * Relative Y coordinate of bubble with respect to the anchor's centre, in
     * workspace units.
     */
    private relativeTop;
    /** Width of bubble, in workspace units. */
    private width;
    /** Height of bubble, in workspace units. */
    private height;
    /** Automatically position and reposition the bubble. */
    private autoLayout;
    /** Method to call on resize of bubble. */
    private resizeCallback;
    /** Method to call on move of bubble. */
    private moveCallback;
    /** Mouse down on bubbleBack event data. */
    private onMouseDownBubbleWrapper;
    /** Mouse down on resizeGroup event data. */
    private onMouseDownResizeWrapper;
    /**
     * Describes whether this bubble has been disposed of (nodes and event
     * listeners removed from the page) or not.
     *
     * @internal
     */
    disposed: boolean;
    private arrowRadians;
    /**
     * @param workspace The workspace on which to draw the bubble.
     * @param content SVG content for the bubble.
     * @param shape SVG element to avoid eclipsing.
     * @param anchorXY Absolute position of bubble's anchor point.
     * @param bubbleWidth Width of bubble, or null if not resizable.
     * @param bubbleHeight Height of bubble, or null if not resizable.
     */
    constructor(workspace: WorkspaceSvg, content: SVGElement, shape: SVGElement, anchorXY: Coordinate, bubbleWidth: number | null, bubbleHeight: number | null);
    /**
     * Create the bubble's DOM.
     *
     * @param content SVG content for the bubble.
     * @param hasResize Add diagonal resize gripper if true.
     * @returns The bubble's SVG group.
     */
    private createDom;
    /**
     * Return the root node of the bubble's SVG group.
     *
     * @returns The root SVG node of the bubble's group.
     */
    getSvgRoot(): SVGElement;
    /**
     * Expose the block's ID on the bubble's top-level SVG group.
     *
     * @param id ID of block.
     */
    setSvgId(id: string): void;
    /**
     * Handle a mouse-down on bubble's border.
     *
     * @param e Mouse down event.
     */
    private bubbleMouseDown;
    /**
     * Show the context menu for this bubble.
     *
     * @param _e Mouse event.
     * @internal
     */
    showContextMenu(_e: Event): void;
    /**
     * Get whether this bubble is deletable or not.
     *
     * @returns True if deletable.
     * @internal
     */
    isDeletable(): boolean;
    /**
     * Update the style of this bubble when it is dragged over a delete area.
     *
     * @param _enable True if the bubble is about to be deleted, false otherwise.
     */
    setDeleteStyle(_enable: boolean): void;
    /**
     * Handle a mouse-down on bubble's resize corner.
     *
     * @param e Mouse down event.
     */
    private resizeMouseDown;
    /**
     * Resize this bubble to follow the mouse.
     *
     * @param e Mouse move event.
     */
    private resizeMouseMove;
    /**
     * Register a function as a callback event for when the bubble is resized.
     *
     * @param callback The function to call on resize.
     */
    registerResizeEvent(callback: () => void): void;
    /**
     * Register a function as a callback event for when the bubble is moved.
     *
     * @param callback The function to call on move.
     */
    registerMoveEvent(callback: () => void): void;
    /**
     * Move this bubble to the top of the stack.
     *
     * @returns Whether or not the bubble has been moved.
     * @internal
     */
    promote(): boolean;
    /**
     * Notification that the anchor has moved.
     * Update the arrow and bubble accordingly.
     *
     * @param xy Absolute location.
     */
    setAnchorLocation(xy: Coordinate): void;
    /** Position the bubble so that it does not fall off-screen. */
    private layoutBubble;
    /**
     * Calculate the what percentage of the bubble overlaps with the visible
     * workspace (what percentage of the bubble is visible).
     *
     * @param relativeMin The position of the top-left corner of the bubble
     *     relative to the anchor point.
     * @param viewMetrics The view metrics of the workspace the bubble will appear
     *     in.
     * @returns The percentage of the bubble that is visible.
     */
    private getOverlap;
    /**
     * Calculate what the optimal horizontal position of the top-left corner of
     * the bubble is (relative to the anchor point) so that the most area of the
     * bubble is shown.
     *
     * @param viewMetrics The view metrics of the workspace the bubble will appear
     *     in.
     * @returns The optimal horizontal position of the top-left corner of the
     *     bubble.
     */
    private getOptimalRelativeLeft;
    /**
     * Calculate what the optimal vertical position of the top-left corner of
     * the bubble is (relative to the anchor point) so that the most area of the
     * bubble is shown.
     *
     * @param viewMetrics The view metrics of the workspace the bubble will appear
     *     in.
     * @returns The optimal vertical position of the top-left corner of the
     *     bubble.
     */
    private getOptimalRelativeTop;
    /** Move the bubble to a location relative to the anchor's centre. */
    private positionBubble;
    /**
     * Move the bubble group to the specified location in workspace coordinates.
     *
     * @param x The x position to move to.
     * @param y The y position to move to.
     * @internal
     */
    moveTo(x: number, y: number): void;
    /**
     * Triggers a move callback if one exists at the end of a drag.
     *
     * @param adding True if adding, false if removing.
     * @internal
     */
    setDragging(adding: boolean): void;
    /**
     * Get the dimensions of this bubble.
     *
     * @returns The height and width of the bubble.
     */
    getBubbleSize(): Size;
    /**
     * Size this bubble.
     *
     * @param width Width of the bubble.
     * @param height Height of the bubble.
     */
    setBubbleSize(width: number, height: number): void;
    /** Draw the arrow between the bubble and the origin. */
    private renderArrow;
    /**
     * Change the colour of a bubble.
     *
     * @param hexColour Hex code of colour.
     */
    setColour(hexColour: string): void;
    /** Dispose of this bubble. */
    dispose(): void;
    /**
     * Move this bubble during a drag, taking into account whether or not there is
     * a drag surface.
     *
     * @param dragSurface The surface that carries rendered items during a drag,
     *     or null if no drag surface is in use.
     * @param newLoc The location to translate to, in workspace coordinates.
     * @internal
     */
    moveDuringDrag(dragSurface: BlockDragSurfaceSvg, newLoc: Coordinate): void;
    /**
     * Return the coordinates of the top-left corner of this bubble's body
     * relative to the drawing surface's origin (0,0), in workspace units.
     *
     * @returns Object with .x and .y properties.
     */
    getRelativeToSurfaceXY(): Coordinate;
    /**
     * Set whether auto-layout of this bubble is enabled.  The first time a bubble
     * is shown it positions itself to not cover any blocks.  Once a user has
     * dragged it to reposition, it renders where the user put it.
     *
     * @param enable True if auto-layout should be enabled, false otherwise.
     * @internal
     */
    setAutoLayout(enable: boolean): void;
    /** Stop binding to the global mouseup and mousemove events. */
    private static unbindDragEvents;
    /**
     * Handle a mouse-up event while dragging a bubble's border or resize handle.
     *
     * @param _e Mouse up event.
     */
    private static bubbleMouseUp;
    /**
     * Create the text for a non editable bubble.
     *
     * @param text The text to display.
     * @returns The top-level node of the text.
     * @internal
     */
    static textToDom(text: string): SVGTextElement;
    /**
     * Creates a bubble that can not be edited.
     *
     * @param paragraphElement The text element for the non editable bubble.
     * @param block The block that the bubble is attached to.
     * @param iconXY The coordinate of the icon.
     * @returns The non editable bubble.
     * @internal
     */
    static createNonEditableBubble(paragraphElement: SVGTextElement, block: BlockSvg, iconXY: Coordinate): Bubble;
}
//# sourceMappingURL=bubble.d.ts.map