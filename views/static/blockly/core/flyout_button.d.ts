/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from './utils/coordinate.js';
import type * as toolbox from './utils/toolbox.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a button or label in the flyout.
 *
 * @alias Blockly.FlyoutButton
 */
export declare class FlyoutButton {
    private readonly workspace;
    private readonly targetWorkspace;
    private readonly isLabel_;
    /** The horizontal margin around the text in the button. */
    static TEXT_MARGIN_X: number;
    /** The vertical margin around the text in the button. */
    static TEXT_MARGIN_Y: number;
    private readonly text_;
    private readonly position_;
    private readonly callbackKey_;
    private readonly cssClass_;
    /** Mouse up event data. */
    private onMouseUpWrapper_;
    info: toolbox.ButtonOrLabelInfo;
    /** The width of the button's rect. */
    width: number;
    /** The height of the button's rect. */
    height: number;
    /** The root SVG group for the button or label. */
    private svgGroup_;
    /** The SVG element with the text of the label or button. */
    private svgText_;
    /**
     * @param workspace The workspace in which to place this button.
     * @param targetWorkspace The flyout's target workspace.
     * @param json The JSON specifying the label/button.
     * @param isLabel_ Whether this button should be styled as a label.
     * @internal
     */
    constructor(workspace: WorkspaceSvg, targetWorkspace: WorkspaceSvg, json: toolbox.ButtonOrLabelInfo, isLabel_: boolean);
    /**
     * Create the button elements.
     *
     * @returns The button's SVG group.
     */
    createDom(): SVGElement;
    /** Correctly position the flyout button and make it visible. */
    show(): void;
    /** Update SVG attributes to match internal state. */
    private updateTransform_;
    /**
     * Move the button to the given x, y coordinates.
     *
     * @param x The new x coordinate.
     * @param y The new y coordinate.
     */
    moveTo(x: number, y: number): void;
    /** @returns Whether or not the button is a label. */
    isLabel(): boolean;
    /**
     * Location of the button.
     *
     * @returns x, y coordinates.
     * @internal
     */
    getPosition(): Coordinate;
    /** @returns Text of the button. */
    getButtonText(): string;
    /**
     * Get the button's target workspace.
     *
     * @returns The target workspace of the flyout where this button resides.
     */
    getTargetWorkspace(): WorkspaceSvg;
    /** Dispose of this button. */
    dispose(): void;
    /**
     * Do something when the button is clicked.
     *
     * @param e Mouse up event.
     */
    private onMouseUp_;
}
//# sourceMappingURL=flyout_button.d.ts.map