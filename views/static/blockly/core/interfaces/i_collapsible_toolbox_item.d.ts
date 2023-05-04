/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ISelectableToolboxItem } from './i_selectable_toolbox_item.js';
import type { IToolboxItem } from './i_toolbox_item.js';
/**
 * Interface for an item in the toolbox that can be collapsed.
 *
 * @alias Blockly.ICollapsibleToolboxItem
 */
export interface ICollapsibleToolboxItem extends ISelectableToolboxItem {
    /**
     * Gets any children toolbox items. (ex. Gets the subcategories)
     *
     * @returns The child toolbox items.
     */
    getChildToolboxItems(): IToolboxItem[];
    /**
     * Whether the toolbox item is expanded to show its child subcategories.
     *
     * @returns True if the toolbox item shows its children, false if it is
     *     collapsed.
     */
    isExpanded(): boolean;
    /** Toggles whether or not the toolbox item is expanded. */
    toggleExpanded(): void;
}
//# sourceMappingURL=i_collapsible_toolbox_item.d.ts.map