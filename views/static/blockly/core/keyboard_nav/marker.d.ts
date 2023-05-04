/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { MarkerSvg } from '../renderers/common/marker_svg.js';
import type { ASTNode } from './ast_node.js';
/**
 * Class for a marker.
 * This is used in keyboard navigation to save a location in the Blockly AST.
 *
 * @alias Blockly.Marker
 */
export declare class Marker {
    /** The colour of the marker. */
    colour: string | null;
    /** The current location of the marker. */
    private curNode_;
    /**
     * The object in charge of drawing the visual representation of the current
     * node.
     */
    private drawer_;
    /** The type of the marker. */
    type: string;
    /** Constructs a new Marker instance. */
    constructor();
    /**
     * Sets the object in charge of drawing the marker.
     *
     * @param drawer The object in charge of drawing the marker.
     */
    setDrawer(drawer: MarkerSvg): void;
    /**
     * Get the current drawer for the marker.
     *
     * @returns The object in charge of drawing the marker.
     */
    getDrawer(): MarkerSvg;
    /**
     * Gets the current location of the marker.
     *
     * @returns The current field, connection, or block the marker is on.
     */
    getCurNode(): ASTNode;
    /**
     * Set the location of the marker and call the update method.
     * Setting isStack to true will only work if the newLocation is the top most
     * output or previous connection on a stack.
     *
     * @param newNode The new location of the marker.
     */
    setCurNode(newNode: ASTNode): void;
    /**
     * Redraw the current marker.
     *
     * @internal
     */
    draw(): void;
    /** Hide the marker SVG. */
    hide(): void;
    /** Dispose of this marker. */
    dispose(): void;
}
//# sourceMappingURL=marker.d.ts.map