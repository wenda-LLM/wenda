/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IParameterModel } from '../interfaces/i_parameter_model.js';
import type { IProcedureModel } from '../interfaces/i_procedure_model.js';
import type { Workspace } from '../workspace.js';
export declare class ObservableProcedureModel implements IProcedureModel {
    private readonly workspace;
    private id;
    private name;
    private parameters;
    private returnTypes;
    private enabled;
    constructor(workspace: Workspace, name: string, id?: string);
    /** Sets the human-readable name of the procedure. */
    setName(name: string): this;
    /**
     * Inserts a parameter into the list of parameters.
     *
     * To move a parameter, first delete it, and then re-insert.
     */
    insertParameter(parameterModel: IParameterModel, index: number): this;
    /** Removes the parameter at the given index from the parameter list. */
    deleteParameter(index: number): this;
    /**
     * Sets whether the procedure has a return value (empty array) or no return
     * value (null).
     *
     * The built-in procedure model does not support procedures that have actual
     * return types (i.e. non-empty arrays, e.g. ['number']). If you want your
     * procedure block to have return types, you need to implement your own
     * procedure model.
     */
    setReturnTypes(types: string[] | null): this;
    /**
     * Sets whether this procedure is enabled/disabled. If a procedure is disabled
     * all procedure caller blocks should be disabled as well.
     */
    setEnabled(enabled: boolean): this;
    /** Returns the unique language-neutral ID for the procedure. */
    getId(): string;
    /** Returns the human-readable name of the procedure. */
    getName(): string;
    /** Returns the parameter at the given index in the parameter list. */
    getParameter(index: number): IParameterModel;
    /** Returns an array of all of the parameters in the parameter list. */
    getParameters(): IParameterModel[];
    /**
     * Returns the return type of the procedure.
     *
     * Null represents a procedure that does not return a value.
     */
    getReturnTypes(): string[] | null;
    /**
     * Returns whether the procedure is enabled/disabled. If a procedure is
     * disabled, all procedure caller blocks should be disabled as well.
     */
    getEnabled(): boolean;
}
//# sourceMappingURL=observable_procedure_model.d.ts.map