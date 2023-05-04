/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ISerializer } from '../interfaces/i_serializer.js';
/**
 * Registers the given serializer so that it can be used for serialization and
 * deserialization.
 *
 * @param name The name of the serializer to register.
 * @param serializer The serializer to register.
 * @alias Blockly.serialization.registry.register
 */
export declare function register(name: string, serializer: ISerializer): void;
/**
 * Unregisters the serializer associated with the given name.
 *
 * @param name The name of the serializer to unregister.
 * @alias Blockly.serialization.registry.unregister
 */
export declare function unregister(name: string): void;
//# sourceMappingURL=registry.d.ts.map