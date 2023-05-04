/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Input } from '../../input.js';
import type { ConstantProvider } from '../common/constants.js';
import { InputConnection } from './input_connection.js';
/**
 * An object containing information about the space an external value input
 * takes up during rendering
 *
 * @alias Blockly.blockRendering.ExternalValueInput
 */
export declare class ExternalValueInput extends InputConnection {
    height: number;
    width: number;
    connectionOffsetY: number;
    connectionHeight: number;
    connectionWidth: number;
    /**
     * @param constants The rendering constants provider.
     * @param input The external value input to measure and store information for.
     * @internal
     */
    constructor(constants: ConstantProvider, input: Input);
}
//# sourceMappingURL=external_value_input.d.ts.map