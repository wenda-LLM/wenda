/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Input } from '../../input.js';
import type { ConstantProvider } from '../common/constants.js';
import { InputConnection } from './input_connection.js';
/**
 * An object containing information about the space a statement input takes up
 * during rendering
 *
 * @alias Blockly.blockRendering.StatementInput
 */
export declare class StatementInput extends InputConnection {
    /**
     * @param constants The rendering constants provider.
     * @param input The statement input to measure and store information for.
     * @internal
     */
    constructor(constants: ConstantProvider, input: Input);
}
//# sourceMappingURL=statement_input.d.ts.map