/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { BlocklyOptions } from './blockly_options.js';
import { WorkspaceSvg } from './workspace_svg.js';
/**
 * Inject a Blockly editor into the specified container element (usually a div).
 *
 * @param container Containing element, or its ID, or a CSS selector.
 * @param opt_options Optional dictionary of options.
 * @returns Newly created main workspace.
 * @alias Blockly.inject
 */
export declare function inject(container: Element | string, opt_options?: BlocklyOptions): WorkspaceSvg;
//# sourceMappingURL=inject.d.ts.map