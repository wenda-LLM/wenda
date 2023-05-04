/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import '../../events/events_marker_move.js';
import type { IASTNodeLocationSvg } from '../../interfaces/i_ast_node_location_svg.js';
import { ASTNode } from '../../keyboard_nav/ast_node.js';
import type { Marker } from '../../keyboard_nav/marker.js';
import type { RenderedConnection } from '../../rendered_connection.js';
import type { WorkspaceSvg } from '../../workspace_svg.js';
import type { ConstantProvider, Notch, PuzzleTab } from './constants.js';
/**
 * Class for a marker.
 *
 * @alias Blockly.blockRendering.MarkerSvg
 */
export declare class MarkerSvg {
    private readonly workspace;
    private readonly marker;
    /**
     * The workspace, field, or block that the marker SVG element should be
     * attached to.
     */
    private parent_;
    /** The current SVG element for the marker. */
    currentMarkerSvg: SVGElement | null;
    colour_: string;
    /** The root SVG group containing the marker. */
    protected markerSvg_: SVGGElement | null;
    protected svgGroup_: SVGGElement | null;
    protected markerBlock_: SVGPathElement | null;
    protected markerInput_: SVGPathElement | null;
    protected markerSvgLine_: SVGRectElement | null;
    protected markerSvgRect_: SVGRectElement | null;
    /** The constants necessary to draw the marker. */
    protected constants_: ConstantProvider;
    /**
     * @param workspace The workspace the marker belongs to.
     * @param constants The constants for the renderer.
     * @param marker The marker to draw.
     */
    constructor(workspace: WorkspaceSvg, constants: ConstantProvider, marker: Marker);
    /**
     * Return the root node of the SVG or null if none exists.
     *
     * @returns The root SVG node.
     */
    getSvgRoot(): SVGElement | null;
    /**
     * Get the marker.
     *
     * @returns The marker to draw for.
     */
    getMarker(): Marker;
    /**
     * True if the marker should be drawn as a cursor, false otherwise.
     * A cursor is drawn as a flashing line. A marker is drawn as a solid line.
     *
     * @returns True if the marker is a cursor, false otherwise.
     */
    isCursor(): boolean;
    /**
     * Create the DOM element for the marker.
     *
     * @returns The marker controls SVG group.
     * @internal
     */
    createDom(): SVGElement;
    /**
     * Attaches the SVG root of the marker to the SVG group of the parent.
     *
     * @param newParent The workspace, field, or block that the marker SVG element
     *     should be attached to.
     */
    protected setParent_(newParent: IASTNodeLocationSvg): void;
    /**
     * Update the marker.
     *
     * @param oldNode The previous node the marker was on or null.
     * @param curNode The node that we want to draw the marker for.
     */
    draw(oldNode: ASTNode, curNode: ASTNode): void;
    /**
     * Update the marker's visible state based on the type of curNode..
     *
     * @param curNode The node that we want to draw the marker for.
     */
    protected showAtLocation_(curNode: ASTNode): void;
    /**************************
     * Display
     **************************/
    /**
     * Show the marker as a combination of the previous connection and block,
     * the output connection and block, or just the block.
     *
     * @param curNode The node to draw the marker for.
     */
    private showWithBlockPrevOutput_;
    /**
     * Position and display the marker for a block.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithBlock_(curNode: ASTNode): void;
    /**
     * Position and display the marker for a previous connection.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithPrevious_(curNode: ASTNode): void;
    /**
     * Position and display the marker for an output connection.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithOutput_(curNode: ASTNode): void;
    /**
     * Position and display the marker for a workspace coordinate.
     * This is a horizontal line.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithCoordinates_(curNode: ASTNode): void;
    /**
     * Position and display the marker for a field.
     * This is a box around the field.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithField_(curNode: ASTNode): void;
    /**
     * Position and display the marker for an input.
     * This is a puzzle piece.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithInput_(curNode: ASTNode): void;
    /**
     * Position and display the marker for a next connection.
     * This is a horizontal line.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithNext_(curNode: ASTNode): void;
    /**
     * Position and display the marker for a stack.
     * This is a box with extra padding around the entire stack of blocks.
     *
     * @param curNode The node to draw the marker for.
     */
    protected showWithStack_(curNode: ASTNode): void;
    /** Show the current marker. */
    protected showCurrent_(): void;
    /**************************
     * Position
     **************************/
    /**
     * Position the marker for a block.
     * Displays an outline of the top half of a rectangle around a block.
     *
     * @param width The width of the block.
     * @param markerOffset The extra padding for around the block.
     * @param markerHeight The height of the marker.
     */
    protected positionBlock_(width: number, markerOffset: number, markerHeight: number): void;
    /**
     * Position the marker for an input connection.
     * Displays a filled in puzzle piece.
     *
     * @param connection The connection to position marker around.
     */
    protected positionInput_(connection: RenderedConnection): void;
    /**
     * Move and show the marker at the specified coordinate in workspace units.
     * Displays a horizontal line.
     *
     * @param x The new x, in workspace units.
     * @param y The new y, in workspace units.
     * @param width The new width, in workspace units.
     */
    protected positionLine_(x: number, y: number, width: number): void;
    /**
     * Position the marker for an output connection.
     * Displays a puzzle outline and the top and bottom path.
     *
     * @param width The width of the block.
     * @param height The height of the block.
     * @param connectionShape The shape object for the connection.
     */
    protected positionOutput_(width: number, height: number, connectionShape: PuzzleTab): void;
    /**
     * Position the marker for a previous connection.
     * Displays a half rectangle with a notch in the top to represent the previous
     * connection.
     *
     * @param width The width of the block.
     * @param markerOffset The offset of the marker from around the block.
     * @param markerHeight The height of the marker.
     * @param connectionShape The shape object for the connection.
     */
    protected positionPrevious_(width: number, markerOffset: number, markerHeight: number, connectionShape: Notch): void;
    /**
     * Move and show the marker at the specified coordinate in workspace units.
     * Displays a filled in rectangle.
     *
     * @param x The new x, in workspace units.
     * @param y The new y, in workspace units.
     * @param width The new width, in workspace units.
     * @param height The new height, in workspace units.
     */
    protected positionRect_(x: number, y: number, width: number, height: number): void;
    /**
     * Flip the SVG paths in RTL.
     *
     * @param markerSvg The marker that we want to flip.
     */
    private flipRtl_;
    /** Hide the marker. */
    hide(): void;
    /**
     * Fire event for the marker or marker.
     *
     * @param oldNode The old node the marker used to be on.
     * @param curNode The new node the marker is currently on.
     */
    private fireMarkerEvent_;
    /**
     * Get the properties to make a marker blink.
     *
     * @returns The object holding attributes to make the marker blink.
     */
    protected getBlinkProperties_(): {
        [key: string]: string;
    };
    /**
     * Create the marker SVG.
     *
     * @returns The SVG node created.
     */
    protected createDomInternal_(): Element;
    /**
     * Apply the marker's colour.
     *
     * @param _curNode The node that we want to draw the marker for.
     */
    protected applyColour_(_curNode: ASTNode): void;
    /** Dispose of this marker. */
    dispose(): void;
}
//# sourceMappingURL=marker_svg.d.ts.map