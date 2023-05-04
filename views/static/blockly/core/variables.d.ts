/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { VariableModel } from './variable_model.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * variable blocks.
 * See also Blockly.Procedures.CATEGORY_NAME and
 * Blockly.VariablesDynamic.CATEGORY_NAME.
 *
 * @alias Blockly.Variables.CATEGORY_NAME
 */
export declare const CATEGORY_NAME = "VARIABLE";
/**
 * Find all user-created variables that are in use in the workspace.
 * For use by generators.
 * To get a list of all variables on a workspace, including unused variables,
 * call Workspace.getAllVariables.
 *
 * @param ws The workspace to search for variables.
 * @returns Array of variable models.
 * @alias Blockly.Variables.allUsedVarModels
 */
export declare function allUsedVarModels(ws: Workspace): VariableModel[];
/**
 * Find all developer variables used by blocks in the workspace.
 * Developer variables are never shown to the user, but are declared as global
 * variables in the generated code.
 * To declare developer variables, define the getDeveloperVariables function on
 * your block and return a list of variable names.
 * For use by generators.
 *
 * @param workspace The workspace to search.
 * @returns A list of non-duplicated variable names.
 * @alias Blockly.Variables.allDeveloperVariables
 */
export declare function allDeveloperVariables(workspace: Workspace): string[];
/**
 * Construct the elements (blocks and button) required by the flyout for the
 * variable category.
 *
 * @param workspace The workspace containing variables.
 * @returns Array of XML elements.
 * @alias Blockly.Variables.flyoutCategory
 */
export declare function flyoutCategory(workspace: WorkspaceSvg): Element[];
/**
 * Construct the blocks required by the flyout for the variable category.
 *
 * @param workspace The workspace containing variables.
 * @returns Array of XML block elements.
 * @alias Blockly.Variables.flyoutCategoryBlocks
 */
export declare function flyoutCategoryBlocks(workspace: Workspace): Element[];
/** @alias Blockly.Variables.VAR_LETTER_OPTIONS */
export declare const VAR_LETTER_OPTIONS = "ijkmnopqrstuvwxyzabcdefgh";
/**
 * Return a new variable name that is not yet being used. This will try to
 * generate single letter variable names in the range 'i' to 'z' to start with.
 * If no unique name is located it will try 'i' to 'z', 'a' to 'h',
 * then 'i2' to 'z2' etc.  Skip 'l'.
 *
 * @param workspace The workspace to be unique in.
 * @returns New variable name.
 * @alias Blockly.Variables.generateUniqueName
 */
export declare function generateUniqueName(workspace: Workspace): string;
/**
 * Private version of generateUniqueName for stubbing in tests.
 */
declare function generateUniqueNameInternal(workspace: Workspace): string;
/**
 * Returns a unique name that is not present in the usedNames array. This
 * will try to generate single letter names in the range a - z (skip l). It
 * will start with the character passed to startChar.
 *
 * @param startChar The character to start the search at.
 * @param usedNames A list of all of the used names.
 * @returns A unique name that is not present in the usedNames array.
 * @alias Blockly.Variables.generateUniqueNameFromOptions
 */
export declare function generateUniqueNameFromOptions(startChar: string, usedNames: string[]): string;
/**
 * Handles "Create Variable" button in the default variables toolbox category.
 * It will prompt the user for a variable name, including re-prompts if a name
 * is already in use among the workspace's variables.
 *
 * Custom button handlers can delegate to this function, allowing variables
 * types and after-creation processing. More complex customization (e.g.,
 * prompting for variable type) is beyond the scope of this function.
 *
 * @param workspace The workspace on which to create the variable.
 * @param opt_callback A callback. It will be passed an acceptable new variable
 *     name, or null if change is to be aborted (cancel button), or undefined if
 *     an existing variable was chosen.
 * @param opt_type The type of the variable like 'int', 'string', or ''. This
 *     will default to '', which is a specific type.
 * @alias Blockly.Variables.createVariableButtonHandler
 */
export declare function createVariableButtonHandler(workspace: Workspace, opt_callback?: (p1?: string | null) => void, opt_type?: string): void;
/**
 * Opens a prompt that allows the user to enter a new name for a variable.
 * Triggers a rename if the new name is valid. Or re-prompts if there is a
 * collision.
 *
 * @param workspace The workspace on which to rename the variable.
 * @param variable Variable to rename.
 * @param opt_callback A callback. It will be passed an acceptable new variable
 *     name, or null if change is to be aborted (cancel button), or undefined if
 *     an existing variable was chosen.
 * @alias Blockly.Variables.renameVariable
 */
export declare function renameVariable(workspace: Workspace, variable: VariableModel, opt_callback?: (p1?: string | null) => void): void;
/**
 * Prompt the user for a new variable name.
 *
 * @param promptText The string of the prompt.
 * @param defaultText The default value to show in the prompt's field.
 * @param callback A callback. It will be passed the new variable name, or null
 *     if the user picked something illegal.
 * @alias Blockly.Variables.promptName
 */
export declare function promptName(promptText: string, defaultText: string, callback: (p1: string | null) => void): void;
/**
 * Check whether there exists a variable with the given name of any type.
 *
 * @param name The name to search for.
 * @param workspace The workspace to search for the variable.
 * @returns The variable with the given name, or null if none was found.
 * @alias Blockly.Variables.nameUsedWithAnyType
 */
export declare function nameUsedWithAnyType(name: string, workspace: Workspace): VariableModel | null;
/**
 * Generate DOM objects representing a variable field.
 *
 * @param variableModel The variable model to represent.
 * @returns The generated DOM.
 * @alias Blockly.Variables.generateVariableFieldDom
 */
export declare function generateVariableFieldDom(variableModel: VariableModel): Element;
/**
 * Helper function to look up or create a variable on the given workspace.
 * If no variable exists, creates and returns it.
 *
 * @param workspace The workspace to search for the variable.  It may be a
 *     flyout workspace or main workspace.
 * @param id The ID to use to look up or create the variable, or null.
 * @param opt_name The string to use to look up or create the variable.
 * @param opt_type The type to use to look up or create the variable.
 * @returns The variable corresponding to the given ID or name + type
 *     combination.
 * @alias Blockly.Variables.getOrCreateVariablePackage
 */
export declare function getOrCreateVariablePackage(workspace: Workspace, id: string | null, opt_name?: string, opt_type?: string): VariableModel;
/**
 * Look up  a variable on the given workspace.
 * Always looks in the main workspace before looking in the flyout workspace.
 * Always prefers lookup by ID to lookup by name + type.
 *
 * @param workspace The workspace to search for the variable.  It may be a
 *     flyout workspace or main workspace.
 * @param id The ID to use to look up the variable, or null.
 * @param opt_name The string to use to look up the variable.
 *     Only used if lookup by ID fails.
 * @param opt_type The type to use to look up the variable.
 *     Only used if lookup by ID fails.
 * @returns The variable corresponding to the given ID or name + type
 *     combination, or null if not found.
 * @alias Blockly.Variables.getVariable
 */
export declare function getVariable(workspace: Workspace, id: string | null, opt_name?: string, opt_type?: string): VariableModel | null;
/**
 * Helper function to get the list of variables that have been added to the
 * workspace after adding a new block, using the given list of variables that
 * were in the workspace before the new block was added.
 *
 * @param workspace The workspace to inspect.
 * @param originalVariables The array of variables that existed in the workspace
 *     before adding the new block.
 * @returns The new array of variables that were freshly added to the workspace
 *     after creating the new block, or [] if no new variables were added to the
 *     workspace.
 * @alias Blockly.Variables.getAddedVariables
 * @internal
 */
export declare function getAddedVariables(workspace: Workspace, originalVariables: VariableModel[]): VariableModel[];
export declare const TEST_ONLY: {
    generateUniqueNameInternal: typeof generateUniqueNameInternal;
};
export {};
//# sourceMappingURL=variables.d.ts.map