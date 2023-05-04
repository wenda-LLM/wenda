/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A name with the type of the SVG element stored in the generic.
 *
 * @alias Blockly.utils.Svg
 */
export declare class Svg<_T> {
    private readonly tagName;
    /** @internal */
    static ANIMATE: Svg<SVGAnimateElement>;
    /** @internal */
    static CIRCLE: Svg<SVGCircleElement>;
    /** @internal */
    static CLIPPATH: Svg<SVGClipPathElement>;
    /** @internal */
    static DEFS: Svg<SVGDefsElement>;
    /** @internal */
    static FECOMPOSITE: Svg<SVGFECompositeElement>;
    /** @internal */
    static FECOMPONENTTRANSFER: Svg<SVGFEComponentTransferElement>;
    /** @internal */
    static FEFLOOD: Svg<SVGFEFloodElement>;
    /** @internal */
    static FEFUNCA: Svg<SVGFEFuncAElement>;
    /** @internal */
    static FEGAUSSIANBLUR: Svg<SVGFEGaussianBlurElement>;
    /** @internal */
    static FEPOINTLIGHT: Svg<SVGFEPointLightElement>;
    /** @internal */
    static FESPECULARLIGHTING: Svg<SVGFESpecularLightingElement>;
    /** @internal */
    static FILTER: Svg<SVGFilterElement>;
    /** @internal */
    static FOREIGNOBJECT: Svg<SVGForeignObjectElement>;
    /** @internal */
    static G: Svg<SVGGElement>;
    /** @internal */
    static IMAGE: Svg<SVGImageElement>;
    /** @internal */
    static LINE: Svg<SVGLineElement>;
    /** @internal */
    static PATH: Svg<SVGPathElement>;
    /** @internal */
    static PATTERN: Svg<SVGPatternElement>;
    /** @internal */
    static POLYGON: Svg<SVGPolygonElement>;
    /** @internal */
    static RECT: Svg<SVGRectElement>;
    /** @internal */
    static SVG: Svg<SVGSVGElement>;
    /** @internal */
    static TEXT: Svg<SVGTextElement>;
    /** @internal */
    static TSPAN: Svg<SVGTSpanElement>;
    /**
     * @param tagName The SVG element tag name.
     * @internal
     */
    constructor(tagName: string);
    /**
     * Returns the SVG element tag name.
     *
     * @returns The name.
     */
    toString(): string;
}
//# sourceMappingURL=svg.d.ts.map