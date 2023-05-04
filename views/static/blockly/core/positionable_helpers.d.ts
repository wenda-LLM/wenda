/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { UiMetrics } from './metrics_manager.js';
import { Rect } from './utils/rect.js';
import type { Size } from './utils/size.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Enum for vertical positioning.
 *
 * @alias Blockly.uiPosition.verticalPosition
 * @internal
 */
export declare enum verticalPosition {
    TOP = 0,
    BOTTOM = 1
}
/**
 * Enum for horizontal positioning.
 *
 * @alias Blockly.uiPosition.horizontalPosition
 * @internal
 */
export declare enum horizontalPosition {
    LEFT = 0,
    RIGHT = 1
}
/**
 * An object defining a horizontal and vertical positioning.
 *
 * @alias Blockly.uiPosition.Position
 * @internal
 */
export interface Position {
    horizontal: horizontalPosition;
    vertical: verticalPosition;
}
/**
 * Enum for bump rules to use for dealing with collisions.
 *
 * @alias Blockly.uiPosition.bumpDirection
 * @internal
 */
export declare enum bumpDirection {
    UP = 0,
    DOWN = 1
}
/**
 * Returns a rectangle representing reasonable position for where to place a UI
 * element of the specified size given the restraints and locations of the
 * scrollbars. This method does not take into account any already placed UI
 * elements.
 *
 * @param position The starting horizontal and vertical position.
 * @param size the size of the UI element to get a start position for.
 * @param horizontalPadding The horizontal padding to use.
 * @param verticalPadding The vertical padding to use.
 * @param metrics The workspace UI metrics.
 * @param workspace The workspace.
 * @returns The suggested start position.
 * @alias Blockly.uiPosition.getStartPositionRect
 * @internal
 */
export declare function getStartPositionRect(position: Position, size: Size, horizontalPadding: number, verticalPadding: number, metrics: UiMetrics, workspace: WorkspaceSvg): Rect;
/**
 * Returns a corner position that is on the opposite side of the workspace from
 * the toolbox.
 * If in horizontal orientation, defaults to the bottom corner. If in vertical
 * orientation, defaults to the right corner.
 *
 * @param workspace The workspace.
 * @param metrics The workspace metrics.
 * @returns The suggested corner position.
 * @alias Blockly.uiPosition.getCornerOppositeToolbox
 * @internal
 */
export declare function getCornerOppositeToolbox(workspace: WorkspaceSvg, metrics: UiMetrics): Position;
/**
 * Returns a position Rect based on a starting position that is bumped
 * so that it doesn't intersect with any of the provided savedPositions. This
 * method does not check that the bumped position is still within bounds.
 *
 * @param startRect The starting position to use.
 * @param margin The margin to use between elements when bumping.
 * @param bumpDir The direction to bump if there is a collision with an existing
 *     UI element.
 * @param savedPositions List of rectangles that represent the positions of UI
 *     elements already placed.
 * @returns The suggested position rectangle.
 * @alias Blockly.uiPosition.bumpPositionRect
 * @internal
 */
export declare function bumpPositionRect(startRect: Rect, margin: number, bumpDir: bumpDirection, savedPositions: Rect[]): Rect;
//# sourceMappingURL=positionable_helpers.d.ts.map