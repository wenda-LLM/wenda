/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_selected.js';
import type { BlockDragSurfaceSvg } from './block_drag_surface.js';
import type { IBoundedElement } from './interfaces/i_bounded_element.js';
import type { IBubble } from './interfaces/i_bubble.js';
import type { CopyData, ICopyable } from './interfaces/i_copyable.js';
import { Coordinate } from './utils/coordinate.js';
import { Rect } from './utils/rect.js';
import { WorkspaceComment } from './workspace_comment.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a workspace comment's SVG representation.
 *
 * @alias Blockly.WorkspaceCommentSvg
 */
export declare class WorkspaceCommentSvg extends WorkspaceComment implements IBoundedElement, IBubble, ICopyable {
    /**
     * The width and height to use to size a workspace comment when it is first
     * added, before it has been edited by the user.
     *
     * @internal
     */
    static DEFAULT_SIZE: number;
    /** Offset from the top to make room for a top bar. */
    private static readonly TOP_OFFSET;
    workspace: WorkspaceSvg;
    /** Mouse up event data. */
    private onMouseUpWrapper_;
    /** Mouse move event data. */
    private onMouseMoveWrapper_;
    /** Whether event handlers have been initialized. */
    private eventsInit_;
    private textarea_;
    private svgRectTarget_;
    private svgHandleTarget_;
    private foreignObject_;
    private resizeGroup_;
    private deleteGroup_;
    private deleteIconBorder_;
    private focused_;
    private autoLayout_;
    private readonly svgGroup_;
    svgRect_: any;
    /** Whether the comment is rendered onscreen and is a part of the DOM. */
    private rendered_;
    private readonly useDragSurface_;
    /**
     * @param workspace The block's workspace.
     * @param content The content of this workspace comment.
     * @param height Height of the comment.
     * @param width Width of the comment.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     */
    constructor(workspace: WorkspaceSvg, content: string, height: number, width: number, opt_id?: string);
    /**
     * Dispose of this comment.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Create and initialize the SVG representation of a workspace comment.
     * May be called more than once.
     *
     * @param opt_noSelect Text inside text area will be selected if false
     * @internal
     */
    initSvg(opt_noSelect?: boolean): void;
    /**
     * Handle a mouse-down on an SVG comment.
     *
     * @param e Mouse down event or touch start event.
     */
    private pathMouseDown_;
    /**
     * Show the context menu for this workspace comment.
     *
     * @param e Mouse event.
     * @internal
     */
    showContextMenu(e: Event): void;
    /**
     * Select this comment.  Highlight it visually.
     *
     * @internal
     */
    select(): void;
    /**
     * Unselect this comment.  Remove its highlighting.
     *
     * @internal
     */
    unselect(): void;
    /**
     * Select this comment.  Highlight it visually.
     *
     * @internal
     */
    addSelect(): void;
    /**
     * Unselect this comment.  Remove its highlighting.
     *
     * @internal
     */
    removeSelect(): void;
    /**
     * Focus this comment.  Highlight it visually.
     *
     * @internal
     */
    addFocus(): void;
    /**
     * Unfocus this comment.  Remove its highlighting.
     *
     * @internal
     */
    removeFocus(): void;
    /**
     * Return the coordinates of the top-left corner of this comment relative to
     * the drawing surface's origin (0,0), in workspace units.
     * If the comment is on the workspace, (0, 0) is the origin of the workspace
     * coordinate system.
     * This does not change with workspace scale.
     *
     * @returns Object with .x and .y properties in workspace coordinates.
     * @internal
     */
    getRelativeToSurfaceXY(): Coordinate;
    /**
     * Move a comment by a relative offset.
     *
     * @param dx Horizontal offset, in workspace units.
     * @param dy Vertical offset, in workspace units.
     * @internal
     */
    moveBy(dx: number, dy: number): void;
    /**
     * Transforms a comment by setting the translation on the transform attribute
     * of the block's SVG.
     *
     * @param x The x coordinate of the translation in workspace units.
     * @param y The y coordinate of the translation in workspace units.
     * @internal
     */
    translate(x: number, y: number): void;
    /**
     * Move this comment to its workspace's drag surface, accounting for
     * positioning.  Generally should be called at the same time as
     * setDragging(true).  Does nothing if useDragSurface_ is false.
     *
     * @internal
     */
    moveToDragSurface(): void;
    /**
     * Move this comment during a drag, taking into account whether we are using a
     * drag surface to translate blocks.
     *
     * @param dragSurface The surface that carries rendered items during a drag,
     *     or null if no drag surface is in use.
     * @param newLoc The location to translate to, in workspace coordinates.
     * @internal
     */
    moveDuringDrag(dragSurface: BlockDragSurfaceSvg, newLoc: Coordinate): void;
    /**
     * Move the bubble group to the specified location in workspace coordinates.
     *
     * @param x The x position to move to.
     * @param y The y position to move to.
     * @internal
     */
    moveTo(x: number, y: number): void;
    /**
     * Clear the comment of transform="..." attributes.
     * Used when the comment is switching from 3d to 2d transform or vice versa.
     */
    private clearTransformAttributes_;
    /**
     * Returns the coordinates of a bounding box describing the dimensions of this
     * comment.
     * Coordinate system: workspace coordinates.
     *
     * @returns Object with coordinates of the bounding box.
     * @internal
     */
    getBoundingRectangle(): Rect;
    /**
     * Add or remove the UI indicating if this comment is movable or not.
     *
     * @internal
     */
    updateMovable(): void;
    /**
     * Set whether this comment is movable or not.
     *
     * @param movable True if movable.
     * @internal
     */
    setMovable(movable: boolean): void;
    /**
     * Set whether this comment is editable or not.
     *
     * @param editable True if editable.
     */
    setEditable(editable: boolean): void;
    /**
     * Recursively adds or removes the dragging class to this node and its
     * children.
     *
     * @param adding True if adding, false if removing.
     * @internal
     */
    setDragging(adding: boolean): void;
    /**
     * Return the root node of the SVG or null if none exists.
     *
     * @returns The root SVG node (probably a group).
     * @internal
     */
    getSvgRoot(): SVGElement;
    /**
     * Returns this comment's text.
     *
     * @returns Comment text.
     * @internal
     */
    getContent(): string;
    /**
     * Set this comment's content.
     *
     * @param content Comment content.
     * @internal
     */
    setContent(content: string): void;
    /**
     * Update the cursor over this comment by adding or removing a class.
     *
     * @param enable True if the delete cursor should be shown, false otherwise.
     * @internal
     */
    setDeleteStyle(enable: boolean): void;
    /**
     * Set whether auto-layout of this bubble is enabled.  The first time a bubble
     * is shown it positions itself to not cover any blocks.  Once a user has
     * dragged it to reposition, it renders where the user put it.
     *
     * @param _enable True if auto-layout should be enabled, false otherwise.
     * @internal
     */
    setAutoLayout(_enable: boolean): void;
    /**
     * Encode a comment subtree as XML with XY coordinates.
     *
     * @param opt_noId True if the encoder should skip the comment ID.
     * @returns Tree of XML elements.
     * @internal
     */
    toXmlWithXY(opt_noId?: boolean): Element;
    /**
     * Encode a comment for copying.
     *
     * @returns Copy metadata.
     * @internal
     */
    toCopyData(): CopyData;
    /**
     * Returns a bounding box describing the dimensions of this comment.
     *
     * @returns Object with height and width properties in workspace units.
     * @internal
     */
    getHeightWidth(): {
        height: number;
        width: number;
    };
    /**
     * Renders the workspace comment.
     *
     * @internal
     */
    render(): void;
    /**
     * Create the text area for the comment.
     *
     * @returns The top-level node of the editor.
     */
    private createEditor_;
    /** Add the resize icon to the DOM */
    private addResizeDom_;
    /** Add the delete icon to the DOM */
    private addDeleteDom_;
    /**
     * Handle a mouse-down on comment's resize corner.
     *
     * @param e Mouse down event.
     */
    private resizeMouseDown_;
    /**
     * Handle a mouse-down on comment's delete icon.
     *
     * @param e Mouse down event.
     */
    private deleteMouseDown_;
    /**
     * Handle a mouse-out on comment's delete icon.
     *
     * @param _e Mouse out event.
     */
    private deleteMouseOut_;
    /**
     * Handle a mouse-up on comment's delete icon.
     *
     * @param e Mouse up event.
     */
    private deleteMouseUp_;
    /** Stop binding to the global mouseup and mousemove events. */
    private unbindDragEvents_;
    /**
     * Handle a mouse-up event while dragging a comment's border or resize handle.
     *
     * @param _e Mouse up event.
     */
    private resizeMouseUp_;
    /**
     * Resize this comment to follow the mouse.
     *
     * @param e Mouse move event.
     */
    private resizeMouseMove_;
    /**
     * Callback function triggered when the comment has resized.
     * Resize the text area accordingly.
     */
    private resizeComment_;
    /**
     * Set size
     *
     * @param width width of the container
     * @param height height of the container
     */
    private setSize_;
    /** Dispose of any rendered comment components. */
    private disposeInternal_;
    /**
     * Set the focus on the text area.
     *
     * @internal
     */
    setFocus(): void;
    /**
     * Remove focus from the text area.
     *
     * @internal
     */
    blurFocus(): void;
    /**
     * Decode an XML comment tag and create a rendered comment on the workspace.
     *
     * @param xmlComment XML comment element.
     * @param workspace The workspace.
     * @param opt_wsWidth The width of the workspace, which is used to position
     *     comments correctly in RTL.
     * @returns The created workspace comment.
     * @internal
     */
    static fromXmlRendered(xmlComment: Element, workspace: WorkspaceSvg, opt_wsWidth?: number): WorkspaceCommentSvg;
}
//# sourceMappingURL=workspace_comment_svg.d.ts.map