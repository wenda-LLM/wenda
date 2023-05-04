/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { RenderedConnection } from '../../rendered_connection.js';
import type { BlockStyle, Theme } from '../../theme.js';
/** An object containing sizing and path information about outside corners. */
export interface OutsideCorners {
    topLeft: string;
    topRight: string;
    bottomRight: string;
    bottomLeft: string;
    rightHeight: number;
}
/** An object containing sizing and path information about inside corners. */
export interface InsideCorners {
    width: number;
    height: number;
    pathTop: string;
    pathBottom: string;
}
/** An object containing sizing and path information about a start hat. */
export interface StartHat {
    height: number;
    width: number;
    path: string;
}
/** An object containing sizing and path information about a notch. */
export interface Notch {
    type: number;
    width: number;
    height: number;
    pathLeft: string;
    pathRight: string;
}
/** An object containing sizing and path information about a puzzle tab. */
export interface PuzzleTab {
    type: number;
    width: number;
    height: number;
    pathDown: string | ((p1: number) => string);
    pathUp: string | ((p1: number) => string);
}
/**
 * An object containing sizing and path information about collapsed block
 * indicators.
 */
export interface JaggedTeeth {
    height: number;
    width: number;
    path: string;
}
export declare type BaseShape = {
    type: number;
    width: number;
    height: number;
};
/** An object containing sizing and type information about a dynamic shape. */
export declare type DynamicShape = {
    type: number;
    width: (p1: number) => number;
    height: (p1: number) => number;
    isDynamic: true;
    connectionOffsetY: (p1: number) => number;
    connectionOffsetX: (p1: number) => number;
    pathDown: (p1: number) => string;
    pathUp: (p1: number) => string;
    pathRightDown: (p1: number) => string;
    pathRightUp: (p1: number) => string;
};
/** An object containing sizing and type information about a shape. */
export declare type Shape = BaseShape | DynamicShape;
/**
 * Returns whether the shape is dynamic or not.
 *
 * @param shape The shape to check for dynamic-ness.
 * @returns Whether the shape is a dynamic shape or not.
 */
export declare function isDynamicShape(shape: Shape): shape is DynamicShape;
/**
 * An object that provides constants for rendering blocks.
 *
 * @alias Blockly.blockRendering.ConstantProvider
 */
export declare class ConstantProvider {
    /** The size of an empty spacer. */
    NO_PADDING: number;
    /** The size of small padding. */
    SMALL_PADDING: number;
    /** The size of medium padding. */
    MEDIUM_PADDING: number;
    /** The size of medium-large padding. */
    MEDIUM_LARGE_PADDING: number;
    /** The size of large padding. */
    LARGE_PADDING: number;
    TALL_INPUT_FIELD_OFFSET_Y: number;
    /** The height of the puzzle tab used for input and output connections. */
    TAB_HEIGHT: number;
    /**
     * The offset from the top of the block at which a puzzle tab is positioned.
     */
    TAB_OFFSET_FROM_TOP: number;
    /**
     * Vertical overlap of the puzzle tab, used to make it look more like a
     * puzzle piece.
     */
    TAB_VERTICAL_OVERLAP: number;
    /** The width of the puzzle tab used for input and output connections. */
    TAB_WIDTH: number;
    /** The width of the notch used for previous and next connections. */
    NOTCH_WIDTH: number;
    /** The height of the notch used for previous and next connections. */
    NOTCH_HEIGHT: number;
    /** The minimum width of the block. */
    MIN_BLOCK_WIDTH: number;
    EMPTY_BLOCK_SPACER_HEIGHT: number;
    DUMMY_INPUT_MIN_HEIGHT: number;
    DUMMY_INPUT_SHADOW_MIN_HEIGHT: number;
    /** Rounded corner radius. */
    CORNER_RADIUS: number;
    /**
     * Offset from the left side of a block or the inside of a statement input
     * to the left side of the notch.
     */
    NOTCH_OFFSET_LEFT: number;
    STATEMENT_INPUT_NOTCH_OFFSET: number;
    STATEMENT_BOTTOM_SPACER: number;
    STATEMENT_INPUT_PADDING_LEFT: number;
    /** Vertical padding between consecutive statement inputs. */
    BETWEEN_STATEMENT_PADDING_Y: number;
    TOP_ROW_MIN_HEIGHT: number;
    TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT: number;
    BOTTOM_ROW_MIN_HEIGHT: number;
    BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT: number;
    /**
     * Whether to add a 'hat' on top of all blocks with no previous or output
     * connections. Can be overridden by 'hat' property on Theme.BlockStyle.
     */
    ADD_START_HATS: boolean;
    /** Height of the top hat. */
    START_HAT_HEIGHT: number;
    /** Width of the top hat. */
    START_HAT_WIDTH: number;
    SPACER_DEFAULT_HEIGHT: number;
    MIN_BLOCK_HEIGHT: number;
    EMPTY_INLINE_INPUT_PADDING: number;
    EMPTY_INLINE_INPUT_HEIGHT: number;
    EXTERNAL_VALUE_INPUT_PADDING: number;
    EMPTY_STATEMENT_INPUT_HEIGHT: number;
    START_POINT: string;
    /** Height of SVG path for jagged teeth at the end of collapsed blocks. */
    JAGGED_TEETH_HEIGHT: number;
    /** Width of SVG path for jagged teeth at the end of collapsed blocks. */
    JAGGED_TEETH_WIDTH: number;
    /** Point size of text. */
    FIELD_TEXT_FONTSIZE: number;
    /** Text font weight. */
    FIELD_TEXT_FONTWEIGHT: string;
    /** Text font family. */
    FIELD_TEXT_FONTFAMILY: string;
    /**
     * Height of text.  This constant is dynamically set in
     * `setFontConstants_` to be the height of the text based on the font
     * used.
     */
    FIELD_TEXT_HEIGHT: number;
    /**
     * Text baseline.  This constant is dynamically set in `setFontConstants_`
     * to be the baseline of the text based on the font used.
     */
    FIELD_TEXT_BASELINE: number;
    /** A field's border rect corner radius. */
    FIELD_BORDER_RECT_RADIUS: number;
    /** A field's border rect default height. */
    FIELD_BORDER_RECT_HEIGHT: number;
    /** A field's border rect X padding. */
    FIELD_BORDER_RECT_X_PADDING: number;
    /** A field's border rect Y padding. */
    FIELD_BORDER_RECT_Y_PADDING: number;
    /**
     * The backing colour of a field's border rect.
     *
     * @internal
     */
    FIELD_BORDER_RECT_COLOUR: string;
    FIELD_TEXT_BASELINE_CENTER: boolean;
    FIELD_DROPDOWN_BORDER_RECT_HEIGHT: number;
    /**
     * Whether or not a dropdown field should add a border rect when in a shadow
     * block.
     */
    FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW: boolean;
    /**
     * Whether or not a dropdown field's div should be coloured to match the
     * block colours.
     */
    FIELD_DROPDOWN_COLOURED_DIV: boolean;
    /** Whether or not a dropdown field uses a text or SVG arrow. */
    FIELD_DROPDOWN_SVG_ARROW: boolean;
    FIELD_DROPDOWN_SVG_ARROW_PADDING: number;
    /** A dropdown field's SVG arrow size. */
    FIELD_DROPDOWN_SVG_ARROW_SIZE: number;
    FIELD_DROPDOWN_SVG_ARROW_DATAURI: string;
    /**
     * Whether or not to show a box shadow around the widget div. This is only a
     * feature of full block fields.
     */
    FIELD_TEXTINPUT_BOX_SHADOW: boolean;
    /**
     * Whether or not the colour field should display its colour value on the
     * entire block.
     */
    FIELD_COLOUR_FULL_BLOCK: boolean;
    /** A colour field's default width. */
    FIELD_COLOUR_DEFAULT_WIDTH: number;
    FIELD_COLOUR_DEFAULT_HEIGHT: number;
    FIELD_CHECKBOX_X_OFFSET: number;
    /** @internal */
    randomIdentifier: string;
    /**
     * The defs tag that contains all filters and patterns for this Blockly
     * instance.
     */
    private defs_;
    /**
     * The ID of the emboss filter, or the empty string if no filter is set.
     *
     * @internal
     */
    embossFilterId: string;
    /** The <filter> element to use for highlighting, or null if not set. */
    private embossFilter_;
    /**
     * The ID of the disabled pattern, or the empty string if no pattern is set.
     *
     * @internal
     */
    disabledPatternId: string;
    /**
     * The <pattern> element to use for disabled blocks, or null if not set.
     */
    private disabledPattern_;
    /**
     * The ID of the debug filter, or the empty string if no pattern is set.
     */
    debugFilterId: string;
    /**
     * The <filter> element to use for a debug highlight, or null if not set.
     */
    private debugFilter_;
    /** The <style> element to use for injecting renderer specific CSS. */
    private cssNode_;
    /**
     * Cursor colour.
     *
     * @internal
     */
    CURSOR_COLOUR: string;
    /**
     * Immovable marker colour.
     *
     * @internal
     */
    MARKER_COLOUR: string;
    /**
     * Width of the horizontal cursor.
     *
     * @internal
     */
    CURSOR_WS_WIDTH: number;
    /**
     * Height of the horizontal cursor.
     *
     * @internal
     */
    WS_CURSOR_HEIGHT: number;
    /**
     * Padding around a stack.
     *
     * @internal
     */
    CURSOR_STACK_PADDING: number;
    /**
     * Padding around a block.
     *
     * @internal
     */
    CURSOR_BLOCK_PADDING: number;
    /**
     * Stroke of the cursor.
     *
     * @internal
     */
    CURSOR_STROKE_WIDTH: number;
    /**
     * Whether text input and colour fields fill up the entire source block.
     *
     * @internal
     */
    FULL_BLOCK_FIELDS: boolean;
    /**
     * The main colour of insertion markers, in hex.  The block is rendered a
     * transparent grey by changing the fill opacity in CSS.
     *
     * @internal
     */
    INSERTION_MARKER_COLOUR: string;
    /**
     * The insertion marker opacity.
     *
     * @internal
     */
    INSERTION_MARKER_OPACITY: number;
    SHAPES: {
        [key: string]: number;
    };
    JAGGED_TEETH: JaggedTeeth;
    NOTCH: Notch;
    START_HAT: StartHat;
    PUZZLE_TAB: PuzzleTab;
    INSIDE_CORNERS: InsideCorners;
    OUTSIDE_CORNERS: OutsideCorners;
    /** @internal */
    blockStyles: {
        [key: string]: BlockStyle;
    };
    /** @internal */
    constructor();
    /**
     * Initialize shape objects based on the constants set in the constructor.
     *
     * @internal
     */
    init(): void;
    /**
     * Refresh constants properties that depend on the theme.
     *
     * @param theme The current workspace theme.
     * @internal
     */
    setTheme(theme: Theme): void;
    /**
     * Sets dynamic properties that depend on other values or theme properties.
     *
     * @param theme The current workspace theme.
     */
    protected setDynamicProperties_(theme: Theme): void;
    /**
     * Set constants related to fonts.
     *
     * @param theme The current workspace theme.
     */
    protected setFontConstants_(theme: Theme): void;
    /**
     * Set constants from a theme's component styles.
     *
     * @param theme The current workspace theme.
     */
    protected setComponentConstants_(theme: Theme): void;
    /**
     * Get or create a block style based on a single colour value.  Generate a
     * name for the style based on the colour.
     *
     * @param colour #RRGGBB colour string.
     * @returns An object containing the style and an autogenerated name for that
     *     style.
     * @internal
     */
    getBlockStyleForColour(colour: string): {
        style: BlockStyle;
        name: string;
    };
    /**
     * Gets the BlockStyle for the given block style name.
     *
     * @param blockStyleName The name of the block style.
     * @returns The named block style, or a default style if no style with the
     *     given name was found.
     */
    getBlockStyle(blockStyleName: string | null): BlockStyle;
    /**
     * Create a block style object based on the given colour.
     *
     * @param colour #RRGGBB colour string.
     * @returns A populated block style based on the given colour.
     */
    protected createBlockStyle_(colour: string): BlockStyle;
    /**
     * Get a full block style object based on the input style object.  Populate
     * any missing values.
     *
     * @param blockStyle A full or partial block style object.
     * @returns A full block style object, with all required properties populated.
     */
    protected validatedBlockStyle_(blockStyle: Partial<BlockStyle>): BlockStyle;
    /**
     * Generate a secondary colour from the passed in primary colour.
     *
     * @param inputColour Primary colour.
     * @returns The generated secondary colour.
     */
    protected generateSecondaryColour_(inputColour: string): string;
    /**
     * Generate a tertiary colour from the passed in primary colour.
     *
     * @param inputColour Primary colour.
     * @returns The generated tertiary colour.
     */
    protected generateTertiaryColour_(inputColour: string): string;
    /**
     * Dispose of this constants provider.
     * Delete all DOM elements that this provider created.
     *
     * @internal
     */
    dispose(): void;
    /**
     * @returns An object containing sizing and path information about collapsed
     *     block indicators.
     * @internal
     */
    makeJaggedTeeth(): JaggedTeeth;
    /**
     * @returns An object containing sizing and path information about start hats.
     * @internal
     */
    makeStartHat(): StartHat;
    /**
     * @returns An object containing sizing and path information about puzzle
     *     tabs.
     * @internal
     */
    makePuzzleTab(): PuzzleTab;
    /**
     * @returns An object containing sizing and path information about notches.
     * @internal
     */
    makeNotch(): Notch;
    /**
     * @returns An object containing sizing and path information about inside
     *     corners.
     * @internal
     */
    makeInsideCorners(): InsideCorners;
    /**
     * @returns An object containing sizing and path information about outside
     *     corners.
     * @internal
     */
    makeOutsideCorners(): OutsideCorners;
    /**
     * Get an object with connection shape and sizing information based on the
     * type of the connection.
     *
     * @param connection The connection to find a shape object for
     * @returns The shape object for the connection.
     * @internal
     */
    shapeFor(connection: RenderedConnection): Shape;
    /**
     * Create any DOM elements that this renderer needs (filters, patterns, etc).
     *
     * @param svg The root of the workspace's SVG.
     * @param tagName The name to use for the CSS style tag.
     * @param selector The CSS selector to use.
     * @suppress {strictModuleDepCheck} Debug renderer only included in
     * playground.
     * @internal
     */
    createDom(svg: SVGElement, tagName: string, selector: string): void;
    /**
     * Create a filter for highlighting the currently rendering block during
     * render debugging.
     */
    private createDebugFilter;
    /**
     * Inject renderer specific CSS into the page.
     *
     * @param tagName The name of the style tag to use.
     * @param selector The CSS selector to use.
     */
    protected injectCSS_(tagName: string, selector: string): void;
    /**
     * Get any renderer specific CSS to inject when the renderer is initialized.
     *
     * @param selector CSS selector to use.
     * @returns Array of CSS strings.
     */
    protected getCSS_(selector: string): string[];
}
//# sourceMappingURL=constants.d.ts.map