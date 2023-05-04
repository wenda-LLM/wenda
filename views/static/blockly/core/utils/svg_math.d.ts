/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceSvg } from '../workspace_svg.js';
import { Coordinate } from './coordinate.js';
import { Rect } from './rect.js';
/**
 * Return the coordinates of the top-left corner of this element relative to
 * its parent.  Only for SVG elements and children (e.g. rect, g, path).
 *
 * @param element SVG element to find the coordinates of.
 * @returns Object with .x and .y properties.
 * @alias Blockly.utils.svgMath.getRelativeXY
 */
export declare function getRelativeXY(element: Element): Coordinate;
/**
 * Return the coordinates of the top-left corner of this element relative to
 * the div Blockly was injected into.
 *
 * @param element SVG element to find the coordinates of. If this is not a child
 *     of the div Blockly was injected into, the behaviour is undefined.
 * @returns Object with .x and .y properties.
 * @alias Blockly.utils.svgMath.getInjectionDivXY
 */
export declare function getInjectionDivXY(element: Element): Coordinate;
/**
 * Check if 3D transforms are supported by adding an element
 * and attempting to set the property.
 *
 * @returns True if 3D transforms are supported.
 * @deprecated No longer provided by Blockly.
 * @alias Blockly.utils.svgMath.is3dSupported
 */
export declare function is3dSupported(): boolean;
/**
 * Get the position of the current viewport in window coordinates.  This takes
 * scroll into account.
 *
 * @returns An object containing window width, height, and scroll position in
 *     window coordinates.
 * @alias Blockly.utils.svgMath.getViewportBBox
 * @internal
 */
export declare function getViewportBBox(): Rect;
/**
 * Gets the document scroll distance as a coordinate object.
 * Copied from Closure's goog.dom.getDocumentScroll.
 *
 * @returns Object with values 'x' and 'y'.
 * @alias Blockly.utils.svgMath.getDocumentScroll
 */
export declare function getDocumentScroll(): Coordinate;
/**
 * Converts screen coordinates to workspace coordinates.
 *
 * @param ws The workspace to find the coordinates on.
 * @param screenCoordinates The screen coordinates to be converted to workspace
 *     coordinates
 * @returns The workspace coordinates.
 * @alias Blockly.utils.svgMath.screenToWsCoordinates
 */
export declare function screenToWsCoordinates(ws: WorkspaceSvg, screenCoordinates: Coordinate): Coordinate;
export declare const TEST_ONLY: {
    XY_REGEX: RegExp;
    XY_STYLE_REGEX: RegExp;
};
//# sourceMappingURL=svg_math.d.ts.map