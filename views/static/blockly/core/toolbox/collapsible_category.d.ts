/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ICollapsibleToolboxItem } from '../interfaces/i_collapsible_toolbox_item.js';
import type { IToolbox } from '../interfaces/i_toolbox.js';
import type { IToolboxItem } from '../interfaces/i_toolbox_item.js';
import * as toolbox from '../utils/toolbox.js';
import { ToolboxCategory } from './category.js';
/**
 * Class for a category in a toolbox that can be collapsed.
 *
 * @alias Blockly.CollapsibleToolboxCategory
 */
export declare class CollapsibleToolboxCategory extends ToolboxCategory implements ICollapsibleToolboxItem {
    /** Name used for registering a collapsible toolbox category. */
    static registrationName: string;
    /** Container for any child categories. */
    protected subcategoriesDiv_: HTMLDivElement | null;
    /** Whether or not the category should display its subcategories. */
    protected expanded_: boolean;
    /** The child toolbox items for this category. */
    protected toolboxItems_: IToolboxItem[];
    flyoutItems_: any;
    isHidden_: any;
    /**
     * @param categoryDef The information needed to create a category in the
     *     toolbox.
     * @param toolbox The parent toolbox for the category.
     * @param opt_parent The parent category or null if the category does not have
     *     a parent.
     */
    constructor(categoryDef: toolbox.CategoryInfo, toolbox: IToolbox, opt_parent?: ICollapsibleToolboxItem);
    makeDefaultCssConfig_(): ToolboxCategory.CssConfig;
    parseContents_(categoryDef: toolbox.CategoryInfo): void;
    /**
     * Creates a toolbox item and adds it to the list of toolbox items.
     *
     * @param itemDef The information needed to create a toolbox item.
     */
    private createToolboxItem_;
    init(): void;
    createDom_(): HTMLDivElement;
    createIconDom_(): HTMLSpanElement;
    /**
     * Create the DOM for all subcategories.
     *
     * @param subcategories The subcategories.
     * @returns The div holding all the subcategories.
     */
    protected createSubCategoriesDom_(subcategories: IToolboxItem[]): HTMLDivElement;
    /**
     * Opens or closes the current category.
     *
     * @param isExpanded True to expand the category, false to close.
     */
    setExpanded(isExpanded: boolean): void;
    setVisible_(isVisible: boolean): void;
    /**
     * Whether the category is expanded to show its child subcategories.
     *
     * @returns True if the toolbox item shows its children, false if it is
     *     collapsed.
     */
    isExpanded(): boolean;
    isCollapsible(): boolean;
    onClick(_e: Event): void;
    /** Toggles whether or not the category is expanded. */
    toggleExpanded(): void;
    getDiv(): HTMLDivElement | null;
    /**
     * Gets any children toolbox items. (ex. Gets the subcategories)
     *
     * @returns The child toolbox items.
     */
    getChildToolboxItems(): IToolboxItem[];
}
export declare namespace CollapsibleToolboxCategory {
    /**
     * All the CSS class names that are used to create a collapsible
     * category. This is all the properties from the regular category plus
     * contents.
     */
    interface CssConfig {
        container: string | null;
        row: string | null;
        rowcontentcontainer: string | null;
        icon: string | null;
        label: string | null;
        selected: string | null;
        openicon: string | null;
        closedicon: string | null;
        contents: string | null;
    }
}
export declare type CssConfig = CollapsibleToolboxCategory.CssConfig;
//# sourceMappingURL=collapsible_category.d.ts.map