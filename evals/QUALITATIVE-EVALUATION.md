# Qualitative evaluation: drama-writer v1.0.0

This is a human-style review of what Claude actually wrote with the skill installed. It is separate from the automated tests:

- **Automated tests** (`npm test`) check the installer, the ZIP, the package, the skill's structure, and the runtime estimator. They do not judge writing.
- **Objective eval checks** (`npm run evals`) run 15 scenarios through headless Claude Code and test simple measurable things: the skill activated, the right script and register markers appear, enough distinct speakers, runtime within a band, fixture files were read. Passing them says nothing about quality on its own.
- **This document** is the qualitative judgement: each output read in full against its rubric in `scenarios.json`.

## Method

- Each scenario ran once in a fresh temporary project with the skill installed through `drama-writer install --project`, using `claude -p` (Claude Code 2.1.319, default model) with read-only tools plus `node`. File writes were blocked so outputs stay in the transcript.
- Main run: `evals/results/2026-11-06T20-23-05-322Z/`. Re-run of four scenarios after fixes: see "Re-run after fixes" below.
- One run per scenario is a smoke test, not a statistical measure. Outputs vary between runs.
- The reviewer (Claude, the model that wrote the skill) is not a native speaker of every language tested. Language judgements below are careful but not a substitute for native review, especially for Indonesian slang and Korean workplace register.

Scale: 5 = would ship to a production team as is; 4 = strong, minor polish; 3 = usable, needs an edit pass; 2 = significant problems; 1 = fails the brief.

## Summary

| # | Scenario | Skill used | Score | One-line verdict |
|---|---|---|---|---|
| 01 | English hook | yes | 5 | Two hooks with different engines; recommendation reasoned from series value, not just shock |
| 02 | Indonesian colloquial | yes | 5 | Natural Jakarta speech; betrayal discovered through the character's own arithmetic |
| 03 | Mandarin (Mainland) | yes | 5 | Idiomatic, Simplified, strong subtext; mother's lie to the father is the turn |
| 04 | Korean speech levels | yes | 5 | Every pair's register correct; level shifts used as apology and trust |
| 05 | Three-way confrontation | yes | 5 | Three distinct voices and stakes; planted reveal; wordless ending decisions |
| 06 | Emotional confrontation, pauses | yes | 4 | Restrained and moving; tag use sparse and honest about provider uncertainty |
| 07 | Quiet romance (Japanese) | yes | 5 | Confession carried by a thumb over "confirm taxi"; correct polite/plain split |
| 08 | Mystery reveal | yes | 4 | Fair, planted twist that reframes the series; dialect for one character needs care |
| 09 | Revenge (Mexican Spanish) | yes | 5 | Regional voice; revenge rooted in a specific documented wrong, no instant omnipotence |
| 10 | Multi-episode cliffhanger | yes | 4 | Varied ending types; ep 2 cliffhanger grows from its own clue chain |
| 11 | Continuation | yes | 5 (story) | Respects every established fact; caught a real inconsistency in the fixture |
| 12 | AI-video-friendly scene | yes | 5 | Generation-aware staging, consistent cast wording, crash shown as aftermath |
| 13 | Shot continuity repair | yes | 5 | Found all five planted errors plus two more; fixed rather than listed |
| 14 | Prop continuity | yes | 5 | Every prop move on screen; ledger matches shots; flags the hardest generation |
| 15 | Dialogue timing | yes | 4 | Fits 30 s with a sensible breakdown; estimator agreed (26.6 s vs model's 25–29 s) |

All 15 activated the skill. All 15 passed the objective checks after two harness heuristics were corrected (see "Issues found").

## Per-scenario notes

**01 English hook.** Hook A (a flip phone buzzing in the coat pocket during the eulogy; "I'm parked outside"; the mother covering the phone without looking) is visual, readable without sound, and opens two mysteries in one gesture. Hook B is a stronger single reveal; the model correctly suggested moving it to the episode-1 cliffhanger instead of spending it in the first ten seconds. Minor: used "Present:" instead of the template's "Cast:".

**02 Indonesian.** Peer register (gue, nggak, udah, Anjir) fits two 24-year-old Jakartans; particles aren't stacked. The key move is excellent: Sekar works out that an engagement takes three months to arrange, which means the cheating began before the breakup. Nobody explains it. The mie gone soggy and the martabak exit are specific and true to the setting. The runtime was labelled a manual estimate; the estimator later gave 46.8 s against the 45 s target.

**03 Mandarin.** Simplified characters throughout; natural spoken forms (没事儿, 搁, 跑单); pronouns dropped. The insurance card failing at the payment window is a strong visual hook. The mother lies to the father on the phone ("单位给报") and then tells her son to buy a better helmet with the money: an earned, restrained ending. The model flagged its added setting (a food-delivery accident) as an assumption.

**04 Korean.** Junior to team leader uses 하십시오체 while taking the blame; team leader uses 해요체 + 서연 씨; the sister uses 반말 and 오빠; the two former classmates use 반말 by name. The best detail: 서연 speaks 반말 to her friend but keeps the honorific -시- for the boss who is in the room ("팀장님이 그러신 거 아니야"). The team leader shifting *up* to 하십시오체 as an apology, and her shifting *down* to 해요체 as trust, is exactly how speech level works as drama. No generic 당신.

**05 Three siblings.** Ruth (lists, flat statements, hands busy with masking tape), Danny (run-ons, pet names, never says "mortgage"), Cass (almost silent). Not round-robin; Ruth and Danny talk past Cass until she speaks. The second-mortgage reveal is planted by the dripping bucket, "never borrowed a dime", and Danny's thumb stopping. The endings are actions: Ruth labels a casserole dish "DANNY", making him a guest; Cass unbuttons her coat and stays.

**06 Emotional confrontation.** No named emotions. "Every time the door opened, I turned around. Every time." Dana reports her father asking "if the kid was coming" and that he said "Good for her", and that lands harder than an accusation. Only three tags, placed with purpose. The model said it was unsure which pause tags ElevenLabs v3 currently supports and used punctuation instead; that's the behaviour the skill asks for. One point off: the photo-in-the-wallet beat is a familiar device.

**07 Japanese quiet romance.** About 15 s of dialogue in a 45 s scene. The senior uses plain form, the junior polite form. "昼からずっと" quietly admits the junior watched her all day. The thumb hovering over 配車を確定する, then the phone going back in the pocket, is the confession. No あなた, no speech.

**08 Mystery.** Eight specific plants are listed, including a red herring that fits both suspects (both off on Thursdays). The reveal (the night cleaner, invisible to the nurse, was the only one watching) changes what the series is about and has a consequence (wet bare footprints from Room 7). Caution: the cleaner's non-native English is written with dropped articles. The model added a note that she should be played as dry and in control, never comic, but a production should check this for stereotype risk. That's why it scores 4.

**09 Mexican Spanish revenge.** "¿Me prestan tantito su atención?", "mi reina", "le voy a dar chance", "chimuela": unmistakably Mexican, with no Spain markers. The humiliation is specific and public (being filmed by a diner), and the protagonist's response is patient: she connects the restaurant's opening date to the court filing where her ex claimed zero income. The last line ("No está a mi nombre") gives the antagonist her own secret.

**10 Pharmacist arc.** Ending types vary (reveal, ticking clock, reversal). Episode 2 builds a forensic chain (camera dead, login, carbon pad, pencil rubbing of indented writing), and the cliffhanger (a second victim already picked up her pills) grows out of that chain. "You were." is ambiguous in a useful way. Slightly dense for 75 s; the model's own estimate was 72–78 s.

**11 Continuation.** Every state item is respected: Jun reaches left-handed (right hand bandaged); the will stays in the sewing tin and the tin's move to Mira's knee is shown on screen and recorded; Saturday's buyer visit is kept; Auntie Sol's secret is not spent. The ending type changes to "threat". The model also found a real inconsistency in the fixture: the bible says Sol's call was planted in ep 03, but ep 03 never mentions her. It used the new episode to plant it and said so. Process issue: it tried to save `series/ep04.md` without being asked (blocked by the harness). SKILL.md now states the file-saving rule explicitly; see the re-run.

**12 AI-video scene.** One locked cast description reused in every shot; explicit 180° geography with screen sides and lighting per character; one main action per shot; the crash is never generated, only its aftermath. The brothers' "Walt's car" / "Dad's car" exchange and the son named Walter carry backstory with no exposition. Seventeen shots for 60 s is on the busy side, but each cut has a stated reason.

**13 Continuity repair.** Found and fixed all five planted errors: the card already in hand, the right/left hand switch, the coat unbuttoning, the walk to 1408 again, and standing inside while holding the outside handle. It also found two more: a close-up that can't show the coat, and an unmotivated cut to the porter. It added one story beat (the porter noticing her coat) to make the twist fairer, and flagged that change as optional. When the fixture wasn't at the stated path, it located it and said where it was.

**14 Prop continuity.** A full hand-by-hand ledger for the envelope, the ring and two mugs, with "prop paths" summarised. It sensibly decided that nobody touches the mugs, and that there is no steam because steam drifts between generated clips. It flagged ring removal as the hardest shot and gave a fallback framing.

**15 Timing.** 19 spoken words, two held looks, and a final image fit 29 s, with a beat-by-beat table. The estimator (run afterwards by the reviewer) gives 26.6 s for the smoke-test version, which agrees with the model's figure.

## Issues found and what changed

| Issue | Evidence | Fix |
|---|---|---|
| A model claimed it had run the estimator when no run was logged | Smoke-test run of scenario 15 | SKILL.md: report an estimator run only if it really happened; otherwise call it a manual estimate. In the main run, all 15 labelled their estimates correctly. |
| The estimator counted notes and tables after the script as screen time (25 s → 50 s) | Smoke test, scenario 15 | The estimator stops at `---`, skips tables and bold note labels; regression test added |
| The estimator can't run where Claude can't write temp files | Scenarios 12, 14, 15 tried and were blocked | The estimator reads stdin (`-`); documented in SKILL.md and `runtime-timing.md` |
| CJK cast labels (`出场：`) and full-width parentheticals (`收费员（画外）：`) were misparsed | Scenario 03 output | Localized metadata keys and full-width parentheses; tests added |
| Saving files without being asked | Scenario 11 | SKILL.md §5: return material in the reply; save only when asked or already set up; never edit existing project files without asking |
| Harness: Korean check failed because the allowed English explanation diluted the Hangul share | Scenario 04 | Script share is measured on dialogue lines only |
| Harness: reads through `cat` weren't counted, so reference loading looked absent | Scenarios 02, 03, 12, 14 | Bash reads counted; the logs show the right references were loaded for multilingual, production and continuation tasks |
| Harness: fixture copied to the wrong path | Scenario 13 | Fixture layout fixed |

## Observations

- **Reference loading is proportional.** Short single-scene requests (01, 04, 07, 09, 10) worked from SKILL.md alone; production, continuity and continuation tasks loaded the specific references. That's the intended progressive disclosure. Quality didn't suffer when references weren't loaded, which suggests SKILL.md carries the core rules on its own.
- **Honesty about uncertainty held up:** TTS tag support, assumptions about unwritten episodes, manual vs measured runtimes, a fixture inconsistency.
- **No generic AI dialogue tells** were found across the 15 outputs: no named emotions, no "We need to talk", no speechifying.
- **Recurring pattern to watch:** objects carry several reveals (a phone, a photo in a wallet, a key card, a carbon pad). Each is well used, but a long series written this way could lean on props too often.

## Re-run after fixes

Run `evals/results/2026-11-06T20-29-46-085Z/`, scenarios 04, 11, 13 and 15, after the fixes above. All four passed their objective checks.

- **Estimator via stdin works.** Scenarios 11 and 15 ran `node scripts/estimate-runtime.mjs - --target ...` and reported the result (71.7 s against a 70 s target; 25.1 s against 30 s). In the main run, every model had to fall back to a manual estimate.
- **No unrequested file writes.** Scenario 11 returned episode 4 in the reply and did not try to save it.
- **Fixture path fixed.** Scenario 13 read `continuity/shotlist.md` where the prompt said it would be.
- **Korean quality held.** A different story this time (a team leader's sister bursting in with a family errand), with the same correct handling: 하십시오체 apology from the junior, 해요체 from the team leader, 반말 between the former classmates, and the sister mocking her friend for switching to 존댓말 in front of her brother.

## Format change after these runs

Both eval runs used the original template, which wrote scene headings and dialogue cut-offs with em dashes. Following the project's copy rules (antislop R-02), the template now uses the standard screenplay forms instead: `## S01 - INT. KITCHEN - NIGHT` and `I only told her because--`. The estimator reads both forms. The next eval run will show whether Claude follows the new format.
