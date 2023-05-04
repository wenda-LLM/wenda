/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Wrapper to window.alert() that app developers may override via setAlert to
 * provide alternatives to the modal browser window.
 *
 * @param message The message to display to the user.
 * @param opt_callback The callback when the alert is dismissed.
 * @alias Blockly.dialog.alert
 */
export declare function alert(message: string, opt_callback?: () => void): void;
/**
 * Sets the function to be run when Blockly.dialog.alert() is called.
 *
 * @param alertFunction The function to be run.
 * @see Blockly.dialog.alert
 * @alias Blockly.dialog.setAlert
 */
export declare function setAlert(alertFunction: (p1: string, p2?: () => void) => void): void;
/**
 * Wrapper to window.confirm() that app developers may override via setConfirm
 * to provide alternatives to the modal browser window.
 *
 * @param message The message to display to the user.
 * @param callback The callback for handling user response.
 * @alias Blockly.dialog.confirm
 */
export declare function confirm(message: string, callback: (p1: boolean) => void): void;
/**
 * Private version of confirm for stubbing in tests.
 */
declare function confirmInternal(message: string, callback: (p1: boolean) => void): void;
/**
 * Sets the function to be run when Blockly.dialog.confirm() is called.
 *
 * @param confirmFunction The function to be run.
 * @see Blockly.dialog.confirm
 * @alias Blockly.dialog.setConfirm
 */
export declare function setConfirm(confirmFunction: (p1: string, p2: (p1: boolean) => void) => void): void;
/**
 * Wrapper to window.prompt() that app developers may override via setPrompt to
 * provide alternatives to the modal browser window. Built-in browser prompts
 * are often used for better text input experience on mobile device. We strongly
 * recommend testing mobile when overriding this.
 *
 * @param message The message to display to the user.
 * @param defaultValue The value to initialize the prompt with.
 * @param callback The callback for handling user response.
 * @alias Blockly.dialog.prompt
 */
export declare function prompt(message: string, defaultValue: string, callback: (p1: string | null) => void): void;
/**
 * Sets the function to be run when Blockly.dialog.prompt() is called.
 *
 * @param promptFunction The function to be run.
 * @see Blockly.dialog.prompt
 * @alias Blockly.dialog.setPrompt
 */
export declare function setPrompt(promptFunction: (p1: string, p2: string, p3: (p1: string | null) => void) => void): void;
export declare const TEST_ONLY: {
    confirmInternal: typeof confirmInternal;
};
export {};
//# sourceMappingURL=dialog.d.ts.map