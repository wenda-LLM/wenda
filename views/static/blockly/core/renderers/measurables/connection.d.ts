/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { RenderedConnection } from '../../rendered_connection.js';
import type { ConstantProvider, Shape } from '../common/constants.js';
import { Measurable } from './base.js';
/**
 * The base class to represent a connection and the space that it takes up on
 * the block.
 *
 * @alias Blockly.blockRendering.Connection
 */
export declare class Connection extends Measurable {
    connectionModel: RenderedConnection;
    shape: Shape;
    isDynamicShape: boolean;
    /**
     * @param constants The rendering constants provider.
     * @param connectionModel The connection object on the block that this
     *     represents.
     * @internal
     */
    constructor(constants: ConstantProvider, connectionModel: RenderedConnection);
}
//# sourceMappingURL=connection.d.ts.map