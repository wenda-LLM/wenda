/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './field_label.js';
import type { Block } from './block.js';
import type { BlockSvg } from './block_svg.js';
import type { Connection } from './connection.js';
import type { Field } from './field.js';
/**
 * Class for an input with an optional field.
 *
 * @alias Blockly.Input
 */
export declare class Input {
    type: number;
    name: string;
    connection: Connection | null;
    private sourceBlock_;
    fieldRow: Field[];
    align: Align;
    /** Is the input visible? */
    private visible_;
    /**
     * @param type The type of the input.
     * @param name Language-neutral identifier which may used to find this input
     *     again.
     * @param block The block containing this input.
     * @param connection Optional connection for this input.
     */
    constructor(type: number, name: string, block: Block, connection: Connection | null);
    /**
     * Get the source block for this input.
     *
     * @returns The source block, or null if there is none.
     */
    getSourceBlock(): Block;
    /**
     * Add a field (or label from string), and all prefix and suffix fields, to
     * the end of the input's field row.
     *
     * @param field Something to add as a field.
     * @param opt_name Language-neutral identifier which may used to find this
     *     field again.  Should be unique to the host block.
     * @returns The input being append to (to allow chaining).
     */
    appendField(field: string | Field, opt_name?: string): Input;
    /**
     * Inserts a field (or label from string), and all prefix and suffix fields,
     * at the location of the input's field row.
     *
     * @param index The index at which to insert field.
     * @param field Something to add as a field.
     * @param opt_name Language-neutral identifier which may used to find this
     *     field again.  Should be unique to the host block.
     * @returns The index following the last inserted field.
     */
    insertFieldAt(index: number, field: string | Field, opt_name?: string): number;
    /**
     * Remove a field from this input.
     *
     * @param name The name of the field.
     * @param opt_quiet True to prevent an error if field is not present.
     * @returns True if operation succeeds, false if field is not present and
     *     opt_quiet is true.
     * @throws {Error} if the field is not present and opt_quiet is false.
     */
    removeField(name: string, opt_quiet?: boolean): boolean;
    /**
     * Gets whether this input is visible or not.
     *
     * @returns True if visible.
     */
    isVisible(): boolean;
    /**
     * Sets whether this input is visible or not.
     * Should only be used to collapse/uncollapse a block.
     *
     * @param visible True if visible.
     * @returns List of blocks to render.
     * @internal
     */
    setVisible(visible: boolean): BlockSvg[];
    /**
     * Mark all fields on this input as dirty.
     *
     * @internal
     */
    markDirty(): void;
    /**
     * Change a connection's compatibility.
     *
     * @param check Compatible value type or list of value types.  Null if all
     *     types are compatible.
     * @returns The input being modified (to allow chaining).
     */
    setCheck(check: string | string[] | null): Input;
    /**
     * Change the alignment of the connection's field(s).
     *
     * @param align One of the values of Align.  In RTL mode directions
     *     are reversed, and Align.RIGHT aligns to the left.
     * @returns The input being modified (to allow chaining).
     */
    setAlign(align: Align): Input;
    /**
     * Changes the connection's shadow block.
     *
     * @param shadow DOM representation of a block or null.
     * @returns The input being modified (to allow chaining).
     */
    setShadowDom(shadow: Element | null): Input;
    /**
     * Returns the XML representation of the connection's shadow block.
     *
     * @returns Shadow DOM representation of a block or null.
     */
    getShadowDom(): Element | null;
    /** Initialize the fields on this input. */
    init(): void;
    /**
     * Sever all links to this input.
     *
     * @suppress {checkTypes}
     */
    dispose(): void;
}
export declare namespace Input {
    /**
     * Enum for alignment of inputs.
     *
     * @alias Blockly.Input.Align
     */
    enum Align {
        LEFT = -1,
        CENTRE = 0,
        RIGHT = 1
    }
}
export declare type Align = Input.Align;
export declare const Align: typeof Input.Align;
//# sourceMappingURL=input.d.ts.map