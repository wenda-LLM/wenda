/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Input } from '../../../input.js';
import type { ConstantProvider } from '../../../renderers/common/constants.js';
import { StatementInput as BaseStatementInput } from '../../../renderers/measurables/statement_input.js';
/**
 * An object containing information about the space a statement input takes up
 * during rendering.
 *
 * @alias Blockly.zelos.StatementInput
 */
export declare class StatementInput extends BaseStatementInput {
    connectedBottomNextConnection: boolean;
    /**
     * @param constants The rendering constants provider.
     * @param input The statement input to measure and store information for.
     * @internal
     */
    constructor(constants: ConstantProvider, input: Input);
}
//# sourceMappingURL=inputs.d.ts.map