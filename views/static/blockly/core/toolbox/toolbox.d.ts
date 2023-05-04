/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../events/events_toolbox_item_select.js';
import * as browserEvents from '../browser_events.js';
import { DeleteArea } from '../delete_area.js';
import type { IAutoHideable } from '../interfaces/i_autohideable.js';
import type { IDraggable } from '../interfaces/i_draggable.js';
import type { IFlyout } from '../interfaces/i_flyout.js';
import type { IKeyboardAccessible } from '../interfaces/i_keyboard_accessible.js';
import type { ISelectableToolboxItem } from '../interfaces/i_selectable_toolbox_item.js';
import type { IStyleable } from '../interfaces/i_styleable.js';
import type { IToolbox } from '../interfaces/i_toolbox.js';
import type { IToolboxItem } from '../interfaces/i_toolbox_item.js';
import type { KeyboardShortcut } from '../shortcut_registry.js';
import { Rect } from '../utils/rect.js';
import * as toolbox from '../utils/toolbox.js';
import type { WorkspaceSvg } from '../workspace_svg.js';
/**
 * Class for a Toolbox.
 * Creates the toolbox's DOM.
 *
 * @alias Blockly.Toolbox
 */
export declare class Toolbox extends DeleteArea implements IAutoHideable, IKeyboardAccessible, IStyleable, IToolbox {
    /**
     * The unique ID for this component that is used to register with the
     * ComponentManager.
     */
    id: string;
    protected toolboxDef_: toolbox.ToolboxInfo;
    private readonly horizontalLayout_;
    /** The html container for the toolbox. */
    HtmlDiv: HTMLDivElement | null;
    /** The html container for the contents of a toolbox. */
    protected contentsDiv_: HTMLDivElement | null;
    /** Whether the Toolbox is visible. */
    protected isVisible_: boolean;
    /** The list of items in the toolbox. */
    protected contents_: IToolboxItem[];
    /** The width of the toolbox. */
    protected width_: number;
    /** The height of the toolbox. */
    protected height_: number;
    RTL: boolean;
    /** The flyout for the toolbox. */
    private flyout_;
    protected contentMap_: {
        [key: string]: IToolboxItem;
    };
    toolboxPosition: toolbox.Position;
    /** The currently selected item. */
    protected selectedItem_: ISelectableToolboxItem | null;
    /** The previously selected item. */
    protected previouslySelectedItem_: ISelectableToolboxItem | null;
    /**
     * Array holding info needed to unbind event handlers.
     * Used for disposing.
     * Ex: [[node, name, func], [node, name, func]].
     */
    protected boundEvents_: browserEvents.Data[];
    wouldDelete_: any;
    /** The workspace this toolbox is on. */
    protected readonly workspace_: WorkspaceSvg;
    /** @param workspace The workspace in which to create new blocks. */
    constructor(workspace: WorkspaceSvg);
    /**
     * Handles the given keyboard shortcut.
     *
     * @param _shortcut The shortcut to be handled.
     * @returns True if the shortcut has been handled, false otherwise.
     */
    onShortcut(_shortcut: KeyboardShortcut): boolean;
    /** Initializes the toolbox */
    init(): void;
    /**
     * Creates the DOM for the toolbox.
     *
     * @param workspace The workspace this toolbox is on.
     * @returns The HTML container for the toolbox.
     */
    protected createDom_(workspace: WorkspaceSvg): HTMLDivElement;
    /**
     * Creates the container div for the toolbox.
     *
     * @returns The HTML container for the toolbox.
     */
    protected createContainer_(): HTMLDivElement;
    /**
     * Creates the container for all the contents in the toolbox.
     *
     * @returns The HTML container for the toolbox contents.
     */
    protected createContentsContainer_(): HTMLDivElement;
    /**
     * Adds event listeners to the toolbox container div.
     *
     * @param container The HTML container for the toolbox.
     * @param contentsContainer The HTML container for the contents of the
     *     toolbox.
     */
    protected attachEvents_(container: HTMLDivElement, contentsContainer: HTMLDivElement): void;
    /**
     * Handles on click events for when the toolbox or toolbox items are clicked.
     *
     * @param e Click event to handle.
     */
    protected onClick_(e: MouseEvent): void;
    /**
     * Handles key down events for the toolbox.
     *
     * @param e The key down event.
     */
    protected onKeyDown_(e: KeyboardEvent): void;
    /**
     * Creates the flyout based on the toolbox layout.
     *
     * @returns The flyout for the toolbox.
     * @throws {Error} If missing a require for `Blockly.HorizontalFlyout`,
     *     `Blockly.VerticalFlyout`, and no flyout plugin is specified.
     */
    protected createFlyout_(): IFlyout;
    /**
     * Fills the toolbox with new toolbox items and removes any old contents.
     *
     * @param toolboxDef Object holding information for creating a toolbox.
     * @internal
     */
    render(toolboxDef: toolbox.ToolboxInfo): void;
    /**
     * Adds all the toolbox items to the toolbox.
     *
     * @param toolboxDef Array holding objects containing information on the
     *     contents of the toolbox.
     */
    protected renderContents_(toolboxDef: toolbox.ToolboxItemInfo[]): void;
    /**
     * Creates and renders the toolbox item.
     *
     * @param toolboxItemDef Any information that can be used to create an item in
     *     the toolbox.
     * @param fragment The document fragment to add the child toolbox elements to.
     */
    private createToolboxItem_;
    /**
     * Adds an item to the toolbox.
     *
     * @param toolboxItem The item in the toolbox.
     */
    protected addToolboxItem_(toolboxItem: IToolboxItem): void;
    /**
     * Gets the items in the toolbox.
     *
     * @returns The list of items in the toolbox.
     */
    getToolboxItems(): IToolboxItem[];
    /**
     * Adds a style on the toolbox. Usually used to change the cursor.
     *
     * @param style The name of the class to add.
     * @internal
     */
    addStyle(style: string): void;
    /**
     * Removes a style from the toolbox. Usually used to change the cursor.
     *
     * @param style The name of the class to remove.
     * @internal
     */
    removeStyle(style: string): void;
    /**
     * Returns the bounding rectangle of the drag target area in pixel units
     * relative to viewport.
     *
     * @returns The component's bounding box. Null if drag target area should be
     *     ignored.
     */
    getClientRect(): Rect | null;
    /**
     * Returns whether the provided block or bubble would be deleted if dropped on
     * this area.
     * This method should check if the element is deletable and is always called
     * before onDragEnter/onDragOver/onDragExit.
     *
     * @param element The block or bubble currently being dragged.
     * @param _couldConnect Whether the element could could connect to another.
     * @returns Whether the element provided would be deleted if dropped on this
     *     area.
     */
    wouldDelete(element: IDraggable, _couldConnect: boolean): boolean;
    /**
     * Handles when a cursor with a block or bubble enters this drag target.
     *
     * @param _dragElement The block or bubble currently being dragged.
     */
    onDragEnter(_dragElement: IDraggable): void;
    /**
     * Handles when a cursor with a block or bubble exits this drag target.
     *
     * @param _dragElement The block or bubble currently being dragged.
     */
    onDragExit(_dragElement: IDraggable): void;
    /**
     * Handles when a block or bubble is dropped on this component.
     * Should not handle delete here.
     *
     * @param _dragElement The block or bubble currently being dragged.
     */
    onDrop(_dragElement: IDraggable): void;
    /**
     * Updates the internal wouldDelete_ state.
     *
     * @param wouldDelete The new value for the wouldDelete state.
     */
    protected updateWouldDelete_(wouldDelete: boolean): void;
    /**
     * Adds or removes the CSS style of the cursor over the toolbox based whether
     * the block or bubble over it is expected to be deleted if dropped (using the
     * internal this.wouldDelete_ property).
     *
     * @param addStyle Whether the style should be added or removed.
     */
    protected updateCursorDeleteStyle_(addStyle: boolean): void;
    /**
     * Gets the toolbox item with the given ID.
     *
     * @param id The ID of the toolbox item.
     * @returns The toolbox item with the given ID, or null if no item exists.
     */
    getToolboxItemById(id: string): IToolboxItem | null;
    /**
     * Gets the width of the toolbox.
     *
     * @returns The width of the toolbox.
     */
    getWidth(): number;
    /**
     * Gets the height of the toolbox.
     *
     * @returns The width of the toolbox.
     */
    getHeight(): number;
    /**
     * Gets the toolbox flyout.
     *
     * @returns The toolbox flyout.
     */
    getFlyout(): IFlyout | null;
    /**
     * Gets the workspace for the toolbox.
     *
     * @returns The parent workspace for the toolbox.
     */
    getWorkspace(): WorkspaceSvg;
    /**
     * Gets the selected item.
     *
     * @returns The selected item, or null if no item is currently selected.
     */
    getSelectedItem(): ISelectableToolboxItem | null;
    /**
     * Gets the previously selected item.
     *
     * @returns The previously selected item, or null if no item was previously
     *     selected.
     */
    getPreviouslySelectedItem(): ISelectableToolboxItem | null;
    /**
     * Gets whether or not the toolbox is horizontal.
     *
     * @returns True if the toolbox is horizontal, false if the toolbox is
     *     vertical.
     */
    isHorizontal(): boolean;
    /**
     * Positions the toolbox based on whether it is a horizontal toolbox and
     * whether the workspace is in rtl.
     */
    position(): void;
    /**
     * Handles resizing the toolbox when a toolbox item resizes.
     *
     * @internal
     */
    handleToolboxItemResize(): void;
    /** Unhighlights any previously selected item. */
    clearSelection(): void;
    /**
     * Updates the category colours and background colour of selected categories.
     *
     * @internal
     */
    refreshTheme(): void;
    /**
     * Updates the flyout's content without closing it.  Should be used in
     * response to a change in one of the dynamic categories, such as variables or
     * procedures.
     */
    refreshSelection(): void;
    /**
     * Shows or hides the toolbox.
     *
     * @param isVisible True if toolbox should be visible.
     */
    setVisible(isVisible: boolean): void;
    /**
     * Hides the component. Called in WorkspaceSvg.hideChaff.
     *
     * @param onlyClosePopups Whether only popups should be closed.
     *     Flyouts should not be closed if this is true.
     */
    autoHide(onlyClosePopups: boolean): void;
    /**
     * Sets the given item as selected.
     * No-op if the item is not selectable.
     *
     * @param newItem The toolbox item to select.
     */
    setSelectedItem(newItem: IToolboxItem | null): void;
    /**
     * Decides whether the old item should be deselected.
     *
     * @param oldItem The previously selected toolbox item.
     * @param newItem The newly selected toolbox item.
     * @returns True if the old item should be deselected, false otherwise.
     */
    protected shouldDeselectItem_(oldItem: ISelectableToolboxItem | null, newItem: ISelectableToolboxItem | null): boolean;
    /**
     * Decides whether the new item should be selected.
     *
     * @param oldItem The previously selected toolbox item.
     * @param newItem The newly selected toolbox item.
     * @returns True if the new item should be selected, false otherwise.
     */
    protected shouldSelectItem_(oldItem: ISelectableToolboxItem | null, newItem: ISelectableToolboxItem | null): boolean;
    /**
     * Deselects the given item, marks it as unselected, and updates aria state.
     *
     * @param item The previously selected toolbox item which should be
     *     deselected.
     */
    protected deselectItem_(item: ISelectableToolboxItem): void;
    /**
     * Selects the given item, marks it selected, and updates aria state.
     *
     * @param oldItem The previously selected toolbox item.
     * @param newItem The newly selected toolbox item.
     */
    protected selectItem_(oldItem: ISelectableToolboxItem | null, newItem: ISelectableToolboxItem): void;
    /**
     * Selects the toolbox item by its position in the list of toolbox items.
     *
     * @param position The position of the item to select.
     */
    selectItemByPosition(position: number): void;
    /**
     * Decides whether to hide or show the flyout depending on the selected item.
     *
     * @param oldItem The previously selected toolbox item.
     * @param newItem The newly selected toolbox item.
     */
    protected updateFlyout_(oldItem: ISelectableToolboxItem | null, newItem: ISelectableToolboxItem | null): void;
    /**
     * Emits an event when a new toolbox item is selected.
     *
     * @param oldItem The previously selected toolbox item.
     * @param newItem The newly selected toolbox item.
     */
    private fireSelectEvent_;
    /**
     * Closes the current item if it is expanded, or selects the parent.
     *
     * @returns True if a parent category was selected, false otherwise.
     */
    private selectParent_;
    /**
     * Selects the first child of the currently selected item, or nothing if the
     * toolbox item has no children.
     *
     * @returns True if a child category was selected, false otherwise.
     */
    private selectChild_;
    /**
     * Selects the next visible toolbox item.
     *
     * @returns True if a next category was selected, false otherwise.
     */
    private selectNext_;
    /**
     * Selects the previous visible toolbox item.
     *
     * @returns True if a previous category was selected, false otherwise.
     */
    private selectPrevious_;
    /** Disposes of this toolbox. */
    dispose(): void;
}
//# sourceMappingURL=toolbox.d.ts.map