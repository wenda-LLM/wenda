/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FieldTextInputConfig, FieldTextInput } from './field_textinput.js';
import type { Sentinel } from './utils/sentinel.js';
/**
 * Class for an editable number field.
 *
 * @alias Blockly.FieldNumber
 */
export declare class FieldNumber extends FieldTextInput {
    /** The minimum value this number field can contain. */
    protected min_: number;
    /** The maximum value this number field can contain. */
    protected max_: number;
    /** The multiple to which this fields value is rounded. */
    protected precision_: number;
    /**
     * The number of decimal places to allow, or null to allow any number of
     * decimal digits.
     */
    private decimalPlaces_;
    /**
     * Serializable fields are saved by the serializer, non-serializable fields
     * are not. Editable fields should also be serializable.
     */
    SERIALIZABLE: boolean;
    /**
     * @param opt_value The initial value of the field. Should cast to a number.
     *     Defaults to 0. Also accepts Field.SKIP_SETUP if you wish to skip setup
     *     (only used by subclasses that want to handle configuration and setting
     *     the field value after their own constructors have run).
     * @param opt_min Minimum value. Will only be used if opt_config is not
     *     provided.
     * @param opt_max Maximum value. Will only be used if opt_config is not
     *     provided.
     * @param opt_precision Precision for value. Will only be used if opt_config
     *     is not provided.
     * @param opt_validator A function that is called to validate changes to the
     *     field's value. Takes in a number & returns a validated number, or null
     *     to abort the change.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/number#creation}
     * for a list of properties this parameter supports.
     */
    constructor(opt_value?: string | number | Sentinel, opt_min?: string | number | null, opt_max?: string | number | null, opt_precision?: string | number | null, opt_validator?: Function | null, opt_config?: FieldNumberConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldNumberConfig): void;
    /**
     * Set the maximum, minimum and precision constraints on this field.
     * Any of these properties may be undefined or NaN to be disabled.
     * Setting precision (usually a power of 10) enforces a minimum step between
     * values. That is, the user's value will rounded to the closest multiple of
     * precision. The least significant digit place is inferred from the
     * precision. Integers values can be enforces by choosing an integer
     * precision.
     *
     * @param min Minimum value.
     * @param max Maximum value.
     * @param precision Precision for value.
     */
    setConstraints(min: number | string | undefined | null, max: number | string | undefined | null, precision: number | string | undefined | null): void;
    /**
     * Sets the minimum value this field can contain. Updates the value to
     * reflect.
     *
     * @param min Minimum value.
     */
    setMin(min: number | string | undefined | null): void;
    /**
     * Sets the minimum value this field can contain. Called internally to avoid
     * value updates.
     *
     * @param min Minimum value.
     */
    private setMinInternal_;
    /**
     * Returns the current minimum value this field can contain. Default is
     * -Infinity.
     *
     * @returns The current minimum value this field can contain.
     */
    getMin(): number;
    /**
     * Sets the maximum value this field can contain. Updates the value to
     * reflect.
     *
     * @param max Maximum value.
     */
    setMax(max: number | string | undefined | null): void;
    /**
     * Sets the maximum value this field can contain. Called internally to avoid
     * value updates.
     *
     * @param max Maximum value.
     */
    private setMaxInternal_;
    /**
     * Returns the current maximum value this field can contain. Default is
     * Infinity.
     *
     * @returns The current maximum value this field can contain.
     */
    getMax(): number;
    /**
     * Sets the precision of this field's value, i.e. the number to which the
     * value is rounded. Updates the field to reflect.
     *
     * @param precision The number to which the field's value is rounded.
     */
    setPrecision(precision: number | string | undefined | null): void;
    /**
     * Sets the precision of this field's value. Called internally to avoid
     * value updates.
     *
     * @param precision The number to which the field's value is rounded.
     */
    private setPrecisionInternal_;
    /**
     * Returns the current precision of this field. The precision being the
     * number to which the field's value is rounded. A precision of 0 means that
     * the value is not rounded.
     *
     * @returns The number to which this field's value is rounded.
     */
    getPrecision(): number;
    /**
     * Ensure that the input value is a valid number (must fulfill the
     * constraints placed on the field).
     *
     * @param opt_newValue The input value.
     * @returns A valid number, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): number | null;
    /**
     * Create the number input editor widget.
     *
     * @returns The newly created number input editor.
     */
    protected widgetCreate_(): HTMLElement;
    /**
     * Construct a FieldNumber from a JSON arg object.
     *
     * @param options A JSON object with options (value, min, max, and precision).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldNumberFromJsonConfig): FieldNumber;
}
/**
 * Config options for the number field.
 */
export interface FieldNumberConfig extends FieldTextInputConfig {
    min?: number;
    max?: number;
    precision?: number;
}
/**
 * fromJson config options for the number field.
 */
export interface FieldNumberFromJsonConfig extends FieldNumberConfig {
    value?: number;
}
//# sourceMappingURL=field_number.d.ts.map