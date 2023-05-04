/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConnectionState } from '../serialization/blocks.js';
import type { CssConfig as CategoryCssConfig } from '../toolbox/category.js';
import type { CssConfig as SeparatorCssConfig } from '../toolbox/separator.js';
/**
 * The information needed to create a block in the toolbox.
 * Note that disabled has a different type for backwards compatibility.
 *
 * @alias Blockly.utils.toolbox.BlockInfo
 */
export interface BlockInfo {
    kind: string;
    blockxml?: string | Node;
    type?: string;
    gap?: string | number;
    disabled?: string | boolean;
    enabled?: boolean;
    id?: string;
    x?: number;
    y?: number;
    collapsed?: boolean;
    inline?: boolean;
    data?: string;
    extraState?: any;
    icons?: {
        [key: string]: any;
    };
    fields?: {
        [key: string]: any;
    };
    inputs?: {
        [key: string]: ConnectionState;
    };
    next?: ConnectionState;
}
/**
 * The information needed to create a separator in the toolbox.
 *
 * @alias Blockly.utils.toolbox.SeparatorInfo
 */
export interface SeparatorInfo {
    kind: string;
    id: string | undefined;
    gap: number | undefined;
    cssconfig: SeparatorCssConfig | undefined;
}
/**
 * The information needed to create a button in the toolbox.
 *
 * @alias Blockly.utils.toolbox.ButtonInfo
 */
export interface ButtonInfo {
    kind: string;
    text: string;
    callbackkey: string;
}
/**
 * The information needed to create a label in the toolbox.
 *
 * @alias Blockly.utils.toolbox.LabelInfo
 */
export interface LabelInfo {
    kind: string;
    text: string;
    id: string | undefined;
}
/**
 * The information needed to create either a button or a label in the flyout.
 *
 * @alias Blockly.utils.toolbox.ButtonOrLabelInfo
 */
export declare type ButtonOrLabelInfo = ButtonInfo | LabelInfo;
/**
 * The information needed to create a category in the toolbox.
 *
 * @alias Blockly.utils.toolbox.StaticCategoryInfo
 */
export interface StaticCategoryInfo {
    kind: string;
    name: string;
    contents: ToolboxItemInfo[];
    id: string | undefined;
    categorystyle: string | undefined;
    colour: string | undefined;
    cssconfig: CategoryCssConfig | undefined;
    hidden: string | undefined;
}
/**
 * The information needed to create a custom category.
 *
 * @alias Blockly.utils.toolbox.DynamicCategoryInfo
 */
export interface DynamicCategoryInfo {
    kind: string;
    custom: string;
    id: string | undefined;
    categorystyle: string | undefined;
    colour: string | undefined;
    cssconfig: CategoryCssConfig | undefined;
    hidden: string | undefined;
}
/**
 * The information needed to create either a dynamic or static category.
 *
 * @alias Blockly.utils.toolbox.CategoryInfo
 */
export declare type CategoryInfo = StaticCategoryInfo | DynamicCategoryInfo;
/**
 * Any information that can be used to create an item in the toolbox.
 *
 * @alias Blockly.utils.toolbox.ToolboxItemInfo
 */
export declare type ToolboxItemInfo = FlyoutItemInfo | StaticCategoryInfo;
/**
 * All the different types that can be displayed in a flyout.
 *
 * @alias Blockly.utils.toolbox.FlyoutItemInfo
 */
export declare type FlyoutItemInfo = BlockInfo | SeparatorInfo | ButtonInfo | LabelInfo | DynamicCategoryInfo;
/**
 * The JSON definition of a toolbox.
 *
 * @alias Blockly.utils.toolbox.ToolboxInfo
 */
export interface ToolboxInfo {
    kind?: string;
    contents: ToolboxItemInfo[];
}
/**
 * An array holding flyout items.
 *
 * @alias Blockly.utils.toolbox.FlyoutItemInfoArray
 */
export declare type FlyoutItemInfoArray = FlyoutItemInfo[];
/**
 * All of the different types that can create a toolbox.
 *
 * @alias Blockly.utils.toolbox.ToolboxDefinition
 */
export declare type ToolboxDefinition = Node | ToolboxInfo | string;
/**
 * All of the different types that can be used to show items in a flyout.
 *
 * @alias Blockly.utils.toolbox.FlyoutDefinition
 */
export declare type FlyoutDefinition = FlyoutItemInfoArray | NodeList | ToolboxInfo | Node[];
/**
 * Position of the toolbox and/or flyout relative to the workspace.
 *
 * @alias Blockly.utils.toolbox.Position
 */
export declare enum Position {
    TOP = 0,
    BOTTOM = 1,
    LEFT = 2,
    RIGHT = 3
}
/**
 * Converts the toolbox definition into toolbox JSON.
 *
 * @param toolboxDef The definition of the toolbox in one of its many forms.
 * @returns Object holding information for creating a toolbox.
 * @alias Blockly.utils.toolbox.convertToolboxDefToJson
 * @internal
 */
export declare function convertToolboxDefToJson(toolboxDef: ToolboxDefinition | null): ToolboxInfo | null;
/**
 * Converts the flyout definition into a list of flyout items.
 *
 * @param flyoutDef The definition of the flyout in one of its many forms.
 * @returns A list of flyout items.
 * @alias Blockly.utils.toolbox.convertFlyoutDefToJsonArray
 * @internal
 */
export declare function convertFlyoutDefToJsonArray(flyoutDef: FlyoutDefinition | null): FlyoutItemInfoArray;
/**
 * Whether or not the toolbox definition has categories.
 *
 * @param toolboxJson Object holding information for creating a toolbox.
 * @returns True if the toolbox has categories.
 * @alias Blockly.utils.toolbox.hasCategories
 * @internal
 */
export declare function hasCategories(toolboxJson: ToolboxInfo | null): boolean;
/**
 * Private version of hasCategories for stubbing in tests.
 */
declare function hasCategoriesInternal(toolboxJson: ToolboxInfo | null): boolean;
/**
 * Whether or not the category is collapsible.
 *
 * @param categoryInfo Object holing information for creating a category.
 * @returns True if the category has subcategories.
 * @alias Blockly.utils.toolbox.isCategoryCollapsible
 * @internal
 */
export declare function isCategoryCollapsible(categoryInfo: CategoryInfo): boolean;
/**
 * Parse the provided toolbox tree into a consistent DOM format.
 *
 * @param toolboxDef DOM tree of blocks, or text representation of same.
 * @returns DOM tree of blocks, or null.
 * @alias Blockly.utils.toolbox.parseToolboxTree
 */
export declare function parseToolboxTree(toolboxDef: Element | null | string): Element | null;
export declare const TEST_ONLY: {
    hasCategoriesInternal: typeof hasCategoriesInternal;
};
export {};
//# sourceMappingURL=toolbox.d.ts.map