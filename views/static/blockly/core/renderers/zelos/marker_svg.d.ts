/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ASTNode } from '../../keyboard_nav/ast_node.js';
import type { Marker } from '../../keyboard_nav/marker.js';
import type { WorkspaceSvg } from '../../workspace_svg.js';
import type { ConstantProvider as BaseConstantProvider } from '../common/constants.js';
import { MarkerSvg as BaseMarkerSvg } from '../common/marker_svg.js';
import type { ConstantProvider as ZelosConstantProvider } from './constants.js';
/**
 * Class to draw a marker.
 *
 * @alias Blockly.zelos.MarkerSvg
 */
export declare class MarkerSvg extends BaseMarkerSvg {
    constants_: ZelosConstantProvider;
    private markerCircle_;
    /**
     * @param workspace The workspace the marker belongs to.
     * @param constants The constants for the renderer.
     * @param marker The marker to draw.
     */
    constructor(workspace: WorkspaceSvg, constants: BaseConstantProvider, marker: Marker);
    /**
     * Position and display the marker for an input or an output connection.
     *
     * @param curNode The node to draw the marker for.
     */
    private showWithInputOutput_;
    showWithOutput_(curNode: ASTNode): void;
    showWithInput_(curNode: ASTNode): void;
    /**
     * Draw a rectangle around the block.
     *
     * @param curNode The current node of the marker.
     */
    showWithBlock_(curNode: ASTNode): void;
    /**
     * Position the circle we use for input and output connections.
     *
     * @param x The x position of the circle.
     * @param y The y position of the circle.
     */
    private positionCircle_;
    hide(): void;
    createDomInternal_(): SVGGElement;
    applyColour_(curNode: ASTNode): void;
}
//# sourceMappingURL=marker_svg.d.ts.map