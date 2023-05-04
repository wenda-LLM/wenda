/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import type { State } from './blocks.js';
/** @alias Blockly.serialization.exceptions.DeserializationError */
export declare class DeserializationError extends Error {
}
/**
 * Represents an error where the serialized state is expected to provide a
 * block type, but it is not provided.
 *
 * @alias Blockly.serialization.exceptions.MissingBlockType
 */
export declare class MissingBlockType extends DeserializationError {
    state: State;
    /**
     * @param state The state object which is missing the block type.
     * @internal
     */
    constructor(state: State);
}
/**
 * Represents an error where deserialization encountered a block that did
 * not have a connection that was defined in the serialized state.
 *
 * @alias Blockly.serialization.exceptions.MissingConnection
 */
export declare class MissingConnection extends DeserializationError {
    block: Block;
    state: State;
    /**
     * @param connection The name of the connection that is missing. E.g.
     *     'IF0', or 'next'.
     * @param block The block missing the connection.
     * @param state The state object containing the bad connection.
     * @internal
     */
    constructor(connection: string, block: Block, state: State);
}
/**
 * Represents an error where deserialization tried to connect two connections
 * that were not compatible.
 *
 * @alias Blockly.serialization.exceptions.BadConnectionCheck
 */
export declare class BadConnectionCheck extends DeserializationError {
    childBlock: Block;
    childState: State;
    /**
     * @param reason The reason the connections were not compatible.
     * @param childConnection The name of the incompatible child connection. E.g.
     *     'output' or 'previous'.
     * @param childBlock The child block that could not connect to its parent.
     * @param childState The state object representing the child block.
     * @internal
     */
    constructor(reason: string, childConnection: string, childBlock: Block, childState: State);
}
/**
 * Represents an error where deserialization encountered a real block as it
 * was deserializing children of a shadow.
 * This is an error because it is an invariant of Blockly that shadow blocks
 * do not have real children.
 *
 * @alias Blockly.serialization.exceptions.RealChildOfShadow
 */
export declare class RealChildOfShadow extends DeserializationError {
    state: State;
    /**
     * @param state The state object representing the real block.
     * @internal
     */
    constructor(state: State);
}
//# sourceMappingURL=exceptions.d.ts.map