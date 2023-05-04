/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { KeyCodes } from './utils/keycodes.js';
import type { Workspace } from './workspace.js';
/**
 * Class for the registry of keyboard shortcuts. This is intended to be a
 * singleton. You should not create a new instance, and only access this class
 * from ShortcutRegistry.registry.
 *
 * @alias Blockly.ShortcutRegistry
 */
export declare class ShortcutRegistry {
    static readonly registry: ShortcutRegistry;
    /** Registry of all keyboard shortcuts, keyed by name of shortcut. */
    private shortcuts;
    /** Map of key codes to an array of shortcut names. */
    private keyMap;
    /** Resets the existing ShortcutRegistry singleton. */
    private constructor();
    /** Clear and recreate the registry and keyMap. */
    reset(): void;
    /**
     * Registers a keyboard shortcut.
     *
     * @param shortcut The shortcut for this key code.
     * @param opt_allowOverrides True to prevent a warning when overriding an
     *     already registered item.
     * @throws {Error} if a shortcut with the same name already exists.
     */
    register(shortcut: KeyboardShortcut, opt_allowOverrides?: boolean): void;
    /**
     * Unregisters a keyboard shortcut registered with the given key code. This
     * will also remove any key mappings that reference this shortcut.
     *
     * @param shortcutName The name of the shortcut to unregister.
     * @returns True if an item was unregistered, false otherwise.
     */
    unregister(shortcutName: string): boolean;
    /**
     * Adds a mapping between a keycode and a keyboard shortcut.
     *
     * @param keyCode The key code for the keyboard shortcut. If registering a key
     *     code with a modifier (ex: ctrl+c) use
     *     ShortcutRegistry.registry.createSerializedKey;
     * @param shortcutName The name of the shortcut to execute when the given
     *     keycode is pressed.
     * @param opt_allowCollision True to prevent an error when adding a shortcut
     *     to a key that is already mapped to a shortcut.
     * @throws {Error} if the given key code is already mapped to a shortcut.
     */
    addKeyMapping(keyCode: string | number | KeyCodes, shortcutName: string, opt_allowCollision?: boolean): void;
    /**
     * Removes a mapping between a keycode and a keyboard shortcut.
     *
     * @param keyCode The key code for the keyboard shortcut. If registering a key
     *     code with a modifier (ex: ctrl+c) use
     *     ShortcutRegistry.registry.createSerializedKey;
     * @param shortcutName The name of the shortcut to execute when the given
     *     keycode is pressed.
     * @param opt_quiet True to not console warn when there is no shortcut to
     *     remove.
     * @returns True if a key mapping was removed, false otherwise.
     */
    removeKeyMapping(keyCode: string, shortcutName: string, opt_quiet?: boolean): boolean;
    /**
     * Removes all the key mappings for a shortcut with the given name.
     * Useful when changing the default key mappings and the key codes registered
     * to the shortcut are unknown.
     *
     * @param shortcutName The name of the shortcut to remove from the key map.
     */
    removeAllKeyMappings(shortcutName: string): void;
    /**
     * Sets the key map. Setting the key map will override any default key
     * mappings.
     *
     * @param newKeyMap The object with key code to shortcut names.
     */
    setKeyMap(newKeyMap: {
        [key: string]: string[];
    }): void;
    /**
     * Gets the current key map.
     *
     * @returns The object holding key codes to ShortcutRegistry.KeyboardShortcut.
     */
    getKeyMap(): {
        [key: string]: string[];
    };
    /**
     * Gets the registry of keyboard shortcuts.
     *
     * @returns The registry of keyboard shortcuts.
     */
    getRegistry(): {
        [key: string]: KeyboardShortcut;
    };
    /**
     * Handles key down events.
     *
     * @param workspace The main workspace where the event was captured.
     * @param e The key down event.
     * @returns True if the event was handled, false otherwise.
     */
    onKeyDown(workspace: Workspace, e: KeyboardEvent): boolean;
    /**
     * Gets the shortcuts registered to the given key code.
     *
     * @param keyCode The serialized key code.
     * @returns The list of shortcuts to call when the given keyCode is used.
     *     Undefined if no shortcuts exist.
     */
    getShortcutNamesByKeyCode(keyCode: string): string[] | undefined;
    /**
     * Gets the serialized key codes that the shortcut with the given name is
     * registered under.
     *
     * @param shortcutName The name of the shortcut.
     * @returns An array with all the key codes the shortcut is registered under.
     */
    getKeyCodesByShortcutName(shortcutName: string): string[];
    /**
     * Serializes a key event.
     *
     * @param e A key down event.
     * @returns The serialized key code for the given event.
     */
    private serializeKeyEvent_;
    /**
     * Checks whether any of the given modifiers are not valid.
     *
     * @param modifiers List of modifiers to be used with the key.
     * @throws {Error} if the modifier is not in the valid modifiers list.
     */
    private checkModifiers_;
    /**
     * Creates the serialized key code that will be used in the key map.
     *
     * @param keyCode Number code representing the key.
     * @param modifiers List of modifier key codes to be used with the key. All
     *     valid modifiers can be found in the ShortcutRegistry.modifierKeys.
     * @returns The serialized key code for the given modifiers and key.
     */
    createSerializedKey(keyCode: number, modifiers: KeyCodes[] | null): string;
}
export declare namespace ShortcutRegistry {
    interface KeyboardShortcut {
        callback?: ((p1: Workspace, p2: Event, p3: KeyboardShortcut) => boolean);
        name: string;
        preconditionFn?: ((p1: Workspace) => boolean);
        metadata?: object;
        keyCodes?: (number | string)[];
        allowCollision?: boolean;
    }
    /** Supported modifiers. */
    enum modifierKeys {
        Shift = 16,
        Control = 17,
        Alt = 18,
        Meta = 91
    }
}
export declare type KeyboardShortcut = ShortcutRegistry.KeyboardShortcut;
//# sourceMappingURL=shortcut_registry.d.ts.map