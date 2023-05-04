/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IToolbox } from '../interfaces/i_toolbox.js';
import type * as toolbox from '../utils/toolbox.js';
import { ToolboxItem } from './toolbox_item.js';
/**
 * Class for a toolbox separator. This is the thin visual line that appears on
 * the toolbox. This item is not interactable.
 *
 * @alias Blockly.ToolboxSeparator
 */
export declare class ToolboxSeparator extends ToolboxItem {
    /** Name used for registering a toolbox separator. */
    static registrationName: string;
    /** All the CSS class names that are used to create a separator. */
    protected cssConfig_: CssConfig;
    private htmlDiv_;
    /**
     * @param separatorDef The information needed to create a separator.
     * @param toolbox The parent toolbox for the separator.
     */
    constructor(separatorDef: toolbox.SeparatorInfo, toolbox: IToolbox);
    init(): void;
    /**
     * Creates the DOM for a separator.
     *
     * @returns The parent element for the separator.
     */
    protected createDom_(): HTMLDivElement;
    getDiv(): HTMLDivElement;
    dispose(): void;
}
export declare namespace ToolboxSeparator {
    interface CssConfig {
        container: string | undefined;
    }
}
export declare type CssConfig = ToolboxSeparator.CssConfig;
//# sourceMappingURL=separator.d.ts.map