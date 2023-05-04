/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_change.js';
import { FieldConfig, Field } from './field.js';
import type { Sentinel } from './utils/sentinel.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for an editable text field.
 *
 * @alias Blockly.FieldTextInput
 */
export declare class FieldTextInput extends Field {
    /**
     * Pixel size of input border radius.
     * Should match blocklyText's border-radius in CSS.
     */
    static BORDERRADIUS: number;
    /** Allow browser to spellcheck this field. */
    protected spellcheck_: boolean;
    /** The HTML input element. */
    protected htmlInput_: HTMLInputElement | null;
    /** True if the field's value is currently being edited via the UI. */
    protected isBeingEdited_: boolean;
    /**
     * True if the value currently displayed in the field's editory UI is valid.
     */
    protected isTextValid_: boolean;
    /** Key down event data. */
    private onKeyDownWrapper_;
    /** Key input event data. */
    private onKeyInputWrapper_;
    /**
     * Whether the field should consider the whole parent block to be its click
     * target.
     */
    fullBlockClickTarget_: boolean | null;
    /** The workspace that this field belongs to. */
    protected workspace_: WorkspaceSvg | null;
    /**
     * Serializable fields are saved by the serializer, non-serializable fields
     * are not. Editable fields should also be serializable.
     */
    SERIALIZABLE: boolean;
    /** Mouse cursor style when over the hotspot that initiates the editor. */
    CURSOR: string;
    clickTarget_: any;
    value_: any;
    isDirty_: any;
    /**
     * @param opt_value The initial value of the field. Should cast to a string.
     *     Defaults to an empty string if null or undefined. Also accepts
     *     Field.SKIP_SETUP if you wish to skip setup (only used by subclasses
     *     that want to handle configuration and setting the field value after
     *     their own constructors have run).
     * @param opt_validator A function that is called to validate changes to the
     *     field's value. Takes in a string & returns a validated string, or null
     *     to abort the change.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/text-input#creation}
     * for a list of properties this parameter supports.
     */
    constructor(opt_value?: string | Sentinel, opt_validator?: Function | null, opt_config?: FieldTextInputConfig);
    protected configure_(config: FieldTextInputConfig): void;
    /** @internal */
    initView(): void;
    /**
     * Ensure that the input value casts to a valid string.
     *
     * @param opt_newValue The input value.
     * @returns A valid string, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): any;
    /**
     * Called by setValue if the text input is not valid. If the field is
     * currently being edited it reverts value of the field to the previous
     * value while allowing the display text to be handled by the htmlInput_.
     *
     * @param _invalidValue The input value that was determined to be invalid.
     *    This is not used by the text input because its display value is stored
     * on the htmlInput_.
     */
    protected doValueInvalid_(_invalidValue: any): void;
    /**
     * Called by setValue if the text input is valid. Updates the value of the
     * field, and updates the text of the field if it is not currently being
     * edited (i.e. handled by the htmlInput_).
     *
     * @param newValue The value to be saved. The default validator guarantees
     *     that this is a string.
     */
    protected doValueUpdate_(newValue: any): void;
    /**
     * Updates text field to match the colour/style of the block.
     *
     * @internal
     */
    applyColour(): void;
    /**
     * Updates the colour of the htmlInput given the current validity of the
     * field's value.
     */
    protected render_(): void;
    /**
     * Set whether this field is spellchecked by the browser.
     *
     * @param check True if checked.
     */
    setSpellcheck(check: boolean): void;
    /**
     * Show the inline free-text editor on top of the text.
     *
     * @param _opt_e Optional mouse event that triggered the field to open, or
     *     undefined if triggered programmatically.
     * @param opt_quietInput True if editor should be created without focus.
     *     Defaults to false.
     */
    protected showEditor_(_opt_e?: Event, opt_quietInput?: boolean): void;
    /**
     * Create and show a text input editor that is a prompt (usually a popup).
     * Mobile browsers have issues with in-line textareas (focus and keyboards).
     */
    private showPromptEditor_;
    /**
     * Create and show a text input editor that sits directly over the text input.
     *
     * @param quietInput True if editor should be created without focus.
     */
    private showInlineEditor_;
    /**
     * Create the text input editor widget.
     *
     * @returns The newly created text input editor.
     */
    protected widgetCreate_(): HTMLElement;
    /**
     * Closes the editor, saves the results, and disposes of any events or
     * DOM-references belonging to the editor.
     */
    protected widgetDispose_(): void;
    /**
     * A callback triggered when the user is done editing the field via the UI.
     *
     * @param _value The new value of the field.
     */
    onFinishEditing_(_value: any): void;
    /**
     * Bind handlers for user input on the text input field's editor.
     *
     * @param htmlInput The htmlInput to which event handlers will be bound.
     */
    protected bindInputEvents_(htmlInput: HTMLElement): void;
    /** Unbind handlers for user input and workspace size changes. */
    protected unbindInputEvents_(): void;
    /**
     * Handle key down to the editor.
     *
     * @param e Keyboard event.
     */
    protected onHtmlInputKeyDown_(e: Event): void;
    /**
     * Handle a change to the editor.
     *
     * @param _e Keyboard event.
     */
    private onHtmlInputChange_;
    /**
     * Set the HTML input value and the field's internal value. The difference
     * between this and `setValue` is that this also updates the HTML input
     * value whilst editing.
     *
     * @param newValue New value.
     */
    protected setEditorValue_(newValue: any): void;
    /** Resize the editor to fit the text. */
    protected resizeEditor_(): void;
    /**
     * Returns whether or not the field is tab navigable.
     *
     * @returns True if the field is tab navigable.
     */
    isTabNavigable(): boolean;
    /**
     * Use the `getText_` developer hook to override the field's text
     * representation. When we're currently editing, return the current HTML value
     * instead. Otherwise, return null which tells the field to use the default
     * behaviour (which is a string cast of the field's value).
     *
     * @returns The HTML value if we're editing, otherwise null.
     */
    protected getText_(): string | null;
    /**
     * Transform the provided value into a text to show in the HTML input.
     * Override this method if the field's HTML input representation is different
     * than the field's value. This should be coupled with an override of
     * `getValueFromEditorText_`.
     *
     * @param value The value stored in this field.
     * @returns The text to show on the HTML input.
     */
    protected getEditorText_(value: any): string;
    /**
     * Transform the text received from the HTML input into a value to store
     * in this field.
     * Override this method if the field's HTML input representation is different
     * than the field's value. This should be coupled with an override of
     * `getEditorText_`.
     *
     * @param text Text received from the HTML input.
     * @returns The value to store.
     */
    protected getValueFromEditorText_(text: string): any;
    /**
     * Construct a FieldTextInput from a JSON arg object,
     * dereferencing any string table references.
     *
     * @param options A JSON object with options (text, and spellcheck).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldTextInputFromJsonConfig): FieldTextInput;
}
/**
 * Config options for the text input field.
 */
export interface FieldTextInputConfig extends FieldConfig {
    spellcheck?: boolean;
}
/**
 * fromJson config options for the text input field.
 */
export interface FieldTextInputFromJsonConfig extends FieldTextInputConfig {
    text?: string;
}
//# sourceMappingURL=field_textinput.d.ts.map