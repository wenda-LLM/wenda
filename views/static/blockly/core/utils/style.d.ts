/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from './coordinate.js';
import { Rect } from './rect.js';
import { Size } from './size.js';
/**
 * Gets the height and width of an element.
 * Similar to Closure's goog.style.getSize
 *
 * @param element Element to get size of.
 * @returns Object with width/height properties.
 * @alias Blockly.utils.style.getSize
 */
export declare function getSize(element: Element): Size;
/**
 * Private version of getSize for stubbing in tests.
 */
declare function getSizeInternal(element: Element): Size;
/**
 * Retrieves a computed style value of a node. It returns empty string
 * if the property requested is an SVG one and it has not been
 * explicitly set (firefox and webkit).
 *
 * Copied from Closure's goog.style.getComputedStyle
 *
 * @param element Element to get style of.
 * @param property Property to get (camel-case).
 * @returns Style value.
 * @alias Blockly.utils.style.getComputedStyle
 */
export declare function getComputedStyle(element: Element, property: string): string;
/**
 * Gets the cascaded style value of a node, or null if the value cannot be
 * computed (only Internet Explorer can do this).
 *
 * Copied from Closure's goog.style.getCascadedStyle
 *
 * @param element Element to get style of.
 * @param style Property to get (camel-case).
 * @returns Style value.
 * @deprecated No longer provided by Blockly.
 * @alias Blockly.utils.style.getCascadedStyle
 */
export declare function getCascadedStyle(element: Element, style: string): string;
/**
 * Returns a Coordinate object relative to the top-left of the HTML document.
 * Similar to Closure's goog.style.getPageOffset
 *
 * @param el Element to get the page offset for.
 * @returns The page offset.
 * @alias Blockly.utils.style.getPageOffset
 */
export declare function getPageOffset(el: Element): Coordinate;
/**
 * Calculates the viewport coordinates relative to the document.
 * Similar to Closure's goog.style.getViewportPageOffset
 *
 * @returns The page offset of the viewport.
 * @alias Blockly.utils.style.getViewportPageOffset
 */
export declare function getViewportPageOffset(): Coordinate;
/**
 * Gets the computed border widths (on all sides) in pixels
 * Copied from Closure's goog.style.getBorderBox
 *
 * @param element  The element to get the border widths for.
 * @returns The computed border widths.
 * @alias Blockly.utils.style.getBorderBox
 */
export declare function getBorderBox(element: Element): Rect;
/**
 * Changes the scroll position of `container` with the minimum amount so
 * that the content and the borders of the given `element` become visible.
 * If the element is bigger than the container, its top left corner will be
 * aligned as close to the container's top left corner as possible.
 * Copied from Closure's goog.style.scrollIntoContainerView
 *
 * @param element The element to make visible.
 * @param container The container to scroll. If not set, then the document
 *     scroll element will be used.
 * @param opt_center Whether to center the element in the container.
 *     Defaults to false.
 * @alias Blockly.utils.style.scrollIntoContainerView
 */
export declare function scrollIntoContainerView(element: Element, container: Element, opt_center?: boolean): void;
/**
 * Calculate the scroll position of `container` with the minimum amount so
 * that the content and the borders of the given `element` become visible.
 * If the element is bigger than the container, its top left corner will be
 * aligned as close to the container's top left corner as possible.
 * Copied from Closure's goog.style.getContainerOffsetToScrollInto
 *
 * @param element The element to make visible.
 * @param container The container to scroll. If not set, then the document
 *     scroll element will be used.
 * @param opt_center Whether to center the element in the container.
 *     Defaults to false.
 * @returns The new scroll position of the container.
 * @alias Blockly.utils.style.getContainerOffsetToScrollInto
 */
export declare function getContainerOffsetToScrollInto(element: Element, container: Element, opt_center?: boolean): Coordinate;
export declare const TEST_ONLY: {
    getSizeInternal: typeof getSizeInternal;
};
export {};
//# sourceMappingURL=style.d.ts.map