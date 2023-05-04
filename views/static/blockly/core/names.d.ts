/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { VariableMap } from './variable_map.js';
import type { Workspace } from './workspace.js';
/**
 * Class for a database of entity names (variables, procedures, etc).
 *
 * @alias Blockly.Names
 */
export declare class Names {
    static DEVELOPER_VARIABLE_TYPE: NameType;
    private readonly variablePrefix_;
    /** A set of reserved words. */
    private readonly reservedWords;
    /**
     * A map from type (e.g. name, procedure) to maps from names to generated
     * names.
     */
    private readonly db;
    /** A set of used names to avoid collisions. */
    private readonly dbReverse;
    /**
     * The variable map from the workspace, containing Blockly variable models.
     */
    private variableMap_;
    /**
     * @param reservedWordsList A comma-separated string of words that are illegal
     *     for use as names in a language (e.g. 'new,if,this,...').
     * @param opt_variablePrefix Some languages need a '$' or a namespace before
     *     all variable names (but not procedure names).
     */
    constructor(reservedWordsList: string, opt_variablePrefix?: string);
    /**
     * Empty the database and start from scratch.  The reserved words are kept.
     */
    reset(): void;
    /**
     * Set the variable map that maps from variable name to variable object.
     *
     * @param map The map to track.
     */
    setVariableMap(map: VariableMap): void;
    /**
     * Get the name for a user-defined variable, based on its ID.
     * This should only be used for variables of NameType VARIABLE.
     *
     * @param id The ID to look up in the variable map.
     * @returns The name of the referenced variable, or null if there was no
     *     variable map or the variable was not found in the map.
     */
    private getNameForUserVariable_;
    /**
     * Generate names for user variables, but only ones that are being used.
     *
     * @param workspace Workspace to generate variables from.
     */
    populateVariables(workspace: Workspace): void;
    /**
     * Generate names for procedures.
     *
     * @param workspace Workspace to generate procedures from.
     */
    populateProcedures(workspace: Workspace): void;
    /**
     * Convert a Blockly entity name to a legal exportable entity name.
     *
     * @param nameOrId The Blockly entity name (no constraints) or variable ID.
     * @param type The type of the name in Blockly ('VARIABLE', 'PROCEDURE',
     *     'DEVELOPER_VARIABLE', etc...).
     * @returns An entity name that is legal in the exported language.
     */
    getName(nameOrId: string, type: NameType | string): string;
    /**
     * Return a list of all known user-created names of a specified name type.
     *
     * @param type The type of entity in Blockly ('VARIABLE', 'PROCEDURE',
     *     'DEVELOPER_VARIABLE', etc...).
     * @returns A list of Blockly entity names (no constraints).
     */
    getUserNames(type: NameType | string): string[];
    /**
     * Convert a Blockly entity name to a legal exportable entity name.
     * Ensure that this is a new name not overlapping any previously defined name.
     * Also check against list of reserved words for the current language and
     * ensure name doesn't collide.
     *
     * @param name The Blockly entity name (no constraints).
     * @param type The type of entity in Blockly ('VARIABLE', 'PROCEDURE',
     *     'DEVELOPER_VARIABLE', etc...).
     * @returns An entity name that is legal in the exported language.
     */
    getDistinctName(name: string, type: NameType | string): string;
    /**
     * Given a proposed entity name, generate a name that conforms to the
     * [_A-Za-z][_A-Za-z0-9]* format that most languages consider legal for
     * variable and function names.
     *
     * @param name Potentially illegal entity name.
     * @returns Safe entity name.
     */
    private safeName_;
    /**
     * Do the given two entity names refer to the same entity?
     * Blockly names are case-insensitive.
     *
     * @param name1 First name.
     * @param name2 Second name.
     * @returns True if names are the same.
     */
    static equals(name1: string, name2: string): boolean;
}
export declare namespace Names {
    /**
     * Enum for the type of a name. Different name types may have different rules
     * about collisions.
     * When JavaScript (or most other languages) is generated, variable 'foo' and
     * procedure 'foo' would collide.  However, Blockly has no such problems since
     * variable get 'foo' and procedure call 'foo' are unambiguous.
     * Therefore, Blockly keeps a separate name type to disambiguate.
     * getName('foo', 'VARIABLE') = 'foo'
     * getName('foo', 'PROCEDURE') = 'foo2'
     *
     * @alias Blockly.Names.NameType
     */
    enum NameType {
        DEVELOPER_VARIABLE = "DEVELOPER_VARIABLE",
        VARIABLE = "VARIABLE",
        PROCEDURE = "PROCEDURE"
    }
}
export declare type NameType = Names.NameType;
export declare const NameType: typeof Names.NameType;
//# sourceMappingURL=names.d.ts.map