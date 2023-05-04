/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_bubble_open.js';
import type { BlockSvg } from './block_svg.js';
import { Icon } from './icon.js';
/**
 * Class for a warning.
 *
 * @alias Blockly.Warning
 */
export declare class Warning extends Icon {
    private text;
    /** The top-level node of the warning text, or null if not created. */
    private paragraphElement;
    /** Does this icon get hidden when the block is collapsed? */
    collapseHidden: boolean;
    /** @param block The block associated with this warning. */
    constructor(block: BlockSvg);
    /**
     * Draw the warning icon.
     *
     * @param group The icon group.
     */
    protected drawIcon_(group: Element): void;
    /**
     * Show or hide the warning bubble.
     *
     * @param visible True if the bubble should be visible.
     */
    setVisible(visible: boolean): void;
    /** Show the bubble. */
    private createBubble;
    /** Dispose of the bubble and references to it. */
    private disposeBubble;
    /**
     * Set this warning's text.
     *
     * @param text Warning text (or '' to delete). This supports linebreaks.
     * @param id An ID for this text entry to be able to maintain multiple
     *     warnings.
     */
    setText(text: string, id: string): void;
    /**
     * Get this warning's texts.
     *
     * @returns All texts concatenated into one string.
     */
    getText(): string;
    /** Dispose of this warning. */
    dispose(): void;
}
//# sourceMappingURL=warning.d.ts.map