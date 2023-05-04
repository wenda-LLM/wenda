/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @param childCtor Child class.
 * @param parentCtor Parent class.
 * @suppress {strictMissingProperties} superClass_ is not defined on Function.
 * @deprecated No longer provided by Blockly.
 * @alias Blockly.utils.object.inherits
 */
export declare function inherits(childCtor: Function, parentCtor: Function): void;
/**
 * Copies all the members of a source object to a target object.
 *
 * @param target Target.
 * @param source Source.
 * @deprecated Use the built-in **Object.assign** instead.
 * @alias Blockly.utils.object.mixin
 */
export declare function mixin(target: any, source: any): void;
/**
 * Complete a deep merge of all members of a source object with a target object.
 *
 * @param target Target.
 * @param source Source.
 * @returns The resulting object.
 * @alias Blockly.utils.object.deepMerge
 */
export declare function deepMerge(target: any, source: any): any;
/**
 * Returns an array of a given object's own enumerable property values.
 *
 * @param obj Object containing values.
 * @returns Array of values.
 * @deprecated Use the built-in **Object.values** instead.
 * @alias Blockly.utils.object.values
 */
export declare function values(obj: any): any[];
//# sourceMappingURL=object.d.ts.map