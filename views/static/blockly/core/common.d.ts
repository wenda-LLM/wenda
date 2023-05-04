/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import { BlockDefinition } from './blocks.js';
import type { Connection } from './connection.js';
import type { ICopyable } from './interfaces/i_copyable.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Find the workspace with the specified ID.
 *
 * @param id ID of workspace to find.
 * @returns The sought after workspace or null if not found.
 */
export declare function getWorkspaceById(id: string): Workspace | null;
/**
 * Find all workspaces.
 *
 * @returns Array of workspaces.
 */
export declare function getAllWorkspaces(): Workspace[];
/**
 * Register a workspace in the workspace db.
 *
 * @param workspace
 */
export declare function registerWorkspace(workspace: Workspace): void;
/**
 * Unregister a workspace from the workspace db.
 *
 * @param workspace
 */
export declare function unregisterWorkpace(workspace: Workspace): void;
/**
 * Returns the last used top level workspace (based on focus).  Try not to use
 * this function, particularly if there are multiple Blockly instances on a
 * page.
 *
 * @returns The main workspace.
 * @alias Blockly.common.getMainWorkspace
 */
export declare function getMainWorkspace(): Workspace;
/**
 * Sets last used main workspace.
 *
 * @param workspace The most recently used top level workspace.
 * @alias Blockly.common.setMainWorkspace
 */
export declare function setMainWorkspace(workspace: Workspace): void;
/**
 * Returns the currently selected copyable object.
 *
 * @alias Blockly.common.getSelected
 */
export declare function getSelected(): ICopyable | null;
/**
 * Sets the currently selected block. This function does not visually mark the
 * block as selected or fire the required events. If you wish to
 * programmatically select a block, use `BlockSvg#select`.
 *
 * @param newSelection The newly selected block.
 * @alias Blockly.common.setSelected
 * @internal
 */
export declare function setSelected(newSelection: ICopyable | null): void;
/**
 * Get the container element in which to render the WidgetDiv, DropDownDiv and
 * Tooltip.
 *
 * @returns The parent container.
 * @alias Blockly.common.getParentContainer
 */
export declare function getParentContainer(): Element | null;
/**
 * Set the parent container.  This is the container element that the WidgetDiv,
 * DropDownDiv, and Tooltip are rendered into the first time `Blockly.inject`
 * is called.
 * This method is a NOP if called after the first `Blockly.inject`.
 *
 * @param newParent The container element.
 * @alias Blockly.common.setParentContainer
 */
export declare function setParentContainer(newParent: Element): void;
/**
 * Size the SVG image to completely fill its container. Call this when the view
 * actually changes sizes (e.g. on a window resize/device orientation change).
 * See workspace.resizeContents to resize the workspace when the contents
 * change (e.g. when a block is added or removed).
 * Record the height/width of the SVG image.
 *
 * @param workspace Any workspace in the SVG.
 * @alias Blockly.common.svgResize
 */
export declare function svgResize(workspace: WorkspaceSvg): void;
/**
 * All of the connections on blocks that are currently being dragged.
 */
export declare const draggingConnections: Connection[];
/**
 * Get a map of all the block's descendants mapping their type to the number of
 *    children with that type.
 *
 * @param block The block to map.
 * @param opt_stripFollowing Optionally ignore all following
 *    statements (blocks that are not inside a value or statement input
 *    of the block).
 * @returns Map of types to type counts for descendants of the bock.
 * @alias Blockly.common.getBlockTypeCounts
 */
export declare function getBlockTypeCounts(block: Block, opt_stripFollowing?: boolean): {
    [key: string]: number;
};
/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @alias Blockly.common.defineBlocksWithJsonArray
 */
export declare function defineBlocksWithJsonArray(jsonArray: any[]): void;
/**
 * Private version of defineBlocksWithJsonArray for stubbing in tests.
 */
declare function defineBlocksWithJsonArrayInternal(jsonArray: any[]): void;
/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @returns A map of the block
 *     definitions created.
 * @alias Blockly.common.defineBlocksWithJsonArray
 */
export declare function createBlockDefinitionsFromJsonArray(jsonArray: any[]): {
    [key: string]: BlockDefinition;
};
/**
 * Add the specified block definitions to the block definitions
 * dictionary (Blockly.Blocks).
 *
 * @param blocks A map of block
 *     type names to block definitions.
 * @alias Blockly.common.defineBlocks
 */
export declare function defineBlocks(blocks: {
    [key: string]: BlockDefinition;
}): void;
export declare const TEST_ONLY: {
    defineBlocksWithJsonArrayInternal: typeof defineBlocksWithJsonArrayInternal;
};
export {};
//# sourceMappingURL=common.d.ts.map