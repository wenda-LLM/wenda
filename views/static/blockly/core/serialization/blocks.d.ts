/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import type { Connection } from '../connection.js';
import type { ISerializer } from '../interfaces/i_serializer.js';
import type { Workspace } from '../workspace.js';
/**
 * Represents the state of a connection.
 *
 * @alias Blockly.serialization.blocks.ConnectionState
 */
export interface ConnectionState {
    shadow: State | undefined;
    block: State | undefined;
}
/**
 * Represents the state of a given block.
 *
 * @alias Blockly.serialization.blocks.State
 */
export interface State {
    type: string;
    id?: string;
    x?: number;
    y?: number;
    collapsed?: boolean;
    enabled?: boolean;
    inline?: boolean;
    data?: string;
    extraState?: any;
    icons?: {
        [key: string]: any;
    };
    fields?: {
        [key: string]: any;
    };
    inputs?: {
        [key: string]: ConnectionState;
    };
    next?: ConnectionState;
}
/**
 * Returns the state of the given block as a plain JavaScript object.
 *
 * @param block The block to serialize.
 * @param param1 addCoordinates: If true, the coordinates of the block are added
 *     to the serialized state. False by default. addinputBlocks: If true,
 *     children of the block which are connected to inputs will be serialized.
 *     True by default. addNextBlocks: If true, children of the block which are
 *     connected to the block's next connection (if it exists) will be
 *     serialized. True by default. doFullSerialization: If true, fields that
 *     normally just save a reference to some external state (eg variables) will
 *     instead serialize all of the info about that state. This supports
 *     deserializing the block into a workspace where that state doesn't yet
 *     exist. True by default.
 * @returns The serialized state of the block, or null if the block could not be
 *     serialied (eg it was an insertion marker).
 * @alias Blockly.serialization.blocks.save
 */
export declare function save(block: Block, { addCoordinates, addInputBlocks, addNextBlocks, doFullSerialization, }?: {
    addCoordinates?: boolean;
    addInputBlocks?: boolean;
    addNextBlocks?: boolean;
    doFullSerialization?: boolean;
}): State | null;
/**
 * Loads the block represented by the given state into the given workspace.
 *
 * @param state The state of a block to deserialize into the workspace.
 * @param workspace The workspace to add the block to.
 * @param param1 recordUndo: If true, events triggered by this function will be
 *     undo-able by the user. False by default.
 * @returns The block that was just loaded.
 * @alias Blockly.serialization.blocks.append
 */
export declare function append(state: State, workspace: Workspace, { recordUndo }?: {
    recordUndo?: boolean;
}): Block;
/**
 * Loads the block represented by the given state into the given workspace.
 * This is defined internally so that the extra parameters don't clutter our
 * external API.
 * But it is exported so that other places within Blockly can call it directly
 * with the extra parameters.
 *
 * @param state The state of a block to deserialize into the workspace.
 * @param workspace The workspace to add the block to.
 * @param param1 parentConnection: If provided, the system will attempt to
 *     connect the block to this connection after it is created. Undefined by
 *     default. isShadow: If true, the block will be set to a shadow block after
 *     it is created. False by default. recordUndo: If true, events triggered by
 *     this function will be undo-able by the user. False by default.
 * @returns The block that was just appended.
 * @alias Blockly.serialization.blocks.appendInternal
 * @internal
 */
export declare function appendInternal(state: State, workspace: Workspace, { parentConnection, isShadow, recordUndo }?: {
    parentConnection?: Connection;
    isShadow?: boolean;
    recordUndo?: boolean;
}): Block;
/**
 * Serializer for saving and loading block state.
 *
 * @alias Blockly.serialization.blocks.BlockSerializer
 */
export declare class BlockSerializer implements ISerializer {
    priority: number;
    constructor();
    /**
     * Serializes the blocks of the given workspace.
     *
     * @param workspace The workspace to save the blocks of.
     * @returns The state of the workspace's blocks, or null if there are no
     *     blocks.
     */
    save(workspace: Workspace): {
        languageVersion: number;
        blocks: State[];
    } | null;
    /**
     * Deserializes the blocks defined by the given state into the given
     * workspace.
     *
     * @param state The state of the blocks to deserialize.
     * @param workspace The workspace to deserialize into.
     */
    load(state: {
        languageVersion: number;
        blocks: State[];
    }, workspace: Workspace): void;
    /**
     * Disposes of any blocks that exist on the workspace.
     *
     * @param workspace The workspace to clear the blocks of.
     */
    clear(workspace: Workspace): void;
}
//# sourceMappingURL=blocks.d.ts.map