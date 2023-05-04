/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as browserEvents from './browser_events.js';
import { Gesture } from './gesture.js';
import { Coordinate } from './utils/coordinate.js';
/**
 * Class for one gesture.
 *
 * @alias Blockly.TouchGesture
 */
export declare class TouchGesture extends Gesture {
    /** Boolean for whether or not this gesture is a multi-touch gesture. */
    private isMultiTouch_;
    /** A map of cached points used for tracking multi-touch gestures. */
    private cachedPoints;
    /**
     * This is the ratio between the starting distance between the touch points
     * and the most recent distance between the touch points.
     * Scales between 0 and 1 mean the most recent zoom was a zoom out.
     * Scales above 1.0 mean the most recent zoom was a zoom in.
     */
    private previousScale_;
    /** The starting distance between two touch points. */
    private startDistance_;
    /**
     * A handle to use to unbind the second touch start or pointer down listener
     * at the end of a drag.
     * Opaque data returned from Blockly.bindEventWithChecks_.
     */
    private onStartWrapper_;
    /** Boolean for whether or not the workspace supports pinch-zoom. */
    private isPinchZoomEnabled_;
    onMoveWrapper_: browserEvents.Data | null;
    onUpWrapper_: browserEvents.Data | null;
    /**
     * Start a gesture: update the workspace to indicate that a gesture is in
     * progress and bind mousemove and mouseup handlers.
     *
     * @param e A mouse down, touch start or pointer down event.
     * @internal
     */
    doStart(e: MouseEvent): void;
    /**
     * Bind gesture events.
     * Overriding the gesture definition of this function, binding the same
     * functions for onMoveWrapper_ and onUpWrapper_ but passing
     * opt_noCaptureIdentifier.
     * In addition, binding a second mouse down event to detect multi-touch
     * events.
     *
     * @param e A mouse down or touch start event.
     * @internal
     */
    bindMouseEvents(e: Event): void;
    /**
     * Handle a mouse down, touch start, or pointer down event.
     *
     * @param e A mouse down, touch start, or pointer down event.
     * @internal
     */
    handleStart(e: Event): void;
    /**
     * Handle a mouse move, touch move, or pointer move event.
     *
     * @param e A mouse move, touch move, or pointer move event.
     * @internal
     */
    handleMove(e: MouseEvent): void;
    /**
     * Handle a mouse up, touch end, or pointer up event.
     *
     * @param e A mouse up, touch end, or pointer up event.
     * @internal
     */
    handleUp(e: Event): void;
    /**
     * Whether this gesture is part of a multi-touch gesture.
     *
     * @returns Whether this gesture is part of a multi-touch gesture.
     * @internal
     */
    isMultiTouch(): boolean;
    /**
     * Sever all links from this object.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Handle a touch start or pointer down event and keep track of current
     * pointers.
     *
     * @param e A touch start, or pointer down event.
     * @internal
     */
    handleTouchStart(e: Event): void;
    /**
     * Handle a touch move or pointer move event and zoom in/out if two pointers
     * are on the screen.
     *
     * @param e A touch move, or pointer move event.
     * @internal
     */
    handleTouchMove(e: MouseEvent): void;
    /**
     * Handle pinch zoom gesture.
     *
     * @param e A touch move, or pointer move event.
     */
    private handlePinch_;
    /**
     * Handle a touch end or pointer end event and end the gesture.
     *
     * @param e A touch end, or pointer end event.
     * @internal
     */
    handleTouchEnd(e: Event): void;
    /**
     * Helper function returning the current touch point coordinate.
     *
     * @param e A touch or pointer event.
     * @returns The current touch point coordinate
     * @internal
     */
    getTouchPoint(e: Event): Coordinate | null;
}
//# sourceMappingURL=touch_gesture.d.ts.map