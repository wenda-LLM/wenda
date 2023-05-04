/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import './events/events_block_create.js';
import './events/workspace_events.js';
import './events/events_ui.js';
import './events/events_ui_base.js';
import './events/events_var_create.js';
import { Block } from './block.js';
import * as blockAnimations from './block_animations.js';
import { BlockDragSurfaceSvg } from './block_drag_surface.js';
import { BlockDragger } from './block_dragger.js';
import { BlockSvg } from './block_svg.js';
import { BlocklyOptions } from './blockly_options.js';
import { Blocks } from './blocks.js';
import * as browserEvents from './browser_events.js';
import { Bubble } from './bubble.js';
import { BubbleDragger } from './bubble_dragger.js';
import * as bumpObjects from './bump_objects.js';
import * as clipboard from './clipboard.js';
import { Comment } from './comment.js';
import * as common from './common.js';
import { ComponentManager } from './component_manager.js';
import { config } from './config.js';
import { Connection } from './connection.js';
import { ConnectionChecker } from './connection_checker.js';
import { ConnectionDB } from './connection_db.js';
import { ConnectionType } from './connection_type.js';
import * as ContextMenu from './contextmenu.js';
import * as ContextMenuItems from './contextmenu_items.js';
import { ContextMenuRegistry } from './contextmenu_registry.js';
import * as Css from './css.js';
import { DeleteArea } from './delete_area.js';
import * as dialog from './dialog.js';
import { DragTarget } from './drag_target.js';
import * as dropDownDiv from './dropdowndiv.js';
import * as Events from './events/events.js';
import * as Extensions from './extensions.js';
import { Field } from './field.js';
import { FieldAngle } from './field_angle.js';
import { FieldCheckbox } from './field_checkbox.js';
import { FieldColour } from './field_colour.js';
import { FieldDropdown, MenuGenerator, MenuGeneratorFunction, MenuOption } from './field_dropdown.js';
import { FieldImage } from './field_image.js';
import { FieldLabel } from './field_label.js';
import { FieldLabelSerializable } from './field_label_serializable.js';
import { FieldMultilineInput } from './field_multilineinput.js';
import { FieldNumber } from './field_number.js';
import * as fieldRegistry from './field_registry.js';
import { FieldTextInput } from './field_textinput.js';
import { FieldVariable } from './field_variable.js';
import { Flyout } from './flyout_base.js';
import { FlyoutButton } from './flyout_button.js';
import { HorizontalFlyout } from './flyout_horizontal.js';
import { FlyoutMetricsManager } from './flyout_metrics_manager.js';
import { VerticalFlyout } from './flyout_vertical.js';
import { CodeGenerator } from './generator.js';
import { Gesture } from './gesture.js';
import { Grid } from './grid.js';
import { Icon } from './icon.js';
import { inject } from './inject.js';
import { Input } from './input.js';
import { inputTypes } from './input_types.js';
import { InsertionMarkerManager } from './insertion_marker_manager.js';
import { IASTNodeLocation } from './interfaces/i_ast_node_location.js';
import { IASTNodeLocationSvg } from './interfaces/i_ast_node_location_svg.js';
import { IASTNodeLocationWithBlock } from './interfaces/i_ast_node_location_with_block.js';
import { IAutoHideable } from './interfaces/i_autohideable.js';
import { IBlockDragger } from './interfaces/i_block_dragger.js';
import { IBoundedElement } from './interfaces/i_bounded_element.js';
import { IBubble } from './interfaces/i_bubble.js';
import { ICollapsibleToolboxItem } from './interfaces/i_collapsible_toolbox_item.js';
import { IComponent } from './interfaces/i_component.js';
import { IConnectionChecker } from './interfaces/i_connection_checker.js';
import { IContextMenu } from './interfaces/i_contextmenu.js';
import { ICopyable } from './interfaces/i_copyable.js';
import { IDeletable } from './interfaces/i_deletable.js';
import { IDeleteArea } from './interfaces/i_delete_area.js';
import { IDragTarget } from './interfaces/i_drag_target.js';
import { IDraggable } from './interfaces/i_draggable.js';
import { IFlyout } from './interfaces/i_flyout.js';
import { IKeyboardAccessible } from './interfaces/i_keyboard_accessible.js';
import { IMetricsManager } from './interfaces/i_metrics_manager.js';
import { IMovable } from './interfaces/i_movable.js';
import { IPositionable } from './interfaces/i_positionable.js';
import { IRegistrable } from './interfaces/i_registrable.js';
import { IRegistrableField } from './interfaces/i_registrable_field.js';
import { ISelectable } from './interfaces/i_selectable.js';
import { ISelectableToolboxItem } from './interfaces/i_selectable_toolbox_item.js';
import { IStyleable } from './interfaces/i_styleable.js';
import { IToolbox } from './interfaces/i_toolbox.js';
import { IToolboxItem } from './interfaces/i_toolbox_item.js';
import { ASTNode } from './keyboard_nav/ast_node.js';
import { BasicCursor } from './keyboard_nav/basic_cursor.js';
import { Cursor } from './keyboard_nav/cursor.js';
import { Marker } from './keyboard_nav/marker.js';
import { TabNavigateCursor } from './keyboard_nav/tab_navigate_cursor.js';
import { MarkerManager } from './marker_manager.js';
import { Menu } from './menu.js';
import { MenuItem } from './menuitem.js';
import { MetricsManager } from './metrics_manager.js';
import { Msg, setLocale } from './msg.js';
import { Mutator } from './mutator.js';
import { Names } from './names.js';
import { Options } from './options.js';
import * as uiPosition from './positionable_helpers.js';
import * as Procedures from './procedures.js';
import * as registry from './registry.js';
import { RenderedConnection } from './rendered_connection.js';
import * as blockRendering from './renderers/common/block_rendering.js';
import * as constants from './constants.js';
import * as geras from './renderers/geras/geras.js';
import * as minimalist from './renderers/minimalist/minimalist.js';
import * as thrasos from './renderers/thrasos/thrasos.js';
import * as zelos from './renderers/zelos/zelos.js';
import { Scrollbar } from './scrollbar.js';
import { ScrollbarPair } from './scrollbar_pair.js';
import * as serialization from './serialization.js';
import * as ShortcutItems from './shortcut_items.js';
import { ShortcutRegistry } from './shortcut_registry.js';
import { Theme } from './theme.js';
import * as Themes from './theme/themes.js';
import { ThemeManager } from './theme_manager.js';
import { ToolboxCategory } from './toolbox/category.js';
import { CollapsibleToolboxCategory } from './toolbox/collapsible_category.js';
import { ToolboxSeparator } from './toolbox/separator.js';
import { Toolbox } from './toolbox/toolbox.js';
import { ToolboxItem } from './toolbox/toolbox_item.js';
import * as Tooltip from './tooltip.js';
import * as Touch from './touch.js';
import { TouchGesture } from './touch_gesture.js';
import { Trashcan } from './trashcan.js';
import * as utils from './utils.js';
import { VariableMap } from './variable_map.js';
import { VariableModel } from './variable_model.js';
import * as Variables from './variables.js';
import * as VariablesDynamic from './variables_dynamic.js';
import { Warning } from './warning.js';
import * as WidgetDiv from './widgetdiv.js';
import { Workspace } from './workspace.js';
import { WorkspaceAudio } from './workspace_audio.js';
import { WorkspaceComment } from './workspace_comment.js';
import { WorkspaceCommentSvg } from './workspace_comment_svg.js';
import { WorkspaceDragSurfaceSvg } from './workspace_drag_surface_svg.js';
import { WorkspaceDragger } from './workspace_dragger.js';
import { WorkspaceSvg } from './workspace_svg.js';
import * as Xml from './xml.js';
import { ZoomControls } from './zoom_controls.js';
/**
 * Blockly core version.
 * This constant is overridden by the build script (npm run build) to the value
 * of the version in package.json. This is done by the Closure Compiler in the
 * buildCompressed gulp task.
 * For local builds, you can pass --define='Blockly.VERSION=X.Y.Z' to the
 * compiler to override this constant.
 *
 * @define {string}
 * @alias Blockly.VERSION
 */
export declare const VERSION = "uncompiled";
/**
 * @see Blockly.Input.Align.LEFT
 * @alias Blockly.ALIGN_LEFT
 */
export declare const ALIGN_LEFT = Input.Align.LEFT;
/**
 * @see Blockly.Input.Align.CENTRE
 * @alias Blockly.ALIGN_CENTRE
 */
export declare const ALIGN_CENTRE = Input.Align.CENTRE;
/**
 * @see Blockly.Input.Align.RIGHT
 * @alias Blockly.ALIGN_RIGHT
 */
export declare const ALIGN_RIGHT = Input.Align.RIGHT;
/**
 * @see ConnectionType.INPUT_VALUE
 * @alias Blockly.INPUT_VALUE
 */
export declare const INPUT_VALUE = ConnectionType.INPUT_VALUE;
/**
 * @see ConnectionType.OUTPUT_VALUE
 * @alias Blockly.OUTPUT_VALUE
 */
export declare const OUTPUT_VALUE = ConnectionType.OUTPUT_VALUE;
/**
 * @see ConnectionType.NEXT_STATEMENT
 * @alias Blockly.NEXT_STATEMENT
 */
export declare const NEXT_STATEMENT = ConnectionType.NEXT_STATEMENT;
/**
 * @see ConnectionType.PREVIOUS_STATEMENT
 * @alias Blockly.PREVIOUS_STATEMENT
 */
export declare const PREVIOUS_STATEMENT = ConnectionType.PREVIOUS_STATEMENT;
/**
 * @see inputTypes.DUMMY_INPUT
 * @alias Blockly.DUMMY_INPUT
 */
export declare const DUMMY_INPUT: inputTypes;
/** Aliases for toolbox positions. */
/**
 * @see toolbox.Position.TOP
 * @alias Blockly.TOOLBOX_AT_TOP
 */
export declare const TOOLBOX_AT_TOP = utils.toolbox.Position.TOP;
/**
 * @see toolbox.Position.BOTTOM
 * @alias Blockly.TOOLBOX_AT_BOTTOM
 */
export declare const TOOLBOX_AT_BOTTOM = utils.toolbox.Position.BOTTOM;
/**
 * @see toolbox.Position.LEFT
 * @alias Blockly.TOOLBOX_AT_LEFT
 */
export declare const TOOLBOX_AT_LEFT = utils.toolbox.Position.LEFT;
/**
 * @see toolbox.Position.RIGHT
 * @alias Blockly.TOOLBOX_AT_RIGHT
 */
export declare const TOOLBOX_AT_RIGHT = utils.toolbox.Position.RIGHT;
/**
 * Size the SVG image to completely fill its container. Call this when the view
 * actually changes sizes (e.g. on a window resize/device orientation change).
 * See workspace.resizeContents to resize the workspace when the contents
 * change (e.g. when a block is added or removed).
 * Record the height/width of the SVG image.
 *
 * @param workspace Any workspace in the SVG.
 * @see Blockly.common.svgResize
 * @alias Blockly.svgResize
 */
export declare const svgResize: typeof common.svgResize;
/**
 * Close tooltips, context menus, dropdown selections, etc.
 *
 * @param opt_onlyClosePopups Whether only popups should be closed.
 * @see Blockly.WorkspaceSvg.hideChaff
 * @alias Blockly.hideChaff
 */
export declare function hideChaff(opt_onlyClosePopups?: boolean): void;
/**
 * Returns the main workspace.  Returns the last used main workspace (based on
 * focus).  Try not to use this function, particularly if there are multiple
 * Blockly instances on a page.
 *
 * @see Blockly.common.getMainWorkspace
 * @alias Blockly.getMainWorkspace
 */
export declare const getMainWorkspace: typeof common.getMainWorkspace;
/**
 * Returns the currently selected copyable object.
 *
 * @alias Blockly.common.getSelected
 */
export declare const getSelected: typeof common.getSelected;
/**
 * Define blocks from an array of JSON block definitions, as might be generated
 * by the Blockly Developer Tools.
 *
 * @param jsonArray An array of JSON block definitions.
 * @see Blockly.common.defineBlocksWithJsonArray
 * @alias Blockly.defineBlocksWithJsonArray
 */
export declare const defineBlocksWithJsonArray: typeof common.defineBlocksWithJsonArray;
/**
 * Set the parent container.  This is the container element that the WidgetDiv,
 * dropDownDiv, and Tooltip are rendered into the first time `Blockly.inject`
 * is called.
 * This method is a NOP if called after the first `Blockly.inject`.
 *
 * @param container The container element.
 * @see Blockly.common.setParentContainer
 * @alias Blockly.setParentContainer
 */
export declare const setParentContainer: typeof common.setParentContainer;
/**
 * Size the workspace when the contents change.  This also updates
 * scrollbars accordingly.
 *
 * @param workspace The workspace to resize.
 * @deprecated Use **workspace.resizeContents** instead.
 * @see Blockly.WorkspaceSvg.resizeContents
 * @alias Blockly.resizeSvgContents
 */
declare function resizeSvgContentsLocal(workspace: WorkspaceSvg): void;
export declare const resizeSvgContents: typeof resizeSvgContentsLocal;
/**
 * Copy a block or workspace comment onto the local clipboard.
 *
 * @param toCopy Block or Workspace Comment to be copied.
 * @deprecated Use **Blockly.clipboard.copy** instead.
 * @see Blockly.clipboard.copy
 * @alias Blockly.copy
 */
export declare function copy(toCopy: ICopyable): void;
/**
 * Paste a block or workspace comment on to the main workspace.
 *
 * @returns True if the paste was successful, false otherwise.
 * @deprecated Use **Blockly.clipboard.paste** instead.
 * @see Blockly.clipboard.paste
 * @alias Blockly.paste
 */
export declare function paste(): boolean;
/**
 * Duplicate this block and its children, or a workspace comment.
 *
 * @param toDuplicate Block or Workspace Comment to be copied.
 * @deprecated Use **Blockly.clipboard.duplicate** instead.
 * @see Blockly.clipboard.duplicate
 * @alias Blockly.duplicate
 */
export declare function duplicate(toDuplicate: ICopyable): void;
/**
 * Is the given string a number (includes negative and decimals).
 *
 * @param str Input string.
 * @returns True if number, false otherwise.
 * @deprecated Use **Blockly.utils.string.isNumber** instead.
 * @see Blockly.utils.string.isNumber
 * @alias Blockly.isNumber
 */
export declare function isNumber(str: string): boolean;
/**
 * Convert a hue (HSV model) into an RGB hex triplet.
 *
 * @param hue Hue on a colour wheel (0-360).
 * @returns RGB code, e.g. '#5ba65b'.
 * @deprecated Use **Blockly.utils.colour.hueToHex** instead.
 * @see Blockly.utils.colour.hueToHex
 * @alias Blockly.hueToHex
 */
export declare function hueToHex(hue: number): string;
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
 * @deprecated Use **Blockly.browserEvents.bind** instead.
 * @see Blockly.browserEvents.bind
 * @alias Blockly.bindEvent_
 */
export declare function bindEvent_(node: EventTarget, name: string, thisObject: Object | null, func: Function): browserEvents.Data;
/**
 * Unbind one or more events event from a function call.
 *
 * @param bindData Opaque data from bindEvent_.
 *     This list is emptied during the course of calling this function.
 * @returns The function call.
 * @deprecated Use **Blockly.browserEvents.unbind** instead.
 * @see browserEvents.unbind
 * @alias Blockly.unbindEvent_
 */
export declare function unbindEvent_(bindData: browserEvents.Data): Function;
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
 * @deprecated Use **Blockly.browserEvents.conditionalBind** instead.
 * @see browserEvents.conditionalBind
 * @alias Blockly.bindEventWithChecks_
 */
export declare function bindEventWithChecks_(node: EventTarget, name: string, thisObject: Object | null, func: Function, opt_noCaptureIdentifier?: boolean, opt_noPreventDefault?: boolean): browserEvents.Data;
export declare const COLLAPSE_CHARS = 30;
export declare const DRAG_STACK = true;
export declare const OPPOSITE_TYPE: number[];
export declare const RENAME_VARIABLE_ID = "RENAME_VARIABLE_ID";
export declare const DELETE_VARIABLE_ID = "DELETE_VARIABLE_ID";
export declare const COLLAPSED_INPUT_NAME = "_TEMP_COLLAPSED_INPUT";
export declare const COLLAPSED_FIELD_NAME = "_TEMP_COLLAPSED_FIELD";
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * variable blocks.
 *
 * @alias Blockly.VARIABLE_CATEGORY_NAME
 */
export declare const VARIABLE_CATEGORY_NAME: string;
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * variable blocks.
 *
 * @alias Blockly.VARIABLE_DYNAMIC_CATEGORY_NAME
 */
export declare const VARIABLE_DYNAMIC_CATEGORY_NAME: string;
/**
 * String for use in the "custom" attribute of a category in toolbox XML.
 * This string indicates that the category should be dynamically populated with
 * procedure blocks.
 *
 * @alias Blockly.PROCEDURE_CATEGORY_NAME
 */
export declare const PROCEDURE_CATEGORY_NAME: string;
export { browserEvents };
export { ContextMenu };
export { ContextMenuItems };
export { Css };
export { Events };
export { Extensions };
export { Procedures };
export { Procedures as procedures };
export { ShortcutItems };
export { Themes };
export { Tooltip };
export { Touch };
export { Variables };
export { VariablesDynamic };
export { WidgetDiv };
export { Xml };
export { blockAnimations };
export { blockRendering };
export { bumpObjects };
export { clipboard };
export { common };
export { constants };
export { dialog };
export { fieldRegistry };
export { geras };
export { minimalist };
export { registry };
export { thrasos };
export { uiPosition };
export { utils };
export { zelos };
export { ASTNode };
export { BasicCursor };
export { Block };
export { BlocklyOptions };
export { BlockDragger };
export { BlockDragSurfaceSvg };
export { BlockSvg };
export { Blocks };
export { Bubble };
export { BubbleDragger };
export { CollapsibleToolboxCategory };
export { Comment };
export { ComponentManager };
export { Connection };
export { ConnectionType };
export { ConnectionChecker };
export { ConnectionDB };
export { ContextMenuRegistry };
export { Cursor };
export { DeleteArea };
export { DragTarget };
export declare const DropDownDiv: typeof dropDownDiv;
export { Field };
export { FieldAngle };
export { FieldCheckbox };
export { FieldColour };
export { FieldDropdown, MenuGenerator, MenuGeneratorFunction, MenuOption };
export { FieldImage };
export { FieldLabel };
export { FieldLabelSerializable };
export { FieldMultilineInput };
export { FieldNumber };
export { FieldTextInput };
export { FieldVariable };
export { Flyout };
export { FlyoutButton };
export { FlyoutMetricsManager };
export { CodeGenerator };
export { CodeGenerator as Generator };
export { Gesture };
export { Grid };
export { HorizontalFlyout };
export { IASTNodeLocation };
export { IASTNodeLocationSvg };
export { IASTNodeLocationWithBlock };
export { IAutoHideable };
export { IBlockDragger };
export { IBoundedElement };
export { IBubble };
export { ICollapsibleToolboxItem };
export { IComponent };
export { IConnectionChecker };
export { IContextMenu };
export { Icon };
export { ICopyable };
export { IDeletable };
export { IDeleteArea };
export { IDragTarget };
export { IDraggable };
export { IFlyout };
export { IKeyboardAccessible };
export { IMetricsManager };
export { IMovable };
export { Input };
export { InsertionMarkerManager };
export { IPositionable };
export { IRegistrable };
export { IRegistrableField };
export { ISelectable };
export { ISelectableToolboxItem };
export { IStyleable };
export { IToolbox };
export { IToolboxItem };
export { Marker };
export { MarkerManager };
export { Menu };
export { MenuItem };
export { MetricsManager };
export { Mutator };
export { Msg, setLocale };
export { Names };
export { Options };
export { RenderedConnection };
export { Scrollbar };
export { ScrollbarPair };
export { ShortcutRegistry };
export { TabNavigateCursor };
export { Theme };
export { ThemeManager };
export { Toolbox };
export { ToolboxCategory };
export { ToolboxItem };
export { ToolboxSeparator };
export { TouchGesture };
export { Trashcan };
export { VariableMap };
export { VariableModel };
export { VerticalFlyout };
export { Warning };
export { Workspace };
export { WorkspaceAudio };
export { WorkspaceComment };
export { WorkspaceCommentSvg };
export { WorkspaceDragSurfaceSvg };
export { WorkspaceDragger };
export { WorkspaceSvg };
export { ZoomControls };
export { config };
/** @deprecated Use Blockly.ConnectionType instead. */
export declare const connectionTypes: typeof ConnectionType;
export { inject };
export { inputTypes };
export { serialization };
//# sourceMappingURL=blockly.d.ts.map