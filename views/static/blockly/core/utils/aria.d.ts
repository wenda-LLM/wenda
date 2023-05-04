/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * ARIA role values.
 * Copied from Closure's goog.a11y.aria.Role
 *
 * @alias Blockly.utils.aria.Role
 */
export declare enum Role {
    GRID = "grid",
    GRIDCELL = "gridcell",
    GROUP = "group",
    LISTBOX = "listbox",
    MENU = "menu",
    MENUITEM = "menuitem",
    MENUITEMCHECKBOX = "menuitemcheckbox",
    OPTION = "option",
    PRESENTATION = "presentation",
    ROW = "row",
    TREE = "tree",
    TREEITEM = "treeitem"
}
/**
 * ARIA states and properties.
 * Copied from Closure's goog.a11y.aria.State
 *
 * @alias Blockly.utils.aria.State
 */
export declare enum State {
    ACTIVEDESCENDANT = "activedescendant",
    COLCOUNT = "colcount",
    DISABLED = "disabled",
    EXPANDED = "expanded",
    INVALID = "invalid",
    LABEL = "label",
    LABELLEDBY = "labelledby",
    LEVEL = "level",
    ORIENTATION = "orientation",
    POSINSET = "posinset",
    ROWCOUNT = "rowcount",
    SELECTED = "selected",
    SETSIZE = "setsize",
    VALUEMAX = "valuemax",
    VALUEMIN = "valuemin"
}
/**
 * Sets the role of an element.
 *
 * Similar to Closure's goog.a11y.aria
 *
 * @param element DOM node to set role of.
 * @param roleName Role name.
 * @alias Blockly.utils.aria.setRole
 */
export declare function setRole(element: Element, roleName: Role): void;
/**
 * Sets the state or property of an element.
 * Copied from Closure's goog.a11y.aria
 *
 * @param element DOM node where we set state.
 * @param stateName State attribute being set.
 *     Automatically adds prefix 'aria-' to the state name if the attribute is
 * not an extra attribute.
 * @param value Value for the state attribute.
 * @alias Blockly.utils.aria.setState
 */
export declare function setState(element: Element, stateName: State, value: string | boolean | number | string[]): void;
//# sourceMappingURL=aria.d.ts.map