/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_change.js';
import type { Block } from './block.js';
import type { Abstract } from './events/events_abstract.js';
import { Field } from './field.js';
import { ObservableProcedureMap } from './procedures/observable_procedure_map.js';
import { ObservableProcedureModel } from './procedures/observable_procedure_model.js';
import { ObservableParameterModel } from './procedures/observable_parameter_model.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * procedure blocks.
 * See also Blockly.Variables.CATEGORY_NAME and
 * Blockly.VariablesDynamic.CATEGORY_NAME.
 *
 * @alias Blockly.Procedures.CATEGORY_NAME
 */
export declare const CATEGORY_NAME = "PROCEDURE";
/**
 * The default argument for a procedures_mutatorarg block.
 *
 * @alias Blockly.Procedures.DEFAULT_ARG
 */
export declare const DEFAULT_ARG = "x";
export declare type ProcedureTuple = [string, string[], boolean];
/**
 * Procedure block type.
 *
 * @alias Blockly.Procedures.ProcedureBlock
 */
export interface ProcedureBlock {
    getProcedureCall: () => string;
    renameProcedure: (p1: string, p2: string) => void;
    getProcedureDef: () => ProcedureTuple;
}
/**
 * Find all user-created procedure definitions in a workspace.
 *
 * @param root Root workspace.
 * @returns Pair of arrays, the first contains procedures without return
 *     variables, the second with. Each procedure is defined by a three-element
 *     list of name, parameter list, and return value boolean.
 * @alias Blockly.Procedures.allProcedures
 */
export declare function allProcedures(root: Workspace): [
    ProcedureTuple[],
    ProcedureTuple[]
];
/**
 * Ensure two identically-named procedures don't exist.
 * Take the proposed procedure name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other procedures.
 *
 * @param name Proposed procedure name.
 * @param block Block to disambiguate.
 * @returns Non-colliding name.
 * @alias Blockly.Procedures.findLegalName
 */
export declare function findLegalName(name: string, block: Block): string;
/**
 * Return if the given name is already a procedure name.
 *
 * @param name The questionable name.
 * @param workspace The workspace to scan for collisions.
 * @param opt_exclude Optional block to exclude from comparisons (one doesn't
 *     want to collide with oneself).
 * @returns True if the name is used, otherwise return false.
 * @alias Blockly.Procedures.isNameUsed
 */
export declare function isNameUsed(name: string, workspace: Workspace, opt_exclude?: Block): boolean;
/**
 * Rename a procedure.  Called by the editable field.
 *
 * @param name The proposed new name.
 * @returns The accepted name.
 * @alias Blockly.Procedures.rename
 */
export declare function rename(this: Field, name: string): string;
/**
 * Construct the blocks required by the flyout for the procedure category.
 *
 * @param workspace The workspace containing procedures.
 * @returns Array of XML block elements.
 * @alias Blockly.Procedures.flyoutCategory
 */
export declare function flyoutCategory(workspace: WorkspaceSvg): Element[];
/**
 * Listens for when a procedure mutator is opened. Then it triggers a flyout
 * update and adds a mutator change listener to the mutator workspace.
 *
 * @param e The event that triggered this listener.
 * @alias Blockly.Procedures.mutatorOpenListener
 * @internal
 */
export declare function mutatorOpenListener(e: Abstract): void;
/**
 * Find all the callers of a named procedure.
 *
 * @param name Name of procedure.
 * @param workspace The workspace to find callers in.
 * @returns Array of caller blocks.
 * @alias Blockly.Procedures.getCallers
 */
export declare function getCallers(name: string, workspace: Workspace): Block[];
/**
 * When a procedure definition changes its parameters, find and edit all its
 * callers.
 *
 * @param defBlock Procedure definition block.
 * @alias Blockly.Procedures.mutateCallers
 */
export declare function mutateCallers(defBlock: Block): void;
/**
 * Find the definition block for the named procedure.
 *
 * @param name Name of procedure.
 * @param workspace The workspace to search.
 * @returns The procedure definition block, or null not found.
 * @alias Blockly.Procedures.getDefinition
 */
export declare function getDefinition(name: string, workspace: Workspace): Block | null;
export { ObservableProcedureMap, ObservableProcedureModel, ObservableParameterModel, };
//# sourceMappingURL=procedures.d.ts.map