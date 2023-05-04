/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlocklyOptions } from './blockly_options.js';
import { Theme } from './theme.js';
import type { Metrics } from './utils/metrics.js';
import * as toolbox from './utils/toolbox.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Parse the user-specified options, using reasonable defaults where behaviour
 * is unspecified.
 *
 * @alias Blockly.Options
 */
export declare class Options {
    RTL: boolean;
    oneBasedIndex: boolean;
    collapse: boolean;
    comments: boolean;
    disable: boolean;
    readOnly: boolean;
    maxBlocks: number;
    maxInstances: {
        [key: string]: number;
    } | null;
    pathToMedia: string;
    hasCategories: boolean;
    moveOptions: MoveOptions;
    hasScrollbars: boolean;
    hasTrashcan: boolean;
    maxTrashcanContents: number;
    hasSounds: boolean;
    hasCss: boolean;
    horizontalLayout: boolean;
    languageTree: toolbox.ToolboxInfo | null;
    gridOptions: GridOptions;
    zoomOptions: ZoomOptions;
    toolboxPosition: toolbox.Position;
    theme: Theme;
    renderer: string;
    rendererOverrides: {
        [rendererConstant: string]: any;
    } | null;
    /**
     * The SVG element for the grid pattern.
     * Created during injection.
     */
    gridPattern: SVGElement | null;
    parentWorkspace: WorkspaceSvg | null;
    plugins: {
        [key: string]: (new (...p1: any[]) => any) | string;
    };
    /**
     * If set, sets the translation of the workspace to match the scrollbars.
     * A function that
     *     sets the translation of the workspace to match the scrollbars. The
     *     argument Contains an x and/or y property which is a float between 0
     *     and 1 specifying the degree of scrolling.
     */
    setMetrics?: ((p1: {
        x?: number;
        y?: number;
    }) => void);
    /**
     * A function that returns a metrics
     *     object that describes the current workspace.
     */
    getMetrics?: (() => Metrics);
    /**
     * @param options Dictionary of options.
     *     Specification:
     * https://developers.google.com/blockly/guides/get-started/web#configuration
     */
    constructor(options: BlocklyOptions);
    /**
     * Parse the user-specified move options, using reasonable defaults where
     *    behaviour is unspecified.
     *
     * @param options Dictionary of options.
     * @param hasCategories Whether the workspace has categories or not.
     * @returns Normalized move options.
     */
    private static parseMoveOptions_;
    /**
     * Parse the user-specified zoom options, using reasonable defaults where
     * behaviour is unspecified.  See zoom documentation:
     *   https://developers.google.com/blockly/guides/configure/web/zoom
     *
     * @param options Dictionary of options.
     * @returns Normalized zoom options.
     */
    private static parseZoomOptions_;
    /**
     * Parse the user-specified grid options, using reasonable defaults where
     * behaviour is unspecified. See grid documentation:
     *   https://developers.google.com/blockly/guides/configure/web/grid
     *
     * @param options Dictionary of options.
     * @returns Normalized grid options.
     */
    private static parseGridOptions_;
    /**
     * Parse the user-specified theme options, using the classic theme as a
     * default. https://developers.google.com/blockly/guides/configure/web/themes
     *
     * @param options Dictionary of options.
     * @returns A Blockly Theme.
     */
    private static parseThemeOptions_;
}
export declare namespace Options {
    interface GridOptions {
        colour: string;
        length: number;
        snap: boolean;
        spacing: number;
    }
    interface MoveOptions {
        drag: boolean;
        scrollbars: boolean | ScrollbarOptions;
        wheel: boolean;
    }
    interface ScrollbarOptions {
        horizontal: boolean;
        vertical: boolean;
    }
    interface ZoomOptions {
        controls: boolean;
        maxScale: number;
        minScale: number;
        pinch: boolean;
        scaleSpeed: number;
        startScale: number;
        wheel: boolean;
    }
}
export declare type GridOptions = Options.GridOptions;
export declare type MoveOptions = Options.MoveOptions;
export declare type ScrollbarOptions = Options.ScrollbarOptions;
export declare type ZoomOptions = Options.ZoomOptions;
//# sourceMappingURL=options.d.ts.map