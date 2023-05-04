/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Class for representing rectangular regions.
 *
 * @alias Blockly.utils.Rect
 */
export declare class Rect {
    top: number;
    bottom: number;
    left: number;
    right: number;
    /**
     * @param top Top.
     * @param bottom Bottom.
     * @param left Left.
     * @param right Right.
     */
    constructor(top: number, bottom: number, left: number, right: number);
    /**
     * Tests whether this rectangle contains a x/y coordinate.
     *
     * @param x The x coordinate to test for containment.
     * @param y The y coordinate to test for containment.
     * @returns Whether this rectangle contains given coordinate.
     */
    contains(x: number, y: number): boolean;
    /**
     * Tests whether this rectangle intersects the provided rectangle.
     * Assumes that the coordinate system increases going down and left.
     *
     * @param other The other rectangle to check for intersection with.
     * @returns Whether this rectangle intersects the provided rectangle.
     */
    intersects(other: Rect): boolean;
}
//# sourceMappingURL=rect.d.ts.map