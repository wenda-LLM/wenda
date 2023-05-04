/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_bubble_open.js';
import type { Block } from './block.js';
import type { BlockSvg } from './block_svg.js';
import type { Connection } from './connection.js';
import type { Abstract } from './events/events_abstract.js';
import { Icon } from './icon.js';
import { Options } from './options.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a mutator dialog.
 *
 * @alias Blockly.Mutator
 */
export declare class Mutator extends Icon {
    private quarkNames;
    /**
     * Workspace in the mutator's bubble.
     * Due to legacy code in procedure block definitions, this name
     * cannot change.
     */
    private workspace_;
    /** Width of workspace. */
    private workspaceWidth;
    /** Height of workspace. */
    private workspaceHeight;
    /**
     * The SVG element that is the parent of the mutator workspace, or null if
     * not created.
     */
    private svgDialog;
    /**
     * The root block of the mutator workspace, created by decomposing the
     * source block.
     */
    private rootBlock;
    /**
     * Function registered on the main workspace to update the mutator contents
     * when the main workspace changes.
     */
    private sourceListener;
    /**
     * The PID associated with the updateWorkpace_ timeout, or null if no timeout
     * is currently running.
     */
    private updateWorkspacePid;
    /** @param quarkNames List of names of sub-blocks for flyout. */
    constructor(quarkNames: string[], block?: BlockSvg);
    /**
     * Set the block this mutator is associated with.
     *
     * @param block The block associated with this mutator.
     * @internal
     */
    setBlock(block: BlockSvg): void;
    /**
     * Returns the workspace inside this mutator icon's bubble.
     *
     * @returns The workspace inside this mutator icon's bubble or null if the
     *     mutator isn't open.
     * @internal
     */
    getWorkspace(): WorkspaceSvg | null;
    /**
     * Draw the mutator icon.
     *
     * @param group The icon group.
     */
    protected drawIcon_(group: Element): void;
    /**
     * Clicking on the icon toggles if the mutator bubble is visible.
     * Disable if block is uneditable.
     *
     * @param e Mouse click event.
     */
    protected iconClick_(e: MouseEvent): void;
    /**
     * Create the editor for the mutator's bubble.
     *
     * @returns The top-level node of the editor.
     */
    private createEditor;
    /**
     * @internal
     */
    newWorkspaceSvg(options: Options): WorkspaceSvg;
    /** Add or remove the UI indicating if this icon may be clicked or not. */
    updateEditable(): void;
    /** Resize the bubble to match the size of the workspace. */
    private resizeBubble;
    /** A method handler for when the bubble is moved. */
    private onBubbleMove;
    /**
     * Show or hide the mutator bubble.
     *
     * @param visible True if the bubble should be visible.
     */
    setVisible(visible: boolean): void;
    /**
     * Fired whenever a change is made to the mutator's workspace.
     *
     * @param e Custom data for event.
     */
    private workspaceChanged;
    /**
     * Returns whether the given event in the mutator workspace should be ignored
     * when deciding whether to update the workspace and compose the block or not.
     *
     * @param e The event.
     * @returns Whether to ignore the event or not.
     */
    shouldIgnoreMutatorEvent_(e: Abstract): boolean;
    /**
     * Updates the source block when the mutator's blocks are changed.
     * Bump down any block that's too high.
     */
    private updateWorkspace;
    /** Dispose of this mutator. */
    dispose(): void;
    /** Update the styles on all blocks in the mutator. */
    updateBlockStyle(): void;
    /**
     * Reconnect an block to a mutated input.
     *
     * @param connectionChild Connection on child block.
     * @param block Parent block.
     * @param inputName Name of input on parent block.
     * @returns True iff a reconnection was made, false otherwise.
     */
    static reconnect(connectionChild: Connection, block: Block, inputName: string): boolean;
    /**
     * Get the parent workspace of a workspace that is inside a mutator, taking
     * into account whether it is a flyout.
     *
     * @param workspace The workspace that is inside a mutator.
     * @returns The mutator's parent workspace or null.
     */
    static findParentWs(workspace: WorkspaceSvg): WorkspaceSvg | null;
}
//# sourceMappingURL=mutator.d.ts.map