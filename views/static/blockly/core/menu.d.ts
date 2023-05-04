/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { MenuItem } from './menuitem.js';
import * as aria from './utils/aria.js';
import { Coordinate } from './utils/coordinate.js';
import type { Size } from './utils/size.js';
/**
 * A basic menu class.
 *
 * @alias Blockly.Menu
 */
export declare class Menu {
    /**
     * Array of menu items.
     * (Nulls are never in the array, but typing the array as nullable prevents
     * the compiler from objecting to .indexOf(null))
     */
    private readonly menuItems;
    /**
     * Coordinates of the mousedown event that caused this menu to open. Used to
     * prevent the consequent mouseup event due to a simple click from
     * activating a menu item immediately.
     */
    openingCoords: Coordinate | null;
    /**
     * This is the element that we will listen to the real focus events on.
     * A value of null means no menu item is highlighted.
     */
    private highlightedItem;
    /** Mouse over event data. */
    private mouseOverHandler;
    /** Click event data. */
    private clickHandler;
    /** Mouse enter event data. */
    private mouseEnterHandler;
    /** Mouse leave event data. */
    private mouseLeaveHandler;
    /** Key down event data. */
    private onKeyDownHandler;
    /** The menu's root DOM element. */
    private element;
    /** ARIA name for this menu. */
    private roleName;
    /** Constructs a new Menu instance. */
    constructor();
    /**
     * Add a new menu item to the bottom of this menu.
     *
     * @param menuItem Menu item to append.
     * @internal
     */
    addChild(menuItem: MenuItem): void;
    /**
     * Creates the menu DOM.
     *
     * @param container Element upon which to append this menu.
     * @returns The menu's root DOM element.
     */
    render(container: Element): HTMLDivElement;
    /**
     * Gets the menu's element.
     *
     * @returns The DOM element.
     * @internal
     */
    getElement(): HTMLDivElement | null;
    /**
     * Focus the menu element.
     *
     * @internal
     */
    focus(): void;
    /** Blur the menu element. */
    private blur;
    /**
     * Set the menu accessibility role.
     *
     * @param roleName role name.
     * @internal
     */
    setRole(roleName: aria.Role): void;
    /** Dispose of this menu. */
    dispose(): void;
    /**
     * Returns the child menu item that owns the given DOM element,
     * or null if no such menu item is found.
     *
     * @param elem DOM element whose owner is to be returned.
     * @returns Menu item for which the DOM element belongs to.
     */
    private getMenuItem;
    /**
     * Highlights the given menu item, or clears highlighting if null.
     *
     * @param item Item to highlight, or null.
     * @internal
     */
    setHighlighted(item: MenuItem | null): void;
    /**
     * Highlights the next highlightable item (or the first if nothing is
     * currently highlighted).
     *
     * @internal
     */
    highlightNext(): void;
    /**
     * Highlights the previous highlightable item (or the last if nothing is
     * currently highlighted).
     *
     * @internal
     */
    highlightPrevious(): void;
    /** Highlights the first highlightable item. */
    private highlightFirst;
    /** Highlights the last highlightable item. */
    private highlightLast;
    /**
     * Helper function that manages the details of moving the highlight among
     * child menuitems in response to keyboard events.
     *
     * @param startIndex Start index.
     * @param delta Step direction: 1 to go down, -1 to go up.
     */
    private highlightHelper;
    /**
     * Handles mouseover events. Highlight menuitems as the user hovers over them.
     *
     * @param e Mouse event to handle.
     */
    private handleMouseOver;
    /**
     * Handles click events. Pass the event onto the child menuitem to handle.
     *
     * @param e Click event to handle.
     */
    private handleClick;
    /**
     * Handles mouse enter events. Focus the element.
     *
     * @param _e Mouse event to handle.
     */
    private handleMouseEnter;
    /**
     * Handles mouse leave events. Blur and clear highlight.
     *
     * @param _e Mouse event to handle.
     */
    private handleMouseLeave;
    /**
     * Attempts to handle a keyboard event, if the menu item is enabled, by
     * calling
     * {@link Menu#handleKeyEventInternal_}.
     *
     * @param e Key event to handle.
     */
    private handleKeyEvent;
    /**
     * Get the size of a rendered menu.
     *
     * @returns Object with width and height properties.
     * @internal
     */
    getSize(): Size;
}
//# sourceMappingURL=menu.d.ts.map