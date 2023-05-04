/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GridOptions } from './options.js';
/**
 * Class for a workspace's grid.
 *
 * @alias Blockly.Grid
 */
export declare class Grid {
    private pattern;
    private readonly spacing;
    private readonly length;
    private readonly line1;
    private readonly line2;
    private readonly snapToGrid;
    /**
     * @param pattern The grid's SVG pattern, created during injection.
     * @param options A dictionary of normalized options for the grid.
     *     See grid documentation:
     *     https://developers.google.com/blockly/guides/configure/web/grid
     */
    constructor(pattern: SVGElement, options: GridOptions);
    /**
     * Whether blocks should snap to the grid, based on the initial configuration.
     *
     * @returns True if blocks should snap, false otherwise.
     * @internal
     */
    shouldSnap(): boolean;
    /**
     * Get the spacing of the grid points (in px).
     *
     * @returns The spacing of the grid points.
     * @internal
     */
    getSpacing(): number;
    /**
     * Get the ID of the pattern element, which should be randomized to avoid
     * conflicts with other Blockly instances on the page.
     *
     * @returns The pattern ID.
     * @internal
     */
    getPatternId(): string;
    /**
     * Update the grid with a new scale.
     *
     * @param scale The new workspace scale.
     * @internal
     */
    update(scale: number): void;
    /**
     * Set the attributes on one of the lines in the grid.  Use this to update the
     * length and stroke width of the grid lines.
     *
     * @param line Which line to update.
     * @param width The new stroke size (in px).
     * @param x1 The new x start position of the line (in px).
     * @param x2 The new x end position of the line (in px).
     * @param y1 The new y start position of the line (in px).
     * @param y2 The new y end position of the line (in px).
     */
    private setLineAttributes;
    /**
     * Move the grid to a new x and y position, and make sure that change is
     * visible.
     *
     * @param x The new x position of the grid (in px).
     * @param y The new y position of the grid (in px).
     * @internal
     */
    moveTo(x: number, y: number): void;
    /**
     * Create the DOM for the grid described by options.
     *
     * @param rnd A random ID to append to the pattern's ID.
     * @param gridOptions The object containing grid configuration.
     * @param defs The root SVG element for this workspace's defs.
     * @returns The SVG element for the grid pattern.
     * @internal
     */
    static createDom(rnd: string, gridOptions: GridOptions, defs: SVGElement): SVGElement;
}
//# sourceMappingURL=grid.d.ts.map