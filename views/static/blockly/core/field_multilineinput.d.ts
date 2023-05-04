/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FieldTextInputConfig, FieldTextInput } from './field_textinput.js';
import type { Sentinel } from './utils/sentinel.js';
/**
 * Class for an editable text area field.
 *
 * @alias Blockly.FieldMultilineInput
 */
export declare class FieldMultilineInput extends FieldTextInput {
    /**
     * The SVG group element that will contain a text element for each text row
     *     when initialized.
     */
    textGroup_: SVGGElement;
    /**
     * Defines the maximum number of lines of field.
     * If exceeded, scrolling functionality is enabled.
     */
    protected maxLines_: number;
    /** Whether Y overflow is currently occurring. */
    protected isOverflowedY_: boolean;
    /**
     * @param opt_value The initial content of the field. Should cast to a string.
     *     Defaults to an empty string if null or undefined. Also accepts
     *     Field.SKIP_SETUP if you wish to skip setup (only used by subclasses
     *     that want to handle configuration and setting the field value after
     *     their own constructors have run).
     * @param opt_validator An optional function that is called to validate any
     *     constraints on what the user entered.  Takes the new text as an
     *     argument and returns either the accepted text, a replacement text, or
     *     null to abort the change.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/multiline-text-input#creation}
     * for a list of properties this parameter supports.
     */
    constructor(opt_value?: string | Sentinel, opt_validator?: Function, opt_config?: FieldMultilineInputConfig);
    protected configure_(config: FieldMultilineInputConfig): void;
    /**
     * Serializes this field's value to XML. Should only be called by Blockly.Xml.
     *
     * @param fieldElement The element to populate with info about the field's
     *     state.
     * @returns The element containing info about the field's state.
     * @internal
     */
    toXml(fieldElement: Element): Element;
    /**
     * Sets the field's value based on the given XML element. Should only be
     * called by Blockly.Xml.
     *
     * @param fieldElement The element containing info about the field's state.
     * @internal
     */
    fromXml(fieldElement: Element): void;
    /**
     * Saves this field's value.
     *
     * @returns The state of this field.
     * @internal
     */
    saveState(): any;
    /**
     * Sets the field's value based on the given state.
     *
     * @param state The state of the variable to assign to this variable field.
     * @internal
     */
    loadState(state: any): void;
    /**
     * Create the block UI for this field.
     *
     * @internal
     */
    initView(): void;
    /**
     * Get the text from this field as displayed on screen.  May differ from
     * getText due to ellipsis, and other formatting.
     *
     * @returns Currently displayed text.
     */
    protected getDisplayText_(): string;
    /**
     * Called by setValue if the text input is valid. Updates the value of the
     * field, and updates the text of the field if it is not currently being
     * edited (i.e. handled by the htmlInput_). Is being redefined here to update
     * overflow state of the field.
     *
     * @param newValue The value to be saved. The default validator guarantees
     *     that this is a string.
     */
    protected doValueUpdate_(newValue: any): void;
    /** Updates the text of the textElement. */
    protected render_(): void;
    /** Updates the size of the field based on the text. */
    protected updateSize_(): void;
    /**
     * Show the inline free-text editor on top of the text.
     * Overrides the default behaviour to force rerender in order to
     * correct block size, based on editor text.
     *
     * @param _opt_e Optional mouse event that triggered the field to open, or
     *     undefined if triggered programmatically.
     * @param opt_quietInput True if editor should be created without focus.
     *     Defaults to false.
     */
    showEditor_(_opt_e?: Event, opt_quietInput?: boolean): void;
    /**
     * Create the text input editor widget.
     *
     * @returns The newly created text input editor.
     */
    protected widgetCreate_(): HTMLTextAreaElement;
    /**
     * Sets the maxLines config for this field.
     *
     * @param maxLines Defines the maximum number of lines allowed, before
     *     scrolling functionality is enabled.
     */
    setMaxLines(maxLines: number): void;
    /**
     * Returns the maxLines config of this field.
     *
     * @returns The maxLines config value.
     */
    getMaxLines(): number;
    /**
     * Handle key down to the editor. Override the text input definition of this
     * so as to not close the editor when enter is typed in.
     *
     * @param e Keyboard event.
     */
    protected onHtmlInputKeyDown_(e: Event): void;
    /**
     * Construct a FieldMultilineInput from a JSON arg object,
     * dereferencing any string table references.
     *
     * @param options A JSON object with options (text, and spellcheck).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldMultilineInputFromJsonConfig): FieldMultilineInput;
}
/**
 * Config options for the multiline input field.
 */
export interface FieldMultilineInputConfig extends FieldTextInputConfig {
    maxLines?: number;
}
/**
 * fromJson config options for the multiline input field.
 */
export interface FieldMultilineInputFromJsonConfig extends FieldMultilineInputConfig {
    text?: string;
}
//# sourceMappingURL=field_multilineinput.d.ts.map