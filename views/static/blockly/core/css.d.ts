/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Add some CSS to the blob that will be injected later.  Allows optional
 * components such as fields and the toolbox to store separate CSS.
 *
 * @param cssContent Multiline CSS string or an array of single lines of CSS.
 * @alias Blockly.Css.register
 */
export declare function register(cssContent: string): void;
/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 *
 * @param hasCss If false, don't inject CSS (providing CSS becomes the
 *     document's responsibility).
 * @param pathToMedia Path from page to the Blockly media directory.
 * @alias Blockly.Css.inject
 */
export declare function inject(hasCss: boolean, pathToMedia: string): void;
//# sourceMappingURL=css.d.ts.map