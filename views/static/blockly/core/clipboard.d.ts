/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ICopyable } from './interfaces/i_copyable.js';
/**
 * Copy a block or workspace comment onto the local clipboard.
 *
 * @param toCopy Block or Workspace Comment to be copied.
 * @alias Blockly.clipboard.copy
 * @internal
 */
export declare function copy(toCopy: ICopyable): void;
/**
 * Private version of copy for stubbing in tests.
 */
declare function copyInternal(toCopy: ICopyable): void;
/**
 * Paste a block or workspace comment on to the main workspace.
 *
 * @returns The pasted thing if the paste was successful, null otherwise.
 * @alias Blockly.clipboard.paste
 * @internal
 */
export declare function paste(): ICopyable | null;
/**
 * Duplicate this block and its children, or a workspace comment.
 *
 * @param toDuplicate Block or Workspace Comment to be duplicated.
 * @returns The block or workspace comment that was duplicated, or null if the
 *     duplication failed.
 * @alias Blockly.clipboard.duplicate
 * @internal
 */
export declare function duplicate(toDuplicate: ICopyable): ICopyable | null;
/**
 * Private version of duplicate for stubbing in tests.
 */
declare function duplicateInternal(toDuplicate: ICopyable): ICopyable | null;
export declare const TEST_ONLY: {
    duplicateInternal: typeof duplicateInternal;
    copyInternal: typeof copyInternal;
};
export {};
//# sourceMappingURL=clipboard.d.ts.map