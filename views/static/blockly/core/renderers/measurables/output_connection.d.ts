/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { RenderedConnection } from '../../rendered_connection.js';
import type { ConstantProvider } from '../common/constants.js';
import { Connection } from './connection.js';
/**
 * An object containing information about the space an output connection takes
 * up during rendering.
 *
 * @alias Blockly.blockRendering.OutputConnection
 */
export declare class OutputConnection extends Connection {
    startX: number;
    connectionOffsetY: number;
    connectionOffsetX: number;
    /**
     * @param constants The rendering constants provider.
     * @param connectionModel The connection object on the block that this
     *     represents.
     * @internal
     */
    constructor(constants: ConstantProvider, connectionModel: RenderedConnection);
}
//# sourceMappingURL=output_connection.d.ts.map