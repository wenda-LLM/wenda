/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Theme } from './theme.js';
import type { Workspace } from './workspace.js';
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for storing and updating a workspace's theme and UI components.
 *
 * @alias Blockly.ThemeManager
 */
export declare class ThemeManager {
    private readonly workspace;
    private theme;
    /** A list of workspaces that are subscribed to this theme. */
    private subscribedWorkspaces_;
    private componentDB;
    owner_: any;
    /**
     * @param workspace The main workspace.
     * @param theme The workspace theme.
     * @internal
     */
    constructor(workspace: WorkspaceSvg, theme: Theme);
    /**
     * Get the workspace theme.
     *
     * @returns The workspace theme.
     * @internal
     */
    getTheme(): Theme;
    /**
     * Set the workspace theme, and refresh the workspace and all components.
     *
     * @param theme The workspace theme.
     * @internal
     */
    setTheme(theme: Theme): void;
    /**
     * Subscribe a workspace to changes to the selected theme.  If a new theme is
     * set, the workspace is called to refresh its blocks.
     *
     * @param workspace The workspace to subscribe.
     * @internal
     */
    subscribeWorkspace(workspace: Workspace): void;
    /**
     * Unsubscribe a workspace to changes to the selected theme.
     *
     * @param workspace The workspace to unsubscribe.
     * @internal
     */
    unsubscribeWorkspace(workspace: Workspace): void;
    /**
     * Subscribe an element to changes to the selected theme.  If a new theme is
     * selected, the element's style is refreshed with the new theme's style.
     *
     * @param element The element to subscribe.
     * @param componentName The name used to identify the component. This must be
     *     the same name used to configure the style in the Theme object.
     * @param propertyName The inline style property name to update.
     * @internal
     */
    subscribe(element: Element, componentName: string, propertyName: string): void;
    /**
     * Unsubscribe an element to changes to the selected theme.
     *
     * @param element The element to unsubscribe.
     * @internal
     */
    unsubscribe(element: Element): void;
    /**
     * Dispose of this theme manager.
     *
     * @suppress {checkTypes}
     * @internal
     */
    dispose(): void;
}
export declare namespace ThemeManager {
    /** The type for a Blockly UI Component. */
    interface Component {
        element: Element;
        propertyName: string;
    }
}
export declare type Component = ThemeManager.Component;
//# sourceMappingURL=theme_manager.d.ts.map