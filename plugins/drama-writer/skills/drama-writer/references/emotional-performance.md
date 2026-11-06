# Emotional storytelling and performance annotation

## Contents
1. How emotion is earned
2. The emotional palette
3. Restraint, silence, and the held beat
4. Emotional progression inside a scene
5. Physical expression of emotion
6. Performance annotations (optional)
7. TTS providers: syntax differs
8. Emotional red flags

## 1. How emotion is earned

The audience feels what the character feels only when they understand **why**. Emotion comes from circumstance:

`want + obstacle + what we saw it cost = emotion the audience shares`

- **Cause on screen.** If she breaks down, we should have seen the thing that broke her, or at least its evidence.
- **Proportion.** A spilled drink does not justify screaming, unless the scream is about something else and the scene knows it.
- **Character filter.** The same blow lands differently on different people. The proud one goes cold; the anxious one apologizes; the volatile one breaks something.
- **Accumulation.** Big emotional releases work when they follow pressure that built up over earlier beats or episodes.
- **Specificity.** Grief is not "sadness". It is setting two cups out of habit, then putting one back.

## 2. The emotional palette

Know the specific texture of the emotion you are dramatizing.

| Emotion | How it often looks | What it wants |
|---|---|---|
| Love | Attention to small details; protectiveness; teasing; nervousness | Closeness, the other's good |
| Betrayal | Stillness, then precise questions; re-reading the past | To understand, then to make it cost |
| Jealousy | Watching; casual questions with an edge; comparisons | Reassurance, or to win |
| Regret | Rehearsed apologies; returning to the place; avoiding eyes | A way back |
| Shame | Hiding the face or hands; shrinking; over-explaining; anger as cover | To disappear or be forgiven |
| Fear | Hyper-alertness; freezing; babbling; checking exits | Safety |
| Grief | Habits that no longer have a purpose; numbness; anger at small things | The person back |
| Revenge | Patience; politeness; preparation; controlled smiles | Balance, recognition of the wrong |
| Guilt | Over-helping; confessing partially; avoiding the injured person | Absolution, or punishment |
| Hope | Small preparations; checking the phone; refusing to say it aloud | Not to be disappointed |
| Relief | Laughter at the wrong moment; collapse after tension; shaking hands | Rest |
| Sacrifice | Concealment of the cost; brightness that is a little too bright | The other's good over one's own |
| Redemption | Doing the hard thing without announcing it | To be someone else |
| Ambition | Rehearsing; studying rivals; impatience with "small" people | Recognition, power |
| Loneliness | Rituals for one; over-friendliness with strangers; noise always on | Connection |

## 3. Restraint, silence, and the held beat

- A character fighting not to cry is usually more moving than one crying.
- Silence is an action. Write it: `She doesn't answer. She keeps rinsing the same plate.`
- **The held beat:** after a reveal, give the audience a moment (1–2 seconds) to register it on a face before cutting or speaking. In short-form, this is the single most cut beat and the most important one to protect.
- Restraint must still be readable. In vertical video, use close-ups and one clear physical tell.
- Don't make every emotional beat restrained either; contrast gives both modes power.

## 4. Emotional progression inside a scene

Map the emotional line of each main character through a scene:

`Start state → trigger → shift → peak (or suppression) → end state`

Example: polite (start) → sees the ring (trigger) → controlled, asking small questions (shift) → he lies, smoothly (peak, suppressed) → she smiles and agrees to dinner (end state: decided).

- The end state must differ from the start state in an important scene.
- Escalate in steps. Calm to screaming in one line is only believable if the scream was already loaded.
- Characters can feel two things at once (relief and anger; love and contempt). Let the behaviour show both.

## 5. Physical expression of emotion

Translate emotion into behaviour a camera can capture (see `visual-storytelling.md`):
- **Face:** the smile that stays on the mouth but leaves the eyes; jaw tightening; looking away; a blink held too long.
- **Hands:** stopping mid-task; gripping; fidgeting with a ring; hiding hands.
- **Body:** stepping back; turning away; sitting down suddenly; standing too close.
- **Voice:** dropping in volume rather than rising; speed changes; a crack on one word.
- **Objects:** what they do with the thing in their hands (the cup put down very carefully).

Avoid a narrow repertoire (every character "clenches their fists", "tears stream down"). Vary by character.

## 6. Performance annotations (optional)

Bracketed tags help voice actors and TTS when they carry information the words don't:

`[laughs]` `[sighs]` `[gasps]` `[whispers]` `[shouts]` `[pause]` `[crying]` `[nervously]` `[sarcastically]` `[softly]` `[coldly]` `[through tears]` `[beat]`

**Rules**
- **No quota.** Many scenes need none. Never add tags to "look produced".
- Use a tag when the line could be misread without it (sarcasm on paper looks sincere), or when a non-verbal sound is part of the performance.
- Place tags before the words they affect, outside the spoken text: `RINA: [whispers] He's still here.` Tags can sit mid-line before the affected phrase: `RINA: Fine. [pause] Go.`
- One or two tags per line at most. A line with five tags is directing the actor's every breath.
- Don't duplicate what the words or action already make clear. `[angrily] I hate you!` adds nothing.
- Don't use tags as a substitute for good writing. If the line only works with `[sarcastically]`, consider rewriting so the sarcasm is in the words.
- Action belongs in action lines, not tags: `[slams the door]` is an action line, not a voice tag, unless the user's pipeline wants SFX in brackets.
- Keep tags in English unless the user's pipeline expects another language; many TTS systems are tuned for English tags even when the speech is another language. Follow the provider's documentation.

## 7. TTS providers: syntax differs

Never assume all providers accept the same annotations. When the user names a provider, use its documented format. Capabilities change often; if you are unsure of the provider's current syntax, say so and keep tags simple and easy to convert.

Broad patterns as of this writing (verify against current documentation before relying on them):

| Provider type | How expression is usually controlled |
|---|---|
| Models that accept inline audio tags (e.g. some recent ElevenLabs models) | Square-bracket tags in the text, such as `[whispers]`, `[laughs]`, `[sighs]`. The supported set and behaviour vary by model. |
| SSML-based engines (e.g. Google Cloud Text-to-Speech, Amazon Polly, Azure Speech; some older-generation models elsewhere) | XML markup: `<break time="500ms"/>`, `<prosody rate="slow">`, `<emphasis>`; Azure adds voice-specific speaking styles via its own SSML extensions. Bracket tags would be read aloud or ignored. |
| Instruction-steered models (e.g. OpenAI's steerable TTS models) | A separate natural-language instruction ("speak softly, hesitant, close to tears") passed alongside the text, not inline tags. Inline tags may be spoken literally. |

Practical approach:
- If no provider is named, write neutral bracket tags and keep them separable (one tag per bracket, before the words).
- If the user's pipeline needs plain text, provide a clean version without tags plus a separate delivery-notes column.
- For multi-speaker TTS, keep speaker names exactly consistent; pipelines map names to voices.
- Avoid characters spelling out emotions in brackets inside dialogue intended to be spoken aloud by engines that don't support tags.

## 8. Emotional red flags

- Characters cry, scream, or laugh without a cause the audience saw.
- Everyone reacts to everything at full intensity.
- Emotion is announced in dialogue ("I'm so angry right now").
- The same reaction repeats (gasp, tears, gasp, tears).
- An emotional event has no consequence in the next scene or episode.
- No quiet moments: the audience never gets to feel, only to watch.
- Tags are scattered on every line.
