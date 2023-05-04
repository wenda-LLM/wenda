/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Svg } from './svg.js';
/**
 * Required name space for SVG elements.
 *
 * @alias Blockly.utils.dom.SVG_NS
 */
export declare const SVG_NS = "http://www.w3.org/2000/svg";
/**
 * Required name space for HTML elements.
 *
 * @alias Blockly.utils.dom.HTML_NS
 */
export declare const HTML_NS = "http://www.w3.org/1999/xhtml";
/**
 * Required name space for XLINK elements.
 *
 * @alias Blockly.utils.dom.XLINK_NS
 */
export declare const XLINK_NS = "http://www.w3.org/1999/xlink";
/**
 * Node type constants.
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 *
 * @alias Blockly.utils.dom.NodeType
 */
export declare enum NodeType {
    ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    COMMENT_NODE = 8,
    DOCUMENT_POSITION_CONTAINED_BY = 16
}
/**
 * Helper method for creating SVG elements.
 *
 * @param name Element's tag name.
 * @param attrs Dictionary of attribute names and values.
 * @param opt_parent Optional parent on which to append the element.
 * @returns if name is a string or a more specific type if it a member of Svg.
 * @alias Blockly.utils.dom.createSvgElement
 */
export declare function createSvgElement<T extends SVGElement>(name: string | Svg<T>, attrs: {
    [key: string]: string | number;
}, opt_parent?: Element | null): T;
/**
 * Add a CSS class to a element.
 *
 * Handles multiple space-separated classes for legacy reasons.
 *
 * @param element DOM element to add class to.
 * @param className Name of class to add.
 * @returns True if class was added, false if already present.
 * @alias Blockly.utils.dom.addClass
 */
export declare function addClass(element: Element, className: string): boolean;
/**
 * Removes multiple classes from an element.
 *
 * @param element DOM element to remove classes from.
 * @param classNames A string of one or multiple class names for an element.
 * @alias Blockly.utils.dom.removeClasses
 */
export declare function removeClasses(element: Element, classNames: string): void;
/**
 * Remove a CSS class from a element.
 *
 * Handles multiple space-separated classes for legacy reasons.
 *
 * @param element DOM element to remove class from.
 * @param className Name of class to remove.
 * @returns True if class was removed, false if never present.
 * @alias Blockly.utils.dom.removeClass
 */
export declare function removeClass(element: Element, className: string): boolean;
/**
 * Checks if an element has the specified CSS class.
 *
 * @param element DOM element to check.
 * @param className Name of class to check.
 * @returns True if class exists, false otherwise.
 * @alias Blockly.utils.dom.hasClass
 */
export declare function hasClass(element: Element, className: string): boolean;
/**
 * Removes a node from its parent. No-op if not attached to a parent.
 *
 * @param node The node to remove.
 * @returns The node removed if removed; else, null.
 * @alias Blockly.utils.dom.removeNode
 */
export declare function removeNode(node: Node | null): Node | null;
/**
 * Insert a node after a reference node.
 * Contrast with node.insertBefore function.
 *
 * @param newNode New element to insert.
 * @param refNode Existing element to precede new node.
 * @alias Blockly.utils.dom.insertAfter
 */
export declare function insertAfter(newNode: Element, refNode: Element): void;
/**
 * Whether a node contains another node.
 *
 * @param parent The node that should contain the other node.
 * @param descendant The node to test presence of.
 * @returns Whether the parent node contains the descendant node.
 * @alias Blockly.utils.dom.containsNode
 */
export declare function containsNode(parent: Node, descendant: Node): boolean;
/**
 * Sets the CSS transform property on an element. This function sets the
 * non-vendor-prefixed and vendor-prefixed versions for backwards compatibility
 * with older browsers. See https://caniuse.com/#feat=transforms2d
 *
 * @param element Element to which the CSS transform will be applied.
 * @param transform The value of the CSS `transform` property.
 * @alias Blockly.utils.dom.setCssTransform
 */
export declare function setCssTransform(element: HTMLElement | SVGElement, transform: string): void;
/**
 * Start caching text widths. Every call to this function MUST also call
 * stopTextWidthCache. Caches must not survive between execution threads.
 *
 * @alias Blockly.utils.dom.startTextWidthCache
 */
export declare function startTextWidthCache(): void;
/**
 * Stop caching field widths. Unless caching was already on when the
 * corresponding call to startTextWidthCache was made.
 *
 * @alias Blockly.utils.dom.stopTextWidthCache
 */
export declare function stopTextWidthCache(): void;
/**
 * Gets the width of a text element, caching it in the process.
 *
 * @param textElement An SVG 'text' element.
 * @returns Width of element.
 * @alias Blockly.utils.dom.getTextWidth
 */
export declare function getTextWidth(textElement: SVGTextElement): number;
/**
 * Gets the width of a text element using a faster method than `getTextWidth`.
 * This method requires that we know the text element's font family and size in
 * advance. Similar to `getTextWidth`, we cache the width we compute.
 *
 * @param textElement An SVG 'text' element.
 * @param fontSize The font size to use.
 * @param fontWeight The font weight to use.
 * @param fontFamily The font family to use.
 * @returns Width of element.
 * @alias Blockly.utils.dom.getFastTextWidth
 */
export declare function getFastTextWidth(textElement: SVGTextElement, fontSize: number, fontWeight: string, fontFamily: string): number;
/**
 * Gets the width of a text element using a faster method than `getTextWidth`.
 * This method requires that we know the text element's font family and size in
 * advance. Similar to `getTextWidth`, we cache the width we compute.
 * This method is similar to `getFastTextWidth` but expects the font size
 * parameter to be a string.
 *
 * @param textElement An SVG 'text' element.
 * @param fontSize The font size to use.
 * @param fontWeight The font weight to use.
 * @param fontFamily The font family to use.
 * @returns Width of element.
 * @alias Blockly.utils.dom.getFastTextWidthWithSizeString
 */
export declare function getFastTextWidthWithSizeString(textElement: SVGTextElement, fontSize: string, fontWeight: string, fontFamily: string): number;
/**
 * Measure a font's metrics. The height and baseline values.
 *
 * @param text Text to measure the font dimensions of.
 * @param fontSize The font size to use.
 * @param fontWeight The font weight to use.
 * @param fontFamily The font family to use.
 * @returns Font measurements.
 * @alias Blockly.utils.dom.measureFontMetrics
 */
export declare function measureFontMetrics(text: string, fontSize: string, fontWeight: string, fontFamily: string): {
    height: number;
    baseline: number;
};
//# sourceMappingURL=dom.d.ts.map