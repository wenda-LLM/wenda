/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from '../block.js';
import type { Workspace } from '../workspace.js';
import type { Abstract } from './events_abstract.js';
import type { BlockCreate } from './events_block_create.js';
import type { BlockMove } from './events_block_move.js';
import type { CommentCreate } from './events_comment_create.js';
import type { CommentMove } from './events_comment_move.js';
/**
 * Sets whether events should be added to the undo stack.
 *
 * @param newValue True if events should be added to the undo stack.
 * @alias Blockly.Events.utils.setRecordUndo
 */
export declare function setRecordUndo(newValue: boolean): void;
/**
 * Returns whether or not events will be added to the undo stack.
 *
 * @returns True if events will be added to the undo stack.
 * @alias Blockly.Events.utils.getRecordUndo
 */
export declare function getRecordUndo(): boolean;
/**
 * Name of event that creates a block. Will be deprecated for BLOCK_CREATE.
 *
 * @alias Blockly.Events.utils.CREATE
 */
export declare const CREATE = "create";
/**
 * Name of event that creates a block.
 *
 * @alias Blockly.Events.utils.BLOCK_CREATE
 */
export declare const BLOCK_CREATE = "create";
/**
 * Name of event that deletes a block. Will be deprecated for BLOCK_DELETE.
 *
 * @alias Blockly.Events.utils.DELETE
 */
export declare const DELETE = "delete";
/**
 * Name of event that deletes a block.
 *
 * @alias Blockly.Events.utils.BLOCK_DELETE
 */
export declare const BLOCK_DELETE = "delete";
/**
 * Name of event that changes a block. Will be deprecated for BLOCK_CHANGE.
 *
 * @alias Blockly.Events.utils.CHANGE
 */
export declare const CHANGE = "change";
/**
 * Name of event that changes a block.
 *
 * @alias Blockly.Events.utils.BLOCK_CHANGE
 */
export declare const BLOCK_CHANGE = "change";
/**
 * Name of event that moves a block. Will be deprecated for BLOCK_MOVE.
 *
 * @alias Blockly.Events.utils.MOVE
 */
export declare const MOVE = "move";
/**
 * Name of event that moves a block.
 *
 * @alias Blockly.Events.utils.BLOCK_MOVE
 */
export declare const BLOCK_MOVE = "move";
/**
 * Name of event that creates a variable.
 *
 * @alias Blockly.Events.utils.VAR_CREATE
 */
export declare const VAR_CREATE = "var_create";
/**
 * Name of event that deletes a variable.
 *
 * @alias Blockly.Events.utils.VAR_DELETE
 */
export declare const VAR_DELETE = "var_delete";
/**
 * Name of event that renames a variable.
 *
 * @alias Blockly.Events.utils.VAR_RENAME
 */
export declare const VAR_RENAME = "var_rename";
/**
 * Name of generic event that records a UI change.
 *
 * @alias Blockly.Events.utils.UI
 */
export declare const UI = "ui";
/**
 * Name of event that record a block drags a block.
 *
 * @alias Blockly.Events.utils.BLOCK_DRAG
 */
export declare const BLOCK_DRAG = "drag";
/**
 * Name of event that records a change in selected element.
 *
 * @alias Blockly.Events.utils.SELECTED
 */
export declare const SELECTED = "selected";
/**
 * Name of event that records a click.
 *
 * @alias Blockly.Events.utils.CLICK
 */
export declare const CLICK = "click";
/**
 * Name of event that records a marker move.
 *
 * @alias Blockly.Events.utils.MARKER_MOVE
 */
export declare const MARKER_MOVE = "marker_move";
/**
 * Name of event that records a bubble open.
 *
 * @alias Blockly.Events.utils.BUBBLE_OPEN
 */
export declare const BUBBLE_OPEN = "bubble_open";
/**
 * Name of event that records a trashcan open.
 *
 * @alias Blockly.Events.utils.TRASHCAN_OPEN
 */
export declare const TRASHCAN_OPEN = "trashcan_open";
/**
 * Name of event that records a toolbox item select.
 *
 * @alias Blockly.Events.utils.TOOLBOX_ITEM_SELECT
 */
export declare const TOOLBOX_ITEM_SELECT = "toolbox_item_select";
/**
 * Name of event that records a theme change.
 *
 * @alias Blockly.Events.utils.THEME_CHANGE
 */
export declare const THEME_CHANGE = "theme_change";
/**
 * Name of event that records a viewport change.
 *
 * @alias Blockly.Events.utils.VIEWPORT_CHANGE
 */
export declare const VIEWPORT_CHANGE = "viewport_change";
/**
 * Name of event that creates a comment.
 *
 * @alias Blockly.Events.utils.COMMENT_CREATE
 */
export declare const COMMENT_CREATE = "comment_create";
/**
 * Name of event that deletes a comment.
 *
 * @alias Blockly.Events.utils.COMMENT_DELETE
 */
export declare const COMMENT_DELETE = "comment_delete";
/**
 * Name of event that changes a comment.
 *
 * @alias Blockly.Events.utils.COMMENT_CHANGE
 */
export declare const COMMENT_CHANGE = "comment_change";
/**
 * Name of event that moves a comment.
 *
 * @alias Blockly.Events.utils.COMMENT_MOVE
 */
export declare const COMMENT_MOVE = "comment_move";
/**
 * Name of event that records a workspace load.
 *
 * @alias Blockly.Events.utils.FINISHED_LOADING
 */
export declare const FINISHED_LOADING = "finished_loading";
/**
 * Type of events that cause objects to be bumped back into the visible
 * portion of the workspace.
 *
 * Not to be confused with bumping so that disconnected connections do not
 * appear connected.
 *
 * @alias Blockly.Events.utils.BumpEvent
 */
export declare type BumpEvent = BlockCreate | BlockMove | CommentCreate | CommentMove;
/**
 * List of events that cause objects to be bumped back into the visible
 * portion of the workspace.
 *
 * Not to be confused with bumping so that disconnected connections do not
 * appear connected.
 *
 * @alias Blockly.Events.utils.BUMP_EVENTS
 */
export declare const BUMP_EVENTS: string[];
/**
 * Create a custom event and fire it.
 *
 * @param event Custom data for event.
 * @alias Blockly.Events.utils.fire
 */
export declare function fire(event: Abstract): void;
/**
 * Private version of fireInternal for stubbing in tests.
 */
declare function fireInternal(event: Abstract): void;
/** Fire all queued events. */
declare function fireNow(): void;
/**
 * Filter the queued events and merge duplicates.
 *
 * @param queueIn Array of events.
 * @param forward True if forward (redo), false if backward (undo).
 * @returns Array of filtered events.
 * @alias Blockly.Events.utils.filter
 */
export declare function filter(queueIn: Abstract[], forward: boolean): Abstract[];
/**
 * Modify pending undo events so that when they are fired they don't land
 * in the undo stack.  Called by Workspace.clearUndo.
 *
 * @alias Blockly.Events.utils.clearPendingUndo
 */
export declare function clearPendingUndo(): void;
/**
 * Stop sending events.  Every call to this function MUST also call enable.
 *
 * @alias Blockly.Events.utils.disable
 */
export declare function disable(): void;
/**
 * Start sending events.  Unless events were already disabled when the
 * corresponding call to disable was made.
 *
 * @alias Blockly.Events.utils.enable
 */
export declare function enable(): void;
/**
 * Returns whether events may be fired or not.
 *
 * @returns True if enabled.
 * @alias Blockly.Events.utils.isEnabled
 */
export declare function isEnabled(): boolean;
/**
 * Current group.
 *
 * @returns ID string.
 * @alias Blockly.Events.utils.getGroup
 */
export declare function getGroup(): string;
/**
 * Start or stop a group.
 *
 * @param state True to start new group, false to end group.
 *   String to set group explicitly.
 * @alias Blockly.Events.utils.setGroup
 */
export declare function setGroup(state: boolean | string): void;
/**
 * Private version of setGroup for stubbing in tests.
 */
declare function setGroupInternal(state: boolean | string): void;
/**
 * Compute a list of the IDs of the specified block and all its descendants.
 *
 * @param block The root block.
 * @returns List of block IDs.
 * @alias Blockly.Events.utils.getDescendantIds
 * @internal
 */
export declare function getDescendantIds(block: Block): string[];
/**
 * Decode the JSON into an event.
 *
 * @param json JSON representation.
 * @param workspace Target workspace for event.
 * @returns The event represented by the JSON.
 * @throws {Error} if an event type is not found in the registry.
 * @alias Blockly.Events.utils.fromJson
 */
export declare function fromJson(json: any, workspace: Workspace): Abstract;
/**
 * Gets the class for a specific event type from the registry.
 *
 * @param eventType The type of the event to get.
 * @returns The event class with the given type.
 * @alias Blockly.Events.utils.get
 */
export declare function get(eventType: string): (new (...p1: any[]) => Abstract);
/**
 * Enable/disable a block depending on whether it is properly connected.
 * Use this on applications where all blocks should be connected to a top block.
 * Recommend setting the 'disable' option to 'false' in the config so that
 * users don't try to re-enable disabled orphan blocks.
 *
 * @param event Custom data for event.
 * @alias Blockly.Events.utils.disableOrphans
 */
export declare function disableOrphans(event: Abstract): void;
export declare const TEST_ONLY: {
    FIRE_QUEUE: Abstract[];
    fireNow: typeof fireNow;
    fireInternal: typeof fireInternal;
    setGroupInternal: typeof setGroupInternal;
};
export {};
//# sourceMappingURL=utils.d.ts.map