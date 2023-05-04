/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { VariableModel } from '../variable_model.js';
import { VarBase, VarBaseJson } from './events_var_base.js';
/**
 * Class for a variable deletion event.
 *
 * @alias Blockly.Events.VarDelete
 */
export declare class VarDelete extends VarBase {
    type: string;
    varType?: string;
    varName?: string;
    /**
     * @param opt_variable The deleted variable. Undefined for a blank event.
     */
    constructor(opt_variable?: VariableModel);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): VarDeleteJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: VarDeleteJson): void;
    /**
     * Run a variable deletion event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface VarDeleteJson extends VarBaseJson {
    varType: string;
    varName: string;
}
//# sourceMappingURL=events_var_delete.d.ts.map