/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlockSvg } from './block_svg.js';
/**
 * Play some UI effects (sound, animation) when disposing of a block.
 *
 * @param block The block being disposed of.
 * @alias Blockly.blockAnimations.disposeUiEffect
 * @internal
 */
export declare function disposeUiEffect(block: BlockSvg): void;
/**
 * Play some UI effects (sound, ripple) after a connection has been established.
 *
 * @param block The block being connected.
 * @alias Blockly.blockAnimations.connectionUiEffect
 * @internal
 */
export declare function connectionUiEffect(block: BlockSvg): void;
/**
 * Play some UI effects (sound, animation) when disconnecting a block.
 *
 * @param block The block being disconnected.
 * @alias Blockly.blockAnimations.disconnectUiEffect
 * @internal
 */
export declare function disconnectUiEffect(block: BlockSvg): void;
/**
 * Stop the disconnect UI animation immediately.
 *
 * @alias Blockly.blockAnimations.disconnectUiStop
 * @internal
 */
export declare function disconnectUiStop(): void;
//# sourceMappingURL=block_animations.d.ts.map