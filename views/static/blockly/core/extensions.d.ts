/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
export declare const TEST_ONLY: {
    allExtensions: any;
};
/**
 * Registers a new extension function. Extensions are functions that help
 * initialize blocks, usually adding dynamic behavior such as onchange
 * handlers and mutators. These are applied using Block.applyExtension(), or
 * the JSON "extensions" array attribute.
 *
 * @param name The name of this extension.
 * @param initFn The function to initialize an extended block.
 * @throws {Error} if the extension name is empty, the extension is already
 *     registered, or extensionFn is not a function.
 * @alias Blockly.Extensions.register
 */
export declare function register(name: string, initFn: Function): void;
/**
 * Registers a new extension function that adds all key/value of mixinObj.
 *
 * @param name The name of this extension.
 * @param mixinObj The values to mix in.
 * @throws {Error} if the extension name is empty or the extension is already
 *     registered.
 * @alias Blockly.Extensions.registerMixin
 */
export declare function registerMixin(name: string, mixinObj: any): void;
/**
 * Registers a new extension function that adds a mutator to the block.
 * At register time this performs some basic sanity checks on the mutator.
 * The wrapper may also add a mutator dialog to the block, if both compose and
 * decompose are defined on the mixin.
 *
 * @param name The name of this mutator extension.
 * @param mixinObj The values to mix in.
 * @param opt_helperFn An optional function to apply after mixing in the object.
 * @param opt_blockList A list of blocks to appear in the flyout of the mutator
 *     dialog.
 * @throws {Error} if the mutation is invalid or can't be applied to the block.
 * @alias Blockly.Extensions.registerMutator
 */
export declare function registerMutator(name: string, mixinObj: any, opt_helperFn?: () => any, opt_blockList?: string[]): void;
/**
 * Unregisters the extension registered with the given name.
 *
 * @param name The name of the extension to unregister.
 * @alias Blockly.Extensions.unregister
 */
export declare function unregister(name: string): void;
/**
 * Returns whether an extension is registered with the given name.
 *
 * @param name The name of the extension to check for.
 * @returns True if the extension is registered.  False if it is not registered.
 * @alias Blockly.Extensions.isRegistered
 */
export declare function isRegistered(name: string): boolean;
/**
 * Applies an extension method to a block. This should only be called during
 * block construction.
 *
 * @param name The name of the extension.
 * @param block The block to apply the named extension to.
 * @param isMutator True if this extension defines a mutator.
 * @throws {Error} if the extension is not found.
 * @alias Blockly.Extensions.apply
 */
export declare function apply(name: string, block: Block, isMutator: boolean): void;
/**
 * Calls a function after the page has loaded, possibly immediately.
 *
 * @param fn Function to run.
 * @throws Error Will throw if no global document can be found (e.g., Node.js).
 * @internal
 */
export declare function runAfterPageLoad(fn: () => void): void;
/**
 * Builds an extension function that will map a dropdown value to a tooltip
 * string.
 *
 * This method includes multiple checks to ensure tooltips, dropdown options,
 * and message references are aligned. This aims to catch errors as early as
 * possible, without requiring developers to manually test tooltips under each
 * option. After the page is loaded, each tooltip text string will be checked
 * for matching message keys in the internationalized string table. Deferring
 * this until the page is loaded decouples loading dependencies. Later, upon
 * loading the first block of any given type, the extension will validate every
 * dropdown option has a matching tooltip in the lookupTable.  Errors are
 * reported as warnings in the console, and are never fatal.
 *
 * @param dropdownName The name of the field whose value is the key to the
 *     lookup table.
 * @param lookupTable The table of field values to tooltip text.
 * @returns The extension function.
 * @alias Blockly.Extensions.buildTooltipForDropdown
 */
export declare function buildTooltipForDropdown(dropdownName: string, lookupTable: {
    [key: string]: string;
}): Function;
/**
 * Builds an extension function that will install a dynamic tooltip. The
 * tooltip message should include the string '%1' and that string will be
 * replaced with the text of the named field.
 *
 * @param msgTemplate The template form to of the message text, with %1
 *     placeholder.
 * @param fieldName The field with the replacement text.
 * @returns The extension function.
 * @alias Blockly.Extensions.buildTooltipWithFieldText
 */
export declare function buildTooltipWithFieldText(msgTemplate: string, fieldName: string): Function;
//# sourceMappingURL=extensions.d.ts.map