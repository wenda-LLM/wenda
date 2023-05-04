/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Coordinate } from './utils/coordinate.js';
import type { Workspace } from './workspace.js';
/**
 * Class for a workspace comment.
 *
 * @alias Blockly.WorkspaceComment
 */
export declare class WorkspaceComment {
    workspace: Workspace;
    id: string;
    protected xy_: Coordinate;
    protected height_: number;
    protected width_: number;
    protected RTL: boolean;
    private deletable_;
    private movable_;
    private editable_;
    protected content_: string;
    /** Whether this comment has been disposed. */
    protected disposed_: boolean;
    /** @internal */
    isComment: boolean;
    /**
     * @param workspace The block's workspace.
     * @param content The content of this workspace comment.
     * @param height Height of the comment.
     * @param width Width of the comment.
     * @param opt_id Optional ID.  Use this ID if provided, otherwise create a new
     *     ID.
     */
    constructor(workspace: Workspace, content: string, height: number, width: number, opt_id?: string);
    /**
     * Dispose of this comment.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Get comment height.
     *
     * @returns Comment height.
     * @internal
     */
    getHeight(): number;
    /**
     * Set comment height.
     *
     * @param height Comment height.
     * @internal
     */
    setHeight(height: number): void;
    /**
     * Get comment width.
     *
     * @returns Comment width.
     * @internal
     */
    getWidth(): number;
    /**
     * Set comment width.
     *
     * @param width comment width.
     * @internal
     */
    setWidth(width: number): void;
    /**
     * Get stored location.
     *
     * @returns The comment's stored location.
     *   This is not valid if the comment is currently being dragged.
     * @internal
     */
    getXY(): Coordinate;
    /**
     * Move a comment by a relative offset.
     *
     * @param dx Horizontal offset, in workspace units.
     * @param dy Vertical offset, in workspace units.
     * @internal
     */
    moveBy(dx: number, dy: number): void;
    /**
     * Get whether this comment is deletable or not.
     *
     * @returns True if deletable.
     * @internal
     */
    isDeletable(): boolean;
    /**
     * Set whether this comment is deletable or not.
     *
     * @param deletable True if deletable.
     * @internal
     */
    setDeletable(deletable: boolean): void;
    /**
     * Get whether this comment is movable or not.
     *
     * @returns True if movable.
     * @internal
     */
    isMovable(): boolean;
    /**
     * Set whether this comment is movable or not.
     *
     * @param movable True if movable.
     * @internal
     */
    setMovable(movable: boolean): void;
    /**
     * Get whether this comment is editable or not.
     *
     * @returns True if editable.
     */
    isEditable(): boolean;
    /**
     * Set whether this comment is editable or not.
     *
     * @param editable True if editable.
     */
    setEditable(editable: boolean): void;
    /**
     * Returns this comment's text.
     *
     * @returns Comment text.
     * @internal
     */
    getContent(): string;
    /**
     * Set this comment's content.
     *
     * @param content Comment content.
     * @internal
     */
    setContent(content: string): void;
    /**
     * Encode a comment subtree as XML with XY coordinates.
     *
     * @param opt_noId True if the encoder should skip the comment ID.
     * @returns Tree of XML elements.
     * @internal
     */
    toXmlWithXY(opt_noId?: boolean): Element;
    /**
     * Encode a comment subtree as XML, but don't serialize the XY coordinates.
     * This method avoids some expensive metrics-related calls that are made in
     * toXmlWithXY().
     *
     * @param opt_noId True if the encoder should skip the comment ID.
     * @returns Tree of XML elements.
     * @internal
     */
    toXml(opt_noId?: boolean): Element;
    /**
     * Fire a create event for the given workspace comment, if comments are
     * enabled.
     *
     * @param comment The comment that was just created.
     * @internal
     */
    static fireCreateEvent(comment: WorkspaceComment): void;
    /**
     * Decode an XML comment tag and create a comment on the workspace.
     *
     * @param xmlComment XML comment element.
     * @param workspace The workspace.
     * @returns The created workspace comment.
     * @internal
     */
    static fromXml(xmlComment: Element, workspace: Workspace): WorkspaceComment;
    /**
     * Decode an XML comment tag and return the results in an object.
     *
     * @param xml XML comment element.
     * @returns An object containing the id, size, position, and comment string.
     * @internal
     */
    static parseAttributes(xml: Element): {
        id: string;
        w: number;
        h: number;
        x: number;
        y: number;
        content: string;
    };
}
//# sourceMappingURL=workspace_comment.d.ts.map