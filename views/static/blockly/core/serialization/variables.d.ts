/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ISerializer } from '../interfaces/i_serializer.js';
import type { Workspace } from '../workspace.js';
/**
 * Represents the state of a given variable.
 *
 * @alias Blockly.serialization.variables.State
 */
export interface State {
    name: string;
    id: string;
    type: string | undefined;
}
/**
 * Serializer for saving and loading variable state.
 *
 * @alias Blockly.serialization.variables.VariableSerializer
 */
export declare class VariableSerializer implements ISerializer {
    priority: number;
    constructor();
    /**
     * Serializes the variables of the given workspace.
     *
     * @param workspace The workspace to save the variables of.
     * @returns The state of the workspace's variables, or null if there are no
     *     variables.
     */
    save(workspace: Workspace): State[] | null;
    /**
     * Deserializes the variable defined by the given state into the given
     * workspace.
     *
     * @param state The state of the variables to deserialize.
     * @param workspace The workspace to deserialize into.
     */
    load(state: State[], workspace: Workspace): void;
    /**
     * Disposes of any variables that exist on the workspace.
     *
     * @param workspace The workspace to clear the variables of.
     */
    clear(workspace: Workspace): void;
}
//# sourceMappingURL=variables.d.ts.map