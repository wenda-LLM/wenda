/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { IAutoHideable } from './interfaces/i_autohideable.js';
import type { IComponent } from './interfaces/i_component.js';
import type { IDeleteArea } from './interfaces/i_delete_area.js';
import type { IDragTarget } from './interfaces/i_drag_target.js';
import type { IPositionable } from './interfaces/i_positionable.js';
declare class Capability<_T> {
    static POSITIONABLE: Capability<IPositionable>;
    static DRAG_TARGET: Capability<IDragTarget>;
    static DELETE_AREA: Capability<IDeleteArea>;
    static AUTOHIDEABLE: Capability<IAutoHideable>;
    private readonly name_;
    /** @param name The name of the component capability. */
    constructor(name: string);
    /**
     * Returns the name of the capability.
     *
     * @returns The name.
     */
    toString(): string;
}
/**
 * Manager for all items registered with the workspace.
 *
 * @alias Blockly.ComponentManager
 */
export declare class ComponentManager {
    static Capability: typeof Capability;
    /**
     * A map of the components registered with the workspace, mapped to id.
     */
    private readonly componentData;
    /** A map of capabilities to component IDs. */
    private readonly capabilityToComponentIds;
    /**
     * Adds a component.
     *
     * @param componentInfo The data for the component to register.
     * @param opt_allowOverrides True to prevent an error when overriding an
     *     already registered item.
     */
    addComponent(componentInfo: ComponentDatum, opt_allowOverrides?: boolean): void;
    /**
     * Removes a component.
     *
     * @param id The ID of the component to remove.
     */
    removeComponent(id: string): void;
    /**
     * Adds a capability to a existing registered component.
     *
     * @param id The ID of the component to add the capability to.
     * @param capability The capability to add.
     */
    addCapability<T>(id: string, capability: string | Capability<T>): void;
    /**
     * Removes a capability from an existing registered component.
     *
     * @param id The ID of the component to remove the capability from.
     * @param capability The capability to remove.
     */
    removeCapability<T>(id: string, capability: string | Capability<T>): void;
    /**
     * Returns whether the component with this id has the specified capability.
     *
     * @param id The ID of the component to check.
     * @param capability The capability to check for.
     * @returns Whether the component has the capability.
     */
    hasCapability<T>(id: string, capability: string | Capability<T>): boolean;
    /**
     * Gets the component with the given ID.
     *
     * @param id The ID of the component to get.
     * @returns The component with the given name or undefined if not found.
     */
    getComponent(id: string): IComponent | undefined;
    /**
     * Gets all the components with the specified capability.
     *
     * @param capability The capability of the component.
     * @param sorted Whether to return list ordered by weights.
     * @returns The components that match the specified capability.
     */
    getComponents<T extends IComponent>(capability: string | Capability<T>, sorted: boolean): T[];
}
export declare namespace ComponentManager {
    /** An object storing component information. */
    interface ComponentDatum {
        component: IComponent;
        capabilities: Array<string | Capability<IComponent>>;
        weight: number;
    }
}
export declare type ComponentDatum = ComponentManager.ComponentDatum;
export {};
//# sourceMappingURL=component_manager.d.ts.map