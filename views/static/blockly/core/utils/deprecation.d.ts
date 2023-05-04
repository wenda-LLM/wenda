/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Warn developers that a function or property is deprecated.
 *
 * @param name The name of the function or property.
 * @param deprecationDate The date of deprecation. Prefer 'version n.0.0'
 *     format, and fall back to 'month yyyy' or 'quarter yyyy' format.
 * @param deletionDate The date of deletion. Prefer 'version n.0.0'
 *     format, and fall back to 'month yyyy' or 'quarter yyyy' format.
 * @param opt_use The name of a function or property to use instead, if any.
 * @alias Blockly.utils.deprecation.warn
 * @internal
 */
export declare function warn(name: string, deprecationDate: string, deletionDate: string, opt_use?: string): void;
//# sourceMappingURL=deprecation.d.ts.map