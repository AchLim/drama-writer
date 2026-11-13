# Low-motion, high-tension micro-dramas

Load when the user asks for a low-motion tension micro-drama, names Gemini Omni 1.2 Flash ("OF 1.2") or a similar generator with a roughly 15-second single-take window and native audio, or wants a beat sheet to hand to `video-prompt-director`. This is an opt-in mode. It sits on top of Workflow C or D and changes pacing, staging, the dialogue split and the output format. Genre, premise, character and continuity rules stay as they are: a romance, a thriller and a family drama can all run in this mode.

The tool facts below (15-second window, native speech, lip-sync and foley from text, a cap of 6 reference images, first-and-last-frame interpolation capped at 10 seconds, no external MP3 upload on standard API tiers) come from the user's brief. If the user names a different model or version, follow its documented limits and say what you changed.

## Contents
1. Beat structure and beat length
2. The two-hander cast cap
3. Tension over motion
4. Dialogue: the 70/30 split
5. Vocal direction and audio cues
6. Output: the beat sheet
7. Checks before returning

## 1. Beat structure

Cut a 60 to 90 second vertical (9:16) episode into **continuous-take beats**, 15 seconds by default (4 to 6 beats), shorter where a turn needs it (see Beat length below).

| Episode | Beats | Timecodes |
|---|---|---|
| 60 s | 4 | 0:00-0:15, 0:15-0:30, 0:30-0:45, 0:45-1:00 |
| 75 s | 5 | continue in 15 s steps |
| 90 s | 6 | to 1:30 |

The table assumes all beats are 15 s.

- **One beat, one take.** One location, one light setup, one camera behaviour, no cuts inside the beat. The cut falls between beats.
- **One turn per beat.** Each beat brings one new fact, pressure or shift, so the episode escalates every 15 seconds without repeating itself.
- **Chain the beats.** The last image of a beat is the first image of the next (same posture, same prop position, same light). Write that end state into the row.
- **Beat 1, 0:00 to 0:03, is the hook.** Open on a verbal hook (a VO line that accuses or confesses), a psychological hook (a question the viewer must answer) or a visual mystery (the wrong object, the stopped clock, the second toothbrush). No establishing shot, no introductions, no weather report. Orientation comes from objects and positions, per `hooks-and-cliffhangers.md` §3.
- **The final beat ends on a cliffhanger**: a sharp line or a visible change, cut on the inhale, with one specific question for Part 2. Follow `hooks-and-cliffhangers.md` §6 and §7. Do not close on a reaction that releases the tension.

### Beat length

Default to **15-second beats** for continuous dialogue and tension scenes. Use an **8 to 10 second beat** whenever the beat depends on a sharp before-and-after emotional transformation (trust to suspicion, calm to dread, a decision made). The generator interpolates between a first and a last frame, capped at 10 seconds, so write such a beat as two states and the one small movement between them: `FF: ... / LF: ... / movement`.

- A short beat carries at most one spoken line, the hit that completes the turn.
- Lengths can mix. Add real beat lengths to get timecodes, and keep the episode at 60 to 90 seconds. Short beats raise the beat count above 6 only when the runtime still fits.
- **Beat lengths must add up to the requested runtime.** Sum them before returning. For 60 s, 15 + 15 + 15 + 15 works, and so does 15 + 15 + 10 + 10 + 10 if each short beat is a true transformation. When the sum misses, change a length; do not leave a note about it.
- Use short beats sparingly: a before-and-after turn needs a visible first state and a visibly different last state. A beat that only continues the pressure stays at 15 s. One or two short beats per episode is typical.
- Do not shorten a beat to save time. Shorten it because the turn is a snap.

## 2. The two-hander cast cap

At most **2 main characters** per episode or scene, speaking or recurring, plus an optional **off-screen narrator** (voice only, never shown). The brief says reference-image locking is capped at 6 images in total, so two leads (face and outfit for each) leave two images for the set and one key prop, and keep faces and wardrobe consistent in every beat.

- Never add a third face. Move extra people into a voice on a phone, a name on a screen, a shadow under a door, or an absence the leads talk about.
- A beat may hold one lead alone. The cap is a ceiling, not a duty to show both.
- The narrator is voice only and needs the same fixed vocal direction as a lead (§5).
- List the planned reference images in the beat sheet header and stay at or under 6.

## 3. Tension over motion

This mode avoids what the generator handles worst, so conflict moves into stillness.

**Avoid:** running, fights, chases, falls, dancing, crowds, and any scene where two or more people must physically choreograph with each other. Keep to one character on camera, or two who barely move.

**Use instead:** intimate, high-stakes stillness.

| Setting | What carries the tension |
|---|---|
| One-room interrogation | The question not yet answered; a hand that will not stop moving |
| Whispered betrayal | Who is close enough to hear; the line said too low to take back |
| Frozen-world mystery | One thing that moves in a world that should not |
| Late-night screen-glow confession | A face lit by a message that cannot be unsent |
| Living miniature diorama | A tiny scene that reveals what the full-size one hides |

**Movement budget per beat:** one small movement. An eye line shifting, a hand closing, a light changing, a screen waking, a breath. If a beat needs more, split it into two beats or move the action off screen and show the sound and the result.

**Convert action, do not drop it.** A chase becomes someone holding still while footsteps pass the door. A fight becomes the sentence that ends the friendship. A slap becomes the silence before it. See `ai-video-production.md` §5.

**Tension engines that need no motion:** an information gap (the viewer knows what she does not), a deadline the viewer can hear (a ticking clock), a held object (the phone face down), a lie the viewer watches being told, a decision held one beat too long.

## 4. Dialogue: the 70/30 split

Write crisp, emotionally loaded English for an international audience: short sentences, one idea per line, high subtext, no idioms, puns, slang or references that need a local ear. Names should be easy to say. If the user asks for another language, keep the 70/30 split and the clarity, and follow `multilingual-writing.md`.

- **About 70% of spoken material is voiceover or internal monologue.** It says what the character will not say aloud, so it must add something the picture does not show. Never narrate what the frame already shows.
- **About 30% is direct, lip-synced dialogue.** Reserve it for the highest-tension line in a beat. Most beats get zero or one on-camera line, never a conversation.
- **Count it across the episode** by lines or words, not beat by beat. A silent beat is allowed.
- **Make the on-camera line the one the character cannot hold back.** The VO builds the pressure, the spoken line releases it.
- **Budget speech honestly.** A 15-second beat also holds silence, sound and a held image. Use `runtime-timing.md` and leave room; do not fill the beat wall to wall.

## 5. Vocal direction and audio cues

**No external audio.** The generator makes speech, lip-sync and foley from text, and external MP3 uploads are gated or unsupported on standard API tiers (per the brief). Never write a script that assumes an uploaded voiceover file, a separate TTS pass or a lip-sync step.

**Direct every spoken line inline, before the words**, voice-over and on-camera alike:

`CHARACTER [voice quality, pace, emotion]: "line"`

For example: `MARCUS (ON-CAM) [low, gravelly baritone, measured pace, cold anger]: "You signed it."`

- Name the voice (pitch, texture), the pace, and the emotion underneath, in a few plain words. The emotion is the subtext, not the words restated.
- Reuse the same voice descriptor for a character in every beat so the voice stays recognisable, as you reuse visual descriptions. Vary only pace and emotion.
- These are plain descriptors for the generator, not a TTS provider's tag syntax. Do not add provider tags or a delivery sheet here.

**Environmental audio.** Every beat also has at least one cue in square brackets, written `[SFX: ...]`.

- Use physical, plain sounds the generator can produce: `[SFX: slow clock ticking]`, `[SFX: phone screen buzz]`, `[SFX: heavy rain hitting glass]`.
- Give each beat an environment bed (rain, fridge hum, distant traffic) and, where useful, one motivated sound that carries story (the buzz of an incoming truth, a chair leg, a lock).
- A sound should do story work: a deadline, a threat, a reveal arriving. Cut a cue that only decorates.
- Time a cue inside the beat when it matters: `[SFX: floorboard creak @0:09]`.
- Do not stack several cues over a dialogue line the viewer must hear.

## 6. Output: the beat sheet

Return the beat sheet from `templates/screenplay.md` (Beat sheet variant). It is built to pass into `video-prompt-director`, so keep the shape exact:

`Beat # | Timecode | Visual/Subtext Action | Spoken/VO Dialogue | SFX & Audio Cue`

- **One row per beat**, one line per cell. Separate items inside a cell with ` / `. Do not put `|` inside a cell.
- **Visual/Subtext Action:** for an 8 to 10 second beat, give `FF:` and `LF:` frames. Otherwise, who is in frame, where, the one small movement, the start and end state, and the subtext in a short clause ("hands steady, voice not"). Lighting and setting go in the header, not repeated in each row unless they change.
- **Spoken/VO Dialogue:** `NAME (VO) [voice, pace, emotion]: "line"` or `NAME (ON-CAM) [voice, pace, emotion]: "line"`. Every line carries its vocal direction. Mark a silent beat `none`.
- **SFX & Audio Cue:** the `[SFX: ...]` cues, in order.
- Above the table, a short header: series and episode, language, runtime and beat count, format (9:16), the recurring set and light, the cast (max 2) with visual references and fixed voices, the optional narrator, the reference images (max 6), and the episode brief (hook, final image, next-episode question).
- `scripts/estimate-runtime.mjs` reads the standard screenplay format, not this table, and reports 0 s on it. Budget by beats instead.

`examples/low-motion-beat-sheet.md` shows a complete 60-second episode.

## 7. Checks before returning

- Beats are 15 seconds, or 8 to 10 seconds where a true before-and-after turn needs it; each is a single take with one camera behaviour; the beat lengths add up to the requested runtime exactly.
- At most 2 main characters on screen, plus an optional off-screen narrator; no more than 6 reference images planned.
- No line assumes an external audio file; every spoken line has inline vocal direction, and each character's voice descriptor is the same in every beat.
- Beat 1 hooks inside 3 seconds with no setup.
- The last beat ends on a line or a visible change, not a reaction.
- No running, fighting or multi-person choreography.
- Roughly 70% VO and 30% on-camera, with on-camera lines saved for peak tension.
- Every beat has at least one `[SFX: ...]` cue.
- Each row's end state matches the next row's start.
- Dialogue is plain, international English with no idiom the audience must decode.
- Columns match the five-column format exactly.
