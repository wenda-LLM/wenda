/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Get the richness of block colours, regardless of the hue.
 *
 * @alias Blockly.utils.colour.getHsvSaturation
 * @returns The current richness.
 * @internal
 */
export declare function getHsvSaturation(): number;
/**
 * Set the richness of block colours, regardless of the hue.
 *
 * @param newSaturation The new richness, in the range of  0 (inclusive) to 1
 *     (exclusive)
 * @alias Blockly.utils.colour.setHsvSaturation
 * @internal
 */
export declare function setHsvSaturation(newSaturation: number): void;
/**
 * Get the intensity of block colours, regardless of the hue.
 *
 * @alias Blockly.utils.colour.getHsvValue
 * @returns The current intensity.
 * @internal
 */
export declare function getHsvValue(): number;
/**
 * Set the intensity of block colours, regardless of the hue.
 *
 * @param newValue The new intensity, in the range of  0 (inclusive) to 1
 *     (exclusive)
 * @alias Blockly.utils.colour.setHsvValue
 * @internal
 */
export declare function setHsvValue(newValue: number): void;
/**
 * Parses a colour from a string.
 * .parse('red') = '#ff0000'
 * .parse('#f00') = '#ff0000'
 * .parse('#ff0000') = '#ff0000'
 * .parse('0xff0000') = '#ff0000'
 * .parse('rgb(255, 0, 0)') = '#ff0000'
 *
 * @param str Colour in some CSS format.
 * @returns A string containing a hex representation of the colour, or null if
 *     can't be parsed.
 * @alias Blockly.utils.colour.parse
 */
export declare function parse(str: string | number): string | null;
/**
 * Converts a colour from RGB to hex representation.
 *
 * @param r Amount of red, int between 0 and 255.
 * @param g Amount of green, int between 0 and 255.
 * @param b Amount of blue, int between 0 and 255.
 * @returns Hex representation of the colour.
 * @alias Blockly.utils.colour.rgbToHex
 */
export declare function rgbToHex(r: number, g: number, b: number): string;
/**
 * Converts a colour to RGB.
 *
 * @param colour String representing colour in any colour format ('#ff0000',
 *     'red', '0xff000', etc).
 * @returns RGB representation of the colour.
 * @alias Blockly.utils.colour.hexToRgb
 */
export declare function hexToRgb(colour: string): number[];
/**
 * Converts an HSV triplet to hex representation.
 *
 * @param h Hue value in [0, 360].
 * @param s Saturation value in [0, 1].
 * @param v Brightness in [0, 255].
 * @returns Hex representation of the colour.
 * @alias Blockly.utils.colour.hsvToHex
 */
export declare function hsvToHex(h: number, s: number, v: number): string;
/**
 * Blend two colours together, using the specified factor to indicate the
 * weight given to the first colour.
 *
 * @param colour1 First colour.
 * @param colour2 Second colour.
 * @param factor The weight to be given to colour1 over colour2.
 *     Values should be in the range [0, 1].
 * @returns Combined colour represented in hex.
 * @alias Blockly.utils.colour.blend
 */
export declare function blend(colour1: string, colour2: string, factor: number): string | null;
/**
 * A map that contains the 16 basic colour keywords as defined by W3C:
 * https://www.w3.org/TR/2018/REC-css-color-3-20180619/#html4
 * The keys of this map are the lowercase "readable" names of the colours,
 * while the values are the "hex" values.
 *
 * @alias Blockly.utils.colour.names
 */
export declare const names: {
    [key: string]: string;
};
/**
 * Convert a hue (HSV model) into an RGB hex triplet.
 *
 * @param hue Hue on a colour wheel (0-360).
 * @returns RGB code, e.g. '#5ba65b'.
 * @alias Blockly.utils.colour.hueToHex
 */
export declare function hueToHex(hue: number): string;
//# sourceMappingURL=colour.d.ts.map