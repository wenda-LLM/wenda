/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IFlyout } from './interfaces/i_flyout.js';
import { ContainerRegion, MetricsManager } from './metrics_manager.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Calculates metrics for a flyout's workspace.
 * The metrics are mainly used to size scrollbars for the flyout.
 *
 * @alias Blockly.FlyoutMetricsManager
 */
export declare class FlyoutMetricsManager extends MetricsManager {
    /** The flyout that owns the workspace to calculate metrics for. */
    protected flyout_: IFlyout;
    /**
     * @param workspace The flyout's workspace.
     * @param flyout The flyout.
     */
    constructor(workspace: WorkspaceSvg, flyout: IFlyout);
    /**
     * Gets the bounding box of the blocks on the flyout's workspace.
     * This is in workspace coordinates.
     *
     * @returns The bounding box of the blocks on the workspace.
     */
    private getBoundingBox_;
    getContentMetrics(opt_getWorkspaceCoordinates?: boolean): {
        height: number;
        width: number;
        top: number;
        left: number;
    };
    getScrollMetrics(opt_getWorkspaceCoordinates?: boolean, opt_viewMetrics?: ContainerRegion, opt_contentMetrics?: ContainerRegion): {
        height: number;
        width: number;
        top: number;
        left: number;
    };
}
//# sourceMappingURL=flyout_metrics_manager.d.ts.map