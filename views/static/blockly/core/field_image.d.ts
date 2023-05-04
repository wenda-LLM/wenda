/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FieldConfig, Field } from './field.js';
import type { Sentinel } from './utils/sentinel.js';
import { Size } from './utils/size.js';
/**
 * Class for an image on a block.
 *
 * @alias Blockly.FieldImage
 */
export declare class FieldImage extends Field {
    /**
     * Vertical padding below the image, which is included in the reported height
     * of the field.
     */
    private static readonly Y_PADDING;
    protected size_: Size;
    private readonly imageHeight_;
    /** The function to be called when this field is clicked. */
    private clickHandler_;
    /** The rendered field's image element. */
    private imageElement_;
    /**
     * Editable fields usually show some sort of UI indicating they are
     * editable. This field should not.
     */
    readonly EDITABLE = false;
    /**
     * Used to tell if the field needs to be rendered the next time the block is
     * rendered. Image fields are statically sized, and only need to be
     * rendered at initialization.
     */
    protected isDirty_: boolean;
    /** Whether to flip this image in RTL. */
    private flipRtl_;
    /** Alt text of this image. */
    private altText_;
    value_: any;
    /**
     * @param src The URL of the image.
     *     Also accepts Field.SKIP_SETUP if you wish to skip setup (only used by
     * subclasses that want to handle configuration and setting the field value
     * after their own constructors have run).
     * @param width Width of the image.
     * @param height Height of the image.
     * @param opt_alt Optional alt text for when block is collapsed.
     * @param opt_onClick Optional function to be called when the image is
     *     clicked. If opt_onClick is defined, opt_alt must also be defined.
     * @param opt_flipRtl Whether to flip the icon in RTL.
     * @param opt_config A map of options used to configure the field.
     *     See the [field creation documentation]{@link
     * https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/image#creation}
     * for a list of properties this parameter supports.
     */
    constructor(src: string | Sentinel, width: string | number, height: string | number, opt_alt?: string, opt_onClick?: (p1: FieldImage) => any, opt_flipRtl?: boolean, opt_config?: FieldImageConfig);
    /**
     * Configure the field based on the given map of options.
     *
     * @param config A map of options to configure the field based on.
     */
    protected configure_(config: FieldImageConfig): void;
    /**
     * Create the block UI for this image.
     *
     * @internal
     */
    initView(): void;
    updateSize_(): void;
    /**
     * Ensure that the input value (the source URL) is a string.
     *
     * @param opt_newValue The input value.
     * @returns A string, or null if invalid.
     */
    protected doClassValidation_(opt_newValue?: any): string | null;
    /**
     * Update the value of this image field, and update the displayed image.
     *
     * @param newValue The value to be saved. The default validator guarantees
     *     that this is a string.
     */
    protected doValueUpdate_(newValue: any): void;
    /**
     * Get whether to flip this image in RTL
     *
     * @returns True if we should flip in RTL.
     */
    getFlipRtl(): boolean;
    /**
     * Set the alt text of this image.
     *
     * @param alt New alt text.
     */
    setAlt(alt: string | null): void;
    /**
     * If field click is called, and click handler defined,
     * call the handler.
     */
    protected showEditor_(): void;
    /**
     * Set the function that is called when this image  is clicked.
     *
     * @param func The function that is called when the image is clicked, or null
     *     to remove.
     */
    setOnClickHandler(func: ((p1: FieldImage) => any) | null): void;
    /**
     * Use the `getText_` developer hook to override the field's text
     * representation.
     * Return the image alt text instead.
     *
     * @returns The image alt text.
     */
    protected getText_(): string | null;
    /**
     * Construct a FieldImage from a JSON arg object,
     * dereferencing any string table references.
     *
     * @param options A JSON object with options (src, width, height, alt, and
     *     flipRtl).
     * @returns The new field instance.
     * @nocollapse
     * @internal
     */
    static fromJson(options: FieldImageFromJsonConfig): FieldImage;
}
/**
 * Config options for the image field.
 */
export interface FieldImageConfig extends FieldConfig {
    flipRtl?: boolean;
    alt?: string;
}
/**
 * fromJson config options for the colour field.
 */
export interface FieldImageFromJsonConfig extends FieldImageConfig {
    src?: string;
    width?: number;
    height?: number;
}
//# sourceMappingURL=field_image.d.ts.map