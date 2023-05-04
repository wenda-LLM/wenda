/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import type { VariableModel } from './variable_model.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Encode a block tree as XML.
 *
 * @param workspace The workspace containing blocks.
 * @param opt_noId True if the encoder should skip the block IDs.
 * @returns XML DOM element.
 * @alias Blockly.Xml.workspaceToDom
 */
export declare function workspaceToDom(workspace: Workspace, opt_noId?: boolean): Element;
/**
 * Encode a list of variables as XML.
 *
 * @param variableList List of all variable models.
 * @returns Tree of XML elements.
 * @alias Blockly.Xml.variablesToDom
 */
export declare function variablesToDom(variableList: VariableModel[]): Element;
/**
 * Encode a block subtree as XML with XY coordinates.
 *
 * @param block The root block to encode.
 * @param opt_noId True if the encoder should skip the block ID.
 * @returns Tree of XML elements or an empty document fragment if the block was
 *     an insertion marker.
 * @alias Blockly.Xml.blockToDomWithXY
 */
export declare function blockToDomWithXY(block: Block, opt_noId?: boolean): Element | DocumentFragment;
/**
 * Encode a block subtree as XML.
 *
 * @param block The root block to encode.
 * @param opt_noId True if the encoder should skip the block ID.
 * @returns Tree of XML elements or an empty document fragment if the block was
 *     an insertion marker.
 * @alias Blockly.Xml.blockToDom
 */
export declare function blockToDom(block: Block, opt_noId?: boolean): Element | DocumentFragment;
/**
 * Converts a DOM structure into plain text.
 * Currently the text format is fairly ugly: all one line with no whitespace,
 * unless the DOM itself has whitespace built-in.
 *
 * @param dom A tree of XML nodes.
 * @returns Text representation.
 * @alias Blockly.Xml.domToText
 */
export declare function domToText(dom: Node): string;
/**
 * Converts a DOM structure into properly indented text.
 *
 * @param dom A tree of XML elements.
 * @returns Text representation.
 * @alias Blockly.Xml.domToPrettyText
 */
export declare function domToPrettyText(dom: Node): string;
/**
 * Converts an XML string into a DOM structure.
 *
 * @param text An XML string.
 * @returns A DOM object representing the singular child of the document
 *     element.
 * @throws if the text doesn't parse.
 * @alias Blockly.Xml.textToDom
 */
export declare function textToDom(text: string): Element;
/**
 * Clear the given workspace then decode an XML DOM and
 * create blocks on the workspace.
 *
 * @param xml XML DOM.
 * @param workspace The workspace.
 * @returns An array containing new block IDs.
 * @alias Blockly.Xml.clearWorkspaceAndLoadFromXml
 */
export declare function clearWorkspaceAndLoadFromXml(xml: Element, workspace: WorkspaceSvg): string[];
/**
 * Decode an XML DOM and create blocks on the workspace.
 *
 * @param xml XML DOM.
 * @param workspace The workspace.
 * @returns An array containing new block IDs.
 * @suppress {strictModuleDepCheck} Suppress module check while workspace
 * comments are not bundled in.
 * @alias Blockly.Xml.domToWorkspace
 */
export declare function domToWorkspace(xml: Element, workspace: Workspace): string[];
/**
 * Decode an XML DOM and create blocks on the workspace. Position the new
 * blocks immediately below prior blocks, aligned by their starting edge.
 *
 * @param xml The XML DOM.
 * @param workspace The workspace to add to.
 * @returns An array containing new block IDs.
 * @alias Blockly.Xml.appendDomToWorkspace
 */
export declare function appendDomToWorkspace(xml: Element, workspace: WorkspaceSvg): string[];
/**
 * Decode an XML block tag and create a block (and possibly sub blocks) on the
 * workspace.
 *
 * @param xmlBlock XML block element.
 * @param workspace The workspace.
 * @returns The root block created.
 * @alias Blockly.Xml.domToBlock
 */
export declare function domToBlock(xmlBlock: Element, workspace: Workspace): Block;
/**
 * Decode an XML list of variables and add the variables to the workspace.
 *
 * @param xmlVariables List of XML variable elements.
 * @param workspace The workspace to which the variable should be added.
 * @alias Blockly.Xml.domToVariables
 */
export declare function domToVariables(xmlVariables: Element, workspace: Workspace): void;
/**
 * Remove any 'next' block (statements in a stack).
 *
 * @param xmlBlock XML block element or an empty DocumentFragment if the block
 *     was an insertion marker.
 * @alias Blockly.Xml.deleteNext
 */
export declare function deleteNext(xmlBlock: Element | DocumentFragment): void;
//# sourceMappingURL=xml.d.ts.map