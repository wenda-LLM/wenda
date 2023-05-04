/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const TEST_ONLY: {
    /**
     * Generate a random unique ID.  This should be globally unique.
     * 87 characters ^ 20 length is greater than 128 bits (better than a UUID).
     *
     * @returns A globally unique ID string.
     */
    genUid: () => string;
};
/**
 * Generate the next unique element IDs.
 * IDs are compatible with the HTML4 'id' attribute restrictions:
 * Use only ASCII letters, digits, '_', '-' and '.'
 *
 * For UUIDs use genUid (below) instead; this ID generator should
 * primarily be used for IDs that end up in the DOM.
 *
 * @returns The next unique identifier.
 * @alias Blockly.utils.idGenerator.getNextUniqueId
 */
export declare function getNextUniqueId(): string;
/**
 * Generate a random unique ID.
 *
 * @see internal.genUid
 * @returns A globally unique ID string.
 * @alias Blockly.utils.idGenerator.genUid
 */
export declare function genUid(): string;
//# sourceMappingURL=idgenerator.d.ts.map