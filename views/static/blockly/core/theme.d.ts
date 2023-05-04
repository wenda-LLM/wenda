/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export interface ITheme {
    blockStyles?: {
        [key: string]: Partial<BlockStyle>;
    };
    categoryStyles?: {
        [key: string]: CategoryStyle;
    };
    componentStyles?: ComponentStyle;
    fontStyle?: FontStyle;
    startHats?: boolean;
    base?: string | Theme;
    name: string;
}
/**
 * Class for a theme.
 *
 * @alias Blockly.Theme
 */
export declare class Theme implements ITheme {
    name: string;
    /** @internal */
    blockStyles: {
        [key: string]: BlockStyle;
    };
    /** @internal */
    categoryStyles: {
        [key: string]: CategoryStyle;
    };
    /** @internal */
    componentStyles: ComponentStyle;
    /** @internal */
    fontStyle: FontStyle;
    /**
     * Whether or not to add a 'hat' on top of all blocks with no previous or
     * output connections.
     *
     * @internal
     */
    startHats?: boolean;
    /**
     * @param name Theme name.
     * @param opt_blockStyles A map from style names (strings) to objects with
     *     style attributes for blocks.
     * @param opt_categoryStyles A map from style names (strings) to objects with
     *     style attributes for categories.
     * @param opt_componentStyles A map of Blockly component names to style value.
     */
    constructor(name: string, opt_blockStyles?: {
        [key: string]: Partial<BlockStyle>;
    }, opt_categoryStyles?: {
        [key: string]: CategoryStyle;
    }, opt_componentStyles?: ComponentStyle);
    /**
     * Gets the class name that identifies this theme.
     *
     * @returns The CSS class name.
     * @internal
     */
    getClassName(): string;
    /**
     * Overrides or adds a style to the blockStyles map.
     *
     * @param blockStyleName The name of the block style.
     * @param blockStyle The block style.
     */
    setBlockStyle(blockStyleName: string, blockStyle: BlockStyle): void;
    /**
     * Overrides or adds a style to the categoryStyles map.
     *
     * @param categoryStyleName The name of the category style.
     * @param categoryStyle The category style.
     */
    setCategoryStyle(categoryStyleName: string, categoryStyle: CategoryStyle): void;
    /**
     * Gets the style for a given Blockly UI component.  If the style value is a
     * string, we attempt to find the value of any named references.
     *
     * @param componentName The name of the component.
     * @returns The style value.
     */
    getComponentStyle(componentName: string): string | null;
    /**
     * Configure a specific Blockly UI component with a style value.
     *
     * @param componentName The name of the component.
     * @param styleValue The style value.
     */
    setComponentStyle(componentName: string, styleValue: any): void;
    /**
     * Configure a theme's font style.
     *
     * @param fontStyle The font style.
     */
    setFontStyle(fontStyle: FontStyle): void;
    /**
     * Configure a theme's start hats.
     *
     * @param startHats True if the theme enables start hats, false otherwise.
     */
    setStartHats(startHats: boolean): void;
    /**
     * Define a new Blockly theme.
     *
     * @param name The name of the theme.
     * @param themeObj An object containing theme properties.
     * @returns A new Blockly theme.
     */
    static defineTheme(name: string, themeObj: ITheme): Theme;
}
export declare namespace Theme {
    interface BlockStyle {
        colourPrimary: string;
        colourSecondary: string;
        colourTertiary: string;
        hat: string;
    }
    interface CategoryStyle {
        colour: string;
    }
    interface ComponentStyle {
        workspaceBackgroundColour?: string;
        toolboxBackgroundColour?: string;
        toolboxForegroundColour?: string;
        flyoutBackgroundColour?: string;
        flyoutForegroundColour?: string;
        flyoutOpacity?: number;
        scrollbarColour?: string;
        scrollbarOpacity?: number;
        insertionMarkerColour?: string;
        insertionMarkerOpacity?: number;
        markerColour?: string;
        cursorColour?: string;
        selectedGlowColour?: string;
        selectedGlowOpacity?: number;
        replacementGlowColour?: string;
        replacementGlowOpacity?: number;
    }
    interface FontStyle {
        family?: string;
        weight?: string;
        size?: number;
    }
}
export declare type BlockStyle = Theme.BlockStyle;
export declare type CategoryStyle = Theme.CategoryStyle;
export declare type ComponentStyle = Theme.ComponentStyle;
export declare type FontStyle = Theme.FontStyle;
//# sourceMappingURL=theme.d.ts.map