/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Abstract } from './events/events_abstract.js';
import type { IBoundedElement } from './interfaces/i_bounded_element.js';
import type { ContainerRegion } from './metrics_manager.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Bumps the given object that has passed out of bounds.
 *
 * @param workspace The workspace containing the object.
 * @param scrollMetrics Scroll metrics
 *    in workspace coordinates.
 * @param object The object to bump.
 * @returns True if block was bumped.
 * @alias Blockly.bumpObjects.bumpIntoBounds
 */
declare function bumpObjectIntoBounds(workspace: WorkspaceSvg, scrollMetrics: ContainerRegion, object: IBoundedElement): boolean;
export declare const bumpIntoBounds: typeof bumpObjectIntoBounds;
/**
 * Creates a handler for bumping objects when they cross fixed bounds.
 *
 * @param workspace The workspace to handle.
 * @returns The event handler.
 * @alias Blockly.bumpObjects.bumpIntoBoundsHandler
 */
export declare function bumpIntoBoundsHandler(workspace: WorkspaceSvg): (p1: Abstract) => void;
/**
 * Bumps the top objects in the given workspace into bounds.
 *
 * @param workspace The workspace.
 * @alias Blockly.bumpObjects.bumpTopObjectsIntoBounds
 */
export declare function bumpTopObjectsIntoBounds(workspace: WorkspaceSvg): void;
export {};
//# sourceMappingURL=bump_objects.d.ts.map