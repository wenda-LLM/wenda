/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import type { Input } from './input.js';
import type { IASTNodeLocationWithBlock } from './interfaces/i_ast_node_location_with_block.js';
import type { IConnectionChecker } from './interfaces/i_connection_checker.js';
import * as blocks from './serialization/blocks.js';
/**
 * Class for a connection between blocks.
 *
 * @alias Blockly.Connection
 */
export declare class Connection implements IASTNodeLocationWithBlock {
    type: number;
    /** Constants for checking whether two connections are compatible. */
    static CAN_CONNECT: number;
    static REASON_SELF_CONNECTION: number;
    static REASON_WRONG_TYPE: number;
    static REASON_TARGET_NULL: number;
    static REASON_CHECKS_FAILED: number;
    static REASON_DIFFERENT_WORKSPACES: number;
    static REASON_SHADOW_PARENT: number;
    static REASON_DRAG_CHECKS_FAILED: number;
    static REASON_PREVIOUS_AND_OUTPUT: number;
    protected sourceBlock_: Block;
    /** Connection this connection connects to.  Null if not connected. */
    targetConnection: Connection | null;
    /**
     * Has this connection been disposed of?
     *
     * @internal
     */
    disposed: boolean;
    /** List of compatible value types.  Null if all types are compatible. */
    private check_;
    /** DOM representation of a shadow block, or null if none. */
    private shadowDom_;
    /**
     * Horizontal location of this connection.
     *
     * @internal
     */
    x: number;
    /**
     * Vertical location of this connection.
     *
     * @internal
     */
    y: number;
    private shadowState_;
    /**
     * @param source The block establishing this connection.
     * @param type The type of the connection.
     */
    constructor(source: Block, type: number);
    /**
     * Connect two connections together.  This is the connection on the superior
     * block.
     *
     * @param childConnection Connection on inferior block.
     */
    protected connect_(childConnection: Connection): void;
    /**
     * Dispose of this connection and deal with connected blocks.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Get the source block for this connection.
     *
     * @returns The source block.
     */
    getSourceBlock(): Block;
    /**
     * Does the connection belong to a superior block (higher in the source
     * stack)?
     *
     * @returns True if connection faces down or right.
     */
    isSuperior(): boolean;
    /**
     * Is the connection connected?
     *
     * @returns True if connection is connected to another connection.
     */
    isConnected(): boolean;
    /**
     * Get the workspace's connection type checker object.
     *
     * @returns The connection type checker for the source block's workspace.
     * @internal
     */
    getConnectionChecker(): IConnectionChecker;
    /**
     * Called when an attempted connection fails. NOP by default (i.e. for
     * headless workspaces).
     *
     * @param _otherConnection Connection that this connection failed to connect
     *     to.
     * @internal
     */
    onFailedConnect(_otherConnection: Connection): void;
    /**
     * Connect this connection to another connection.
     *
     * @param otherConnection Connection to connect to.
     * @returns Whether the the blocks are now connected or not.
     */
    connect(otherConnection: Connection): boolean;
    /** Disconnect this connection. */
    disconnect(): void;
    /**
     * Disconnect two blocks that are connected by this connection.
     *
     * @param parentBlock The superior block.
     * @param childBlock The inferior block.
     */
    protected disconnectInternal_(parentBlock: Block, childBlock: Block): void;
    /**
     * Respawn the shadow block if there was one connected to the this connection.
     */
    protected respawnShadow_(): void;
    /**
     * Returns the block that this connection connects to.
     *
     * @returns The connected block or null if none is connected.
     */
    targetBlock(): Block | null;
    /**
     * Function to be called when this connection's compatible types have changed.
     */
    protected onCheckChanged_(): void;
    /**
     * Change a connection's compatibility.
     *
     * @param check Compatible value type or list of value types. Null if all
     *     types are compatible.
     * @returns The connection being modified (to allow chaining).
     */
    setCheck(check: string | string[] | null): Connection;
    /**
     * Get a connection's compatibility.
     *
     * @returns List of compatible value types.
     *     Null if all types are compatible.
     */
    getCheck(): string[] | null;
    /**
     * Changes the connection's shadow block.
     *
     * @param shadowDom DOM representation of a block or null.
     */
    setShadowDom(shadowDom: Element | null): void;
    /**
     * Returns the xml representation of the connection's shadow block.
     *
     * @param returnCurrent If true, and the shadow block is currently attached to
     *     this connection, this serializes the state of that block and returns it
     *     (so that field values are correct). Otherwise the saved shadowDom is
     *     just returned.
     * @returns Shadow DOM representation of a block or null.
     */
    getShadowDom(returnCurrent?: boolean): Element | null;
    /**
     * Changes the connection's shadow block.
     *
     * @param shadowState An state represetation of the block or null.
     */
    setShadowState(shadowState: blocks.State | null): void;
    /**
     * Returns the serialized object representation of the connection's shadow
     * block.
     *
     * @param returnCurrent If true, and the shadow block is currently attached to
     *     this connection, this serializes the state of that block and returns it
     *     (so that field values are correct). Otherwise the saved state is just
     *     returned.
     * @returns Serialized object representation of the block, or null.
     */
    getShadowState(returnCurrent?: boolean): blocks.State | null;
    /**
     * Find all nearby compatible connections to this connection.
     * Type checking does not apply, since this function is used for bumping.
     *
     * Headless configurations (the default) do not have neighboring connection,
     * and always return an empty list (the default).
     * {@link RenderedConnection#neighbours} overrides this behavior with a list
     * computed from the rendered positioning.
     *
     * @param _maxLimit The maximum radius to another connection.
     * @returns List of connections.
     * @internal
     */
    neighbours(_maxLimit: number): Connection[];
    /**
     * Get the parent input of a connection.
     *
     * @returns The input that the connection belongs to or null if no parent
     *     exists.
     * @internal
     */
    getParentInput(): Input | null;
    /**
     * This method returns a string describing this Connection in developer terms
     * (English only). Intended to on be used in console logs and errors.
     *
     * @returns The description.
     */
    toString(): string;
    /**
     * Returns the state of the shadowDom_ and shadowState_ properties, then
     * temporarily sets those properties to null so no shadow respawns.
     *
     * @returns The state of both the shadowDom_ and shadowState_ properties.
     */
    private stashShadowState_;
    /**
     * Reapplies the stashed state of the shadowDom_ and shadowState_ properties.
     *
     * @param param0 The state to reapply to the shadowDom_ and shadowState_
     *     properties.
     */
    private applyShadowState_;
    /**
     * Sets the state of the shadow of this connection.
     *
     * @param param0 The state to set the shadow of this connection to.
     */
    private setShadowStateInternal_;
    /**
     * Creates a shadow block based on the current shadowState_ or shadowDom_.
     * shadowState_ gets priority.
     *
     * @param attemptToConnect Whether to try to connect the shadow block to this
     *     connection or not.
     * @returns The shadow block that was created, or null if both the
     *     shadowState_ and shadowDom_ are null.
     */
    private createShadowBlock_;
    /**
     * Saves the given shadow block to both the shadowDom_ and shadowState_
     * properties, in their respective serialized forms.
     *
     * @param shadow The shadow to serialize, or null.
     */
    private serializeShadow_;
    /**
     * Returns the connection (starting at the startBlock) which will accept
     * the given connection. This includes compatible connection types and
     * connection checks.
     *
     * @param startBlock The block on which to start the search.
     * @param orphanConnection The connection that is looking for a home.
     * @returns The suitable connection point on the chain of blocks, or null.
     */
    static getConnectionForOrphanedConnection(startBlock: Block, orphanConnection: Connection): Connection | null;
}
//# sourceMappingURL=connection.d.ts.map