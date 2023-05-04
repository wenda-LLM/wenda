/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from '../../block_svg.js';
import { RenderInfo as BaseRenderInfo } from '../common/info.js';
import type { Measurable } from '../measurables/base.js';
import type { Row } from '../measurables/row.js';
import type { Renderer } from './renderer.js';
/**
 * An object containing all sizing information needed to draw this block.
 *
 * This measure pass does not propagate changes to the block (although fields
 * may choose to rerender when getSize() is called).  However, calling it
 * repeatedly may be expensive.
 *
 * @alias Blockly.thrasos.RenderInfo
 */
export declare class RenderInfo extends BaseRenderInfo {
    protected renderer_: Renderer;
    /**
     * @param renderer The renderer in use.
     * @param block The block to measure.
     * @internal
     */
    constructor(renderer: Renderer, block: BlockSvg);
    /**
     * Get the block renderer in use.
     *
     * @returns The block renderer in use.
     * @internal
     */
    getRenderer(): Renderer;
    addElemSpacing_(): void;
    getInRowSpacing_(prev: Measurable | null, next: Measurable | null): number;
    getSpacerRowHeight_(prev: Row, next: Row): number;
    getElemCenterline_(row: Row, elem: Measurable): number;
    finalize_(): void;
}
//# sourceMappingURL=info.d.ts.map