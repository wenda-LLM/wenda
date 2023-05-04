/**
 * @fileoverview ES6 module that exports symbols from base.js so that ES6
 * modules do not need to use globals and so that is clear if a project is using
 * Closure's base.js file. It is also a subset of properties in base.js, meaning
 * it should be clearer what should not be used in ES6 modules
 * (goog.module/provide are not exported here, for example). Though that is not
 * to say that everything in this file should be used in an ES6 module; some
 * depreciated functions are exported to make migration easier (e.g.
 * goog.scope).
 *
 * Note that this does not load Closure's base.js file, it is still up to the
 * programmer to include it. Nor does the fact that this is an ES6 module mean
 * that projects no longer require deps.js files for debug loading - they do.
 * Closure will need to load your ES6 modules for you if you have any Closure
 * file (goog.provide/goog.module) dependencies, as they need to be available
 * before the ES6 module evaluates.
 *
 * Also note that this file has special compiler handling! It is okay to export
 * anything from this file, but the name also needs to exist on the global goog.
 * This special compiler pass enforces that you always import this file as
 * `import * as goog`, as many tools use regex based parsing to find
 * goog.require calls.
 */
export const global: typeof globalThis;
export function declareModuleId(namespace: any): void;
//# sourceMappingURL=goog.d.ts.map