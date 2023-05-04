/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FieldTextInputConfig, FieldTextInput } from './field_textinput.js';
import type { Sentinel } from './utils/sentinel.js';
/**
 * Class for an editable angle field.
 *
 * @alias Blockly.FieldAngle
 */
export declare class FieldAngle extends FieldTextInput {
    /** The default value for this field. */
    /**
     * The default amount to round angles to when using a mouse or keyboard nav
     * input. Must be a positive integer to support keyboard navigation.
     */
    static readonly ROUND = 15;
    /** Half the width of protractor image. */
    static readonly HALF: number;
    /**
     * Default property describing which direction makes an angle field's value
     * increase. Angle increases clockwise (true) or counterclockwise (false).
     */
    static readonly CLOCKWISE = false;
    /**
     * The default offset of 0 degrees (and all angles). Always offsets in the
     * counterclockwise direction, regardless of the field's clockwise property.
     * Usually either 0 (0 = right) or 90 (0 = up).
     */
    static readonly OFFSET = 0;
    /**
     * The default maximum angle to allow before wrapping.
     * Usually either 360 (for 0 to 359.9) or 180 (for -179.9 to 180).
     */
    static readonly WRAP = 360;
    /**
     * Radius of protractor circle.  Slightly smaller than protractor size since
     * otherwise SVG crops off half the border at the edges.
     */
    static readonly RADIUS: number;
    /**
     * Whether the angle should increase as the angle picker is moved clockwise
     * (true) or counterclockwise (false).
     */
    private clockwise_;
    /**
     * The offset of zero degrees (and all other angles).
     */
    private offset_;
    /**
     * The maximum angle to allow before wrapping.
     */
    private wrap_;
    /**
     * The amount to round angles to when using a mouse or keyboard nav input.
     */
    private round_;
    /** The angle picker's SVG element. */
    private editor_;
    /** The angle picker's gauge path depending on the value. */
    gauge_: SVGPathElement | null;
    /** The angle picker's line drawn representing the value's angle. */
    line_: SVGLineElement | null;
    /** The degree symbol for this field. */
    protected symbol_: SVGTSpanElement;
    /** Wrapper click event data. */
    private clickWrapper_;
    /** Surface click event data. */
    private clickSurfaceWrapper_;
    /** Surface mouse move event data. */
    private moveSurfaceWrapper_;
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
     * @param opt_validator A function that is called to validate changes to the
     *     field's value. Takes in a number & returns a validated number, or null
     *     to abort the change.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/angle#creation}
     * for a list of properties this parameter supports.
     */
    constructor(opt_value?: string | number | Sentinel, opt_validator?: Function, opt_config?: FieldAngleConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldAngleConfig): void;
    /**
     * Create the block UI for this field.
     *
     * @internal
     */
    initView(): void;
    /** Updates the graph when the field rerenders. */
    protected render_(): void;
    /**
     * Create and show the angle field's editor.
     *
     * @param opt_e Optional mouse event that triggered the field to open, or
     *     undefined if triggered programmatically.
     */
    protected showEditor_(opt_e?: Event): void;
    /** Create the angle dropdown editor. */
    private dropdownCreate_;
    /** Disposes of events and DOM-references belonging to the angle editor. */
    private dropdownDispose_;
    /** Hide the editor. */
    private hide_;
    /**
     * Set the angle to match the mouse's position.
     *
     * @param e Mouse move event.
     */
    protected onMouseMove_(e: Event): void;
    /**
     * Handles and displays values that are input via mouse or arrow key input.
     * These values need to be rounded and wrapped before being displayed so
     * that the text input's value is appropriate.
     *
     * @param angle New angle.
     */
    private displayMouseOrKeyboardValue_;
    /** Redraw the graph with the current angle. */
    private updateGraph_;
    /**
     * Handle key down to the editor.
     *
     * @param e Keyboard event.
     */
    protected onHtmlInputKeyDown_(e: Event): void;
    /**
     * Ensure that the input value is a valid angle.
     *
     * @param opt_newValue The input value.
     * @returns A valid angle, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): number | null;
    /**
     * Wraps the value so that it is in the range (-360 + wrap, wrap).
     *
     * @param value The value to wrap.
     * @returns The wrapped value.
     */
    private wrapValue_;
    /**
     * Construct a FieldAngle from a JSON arg object.
     *
     * @param options A JSON object with options (angle).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldAngleFromJsonConfig): FieldAngle;
}
/**
 * The two main modes of the angle field.
 * Compass specifies:
 *   - clockwise: true
 *   - offset: 90
 *   - wrap: 0
 *   - round: 15
 *
 * Protractor specifies:
 *   - clockwise: false
 *   - offset: 0
 *   - wrap: 0
 *   - round: 15
 */
export declare enum Mode {
    COMPASS = "compass",
    PROTRACTOR = "protractor"
}
/**
 * Extra configuration options for the angle field.
 */
export interface FieldAngleConfig extends FieldTextInputConfig {
    mode?: Mode;
    clockwise?: boolean;
    offset?: number;
    wrap?: number;
    round?: number;
}
/**
 * fromJson configuration options for the angle field.
 */
export interface FieldAngleFromJsonConfig extends FieldAngleConfig {
    angle?: number;
}
//# sourceMappingURL=field_angle.d.ts.map