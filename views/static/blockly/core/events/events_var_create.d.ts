/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { VariableModel } from '../variable_model.js';
import { VarBase, VarBaseJson } from './events_var_base.js';
/**
 * Class for a variable creation event.
 *
 * @alias Blockly.Events.VarCreate
 */
export declare class VarCreate extends VarBase {
    type: string;
    varType?: string;
    varName?: string;
    /**
     * @param opt_variable The created variable. Undefined for a blank event.
     */
    constructor(opt_variable?: VariableModel);
    /**
     * Encode the event as JSON.
     *
     * @returns JSON representation.
     */
    toJson(): VarCreateJson;
    /**
     * Decode the JSON event.
     *
     * @param json JSON representation.
     */
    fromJson(json: VarCreateJson): void;
    /**
     * Run a variable creation event.
     *
     * @param forward True if run forward, false if run backward (undo).
     */
    run(forward: boolean): void;
}
export interface VarCreateJson extends VarBaseJson {
    varType: string;
    varName: string;
}
//# sourceMappingURL=events_var_create.d.ts.map