/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ConstantProvider } from '../common/constants.js';
import { Row } from './row.js';
/**
 * An object containing information about a row that holds one or more inputs.
 *
 * @alias Blockly.blockRendering.InputRow
 */
export declare class InputRow extends Row {
    /**
     * The total width of all blocks connected to this row.
     *
     * @internal
     */
    connectedBlockWidths: number;
    /**
     * @param constants The rendering constants provider.
     * @internal
     */
    constructor(constants: ConstantProvider);
    /**
     * Inspect all subcomponents and populate all size properties on the row.
     *
     * @internal
     */
    measure(): void;
    endsWithElemSpacer(): boolean;
}
//# sourceMappingURL=input_row.d.ts.map