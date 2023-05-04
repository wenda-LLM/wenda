/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { WorkspaceSvg } from './workspace_svg.js';
/**
 * Class for loading, storing, and playing audio for a workspace.
 *
 * @alias Blockly.WorkspaceAudio
 */
export declare class WorkspaceAudio {
    private parentWorkspace;
    /** Database of pre-loaded sounds. */
    private sounds;
    /** Time that the last sound was played. */
    private lastSound_;
    /**
     * @param parentWorkspace The parent of the workspace this audio object
     *     belongs to, or null.
     */
    constructor(parentWorkspace: WorkspaceSvg);
    /**
     * Dispose of this audio manager.
     *
     * @internal
     */
    dispose(): void;
    /**
     * Load an audio file.  Cache it, ready for instantaneous playing.
     *
     * @param filenames List of file types in decreasing order of preference (i.e.
     *     increasing size).  E.g. ['media/go.mp3', 'media/go.wav'] Filenames
     *     include path from Blockly's root.  File extensions matter.
     * @param name Name of sound.
     */
    load(filenames: string[], name: string): void;
    /**
     * Preload all the audio files so that they play quickly when asked for.
     *
     * @internal
     */
    preload(): void;
    /**
     * Play a named sound at specified volume.  If volume is not specified,
     * use full volume (1).
     *
     * @param name Name of sound.
     * @param opt_volume Volume of sound (0-1).
     */
    play(name: string, opt_volume?: number): void;
}
//# sourceMappingURL=workspace_audio.d.ts.map