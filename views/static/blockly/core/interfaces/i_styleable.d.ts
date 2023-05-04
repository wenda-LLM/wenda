/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Interface for an object that a style can be added to.
 *
 * @alias Blockly.IStyleable
 */
export interface IStyleable {
    /**
     * Adds a style on the toolbox. Usually used to change the cursor.
     *
     * @param style The name of the class to add.
     */
    addStyle(style: string): void;
    /**
     * Removes a style from the toolbox. Usually used to change the cursor.
     *
     * @param style The name of the class to remove.
     */
    removeStyle(style: string): void;
}
//# sourceMappingURL=i_styleable.d.ts.map