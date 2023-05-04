/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Field } from './field.js';
import type { IRegistrableField } from './interfaces/i_registrable_field.js';
/**
 * Registers a field type.
 * fieldRegistry.fromJson uses this registry to
 * find the appropriate field type.
 *
 * @param type The field type name as used in the JSON definition.
 * @param fieldClass The field class containing a fromJson function that can
 *     construct an instance of the field.
 * @throws {Error} if the type name is empty, the field is already registered,
 *     or the fieldClass is not an object containing a fromJson function.
 * @alias Blockly.fieldRegistry.register
 */
export declare function register(type: string, fieldClass: IRegistrableField): void;
/**
 * Unregisters the field registered with the given type.
 *
 * @param type The field type name as used in the JSON definition.
 * @alias Blockly.fieldRegistry.unregister
 */
export declare function unregister(type: string): void;
/**
 * Construct a Field from a JSON arg object.
 * Finds the appropriate registered field by the type name as registered using
 * fieldRegistry.register.
 *
 * @param options A JSON object with a type and options specific to the field
 *     type.
 * @returns The new field instance or null if a field wasn't found with the
 *     given type name
 * @alias Blockly.fieldRegistry.fromJson
 * @internal
 */
export declare function fromJson(options: any): Field | null;
/**
 * Private version of fromJson for stubbing in tests.
 *
 * @param options
 */
declare function fromJsonInternal(options: any): Field | null;
export declare const TEST_ONLY: {
    fromJsonInternal: typeof fromJsonInternal;
};
export {};
//# sourceMappingURL=field_registry.d.ts.map