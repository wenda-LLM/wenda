/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Parse a string with any number of interpolation tokens (%1, %2, ...).
 * It will also replace string table references (e.g., %{bky_my_msg} and
 * %{BKY_MY_MSG} will both be replaced with the value in
 * Msg['MY_MSG']). Percentage sign characters '%' may be self-escaped
 * (e.g., '%%').
 *
 * @param message Text which might contain string table references and
 *     interpolation tokens.
 * @returns Array of strings and numbers.
 * @alias Blockly.utils.parsing.tokenizeInterpolation
 */
export declare function tokenizeInterpolation(message: string): (string | number)[];
/**
 * Replaces string table references in a message, if the message is a string.
 * For example, "%{bky_my_msg}" and "%{BKY_MY_MSG}" will both be replaced with
 * the value in Msg['MY_MSG'].
 *
 * @param message Message, which may be a string that contains
 *     string table references.
 * @returns String with message references replaced.
 * @alias Blockly.utils.parsing.replaceMessageReferences
 */
export declare function replaceMessageReferences(message: string | any): string;
/**
 * Validates that any %{MSG_KEY} references in the message refer to keys of
 * the Msg string table.
 *
 * @param message Text which might contain string table references.
 * @returns True if all message references have matching values.
 *     Otherwise, false.
 * @alias Blockly.utils.parsing.checkMessageReferences
 */
export declare function checkMessageReferences(message: string): boolean;
/**
 * Parse a block colour from a number or string, as provided in a block
 * definition.
 *
 * @param colour HSV hue value (0 to 360), #RRGGBB string,
 *     or a message reference string pointing to one of those two values.
 * @returns An object containing the colour as
 *     a #RRGGBB string, and the hue if the input was an HSV hue value.
 * @throws {Error} If the colour cannot be parsed.
 * @alias Blockly.utils.parsing.parseBlockColour
 */
export declare function parseBlockColour(colour: number | string): {
    hue: number | null;
    hex: string;
};
//# sourceMappingURL=parsing.d.ts.map