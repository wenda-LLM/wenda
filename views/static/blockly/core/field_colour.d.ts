/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_change.js';
import { FieldConfig, Field } from './field.js';
import type { Sentinel } from './utils/sentinel.js';
/**
 * Class for a colour input field.
 *
 * @alias Blockly.FieldColour
 */
export declare class FieldColour extends Field {
    /**
     * An array of colour strings for the palette.
     * Copied from goog.ui.ColorPicker.SIMPLE_GRID_COLORS
     * All colour pickers use this unless overridden with setColours.
     */
    static COLOURS: string[];
    /**
     * An array of tooltip strings for the palette.  If not the same length as
     * COLOURS, the colour's hex code will be used for any missing titles.
     * All colour pickers use this unless overridden with setColours.
     */
    static TITLES: string[];
    /**
     * Number of columns in the palette.
     * All colour pickers use this unless overridden with setColumns.
     */
    static COLUMNS: number;
    /** The field's colour picker element. */
    private picker_;
    /** Index of the currently highlighted element. */
    private highlightedIndex_;
    /** Mouse click event data. */
    private onClickWrapper_;
    /** Mouse move event data. */
    private onMouseMoveWrapper_;
    /** Mouse enter event data. */
    private onMouseEnterWrapper_;
    /** Mouse leave event data. */
    private onMouseLeaveWrapper_;
    /** Key down event data. */
    private onKeyDownWrapper_;
    /**
     * Serializable fields are saved by the serializer, non-serializable fields
     * are not. Editable fields should also be serializable.
     */
    SERIALIZABLE: boolean;
    /** Mouse cursor style when over the hotspot that initiates the editor. */
    CURSOR: string;
    /**
     * Used to tell if the field needs to be rendered the next time the block is
     * rendered. Colour fields are statically sized, and only need to be
     * rendered at initialization.
     */
    protected isDirty_: boolean;
    /** Array of colours used by this field.  If null, use the global list. */
    private colours_;
    /**
     * Array of colour tooltips used by this field.  If null, use the global
     * list.
     */
    private titles_;
    /**
     * Number of colour columns used by this field.  If 0, use the global
     * setting. By default use the global constants for columns.
     */
    private columns_;
    size_: any;
    clickTarget_: any;
    value_: any;
    /**
     * @param opt_value The initial value of the field. Should be in '#rrggbb'
     *     format. Defaults to the first value in the default colour array. Also
     *     accepts Field.SKIP_SETUP if you wish to skip setup (only used by
     *     subclasses that want to handle configuration and setting the field
     *     value after their own constructors have run).
     * @param opt_validator A function that is called to validate changes to the
     *     field's value. Takes in a colour string & returns a validated colour
     *     string ('#rrggbb' format), or null to abort the change.Blockly.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/colour}
     * for a list of properties this parameter supports.
     */
    constructor(opt_value?: string | Sentinel, opt_validator?: Function, opt_config?: FieldColourConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldColourConfig): void;
    /**
     * Create the block UI for this colour field.
     *
     * @internal
     */
    initView(): void;
    applyColour(): void;
    /**
     * Ensure that the input value is a valid colour.
     *
     * @param opt_newValue The input value.
     * @returns A valid colour, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): string | null;
    /**
     * Update the value of this colour field, and update the displayed colour.
     *
     * @param newValue The value to be saved. The default validator guarantees
     *     that this is a colour in '#rrggbb' format.
     */
    protected doValueUpdate_(newValue: any): void;
    /**
     * Get the text for this field.  Used when the block is collapsed.
     *
     * @returns Text representing the value of this field.
     */
    getText(): string;
    /**
     * Set a custom colour grid for this field.
     *
     * @param colours Array of colours for this block, or null to use default
     *     (FieldColour.COLOURS).
     * @param opt_titles Optional array of colour tooltips, or null to use default
     *     (FieldColour.TITLES).
     * @returns Returns itself (for method chaining).
     */
    setColours(colours: string[], opt_titles?: string[]): FieldColour;
    /**
     * Set a custom grid size for this field.
     *
     * @param columns Number of columns for this block, or 0 to use default
     *     (FieldColour.COLUMNS).
     * @returns Returns itself (for method chaining).
     */
    setColumns(columns: number): FieldColour;
    /** Create and show the colour field's editor. */
    protected showEditor_(): void;
    /**
     * Handle a click on a colour cell.
     *
     * @param e Mouse event.
     */
    private onClick_;
    /**
     * Handle a key down event. Navigate around the grid with the
     * arrow keys. Enter selects the highlighted colour.
     *
     * @param e Keyboard event.
     */
    private onKeyDown_;
    /**
     * Move the currently highlighted position by dx and dy.
     *
     * @param dx Change of x
     * @param dy Change of y
     */
    private moveHighlightBy_;
    /**
     * Handle a mouse move event. Highlight the hovered colour.
     *
     * @param e Mouse event.
     */
    private onMouseMove_;
    /** Handle a mouse enter event. Focus the picker. */
    private onMouseEnter_;
    /**
     * Handle a mouse leave event. Blur the picker and unhighlight
     * the currently highlighted colour.
     */
    private onMouseLeave_;
    /**
     * Returns the currently highlighted item (if any).
     *
     * @returns Highlighted item (null if none).
     */
    private getHighlighted_;
    /**
     * Update the currently highlighted cell.
     *
     * @param cell the new cell to highlight
     * @param index the index of the new cell
     */
    private setHighlightedCell_;
    /** Create a colour picker dropdown editor. */
    private dropdownCreate_;
    /** Disposes of events and DOM-references belonging to the colour editor. */
    private dropdownDispose_;
    /**
     * Construct a FieldColour from a JSON arg object.
     *
     * @param options A JSON object with options (colour).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldColourFromJsonConfig): FieldColour;
}
/**
 * Config options for the colour field.
 */
export interface FieldColourConfig extends FieldConfig {
    colourOptions?: string[];
    colourTitles?: string[];
    columns?: number;
}
/**
 * fromJson config options for the colour field.
 */
export interface FieldColourFromJsonConfig extends FieldColourConfig {
    colour?: string;
}
//# sourceMappingURL=field_colour.d.ts.map