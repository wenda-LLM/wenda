/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_change.js';
import type { Block } from './block.js';
import { FieldConfig } from './field.js';
import { FieldDropdown, MenuGenerator, MenuOption } from './field_dropdown.js';
import type { Menu } from './menu.js';
import type { MenuItem } from './menuitem.js';
import type { Sentinel } from './utils/sentinel.js';
import { Size } from './utils/size.js';
import { VariableModel } from './variable_model.js';
/**
 * Class for a variable's dropdown field.
 *
 * @alias Blockly.FieldVariable
 */
export declare class FieldVariable extends FieldDropdown {
    protected menuGenerator_: MenuGenerator | undefined;
    defaultVariableName: string;
    /** The type of the default variable for this field. */
    private defaultType_;
    /**
     * All of the types of variables that will be available in this field's
     * dropdown.
     */
    variableTypes: string[] | null;
    protected size_: Size;
    /** The variable model associated with this field. */
    private variable_;
    /**
     * Serializable fields are saved by the serializer, non-serializable fields
     * are not. Editable fields should also be serializable.
     */
    SERIALIZABLE: boolean;
    /**
     * @param varName The default name for the variable.
     *     If null, a unique variable name will be generated.
     *     Also accepts Field.SKIP_SETUP if you wish to skip setup (only used by
     * subclasses that want to handle configuration and setting the field value
     * after their own constructors have run).
     * @param opt_validator A function that is called to validate changes to the
     *     field's value. Takes in a variable ID  & returns a validated variable
     *     ID, or null to abort the change.
     * @param opt_variableTypes A list of the types of variables to include in the
     *     dropdown. Will only be used if opt_config is not provided.
     * @param opt_defaultType The type of variable to create if this field's value
     *     is not explicitly set.  Defaults to ''. Will only be used if opt_config
     *     is not provided.
     * @param opt_config A map of options used to configure the field.
     *    See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/variable#creation}
     * for a list of properties this parameter supports.
     */
    constructor(varName: string | null | Sentinel, opt_validator?: Function, opt_variableTypes?: string[], opt_defaultType?: string, opt_config?: FieldVariableConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldVariableConfig): void;
    /**
     * Initialize the model for this field if it has not already been initialized.
     * If the value has not been set to a variable by the first render, we make up
     * a variable rather than let the value be invalid.
     *
     * @internal
     */
    initModel(): void;
    shouldAddBorderRect_(): boolean;
    /**
     * Initialize this field based on the given XML.
     *
     * @param fieldElement The element containing information about the variable
     *     field's state.
     */
    fromXml(fieldElement: Element): void;
    /**
     * Serialize this field to XML.
     *
     * @param fieldElement The element to populate with info about the field's
     *     state.
     * @returns The element containing info about the field's state.
     */
    toXml(fieldElement: Element): Element;
    /**
     * Saves this field's value.
     *
     * @param doFullSerialization If true, the variable field will serialize the
     *     full state of the field being referenced (ie ID, name, and type) rather
     *     than just a reference to it (ie ID).
     * @returns The state of the variable field.
     * @internal
     */
    saveState(doFullSerialization?: boolean): any;
    /**
     * Sets the field's value based on the given state.
     *
     * @param state The state of the variable to assign to this variable field.
     * @internal
     */
    loadState(state: any): void;
    /**
     * Attach this field to a block.
     *
     * @param block The block containing this field.
     */
    setSourceBlock(block: Block): void;
    /**
     * Get the variable's ID.
     *
     * @returns Current variable's ID.
     */
    getValue(): string | null;
    /**
     * Get the text from this field, which is the selected variable's name.
     *
     * @returns The selected variable's name, or the empty string if no variable
     *     is selected.
     */
    getText(): string;
    /**
     * Get the variable model for the selected variable.
     * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
     * after the variable has been deleted).
     *
     * @returns The selected variable, or null if none was selected.
     * @internal
     */
    getVariable(): VariableModel | null;
    /**
     * Gets the validation function for this field, or null if not set.
     * Returns null if the variable is not set, because validators should not
     * run on the initial setValue call, because the field won't be attached to
     * a block and workspace at that point.
     *
     * @returns Validation function, or null.
     */
    getValidator(): Function | null;
    /**
     * Ensure that the ID belongs to a valid variable of an allowed type.
     *
     * @param opt_newValue The ID of the new variable to set.
     * @returns The validated ID, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): string | null;
    /**
     * Update the value of this variable field, as well as its variable and text.
     *
     * The variable ID should be valid at this point, but if a variable field
     * validator returns a bad ID, this could break.
     *
     * @param newId The value to be saved.
     */
    protected doValueUpdate_(newId: any): void;
    /**
     * Check whether the given variable type is allowed on this field.
     *
     * @param type The type to check.
     * @returns True if the type is in the list of allowed types.
     */
    private typeIsAllowed_;
    /**
     * Return a list of variable types to include in the dropdown.
     *
     * @returns Array of variable types.
     * @throws {Error} if variableTypes is an empty array.
     */
    private getVariableTypes_;
    /**
     * Parse the optional arguments representing the allowed variable types and
     * the default variable type.
     *
     * @param opt_variableTypes A list of the types of variables to include in the
     *     dropdown.  If null or undefined, variables of all types will be
     *     displayed in the dropdown.
     * @param opt_defaultType The type of the variable to create if this field's
     *     value is not explicitly set.  Defaults to ''.
     */
    private setTypes_;
    /**
     * Refreshes the name of the variable by grabbing the name of the model.
     * Used when a variable gets renamed, but the ID stays the same. Should only
     * be called by the block.
     *
     * @internal
     */
    refreshVariableName(): void;
    /**
     * Handle the selection of an item in the variable dropdown menu.
     * Special case the 'Rename variable...' and 'Delete variable...' options.
     * In the rename case, prompt the user for a new name.
     *
     * @param menu The Menu component clicked.
     * @param menuItem The MenuItem selected within menu.
     */
    protected onItemSelected_(menu: Menu, menuItem: MenuItem): void;
    /**
     * Overrides referencesVariables(), indicating this field refers to a
     * variable.
     *
     * @returns True.
     * @internal
     */
    referencesVariables(): boolean;
    /**
     * Construct a FieldVariable from a JSON arg object,
     * dereferencing any string table references.
     *
     * @param options A JSON object with options (variable, variableTypes, and
     *     defaultType).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldVariableFromJsonConfig): FieldVariable;
    /**
     * Return a sorted list of variable names for variable dropdown menus.
     * Include a special option at the end for creating a new variable name.
     *
     * @returns Array of variable names/id tuples.
     */
    static dropdownCreate(this: FieldVariable): MenuOption[];
}
/**
 * Config options for the variable field.
 */
export interface FieldVariableConfig extends FieldConfig {
    variableTypes?: string[];
    defaultType?: string;
}
/**
 * fromJson config options for the variable field.
 */
export interface FieldVariableFromJsonConfig extends FieldVariableConfig {
    variable?: string;
}
//# sourceMappingURL=field_variable.d.ts.map