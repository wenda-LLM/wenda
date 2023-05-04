/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Rect } from './utils/rect.js';
import type { Size } from './utils/size.js';
/**
 * Returns the HTML container for editor widgets.
 *
 * @returns The editor widget container.
 * @alias Blockly.WidgetDiv.getDiv
 */
export declare function getDiv(): HTMLDivElement | null;
/**
 * Allows unit tests to reset the div. Do not use outside of tests.
 *
 * @param newDiv The new value for the DIV field.
 * @alias Blockly.WidgetDiv.testOnly_setDiv
 * @internal
 */
export declare function testOnly_setDiv(newDiv: HTMLDivElement | null): void;
/**
 * Create the widget div and inject it onto the page.
 *
 * @alias Blockly.WidgetDiv.createDom
 */
export declare function createDom(): void;
/**
 * Initialize and display the widget div.  Close the old one if needed.
 *
 * @param newOwner The object that will be using this container.
 * @param rtl Right-to-left (true) or left-to-right (false).
 * @param newDispose Optional cleanup function to be run when the widget is
 *     closed.
 * @alias Blockly.WidgetDiv.show
 */
export declare function show(newOwner: unknown, rtl: boolean, newDispose: () => void): void;
/**
 * Destroy the widget and hide the div.
 *
 * @alias Blockly.WidgetDiv.hide
 */
export declare function hide(): void;
/**
 * Is the container visible?
 *
 * @returns True if visible.
 * @alias Blockly.WidgetDiv.isVisible
 */
export declare function isVisible(): boolean;
/**
 * Destroy the widget and hide the div if it is being used by the specified
 * object.
 *
 * @param oldOwner The object that was using this container.
 * @alias Blockly.WidgetDiv.hideIfOwner
 */
export declare function hideIfOwner(oldOwner: unknown): void;
/**
 * Position the widget div based on an anchor rectangle.
 * The widget should be placed adjacent to but not overlapping the anchor
 * rectangle.  The preferred position is directly below and aligned to the left
 * (LTR) or right (RTL) side of the anchor.
 *
 * @param viewportBBox The bounding rectangle of the current viewport, in window
 *     coordinates.
 * @param anchorBBox The bounding rectangle of the anchor, in window
 *     coordinates.
 * @param widgetSize The size of the widget that is inside the widget div, in
 *     window coordinates.
 * @param rtl Whether the workspace is in RTL mode.  This determines horizontal
 *     alignment.
 * @alias Blockly.WidgetDiv.positionWithAnchor
 * @internal
 */
export declare function positionWithAnchor(viewportBBox: Rect, anchorBBox: Rect, widgetSize: Size, rtl: boolean): void;
//# sourceMappingURL=widgetdiv.d.ts.map