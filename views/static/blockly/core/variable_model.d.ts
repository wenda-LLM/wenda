/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_var_create.js';
import type { Workspace } from './workspace.js';
/**
 * Class for a variable model.
 * Holds information for the variable including name, ID, and type.
 *
 * @see {Blockly.FieldVariable}
 * @alias Blockly.VariableModel
 */
export declare class VariableModel {
    workspace: Workspace;
    name: string;
    type: string;
    private readonly id_;
    /**
     * @param workspace The variable's workspace.
     * @param name The name of the variable.  This is the user-visible name (e.g.
     *     'my var' or '私の変数'), not the generated name.
     * @param opt_type The type of the variable like 'int' or 'string'.
     *     Does not need to be unique. Field_variable can filter variables based
     * on their type. This will default to '' which is a specific type.
     * @param opt_id The unique ID of the variable. This will default to a UUID.
     */
    constructor(workspace: Workspace, name: string, opt_type?: string, opt_id?: string);
    /** @returns The ID for the variable. */
    getId(): string;
    /**
     * A custom compare function for the VariableModel objects.
     *
     * @param var1 First variable to compare.
     * @param var2 Second variable to compare.
     * @returns -1 if name of var1 is less than name of var2, 0 if equal, and 1 if
     *     greater.
     * @internal
     */
    static compareByName(var1: VariableModel, var2: VariableModel): number;
}
//# sourceMappingURL=variable_model.d.ts.map