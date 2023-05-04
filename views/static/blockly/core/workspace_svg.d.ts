/**
 * @license
 * Copyright 2014 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_create.js';
import './events/events_theme_change.js';
import './events/events_viewport.js';
import type { Block } from './block.js';
import type { BlockDragSurfaceSvg } from './block_drag_surface.js';
import type { BlockSvg } from './block_svg.js';
import * as browserEvents from './browser_events.js';
import { ComponentManager } from './component_manager.js';
import type { FlyoutButton } from './flyout_button.js';
import { Grid } from './grid.js';
import type { IASTNodeLocationSvg } from './interfaces/i_ast_node_location_svg.js';
import type { IBoundedElement } from './interfaces/i_bounded_element.js';
import type { ICopyable } from './interfaces/i_copyable.js';
import type { IDragTarget } from './interfaces/i_drag_target.js';
import type { IFlyout } from './interfaces/i_flyout.js';
import type { IMetricsManager } from './interfaces/i_metrics_manager.js';
import type { IToolbox } from './interfaces/i_toolbox.js';
import type { Cursor } from './keyboard_nav/cursor.js';
import type { Marker } from './keyboard_nav/marker.js';
import { MarkerManager } from './marker_manager.js';
import { Options } from './options.js';
import type { Renderer } from './renderers/common/renderer.js';
import type { ScrollbarPair } from './scrollbar_pair.js';
import type { Theme } from './theme.js';
import { ThemeManager } from './theme_manager.js';
import { TouchGesture } from './touch_gesture.js';
import type { Trashcan } from './trashcan.js';
import { Coordinate } from './utils/coordinate.js';
import type { Metrics } from './utils/metrics.js';
import { Rect } from './utils/rect.js';
import { Size } from './utils/size.js';
import { Svg } from './utils/svg.js';
import * as toolbox from './utils/toolbox.js';
import type { VariableModel } from './variable_model.js';
import { Workspace } from './workspace.js';
import { WorkspaceAudio } from './workspace_audio.js';
import { WorkspaceComment } from './workspace_comment.js';
import type { WorkspaceDragSurfaceSvg } from './workspace_drag_surface_svg.js';
import { ZoomControls } from './zoom_controls.js';
import { ContextMenuOption } from './contextmenu_registry.js';
/**
 * Class for a workspace.  This is an onscreen area with optional trashcan,
 * scrollbars, bubbles, and dragging.
 *
 * @alias Blockly.WorkspaceSvg
 */
export declare class WorkspaceSvg extends Workspace implements IASTNodeLocationSvg {
    /**
     * A wrapper function called when a resize event occurs.
     * You can pass the result to `eventHandling.unbind`.
     */
    private resizeHandlerWrapper;
    /**
     * The render status of an SVG workspace.
     * Returns `false` for headless workspaces and true for instances of
     * `WorkspaceSvg`.
     */
    rendered: boolean;
    /**
     * Whether the workspace is visible.  False if the workspace has been hidden
     * by calling `setVisible(false)`.
     */
    private isVisible_;
    /**
     * Whether this workspace has resizes enabled.
     * Disable during batch operations for a performance improvement.
     */
    private resizesEnabled;
    /**
     * Current horizontal scrolling offset in pixel units, relative to the
     * workspace origin.
     *
     * It is useful to think about a view, and a canvas moving beneath that
     * view. As the canvas moves right, this value becomes more positive, and
     * the view is now "seeing" the left side of the canvas. As the canvas moves
     * left, this value becomes more negative, and the view is now "seeing" the
     * right side of the canvas.
     *
     * The confusing thing about this value is that it does not, and must not
     * include the absoluteLeft offset. This is because it is used to calculate
     * the viewLeft value.
     *
     * The viewLeft is relative to the workspace origin (although in pixel
     * units). The workspace origin is the top-left corner of the workspace (at
     * least when it is enabled). It is shifted from the top-left of the
     * blocklyDiv so as not to be beneath the toolbox.
     *
     * When the workspace is enabled the viewLeft and workspace origin are at
     * the same X location. As the canvas slides towards the right beneath the
     * view this value (scrollX) becomes more positive, and the viewLeft becomes
     * more negative relative to the workspace origin (imagine the workspace
     * origin as a dot on the canvas sliding to the right as the canvas moves).
     *
     * So if the scrollX were to include the absoluteLeft this would in a way
     * "unshift" the workspace origin. This means that the viewLeft would be
     * representing the left edge of the blocklyDiv, rather than the left edge
     * of the workspace.
     */
    scrollX: number;
    /**
     * Current vertical scrolling offset in pixel units, relative to the
     * workspace origin.
     *
     * It is useful to think about a view, and a canvas moving beneath that
     * view. As the canvas moves down, this value becomes more positive, and the
     * view is now "seeing" the upper part of the canvas. As the canvas moves
     * up, this value becomes more negative, and the view is "seeing" the lower
     * part of the canvas.
     *
     * This confusing thing about this value is that it does not, and must not
     * include the absoluteTop offset. This is because it is used to calculate
     * the viewTop value.
     *
     * The viewTop is relative to the workspace origin (although in pixel
     * units). The workspace origin is the top-left corner of the workspace (at
     * least when it is enabled). It is shifted from the top-left of the
     * blocklyDiv so as not to be beneath the toolbox.
     *
     * When the workspace is enabled the viewTop and workspace origin are at the
     * same Y location. As the canvas slides towards the bottom this value
     * (scrollY) becomes more positive, and the viewTop becomes more negative
     * relative to the workspace origin (image in the workspace origin as a dot
     * on the canvas sliding downwards as the canvas moves).
     *
     * So if the scrollY were to include the absoluteTop this would in a way
     * "unshift" the workspace origin. This means that the viewTop would be
     * representing the top edge of the blocklyDiv, rather than the top edge of
     * the workspace.
     */
    scrollY: number;
    /** Horizontal scroll value when scrolling started in pixel units. */
    startScrollX: number;
    /** Vertical scroll value when scrolling started in pixel units. */
    startScrollY: number;
    /** Distance from mouse to object being dragged. */
    private dragDeltaXY;
    /** Current scale. */
    scale: number;
    /** Cached scale value. Used to detect changes in viewport. */
    private oldScale;
    /** Cached viewport top value. Used to detect changes in viewport. */
    private oldTop;
    /** Cached viewport left value. Used to detect changes in viewport. */
    private oldLeft;
    /** The workspace's trashcan (if any). */
    trashcan: Trashcan | null;
    /** This workspace's scrollbars, if they exist. */
    scrollbar: ScrollbarPair | null;
    /**
     * Fixed flyout providing blocks which may be dragged into this workspace.
     */
    private flyout;
    /**
     * Category-based toolbox providing blocks which may be dragged into this
     * workspace.
     */
    private toolbox_;
    /**
     * The current gesture in progress on this workspace, if any.
     *
     * @internal
     */
    currentGesture_: TouchGesture | null;
    /** This workspace's surface for dragging blocks, if it exists. */
    private readonly blockDragSurface;
    /** This workspace's drag surface, if it exists. */
    private readonly workspaceDragSurface;
    /**
     * Whether to move workspace to the drag surface when it is dragged.
     * True if it should move, false if it should be translated directly.
     */
    private readonly useWorkspaceDragSurface;
    /**
     * Whether the drag surface is actively in use. When true, calls to
     * translate will translate the drag surface instead of the translating the
     * workspace directly.
     * This is set to true in setupDragSurface and to false in resetDragSurface.
     */
    private isDragSurfaceActive;
    /**
     * The first parent div with 'injectionDiv' in the name, or null if not set.
     * Access this with getInjectionDiv.
     */
    private injectionDiv;
    /**
     * Last known position of the page scroll.
     * This is used to determine whether we have recalculated screen coordinate
     * stuff since the page scrolled.
     */
    private lastRecordedPageScroll;
    /**
     * Developers may define this function to add custom menu options to the
     * workspace's context menu or edit the workspace-created set of menu
     * options.
     *
     * @param options List of menu options to add to.
     * @param e The right-click event that triggered the context menu.
     */
    configureContextMenu: ((menuOptions: ContextMenuOption[], e: Event) => void) | null;
    /**
     * In a flyout, the target workspace where blocks should be placed after a
     * drag. Otherwise null.
     *
     * @internal
     */
    targetWorkspace: WorkspaceSvg | null;
    /** Inverted screen CTM, for use in mouseToSvg. */
    private inverseScreenCTM;
    /** Inverted screen CTM is dirty, recalculate it. */
    private inverseScreenCTMDirty;
    private metricsManager;
    /** @internal */
    getMetrics: () => Metrics;
    /** @internal */
    setMetrics: (p1: {
        x?: number;
        y?: number;
    }) => void;
    private readonly componentManager;
    /**
     * List of currently highlighted blocks.  Block highlighting is often used
     * to visually mark blocks currently being executed.
     */
    private readonly highlightedBlocks;
    private audioManager;
    private grid;
    private markerManager;
    /**
     * Map from function names to callbacks, for deciding what to do when a
     * custom toolbox category is opened.
     */
    private toolboxCategoryCallbacks;
    /**
     * Map from function names to callbacks, for deciding what to do when a
     * button is clicked.
     */
    private flyoutButtonCallbacks;
    protected themeManager_: ThemeManager;
    private readonly renderer;
    /** Cached parent SVG. */
    private cachedParentSvg;
    /** True if keyboard accessibility mode is on, false otherwise. */
    keyboardAccessibilityMode: boolean;
    /** The list of top-level bounded elements on the workspace. */
    private topBoundedElements;
    /** The recorded drag targets. */
    private dragTargetAreas;
    private readonly cachedParentSvgSize;
    svgGroup_: SVGElement;
    svgBackground_: SVGElement;
    svgBlockCanvas_: SVGElement;
    svgBubbleCanvas_: SVGElement;
    zoomControls_: ZoomControls | null;
    /**
     * @param options Dictionary of options.
     * @param opt_blockDragSurface Drag surface for blocks.
     * @param opt_wsDragSurface Drag surface for the workspace.
     */
    constructor(options: Options, opt_blockDragSurface?: BlockDragSurfaceSvg, opt_wsDragSurface?: WorkspaceDragSurfaceSvg);
    /**
     * Get the marker manager for this workspace.
     *
     * @returns The marker manager.
     */
    getMarkerManager(): MarkerManager;
    /**
     * Gets the metrics manager for this workspace.
     *
     * @returns The metrics manager.
     */
    getMetricsManager(): IMetricsManager;
    /**
     * Sets the metrics manager for the workspace.
     *
     * @param metricsManager The metrics manager.
     * @internal
     */
    setMetricsManager(metricsManager: IMetricsManager): void;
    /**
     * Gets the component manager for this workspace.
     *
     * @returns The component manager.
     */
    getComponentManager(): ComponentManager;
    /**
     * Add the cursor SVG to this workspaces SVG group.
     *
     * @param cursorSvg The SVG root of the cursor to be added to the workspace
     *     SVG group.
     * @internal
     */
    setCursorSvg(cursorSvg: SVGElement): void;
    /**
     * Add the marker SVG to this workspaces SVG group.
     *
     * @param markerSvg The SVG root of the marker to be added to the workspace
     *     SVG group.
     * @internal
     */
    setMarkerSvg(markerSvg: SVGElement): void;
    /**
     * Get the marker with the given ID.
     *
     * @param id The ID of the marker.
     * @returns The marker with the given ID or null if no marker with the given
     *     ID exists.
     * @internal
     */
    getMarker(id: string): Marker | null;
    /**
     * The cursor for this workspace.
     *
     * @returns The cursor for the workspace.
     */
    getCursor(): Cursor | null;
    /**
     * Get the block renderer attached to this workspace.
     *
     * @returns The renderer attached to this workspace.
     */
    getRenderer(): Renderer;
    /**
     * Get the theme manager for this workspace.
     *
     * @returns The theme manager for this workspace.
     * @internal
     */
    getThemeManager(): ThemeManager;
    /**
     * Get the workspace theme object.
     *
     * @returns The workspace theme object.
     */
    getTheme(): Theme;
    /**
     * Set the workspace theme object.
     * If no theme is passed, default to the `Classic` theme.
     *
     * @param theme The workspace theme object.
     */
    setTheme(theme: Theme): void;
    /**
     * Refresh all blocks on the workspace after a theme update.
     */
    refreshTheme(): void;
    /**
     * Updates all the blocks with new style.
     *
     * @param blocks List of blocks to update the style on.
     */
    private updateBlockStyles_;
    /**
     * Getter for the inverted screen CTM.
     *
     * @returns The matrix to use in mouseToSvg
     */
    getInverseScreenCTM(): SVGMatrix | null;
    /** Mark the inverse screen CTM as dirty. */
    updateInverseScreenCTM(): void;
    /**
     * Getter for isVisible
     *
     * @returns Whether the workspace is visible.
     *     False if the workspace has been hidden by calling `setVisible(false)`.
     */
    isVisible(): boolean;
    /**
     * Return the absolute coordinates of the top-left corner of this element,
     * scales that after canvas SVG element, if it's a descendant.
     * The origin (0,0) is the top-left corner of the Blockly SVG.
     *
     * @param element SVG element to find the coordinates of.
     * @returns Object with .x and .y properties.
     * @internal
     */
    getSvgXY(element: SVGElement): Coordinate;
    /**
     * Gets the size of the workspace's parent SVG element.
     *
     * @returns The cached width and height of the workspace's parent SVG element.
     * @internal
     */
    getCachedParentSvgSize(): Size;
    /**
     * Return the position of the workspace origin relative to the injection div
     * origin in pixels.
     * The workspace origin is where a block would render at position (0, 0).
     * It is not the upper left corner of the workspace SVG.
     *
     * @returns Offset in pixels.
     * @internal
     */
    getOriginOffsetInPixels(): Coordinate;
    /**
     * Return the injection div that is a parent of this workspace.
     * Walks the DOM the first time it's called, then returns a cached value.
     * Note: We assume this is only called after the workspace has been injected
     * into the DOM.
     *
     * @returns The first parent div with 'injectionDiv' in the name.
     * @internal
     */
    getInjectionDiv(): Element;
    /**
     * Get the SVG block canvas for the workspace.
     *
     * @returns The SVG group for the workspace.
     * @internal
     */
    getBlockCanvas(): SVGElement | null;
    /**
     * Save resize handler data so we can delete it later in dispose.
     *
     * @param handler Data that can be passed to eventHandling.unbind.
     */
    setResizeHandlerWrapper(handler: browserEvents.Data): void;
    /**
     * Create the workspace DOM elements.
     *
     * @param opt_backgroundClass Either 'blocklyMainBackground' or
     *     'blocklyMutatorBackground'.
     * @returns The workspace's SVG group.
     */
    createDom(opt_backgroundClass?: string): Element;
    /**
     * Dispose of this workspace.
     * Unlink from all DOM elements to prevent memory leaks.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
    /**
     * Add a trashcan.
     *
     * @internal
     */
    addTrashcan(): void;
    /**
     * @param _workspace
     * @internal
     */
    static newTrashcan(_workspace: WorkspaceSvg): Trashcan;
    /**
     * Add zoom controls.
     *
     * @internal
     */
    addZoomControls(): void;
    /**
     * Add a flyout element in an element with the given tag name.
     *
     * @param tagName What type of tag the flyout belongs in.
     * @returns The element containing the flyout DOM.
     * @internal
     */
    addFlyout(tagName: string | Svg<SVGSVGElement> | Svg<SVGGElement>): Element;
    /**
     * Getter for the flyout associated with this workspace.  This flyout may be
     * owned by either the toolbox or the workspace, depending on toolbox
     * configuration.  It will be null if there is no flyout.
     *
     * @param opt_own Whether to only return the workspace's own flyout.
     * @returns The flyout on this workspace.
     * @internal
     */
    getFlyout(opt_own?: boolean): IFlyout | null;
    /**
     * Getter for the toolbox associated with this workspace, if one exists.
     *
     * @returns The toolbox on this workspace.
     * @internal
     */
    getToolbox(): IToolbox | null;
    /**
     * Update items that use screen coordinate calculations
     * because something has changed (e.g. scroll position, window size).
     */
    private updateScreenCalculations_;
    /**
     * If enabled, resize the parts of the workspace that change when the
     * workspace contents (e.g. block positions) change.  This will also scroll
     * the workspace contents if needed.
     *
     * @internal
     */
    resizeContents(): void;
    /**
     * Resize and reposition all of the workspace chrome (toolbox,
     * trash, scrollbars etc.)
     * This should be called when something changes that
     * requires recalculating dimensions and positions of the
     * trash, zoom, toolbox, etc. (e.g. window resize).
     */
    resize(): void;
    /**
     * Resizes and repositions workspace chrome if the page has a new
     * scroll position.
     *
     * @internal
     */
    updateScreenCalculationsIfScrolled(): void;
    /**
     * Get the SVG element that forms the drawing surface.
     *
     * @returns SVG group element.
     */
    getCanvas(): SVGGElement;
    /**
     * Caches the width and height of the workspace's parent SVG element for use
     * with getSvgMetrics.
     *
     * @param width The width of the parent SVG element.
     * @param height The height of the parent SVG element
     * @internal
     */
    setCachedParentSvgSize(width: number | null, height: number | null): void;
    /**
     * Get the SVG element that forms the bubble surface.
     *
     * @returns SVG group element.
     */
    getBubbleCanvas(): SVGGElement;
    /**
     * Get the SVG element that contains this workspace.
     * Note: We assume this is only called after the workspace has been injected
     * into the DOM.
     *
     * @returns SVG element.
     */
    getParentSvg(): SVGSVGElement;
    /**
     * Fires a viewport event if events are enabled and there is a change in
     * viewport values.
     *
     * @internal
     */
    maybeFireViewportChangeEvent(): void;
    /**
     * Translate this workspace to new coordinates.
     *
     * @param x Horizontal translation, in pixel units relative to the top left of
     *     the Blockly div.
     * @param y Vertical translation, in pixel units relative to the top left of
     *     the Blockly div.
     */
    translate(x: number, y: number): void;
    /**
     * Called at the end of a workspace drag to take the contents
     * out of the drag surface and put them back into the workspace SVG.
     * Does nothing if the workspace drag surface is not enabled.
     *
     * @internal
     */
    resetDragSurface(): void;
    /**
     * Called at the beginning of a workspace drag to move contents of
     * the workspace to the drag surface.
     * Does nothing if the drag surface is not enabled.
     *
     * @internal
     */
    setupDragSurface(): void;
    /**
     * Gets the drag surface blocks are moved to when a drag is started.
     *
     * @returns This workspace's block drag surface, if one is in use.
     * @internal
     */
    getBlockDragSurface(): BlockDragSurfaceSvg | null;
    /**
     * Returns the horizontal offset of the workspace.
     * Intended for LTR/RTL compatibility in XML.
     *
     * @returns Width.
     */
    getWidth(): number;
    /**
     * Toggles the visibility of the workspace.
     * Currently only intended for main workspace.
     *
     * @param isVisible True if workspace should be visible.
     */
    setVisible(isVisible: boolean): void;
    /** Render all blocks in workspace. */
    render(): void;
    /**
     * Highlight or unhighlight a block in the workspace.  Block highlighting is
     * often used to visually mark blocks currently being executed.
     *
     * @param id ID of block to highlight/unhighlight, or null for no block (used
     *     to unhighlight all blocks).
     * @param opt_state If undefined, highlight specified block and automatically
     *     unhighlight all others.  If true or false, manually
     *     highlight/unhighlight the specified block.
     */
    highlightBlock(id: string | null, opt_state?: boolean): void;
    /**
     * Pastes the provided block or workspace comment onto the workspace.
     * Does not check whether there is remaining capacity for the object, that
     * should be done before calling this method.
     *
     * @param state The representation of the thing to paste.
     * @returns The pasted thing, or null if the paste was not successful.
     */
    paste(state: any | Element | DocumentFragment): ICopyable | null;
    /**
     * Paste the provided block onto the workspace.
     *
     * @param xmlBlock XML block element.
     * @param jsonBlock JSON block representation.
     * @returns The pasted block.
     */
    private pasteBlock_;
    /**
     * Paste the provided comment onto the workspace.
     *
     * @param xmlComment XML workspace comment element.
     * @returns The pasted workspace comment.
     * @suppress {checkTypes} Suppress checks while workspace comments are not
     * bundled in.
     */
    private pasteWorkspaceComment_;
    /**
     * Refresh the toolbox unless there's a drag in progress.
     *
     * @internal
     */
    refreshToolboxSelection(): void;
    /**
     * Rename a variable by updating its name in the variable map.  Update the
     *     flyout to show the renamed variable immediately.
     *
     * @param id ID of the variable to rename.
     * @param newName New variable name.
     */
    renameVariableById(id: string, newName: string): void;
    /**
     * Delete a variable by the passed in ID.   Update the flyout to show
     *     immediately that the variable is deleted.
     *
     * @param id ID of variable to delete.
     */
    deleteVariableById(id: string): void;
    /**
     * Create a new variable with the given name.  Update the flyout to show the
     *     new variable immediately.
     *
     * @param name The new variable's name.
     * @param opt_type The type of the variable like 'int' or 'string'.
     *     Does not need to be unique. Field_variable can filter variables based
     * on their type. This will default to '' which is a specific type.
     * @param opt_id The unique ID of the variable. This will default to a UUID.
     * @returns The newly created variable.
     */
    createVariable(name: string, opt_type?: string | null, opt_id?: string | null): VariableModel;
    /** Make a list of all the delete areas for this workspace. */
    recordDragTargets(): void;
    /**
     * Obtain a newly created block.
     *
     * @param prototypeName Name of the language object containing type-specific
     *     functions for this block.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     * @returns The created block.
     */
    newBlock(prototypeName: string, opt_id?: string): BlockSvg;
    /**
     * Returns the drag target the mouse event is over.
     *
     * @param e Mouse move event.
     * @returns Null if not over a drag target, or the drag target the event is
     *     over.
     */
    getDragTarget(e: Event): IDragTarget | null;
    /**
     * Handle a mouse-down on SVG drawing surface.
     *
     * @param e Mouse down event.
     */
    private onMouseDown_;
    /**
     * Start tracking a drag of an object on this workspace.
     *
     * @param e Mouse down event.
     * @param xy Starting location of object.
     */
    startDrag(e: MouseEvent, xy: Coordinate): void;
    /**
     * Track a drag of an object on this workspace.
     *
     * @param e Mouse move event.
     * @returns New location of object.
     */
    moveDrag(e: MouseEvent): Coordinate;
    /**
     * Is the user currently dragging a block or scrolling the flyout/workspace?
     *
     * @returns True if currently dragging or scrolling.
     */
    isDragging(): boolean;
    /**
     * Is this workspace draggable?
     *
     * @returns True if this workspace may be dragged.
     */
    isDraggable(): boolean;
    /**
     * Is this workspace movable?
     *
     * This means the user can reposition the X Y coordinates of the workspace
     * through input. This can be through scrollbars, scroll wheel, dragging, or
     * through zooming with the scroll wheel or pinch (since the zoom is centered
     * on the mouse position). This does not include zooming with the zoom
     * controls since the X Y coordinates are decided programmatically.
     *
     * @returns True if the workspace is movable, false otherwise.
     */
    isMovable(): boolean;
    /**
     * Is this workspace movable horizontally?
     *
     * @returns True if the workspace is movable horizontally, false otherwise.
     */
    isMovableHorizontally(): boolean;
    /**
     * Is this workspace movable vertically?
     *
     * @returns True if the workspace is movable vertically, false otherwise.
     */
    isMovableVertically(): boolean;
    /**
     * Handle a mouse-wheel on SVG drawing surface.
     *
     * @param e Mouse wheel event.
     */
    private onMouseWheel_;
    /**
     * Calculate the bounding box for the blocks on the workspace.
     * Coordinate system: workspace coordinates.
     *
     * @returns Contains the position and size of the bounding box containing the
     *     blocks on the workspace.
     */
    getBlocksBoundingBox(): Rect;
    /** Clean up the workspace by ordering all the blocks in a column. */
    cleanUp(): void;
    /**
     * Show the context menu for the workspace.
     *
     * @param e Mouse event.
     * @internal
     */
    showContextMenu(e: Event): void;
    /**
     * Modify the block tree on the existing toolbox.
     *
     * @param toolboxDef DOM tree of toolbox contents, string of toolbox contents,
     *     or JSON representing toolbox definition.
     */
    updateToolbox(toolboxDef: toolbox.ToolboxDefinition | null): void;
    /** Mark this workspace as the currently focused main workspace. */
    markFocused(): void;
    /** Set the workspace to have focus in the browser. */
    private setBrowserFocus;
    /**
     * Zooms the workspace in or out relative to/centered on the given (x, y)
     * coordinate.
     *
     * @param x X coordinate of center, in pixel units relative to the top-left
     *     corner of the parentSVG.
     * @param y Y coordinate of center, in pixel units relative to the top-left
     *     corner of the parentSVG.
     * @param amount Amount of zooming. The formula for the new scale is newScale
     *     = currentScale * (scaleSpeed^amount). scaleSpeed is set in the
     *     workspace options. Negative amount values zoom out, and positive amount
     *     values zoom in.
     */
    zoom(x: number, y: number, amount: number): void;
    /**
     * Zooming the blocks centered in the center of view with zooming in or out.
     *
     * @param type Type of zooming (-1 zooming out and 1 zooming in).
     */
    zoomCenter(type: number): void;
    /** Zoom the blocks to fit in the workspace if possible. */
    zoomToFit(): void;
    /**
     * Add a transition class to the block and bubble canvas, to animate any
     * transform changes.
     *
     * @internal
     */
    beginCanvasTransition(): void;
    /**
     * Remove transition class from the block and bubble canvas.
     *
     * @internal
     */
    endCanvasTransition(): void;
    /** Center the workspace. */
    scrollCenter(): void;
    /**
     * Scroll the workspace to center on the given block. If the block has other
     * blocks stacked below it, the workspace will be centered on the stack.
     *
     * @param id ID of block center on.
     */
    centerOnBlock(id: string | null): void;
    /**
     * Set the workspace's zoom factor.
     *
     * @param newScale Zoom factor. Units: (pixels / workspaceUnit).
     */
    setScale(newScale: number): void;
    /**
     * Get the workspace's zoom factor.  If the workspace has a parent, we call
     * into the parent to get the workspace scale.
     *
     * @returns The workspace zoom factor. Units: (pixels / workspaceUnit).
     */
    getScale(): number;
    /**
     * Scroll the workspace to a specified offset (in pixels), keeping in the
     * workspace bounds. See comment on workspaceSvg.scrollX for more detail on
     * the meaning of these values.
     *
     * @param x Target X to scroll to.
     * @param y Target Y to scroll to.
     * @internal
     */
    scroll(x: number, y: number): void;
    /**
     * Find the block on this workspace with the specified ID.
     *
     * @param id ID of block to find.
     * @returns The sought after block, or null if not found.
     */
    getBlockById(id: string): BlockSvg | null;
    /**
     * Find all blocks in workspace.  Blocks are optionally sorted
     * by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param ordered Sort the list if true.
     * @returns Array of blocks.
     */
    getAllBlocks(ordered: boolean): BlockSvg[];
    /**
     * Finds the top-level blocks and returns them.  Blocks are optionally sorted
     * by position; top to bottom (with slight LTR or RTL bias).
     *
     * @param ordered Sort the list if true.
     * @returns The top-level block objects.
     */
    getTopBlocks(ordered: boolean): BlockSvg[];
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
     * Adds a comment to the list of top comments.
     *
     * @param comment comment to add.
     */
    addTopComment(comment: WorkspaceComment): void;
    /**
     * Removes a comment from the list of top comments.
     *
     * @param comment comment to remove.
     */
    removeTopComment(comment: WorkspaceComment): void;
    /**
     * Adds a bounded element to the list of top bounded elements.
     *
     * @param element Bounded element to add.
     */
    addTopBoundedElement(element: IBoundedElement): void;
    /**
     * Removes a bounded element from the list of top bounded elements.
     *
     * @param element Bounded element to remove.
     */
    removeTopBoundedElement(element: IBoundedElement): void;
    /**
     * Finds the top-level bounded elements and returns them.
     *
     * @returns The top-level bounded elements.
     */
    getTopBoundedElements(): IBoundedElement[];
    /**
     * Update whether this workspace has resizes enabled.
     * If enabled, workspace will resize when appropriate.
     * If disabled, workspace will not resize until re-enabled.
     * Use to avoid resizing during a batch operation, for performance.
     *
     * @param enabled Whether resizes should be enabled.
     */
    setResizesEnabled(enabled: boolean): void;
    /**
     * Dispose of all blocks in workspace, with an optimization to prevent
     * resizes.
     */
    clear(): void;
    /**
     * Register a callback function associated with a given key, for clicks on
     * buttons and labels in the flyout.
     * For instance, a button specified by the XML
     * <button text="create variable" callbackKey="CREATE_VARIABLE"></button>
     * should be matched by a call to
     * registerButtonCallback("CREATE_VARIABLE", yourCallbackFunction).
     *
     * @param key The name to use to look up this function.
     * @param func The function to call when the given button is clicked.
     */
    registerButtonCallback(key: string, func: (p1: FlyoutButton) => void): void;
    /**
     * Get the callback function associated with a given key, for clicks on
     * buttons and labels in the flyout.
     *
     * @param key The name to use to look up the function.
     * @returns The function corresponding to the given key for this workspace;
     *     null if no callback is registered.
     */
    getButtonCallback(key: string): ((p1: FlyoutButton) => void) | null;
    /**
     * Remove a callback for a click on a button in the flyout.
     *
     * @param key The name associated with the callback function.
     */
    removeButtonCallback(key: string): void;
    /**
     * Register a callback function associated with a given key, for populating
     * custom toolbox categories in this workspace.  See the variable and
     * procedure categories as an example.
     *
     * @param key The name to use to look up this function.
     * @param func The function to call when the given toolbox category is opened.
     */
    registerToolboxCategoryCallback(key: string, func: (p1: WorkspaceSvg) => toolbox.FlyoutDefinition): void;
    /**
     * Get the callback function associated with a given key, for populating
     * custom toolbox categories in this workspace.
     *
     * @param key The name to use to look up the function.
     * @returns The function corresponding to the given key for this workspace, or
     *     null if no function is registered.
     */
    getToolboxCategoryCallback(key: string): ((p1: WorkspaceSvg) => toolbox.FlyoutDefinition) | null;
    /**
     * Remove a callback for a click on a custom category's name in the toolbox.
     *
     * @param key The name associated with the callback function.
     */
    removeToolboxCategoryCallback(key: string): void;
    /**
     * Look up the gesture that is tracking this touch stream on this workspace.
     * May create a new gesture.
     *
     * @param e Mouse event or touch event.
     * @returns The gesture that is tracking this touch stream, or null if no
     *     valid gesture exists.
     * @internal
     */
    getGesture(e: Event): TouchGesture | null;
    /**
     * Clear the reference to the current gesture.
     *
     * @internal
     */
    clearGesture(): void;
    /**
     * Cancel the current gesture, if one exists.
     *
     * @internal
     */
    cancelCurrentGesture(): void;
    /**
     * Get the audio manager for this workspace.
     *
     * @returns The audio manager for this workspace.
     */
    getAudioManager(): WorkspaceAudio;
    /**
     * Get the grid object for this workspace, or null if there is none.
     *
     * @returns The grid object for this workspace.
     * @internal
     */
    getGrid(): Grid | null;
    /**
     * Close tooltips, context menus, dropdown selections, etc.
     *
     * @param opt_onlyClosePopups Whether only popups should be closed.
     */
    hideChaff(opt_onlyClosePopups?: boolean): void;
    /**
     * Sets the X/Y translations of a top level workspace.
     *
     * @param xyRatio Contains an x and/or y property which is a float between 0
     *     and 1 specifying the degree of scrolling.
     */
    private static setTopLevelWorkspaceMetrics_;
}
/**
 * Size the workspace when the contents change.  This also updates
 * scrollbars accordingly.
 *
 * @param workspace The workspace to resize.
 * @alias Blockly.WorkspaceSvg.resizeSvgContents
 * @internal
 */
export declare function resizeSvgContents(workspace: WorkspaceSvg): void;
//# sourceMappingURL=workspace_svg.d.ts.map