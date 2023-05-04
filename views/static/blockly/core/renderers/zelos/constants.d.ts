/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { RenderedConnection } from '../../rendered_connection.js';
import type { Theme } from '../../theme.js';
import { ConstantProvider as BaseConstantProvider } from '../common/constants.js';
import type { Shape } from '../common/constants.js';
/** An object containing sizing and path information about inside corners. */
export interface InsideCorners {
    width: number;
    height: number;
    pathTop: string;
    pathBottom: string;
    rightWidth: number;
    rightHeight: number;
    pathTopRight: string;
    pathBottomRight: string;
}
/**
 * An object that provides constants for rendering blocks in Zelos mode.
 *
 * @alias Blockly.zelos.ConstantProvider
 */
export declare class ConstantProvider extends BaseConstantProvider {
    GRID_UNIT: number;
    STATEMENT_INPUT_SPACER_MIN_WIDTH: number;
    CURSOR_COLOUR: string;
    /**
     * Radius of the cursor for input and output connections.
     *
     * @internal
     */
    CURSOR_RADIUS: number;
    JAGGED_TEETH_HEIGHT: number;
    JAGGED_TEETH_WIDTH: number;
    START_HAT_HEIGHT: number;
    START_HAT_WIDTH: number;
    SHAPES: {
        HEXAGONAL: number;
        ROUND: number;
        SQUARE: number;
        PUZZLE: number;
        NOTCH: number;
    };
    /**
     * Map of output/input shapes and the amount they should cause a block to be
     * padded. Outer key is the outer shape, inner key is the inner shape.
     * When a block with the outer shape contains an input block with the inner
     * shape on its left or right edge, the block elements are aligned such that
     * the padding specified is reached.
     *
     * @internal
     */
    SHAPE_IN_SHAPE_PADDING: {
        [key: number]: {
            [key: number]: number;
        };
    };
    FULL_BLOCK_FIELDS: boolean;
    FIELD_TEXT_FONTWEIGHT: string;
    FIELD_TEXT_FONTFAMILY: string;
    FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW: boolean;
    FIELD_DROPDOWN_COLOURED_DIV: boolean;
    FIELD_DROPDOWN_SVG_ARROW: boolean;
    FIELD_TEXTINPUT_BOX_SHADOW: boolean;
    FIELD_COLOUR_FULL_BLOCK: boolean;
    MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH: number;
    /** The selected glow colour. */
    SELECTED_GLOW_COLOUR: string;
    /** The size of the selected glow. */
    SELECTED_GLOW_SIZE: number;
    /** The replacement glow colour. */
    REPLACEMENT_GLOW_COLOUR: string;
    /** The size of the selected glow. */
    REPLACEMENT_GLOW_SIZE: number;
    /**
     * The ID of the selected glow filter, or the empty string if no filter is
     * set.
     *
     * @internal
     */
    selectedGlowFilterId: string;
    /**
     * The <filter> element to use for a selected glow, or null if not set.
     */
    private selectedGlowFilter_;
    /**
     * The ID of the replacement glow filter, or the empty string if no filter
     * is set.
     *
     * @internal
     */
    replacementGlowFilterId: string;
    /**
     * The <filter> element to use for a replacement glow, or null if not set.
     */
    private replacementGlowFilter_;
    /**
     * The object containing information about the hexagon used for a boolean
     * reporter block. Null before init is called.
     */
    HEXAGONAL: Shape | null;
    /**
     * The object containing information about the hexagon used for a number or
     * string reporter block. Null before init is called.
     */
    ROUNDED: Shape | null;
    /**
     * The object containing information about the hexagon used for a
     * rectangular reporter block. Null before init is called.
     */
    SQUARED: Shape | null;
    /** @internal */
    constructor();
    setFontConstants_(theme: Theme): void;
    init(): void;
    setDynamicProperties_(theme: Theme): void;
    dispose(): void;
    makeStartHat(): {
        height: number;
        width: number;
        path: string;
    };
    /**
     * Create sizing and path information about a hexagonal shape.
     *
     * @returns An object containing sizing and path information about a hexagonal
     *     shape for connections.
     * @internal
     */
    makeHexagonal(): Shape;
    /**
     * Create sizing and path information about a rounded shape.
     *
     * @returns An object containing sizing and path information about a rounded
     *     shape for connections.
     * @internal
     */
    makeRounded(): Shape;
    /**
     * Create sizing and path information about a squared shape.
     *
     * @returns An object containing sizing and path information about a squared
     *     shape for connections.
     * @internal
     */
    makeSquared(): Shape;
    shapeFor(connection: RenderedConnection): Shape;
    makeNotch(): {
        type: number;
        width: number;
        height: number;
        pathLeft: string;
        pathRight: string;
    };
    makeInsideCorners(): {
        width: number;
        height: number;
        pathTop: string;
        pathBottom: string;
        rightWidth: number;
        rightHeight: number;
        pathTopRight: string;
        pathBottomRight: string;
    };
    generateSecondaryColour_(colour: string): string;
    generateTertiaryColour_(colour: string): string;
    createDom(svg: SVGElement, tagName: string, selector: string): void;
    getCSS_(selector: string): string[];
}
//# sourceMappingURL=constants.d.ts.map