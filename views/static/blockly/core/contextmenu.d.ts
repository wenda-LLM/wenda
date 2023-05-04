/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import type { ContextMenuOption, LegacyContextMenuOption } from './contextmenu_registry.js';
import { WorkspaceCommentSvg } from './workspace_comment_svg.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Gets the block the context menu is currently attached to.
 *
 * @returns The block the context menu is attached to.
 * @alias Blockly.ContextMenu.getCurrentBlock
 */
export declare function getCurrentBlock(): Block | null;
/**
 * Sets the block the context menu is currently attached to.
 *
 * @param block The block the context menu is attached to.
 * @alias Blockly.ContextMenu.setCurrentBlock
 */
export declare function setCurrentBlock(block: Block | null): void;
/**
 * Construct the menu based on the list of options and show the menu.
 *
 * @param e Mouse event.
 * @param options Array of menu options.
 * @param rtl True if RTL, false if LTR.
 * @alias Blockly.ContextMenu.show
 */
export declare function show(e: Event, options: (ContextMenuOption | LegacyContextMenuOption)[], rtl: boolean): void;
/**
 * Hide the context menu.
 *
 * @alias Blockly.ContextMenu.hide
 */
export declare function hide(): void;
/**
 * Dispose of the menu.
 *
 * @alias Blockly.ContextMenu.dispose
 */
export declare function dispose(): void;
/**
 * Create a callback function that creates and configures a block,
 *   then places the new block next to the original.
 *
 * @param block Original block.
 * @param xml XML representation of new block.
 * @returns Function that creates a block.
 * @alias Blockly.ContextMenu.callbackFactory
 */
export declare function callbackFactory(block: Block, xml: Element): Function;
/**
 * Make a context menu option for deleting the current workspace comment.
 *
 * @param comment The workspace comment where the
 *     right-click originated.
 * @returns A menu option,
 *     containing text, enabled, and a callback.
 * @alias Blockly.ContextMenu.commentDeleteOption
 * @internal
 */
export declare function commentDeleteOption(comment: WorkspaceCommentSvg): LegacyContextMenuOption;
/**
 * Make a context menu option for duplicating the current workspace comment.
 *
 * @param comment The workspace comment where the
 *     right-click originated.
 * @returns A menu option,
 *     containing text, enabled, and a callback.
 * @alias Blockly.ContextMenu.commentDuplicateOption
 * @internal
 */
export declare function commentDuplicateOption(comment: WorkspaceCommentSvg): LegacyContextMenuOption;
/**
 * Make a context menu option for adding a comment on the workspace.
 *
 * @param ws The workspace where the right-click
 *     originated.
 * @param e The right-click mouse event.
 * @returns A menu option, containing text, enabled, and a callback.
 * @suppress {strictModuleDepCheck,checkTypes} Suppress checks while workspace
 *     comments are not bundled in.
 * @alias Blockly.ContextMenu.workspaceCommentOption
 * @internal
 */
export declare function workspaceCommentOption(ws: WorkspaceSvg, e: Event): ContextMenuOption;
//# sourceMappingURL=contextmenu.d.ts.map