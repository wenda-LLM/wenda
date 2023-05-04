/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IParameterModel } from '../interfaces/i_parameter_model.js';
import type { VariableModel } from '../variable_model.js';
import type { Workspace } from '../workspace.js';
export declare class ObservableParameterModel implements IParameterModel {
    private readonly workspace;
    private id;
    private variable;
    constructor(workspace: Workspace, name: string, id?: string);
    /**
     * Sets the name of this parameter to the given name.
     */
    setName(name: string): this;
    /**
     * Unimplemented. The built-in ParameterModel does not support typing.
     * If you want your procedure blocks to have typed parameters, you need to
     * implement your own ParameterModel.
     *
     * @throws Throws for the ObservableParameterModel specifically because this
     *     method is unimplemented.
     */
    setTypes(_types: string[]): this;
    /**
     * Returns the name of this parameter.
     */
    getName(): string;
    /**
     * Returns the types of this parameter.
     */
    getTypes(): string[];
    /**
     * Returns the unique language-neutral ID for the parameter.
     *
     * This represents the identify of the variable model which does not change
     * over time.
     */
    getId(): string;
    /** Returns the variable model associated with the parameter model. */
    getVariableModel(): VariableModel;
}
//# sourceMappingURL=observable_parameter_model.d.ts.map