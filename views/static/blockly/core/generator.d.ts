/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Block } from './block.js';
import { Names } from './names.js';
import type { Workspace } from './workspace.js';
/**
 * Class for a code generator that translates the blocks into a language.
 *
 * @unrestricted
 * @alias Blockly.CodeGenerator
 */
export declare class CodeGenerator {
    name_: string;
    /**
     * This is used as a placeholder in functions defined using
     * CodeGenerator.provideFunction_.  It must not be legal code that could
     * legitimately appear in a function definition (or comment), and it must
     * not confuse the regular expression parser.
     */
    protected FUNCTION_NAME_PLACEHOLDER_: string;
    FUNCTION_NAME_PLACEHOLDER_REGEXP_: RegExp;
    /**
     * Arbitrary code to inject into locations that risk causing infinite loops.
     * Any instances of '%1' will be replaced by the block ID that failed.
     * E.g. `  checkTimeout(%1);\n`
     */
    INFINITE_LOOP_TRAP: string | null;
    /**
     * Arbitrary code to inject before every statement.
     * Any instances of '%1' will be replaced by the block ID of the statement.
     * E.g. `highlight(%1);\n`
     */
    STATEMENT_PREFIX: string | null;
    /**
     * Arbitrary code to inject after every statement.
     * Any instances of '%1' will be replaced by the block ID of the statement.
     * E.g. `highlight(%1);\n`
     */
    STATEMENT_SUFFIX: string | null;
    /**
     * The method of indenting.  Defaults to two spaces, but language generators
     * may override this to increase indent or change to tabs.
     */
    INDENT: string;
    /**
     * Maximum length for a comment before wrapping.  Does not account for
     * indenting level.
     */
    COMMENT_WRAP: number;
    /** List of outer-inner pairings that do NOT require parentheses. */
    ORDER_OVERRIDES: number[][];
    /**
     * Whether the init method has been called.
     * Generators that set this flag to false after creation and true in init
     * will cause blockToCode to emit a warning if the generator has not been
     * initialized. If this flag is untouched, it will have no effect.
     */
    isInitialized: boolean | null;
    /** Comma-separated list of reserved words. */
    protected RESERVED_WORDS_: string;
    /** A dictionary of definitions to be printed before the code. */
    protected definitions_: {
        [key: string]: string;
    };
    /**
     * A dictionary mapping desired function names in definitions_ to actual
     * function names (to avoid collisions with user functions).
     */
    protected functionNames_: {
        [key: string]: string;
    };
    /** A database of variable and procedure names. */
    protected nameDB_?: Names;
    /** @param name Language name of this generator. */
    constructor(name: string);
    /**
     * Generate code for all blocks in the workspace to the specified language.
     *
     * @param workspace Workspace to generate code from.
     * @returns Generated code.
     */
    workspaceToCode(workspace?: Workspace): string;
    /**
     * Prepend a common prefix onto each line of code.
     * Intended for indenting code or adding comment markers.
     *
     * @param text The lines of code.
     * @param prefix The common prefix.
     * @returns The prefixed lines of code.
     */
    prefixLines(text: string, prefix: string): string;
    /**
     * Recursively spider a tree of blocks, returning all their comments.
     *
     * @param block The block from which to start spidering.
     * @returns Concatenated list of comments.
     */
    allNestedComments(block: Block): string;
    /**
     * Generate code for the specified block (and attached blocks).
     * The generator must be initialized before calling this function.
     *
     * @param block The block to generate code for.
     * @param opt_thisOnly True to generate code for only this statement.
     * @returns For statement blocks, the generated code.
     *     For value blocks, an array containing the generated code and an
     * operator order value.  Returns '' if block is null.
     */
    blockToCode(block: Block | null, opt_thisOnly?: boolean): string | [string, number];
    /**
     * Generate code representing the specified value input.
     *
     * @param block The block containing the input.
     * @param name The name of the input.
     * @param outerOrder The maximum binding strength (minimum order value) of any
     *     operators adjacent to "block".
     * @returns Generated code or '' if no blocks are connected or the specified
     *     input does not exist.
     */
    valueToCode(block: Block, name: string, outerOrder: number): string;
    /**
     * Generate a code string representing the blocks attached to the named
     * statement input. Indent the code.
     * This is mainly used in generators. When trying to generate code to evaluate
     * look at using workspaceToCode or blockToCode.
     *
     * @param block The block containing the input.
     * @param name The name of the input.
     * @returns Generated code or '' if no blocks are connected.
     */
    statementToCode(block: Block, name: string): string;
    /**
     * Add an infinite loop trap to the contents of a loop.
     * Add statement suffix at the start of the loop block (right after the loop
     * statement executes), and a statement prefix to the end of the loop block
     * (right before the loop statement executes).
     *
     * @param branch Code for loop contents.
     * @param block Enclosing block.
     * @returns Loop contents, with infinite loop trap added.
     */
    addLoopTrap(branch: string, block: Block): string;
    /**
     * Inject a block ID into a message to replace '%1'.
     * Used for STATEMENT_PREFIX, STATEMENT_SUFFIX, and INFINITE_LOOP_TRAP.
     *
     * @param msg Code snippet with '%1'.
     * @param block Block which has an ID.
     * @returns Code snippet with ID.
     */
    injectId(msg: string, block: Block): string;
    /**
     * Add one or more words to the list of reserved words for this language.
     *
     * @param words Comma-separated list of words to add to the list.
     *     No spaces.  Duplicates are ok.
     */
    addReservedWords(words: string): void;
    /**
     * Define a developer-defined function (not a user-defined procedure) to be
     * included in the generated code.  Used for creating private helper
     * functions. The first time this is called with a given desiredName, the code
     * is saved and an actual name is generated.  Subsequent calls with the same
     * desiredName have no effect but have the same return value.
     *
     * It is up to the caller to make sure the same desiredName is not
     * used for different helper functions (e.g. use "colourRandom" and
     * "listRandom", not "random").  There is no danger of colliding with reserved
     * words, or user-defined variable or procedure names.
     *
     * The code gets output when CodeGenerator.finish() is called.
     *
     * @param desiredName The desired name of the function (e.g. mathIsPrime).
     * @param code A list of statements or one multi-line code string.  Use '  '
     *     for indents (they will be replaced).
     * @returns The actual name of the new function.  This may differ from
     *     desiredName if the former has already been taken by the user.
     */
    protected provideFunction_(desiredName: string, code: string[] | string): string;
    /**
     * Hook for code to run before code generation starts.
     * Subclasses may override this, e.g. to initialise the database of variable
     * names.
     *
     * @param _workspace Workspace to generate code from.
     */
    init(_workspace: Workspace): void;
    /**
     * Common tasks for generating code from blocks.  This is called from
     * blockToCode and is called on every block, not just top level blocks.
     * Subclasses may override this, e.g. to generate code for statements
     * following the block, or to handle comments for the specified block and any
     * connected value blocks.
     *
     * @param _block The current block.
     * @param code The code created for this block.
     * @param _opt_thisOnly True to generate code for only this statement.
     * @returns Code with comments and subsequent blocks added.
     */
    protected scrub_(_block: Block, code: string, _opt_thisOnly?: boolean): string;
    /**
     * Hook for code to run at end of code generation.
     * Subclasses may override this, e.g. to prepend the generated code with
     * import statements or variable definitions.
     *
     * @param code Generated code.
     * @returns Completed code.
     */
    finish(code: string): string;
    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.
     * Subclasses may override this, e.g. if their language does not allow
     * naked values.
     *
     * @param line Line of generated code.
     * @returns Legal line of code.
     */
    scrubNakedValue(line: string): string;
}
//# sourceMappingURL=generator.d.ts.map