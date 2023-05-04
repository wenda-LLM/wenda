/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_click.js';
import type { IPositionable } from './interfaces/i_positionable.js';
import type { UiMetrics } from './metrics_manager.js';
import { Rect } from './utils/rect.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for a zoom controls.
 *
 * @alias Blockly.ZoomControls
 */
export declare class ZoomControls implements IPositionable {
    private readonly workspace;
    /**
     * The unique ID for this component that is used to register with the
     * ComponentManager.
     */
    id: string;
    /**
     * A handle to use to unbind the mouse down event handler for zoom reset
     *    button. Opaque data returned from browserEvents.conditionalBind.
     */
    private onZoomResetWrapper;
    /**
     * A handle to use to unbind the mouse down event handler for zoom in
     * button. Opaque data returned from browserEvents.conditionalBind.
     */
    private onZoomInWrapper;
    /**
     * A handle to use to unbind the mouse down event handler for zoom out
     * button. Opaque data returned from browserEvents.conditionalBind.
     */
    private onZoomOutWrapper;
    /** The zoom in svg <g> element. */
    private zoomInGroup;
    /** The zoom out svg <g> element. */
    private zoomOutGroup;
    /** The zoom reset svg <g> element. */
    private zoomResetGroup;
    /** Width of the zoom controls. */
    private readonly WIDTH;
    /** Height of each zoom control. */
    private readonly HEIGHT;
    /** Small spacing used between the zoom in and out control, in pixels. */
    private readonly SMALL_SPACING;
    /**
     * Large spacing used between the zoom in and reset control, in pixels.
     */
    private readonly LARGE_SPACING;
    /** Distance between zoom controls and bottom or top edge of workspace. */
    private readonly MARGIN_VERTICAL;
    /** Distance between zoom controls and right or left edge of workspace. */
    private readonly MARGIN_HORIZONTAL;
    /** The SVG group containing the zoom controls. */
    private svgGroup;
    /** Left coordinate of the zoom controls. */
    private left;
    /** Top coordinate of the zoom controls. */
    private top;
    /** Whether this has been initialized. */
    private initialized;
    /** @param workspace The workspace to sit in. */
    constructor(workspace: WorkspaceSvg);
    /**
     * Create the zoom controls.
     *
     * @returns The zoom controls SVG group.
     */
    createDom(): SVGElement;
    /** Initializes the zoom controls. */
    init(): void;
    /**
     * Disposes of this zoom controls.
     * Unlink from all DOM elements to prevent memory leaks.
     */
    dispose(): void;
    /**
     * Returns the bounding rectangle of the UI element in pixel units relative to
     * the Blockly injection div.
     *
     * @returns The UI elements's bounding box. Null if bounding box should be
     *     ignored by other UI elements.
     */
    getBoundingRectangle(): Rect | null;
    /**
     * Positions the zoom controls.
     * It is positioned in the opposite corner to the corner the
     * categories/toolbox starts at.
     *
     * @param metrics The workspace metrics.
     * @param savedPositions List of rectangles that are already on the workspace.
     */
    position(metrics: UiMetrics, savedPositions: Rect[]): void;
    /**
     * Create the zoom in icon and its event handler.
     *
     * @param rnd The random string to use as a suffix in the clip path's ID.
     *     These IDs must be unique in case there are multiple Blockly instances
     *     on the same page.
     */
    private createZoomOutSvg;
    /**
     * Create the zoom out icon and its event handler.
     *
     * @param rnd The random string to use as a suffix in the clip path's ID.
     *     These IDs must be unique in case there are multiple Blockly instances
     *     on the same page.
     */
    private createZoomInSvg;
    /**
     * Handles a mouse down event on the zoom in or zoom out buttons on the
     *    workspace.
     *
     * @param amount Amount of zooming. Negative amount values zoom out, and
     *     positive amount values zoom in.
     * @param e A mouse down event.
     */
    private zoom;
    /**
     * Create the zoom reset icon and its event handler.
     *
     * @param rnd The random string to use as a suffix in the clip path's ID.
     *     These IDs must be unique in case there are multiple Blockly instances
     *     on the same page.
     */
    private createZoomResetSvg;
    /**
     * Handles a mouse down event on the reset zoom button on the workspace.
     *
     * @param e A mouse down event.
     */
    private resetZoom;
    /** Fires a zoom control UI event. */
    private fireZoomEvent;
}
//# sourceMappingURL=zoom_controls.d.ts.map