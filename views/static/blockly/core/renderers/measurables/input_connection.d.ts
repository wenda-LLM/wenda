/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import type { Input } from '../../input.js';
import type { ConstantProvider } from '../common/constants.js';
import { Connection } from './connection.js';
/**
 * The base class to represent an input that takes up space on a block
 * during rendering
 *
 * @alias Blockly.blockRendering.InputConnection
 */
export declare class InputConnection extends Connection {
    input: Input;
    align: number;
    connectedBlock: BlockSvg | null;
    connectedBlockWidth: number;
    connectedBlockHeight: number;
    connectionOffsetX: number;
    connectionOffsetY: number;
    /**
     * @param constants The rendering constants provider.
     * @param input The input to measure and store information for.
     * @internal
     */
    constructor(constants: ConstantProvider, input: Input);
}
//# sourceMappingURL=input_connection.d.ts.map