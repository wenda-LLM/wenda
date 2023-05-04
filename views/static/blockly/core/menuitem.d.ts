/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as aria from './utils/aria.js';
/**
 * Class representing an item in a menu.
 *
 * @alias Blockly.MenuItem
 */
export declare class MenuItem {
    private readonly content;
    private readonly opt_value?;
    /** Is the menu item clickable, as opposed to greyed-out. */
    private enabled;
    /** The DOM element for the menu item. */
    private element;
    /** Whether the menu item is rendered right-to-left. */
    private rightToLeft;
    /** ARIA name for this menu. */
    private roleName;
    /** Is this menu item checkable. */
    private checkable;
    /** Is this menu item currently checked. */
    private checked;
    /** Is this menu item currently highlighted. */
    private highlight;
    /** Bound function to call when this menu item is clicked. */
    private actionHandler;
    /**
     * @param content Text caption to display as the content of the item, or a
     *     HTML element to display.
     * @param opt_value Data/model associated with the menu item.
     */
    constructor(content: string | HTMLElement, opt_value?: string | undefined);
    /**
     * Creates the menuitem's DOM.
     *
     * @returns Completed DOM.
     */
    createDom(): Element;
    /** Dispose of this menu item. */
    dispose(): void;
    /**
     * Gets the menu item's element.
     *
     * @returns The DOM element.
     * @internal
     */
    getElement(): Element | null;
    /**
     * Gets the unique ID for this menu item.
     *
     * @returns Unique component ID.
     * @internal
     */
    getId(): string;
    /**
     * Gets the value associated with the menu item.
     *
     * @returns value Value associated with the menu item.
     * @internal
     */
    getValue(): string | null;
    /**
     * Set menu item's rendering direction.
     *
     * @param rtl True if RTL, false if LTR.
     * @internal
     */
    setRightToLeft(rtl: boolean): void;
    /**
     * Set the menu item's accessibility role.
     *
     * @param roleName Role name.
     * @internal
     */
    setRole(roleName: aria.Role): void;
    /**
     * Sets the menu item to be checkable or not. Set to true for menu items
     * that represent checkable options.
     *
     * @param checkable Whether the menu item is checkable.
     * @internal
     */
    setCheckable(checkable: boolean): void;
    /**
     * Checks or unchecks the component.
     *
     * @param checked Whether to check or uncheck the component.
     * @internal
     */
    setChecked(checked: boolean): void;
    /**
     * Highlights or unhighlights the component.
     *
     * @param highlight Whether to highlight or unhighlight the component.
     * @internal
     */
    setHighlighted(highlight: boolean): void;
    /**
     * Returns true if the menu item is enabled, false otherwise.
     *
     * @returns Whether the menu item is enabled.
     * @internal
     */
    isEnabled(): boolean;
    /**
     * Enables or disables the menu item.
     *
     * @param enabled Whether to enable or disable the menu item.
     * @internal
     */
    setEnabled(enabled: boolean): void;
    /**
     * Performs the appropriate action when the menu item is activated
     * by the user.
     *
     * @internal
     */
    performAction(): void;
    /**
     * Set the handler that's called when the menu item is activated by the user.
     * `obj` will be used as the 'this' object in the function when called.
     *
     * @param fn The handler.
     * @param obj Used as the 'this' object in fn when called.
     * @internal
     */
    onAction(fn: (p1: MenuItem) => void, obj: object): void;
}
//# sourceMappingURL=menuitem.d.ts.map