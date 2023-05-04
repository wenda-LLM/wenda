/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { VariableModel } from '../variable_model.js';
import { VarBase, VarBaseJson } from './events_var_base.js';
/**
 * Class for a variable rename event.
 *
 * @alias Blockly.Events.VarRename
 */
export declare class VarRename extends VarBase {
    type: string;
    oldName?: string;
    newName?: string;
    /**
     * @param opt_variable The renamed variable. Undefined for a blank event.
     * @param newName The new name the variable will be changed to.
     */
    constructor(opt_variable?: VariableModel, newName?: string);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): VarRenameJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: VarRenameJson): void;
    /**
     * Run a variable rename event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface VarRenameJson extends VarBaseJson {
    oldName: string;
    newName: string;
}
//# sourceMappingURL=events_var_rename.d.ts.map