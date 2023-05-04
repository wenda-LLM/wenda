/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Blockly opaque event data used to unbind events when using
 * `bind` and `conditionalBind`.
 *
 * @alias Blockly.browserEvents.Data
 */
export declare type Data = [EventTarget, string, (e: Event) => void][];
/**
 * Bind an event handler that can be ignored if it is not part of the active
 * touch stream.
 * Use this for events that either start or continue a multi-part gesture (e.g.
 * mousedown or mousemove, which may be part of a drag or click).
 *
 * @param node Node upon which to listen.
 * @param name Event name to listen to (e.g. 'mousedown').
 * @param thisObject The value of 'this' in the function.
 * @param func Function to call when event is triggered.
 * @param opt_noCaptureIdentifier True if triggering on this event should not
 *     block execution of other event handlers on this touch or other
 *     simultaneous touches.  False by default.
 * @param opt_noPreventDefault True if triggering on this event should prevent
 *     the default handler.  False by default.  If opt_noPreventDefault is
 *     provided, opt_noCaptureIdentifier must also be provided.
 * @returns Opaque data that can be passed to unbindEvent_.
 * @alias Blockly.browserEvents.conditionalBind
 */
export declare function conditionalBind(node: EventTarget, name: string, thisObject: Object | null, func: Function, opt_noCaptureIdentifier?: boolean, opt_noPreventDefault?: boolean): Data;
/**
 * Bind an event handler that should be called regardless of whether it is part
 * of the active touch stream.
 * Use this for events that are not part of a multi-part gesture (e.g.
 * mouseover for tooltips).
 *
 * @param node Node upon which to listen.
 * @param name Event name to listen to (e.g. 'mousedown').
 * @param thisObject The value of 'this' in the function.
 * @param func Function to call when event is triggered.
 * @returns Opaque data that can be passed to unbindEvent_.
 * @alias Blockly.browserEvents.bind
 */
export declare function bind(node: EventTarget, name: string, thisObject: Object | null, func: Function): Data;
/**
 * Unbind one or more events event from a function call.
 *
 * @param bindData Opaque data from bindEvent_.
 *     This list is emptied during the course of calling this function.
 * @returns The function call.
 * @alias Blockly.browserEvents.unbind
 */
export declare function unbind(bindData: Data): (e: Event) => void;
/**
 * Returns true if this event is targeting a text input widget?
 *
 * @param e An event.
 * @returns True if text input.
 * @alias Blockly.browserEvents.isTargetInput
 */
export declare function isTargetInput(e: Event): boolean;
/**
 * Returns true this event is a right-click.
 *
 * @param e Mouse event.
 * @returns True if right-click.
 * @alias Blockly.browserEvents.isRightButton
 */
export declare function isRightButton(e: MouseEvent): boolean;
/**
 * Returns the converted coordinates of the given mouse event.
 * The origin (0,0) is the top-left corner of the Blockly SVG.
 *
 * @param e Mouse event.
 * @param svg SVG element.
 * @param matrix Inverted screen CTM to use.
 * @returns Object with .x and .y properties.
 * @alias Blockly.browserEvents.mouseToSvg
 */
export declare function mouseToSvg(e: MouseEvent, svg: SVGSVGElement, matrix: SVGMatrix | null): SVGPoint;
/**
 * Returns the scroll delta of a mouse event in pixel units.
 *
 * @param e Mouse event.
 * @returns Scroll delta object with .x and .y properties.
 * @alias Blockly.browserEvents.getScrollDeltaPixels
 */
export declare function getScrollDeltaPixels(e: WheelEvent): {
    x: number;
    y: number;
};
//# sourceMappingURL=browser_events.d.ts.map