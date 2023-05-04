/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ICollapsibleToolboxItem } from '../interfaces/i_collapsible_toolbox_item.js';
import type { ISelectableToolboxItem } from '../interfaces/i_selectable_toolbox_item.js';
import type { IToolbox } from '../interfaces/i_toolbox.js';
import type { CategoryInfo, FlyoutDefinition, FlyoutItemInfoArray } from '../utils/toolbox.js';
import { ToolboxItem } from './toolbox_item.js';
/**
 * Class for a category in a toolbox.
 *
 * @alias Blockly.ToolboxCategory
 */
export declare class ToolboxCategory extends ToolboxItem implements ISelectableToolboxItem {
    /** Name used for registering a toolbox category. */
    static registrationName: string;
    /** The number of pixels to move the category over at each nested level. */
    static nestedPadding: number;
    /** The width in pixels of the strip of colour next to each category. */
    static borderWidth: number;
    /**
     * The default colour of the category. This is used as the background colour
     * of the category when it is selected.
     */
    static defaultBackgroundColour: string;
    toolboxItemDef_: CategoryInfo;
    /** The name that will be displayed on the category. */
    protected name_: string;
    /** The colour of the category. */
    protected colour_: string;
    /** The html container for the category. */
    protected htmlDiv_: HTMLDivElement | null;
    /** The html element for the category row. */
    protected rowDiv_: HTMLDivElement | null;
    /** The html element that holds children elements of the category row. */
    protected rowContents_: HTMLDivElement | null;
    /** The html element for the toolbox icon. */
    protected iconDom_: Element | null;
    /** The html element for the toolbox label. */
    protected labelDom_: Element | null;
    protected cssConfig_: CssConfig;
    /** True if the category is meant to be hidden, false otherwise. */
    protected isHidden_: boolean;
    /** True if this category is disabled, false otherwise. */
    protected isDisabled_: boolean;
    /** The flyout items for this category. */
    protected flyoutItems_: string | FlyoutItemInfoArray;
    /**
     * @param categoryDef The information needed to create a category in the
     *     toolbox.
     * @param parentToolbox The parent toolbox for the category.
     * @param opt_parent The parent category or null if the category does not have
     *     a parent.
     */
    constructor(categoryDef: CategoryInfo, parentToolbox: IToolbox, opt_parent?: ICollapsibleToolboxItem);
    /**
     * Initializes the toolbox item.
     * This includes creating the DOM and updating the state of any items based
     * on the info object.
     * Init should be called immediately after the construction of the toolbox
     * item, to ensure that the category contents are properly parsed.
     */
    init(): void;
    /**
     * Creates an object holding the default classes for a category.
     *
     * @returns The configuration object holding all the CSS classes for a
     *     category.
     */
    protected makeDefaultCssConfig_(): CssConfig;
    /**
     * Parses the contents array depending on if the category is a dynamic
     * category, or if its contents are meant to be shown in the flyout.
     *
     * @param categoryDef The information needed to create a category.
     */
    protected parseContents_(categoryDef: CategoryInfo): void;
    /**
     * Parses the non-contents parts of the category def.
     *
     * @param categoryDef The information needed to create a category.
     */
    protected parseCategoryDef_(categoryDef: CategoryInfo): void;
    /**
     * Creates the DOM for the category.
     *
     * @returns The parent element for the category.
     */
    protected createDom_(): HTMLDivElement;
    /**
     * Creates the container that holds the row and any subcategories.
     *
     * @returns The div that holds the icon and the label.
     */
    protected createContainer_(): HTMLDivElement;
    /**
     * Creates the parent of the contents container. All clicks will happen on
     * this div.
     *
     * @returns The div that holds the contents container.
     */
    protected createRowContainer_(): HTMLDivElement;
    /**
     * Creates the container for the label and icon.
     * This is necessary so we can set all subcategory pointer events to none.
     *
     * @returns The div that holds the icon and the label.
     */
    protected createRowContentsContainer_(): HTMLDivElement;
    /**
     * Creates the span that holds the category icon.
     *
     * @returns The span that holds the category icon.
     */
    protected createIconDom_(): Element;
    /**
     * Creates the span that holds the category label.
     * This should have an ID for accessibility purposes.
     *
     * @param name The name of the category.
     * @returns The span that holds the category label.
     */
    protected createLabelDom_(name: string): Element;
    /** Updates the colour for this category. */
    refreshTheme(): void;
    /**
     * Add the strip of colour to the toolbox category.
     *
     * @param colour The category colour.
     */
    protected addColourBorder_(colour: string): void;
    /**
     * Gets either the colour or the style for a category.
     *
     * @param categoryDef The object holding information on the category.
     * @returns The hex colour for the category.
     */
    protected getColour_(categoryDef: CategoryInfo): string;
    /**
     * Sets the colour for the category using the style name and returns the new
     * colour as a hex string.
     *
     * @param styleName Name of the style.
     * @returns The hex colour for the category.
     */
    private getColourfromStyle_;
    /**
     * Gets the HTML element that is clickable.
     * The parent toolbox element receives clicks. The parent toolbox will add an
     * ID to this element so it can pass the onClick event to the correct
     * toolboxItem.
     *
     * @returns The HTML element that receives clicks.
     */
    getClickTarget(): Element;
    /**
     * Parses the colour on the category.
     *
     * @param colourValue HSV hue value (0 to 360), #RRGGBB string, or a message
     *     reference string pointing to one of those two values.
     * @returns The hex colour for the category.
     */
    private parseColour_;
    /**
     * Adds appropriate classes to display an open icon.
     *
     * @param iconDiv The div that holds the icon.
     */
    protected openIcon_(iconDiv: Element | null): void;
    /**
     * Adds appropriate classes to display a closed icon.
     *
     * @param iconDiv The div that holds the icon.
     */
    protected closeIcon_(iconDiv: Element | null): void;
    /**
     * Sets whether the category is visible or not.
     * For a category to be visible its parent category must also be expanded.
     *
     * @param isVisible True if category should be visible.
     */
    setVisible_(isVisible: boolean): void;
    /** Hide the category. */
    hide(): void;
    /**
     * Show the category. Category will only appear if its parent category is also
     * expanded.
     */
    show(): void;
    /**
     * Whether the category is visible.
     * A category is only visible if all of its ancestors are expanded and
     * isHidden_ is false.
     *
     * @returns True if the category is visible, false otherwise.
     */
    isVisible(): boolean;
    /**
     * Whether all ancestors of a category (parent and parent's parent, etc.) are
     * expanded.
     *
     * @returns True only if every ancestor is expanded
     */
    protected allAncestorsExpanded_(): boolean;
    isSelectable(): boolean;
    /**
     * Handles when the toolbox item is clicked.
     *
     * @param _e Click event to handle.
     */
    onClick(_e: Event): void;
    /**
     * Sets the current category as selected.
     *
     * @param isSelected True if this category is selected, false otherwise.
     */
    setSelected(isSelected: boolean): void;
    /**
     * Sets whether the category is disabled.
     *
     * @param isDisabled True to disable the category, false otherwise.
     */
    setDisabled(isDisabled: boolean): void;
    /**
     * Gets the name of the category. Used for emitting events.
     *
     * @returns The name of the toolbox item.
     */
    getName(): string;
    getParent(): ICollapsibleToolboxItem | null;
    getDiv(): HTMLDivElement | null;
    /**
     * Gets the contents of the category. These are items that are meant to be
     * displayed in the flyout.
     *
     * @returns The definition of items to be displayed in the flyout.
     */
    getContents(): FlyoutItemInfoArray | string;
    /**
     * Updates the contents to be displayed in the flyout.
     * If the flyout is open when the contents are updated, refreshSelection on
     * the toolbox must also be called.
     *
     * @param contents The contents to be displayed in the flyout. A string can be
     *     supplied to create a dynamic category.
     */
    updateFlyoutContents(contents: FlyoutDefinition | string): void;
    dispose(): void;
}
export declare namespace ToolboxCategory {
    /** All the CSS class names that are used to create a category. */
    interface CssConfig {
        container?: string;
        row?: string;
        rowcontentcontainer?: string;
        icon?: string;
        label?: string;
        contents?: string;
        selected?: string;
        openicon?: string;
        closedicon?: string;
    }
}
export declare type CssConfig = ToolboxCategory.CssConfig;
//# sourceMappingURL=category.d.ts.map