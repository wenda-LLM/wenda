/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConstantProvider as BaseConstantProvider } from '../common/constants.js';
/**
 * An object that provides constants for rendering blocks in Geras mode.
 *
 * @alias Blockly.geras.ConstantProvider
 */
export declare class ConstantProvider extends BaseConstantProvider {
    FIELD_TEXT_BASELINE_CENTER: boolean;
    DARK_PATH_OFFSET: number;
    /**
     * The maximum width of a bottom row that follows a statement input and has
     * inputs inline.
     */
    MAX_BOTTOM_WIDTH: number;
    STATEMENT_BOTTOM_SPACER: number;
    /**
     * @internal
     */
    constructor();
    getCSS_(selector: string): string[];
}
//# sourceMappingURL=constants.d.ts.map