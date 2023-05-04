/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { KeyboardShortcut } from '../shortcut_registry.js';
/**
 * An interface for an object that handles keyboard shortcuts.
 *
 * @alias Blockly.IKeyboardAccessible
 */
export interface IKeyboardAccessible {
    /**
     * Handles the given keyboard shortcut.
     *
     * @param shortcut The shortcut to be handled.
     * @returns True if the shortcut has been handled, false otherwise.
     */
    onShortcut(shortcut: KeyboardShortcut): boolean;
}
//# sourceMappingURL=i_keyboard_accessible.d.ts.map