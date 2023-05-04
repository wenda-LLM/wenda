/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Namespace for Blockly's XML.
 *
 * @alias Blockly.utils.xml.NAME_SPACE
 */
export declare const NAME_SPACE = "https://developers.google.com/blockly/xml";
/**
 * Get the document object to use for XML serialization.
 *
 * @returns The document object.
 * @alias Blockly.utils.xml.getDocument
 */
export declare function getDocument(): Document;
/**
 * Get the document object to use for XML serialization.
 *
 * @param document The document object to use.
 * @alias Blockly.utils.xml.setDocument
 */
export declare function setDocument(document: Document): void;
/**
 * Create DOM element for XML.
 *
 * @param tagName Name of DOM element.
 * @returns New DOM element.
 * @alias Blockly.utils.xml.createElement
 */
export declare function createElement(tagName: string): Element;
/**
 * Create text element for XML.
 *
 * @param text Text content.
 * @returns New DOM text node.
 * @alias Blockly.utils.xml.createTextNode
 */
export declare function createTextNode(text: string): Text;
/**
 * Converts an XML string into a DOM tree.
 *
 * @param text XML string.
 * @returns The DOM document.
 * @throws if XML doesn't parse.
 * @alias Blockly.utils.xml.textToDomDocument
 */
export declare function textToDomDocument(text: string): Document;
/**
 * Converts a DOM structure into plain text.
 * Currently the text format is fairly ugly: all one line with no whitespace.
 *
 * @param dom A tree of XML nodes.
 * @returns Text representation.
 * @alias Blockly.utils.xml.domToText
 */
export declare function domToText(dom: Node): string;
//# sourceMappingURL=xml.d.ts.map