/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Class for representing coordinates and positions.
 *
 * @alias Blockly.utils.Coordinate
 */
export declare class Coordinate {
    x: number;
    y: number;
    /**
     * @param x Left.
     * @param y Top.
     */
    constructor(x: number, y: number);
    /**
     * Creates a new copy of this coordinate.
     *
     * @returns A copy of this coordinate.
     */
    clone(): Coordinate;
    /**
     * Scales this coordinate by the given scale factor.
     *
     * @param s The scale factor to use for both x and y dimensions.
     * @returns This coordinate after scaling.
     */
    scale(s: number): Coordinate;
    /**
     * Translates this coordinate by the given offsets.
     * respectively.
     *
     * @param tx The value to translate x by.
     * @param ty The value to translate y by.
     * @returns This coordinate after translating.
     */
    translate(tx: number, ty: number): Coordinate;
    /**
     * Compares coordinates for equality.
     *
     * @param a A Coordinate.
     * @param b A Coordinate.
     * @returns True iff the coordinates are equal, or if both are null.
     */
    static equals(a?: Coordinate | null, b?: Coordinate | null): boolean;
    /**
     * Returns the distance between two coordinates.
     *
     * @param a A Coordinate.
     * @param b A Coordinate.
     * @returns The distance between `a` and `b`.
     */
    static distance(a: Coordinate, b: Coordinate): number;
    /**
     * Returns the magnitude of a coordinate.
     *
     * @param a A Coordinate.
     * @returns The distance between the origin and `a`.
     */
    static magnitude(a: Coordinate): number;
    /**
     * Returns the difference between two coordinates as a new
     * Coordinate.
     *
     * @param a An x/y coordinate.
     * @param b An x/y coordinate.
     * @returns A Coordinate representing the difference between `a` and `b`.
     */
    static difference(a: Coordinate | SVGPoint, b: Coordinate | SVGPoint): Coordinate;
    /**
     * Returns the sum of two coordinates as a new Coordinate.
     *
     * @param a An x/y coordinate.
     * @param b An x/y coordinate.
     * @returns A Coordinate representing the sum of the two coordinates.
     */
    static sum(a: Coordinate | SVGPoint, b: Coordinate | SVGPoint): Coordinate;
}
//# sourceMappingURL=coordinate.d.ts.map