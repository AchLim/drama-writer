# Eleven v4 voice direction for screenplay JSON

When the user requests ElevenLabs v4-ready screenplay JSON, read the complete scene first. Consider the setting, relationships, previous dialogue, actions, body language, stakes and next beat. Treat `delivery` as a starting point, not a literal instruction. Give each character a consistent vocal personality that can evolve with the scene. Do not invent emotions that contradict the material. Cheerful, lively delivery belongs where the scene supports it; ordinary conversation should remain natural.

For every object containing `speaker` and `line`, preserve `line` and `delivery` exactly and add `ttsText` containing the complete original line with square-bracket performance directions. Preserve all other fields, values, ordering and structure, including episode and scene metadata. Do not add `ttsText` to action-only objects. Return valid JSON without commentary or fences when JSON alone is requested. Never translate or rewrite the dialogue. Support every language and mixed-language dialogue: retain the original pronunciation cues, conversational rhythm, dialect, script and register. Use concise English audio tags without translating the spoken words.

Direct the intention and the change within a line, not just an emotion. Anger need not be loud: `[low, controlled anger]` can be more effective than shouting. Use one or two short, specific tags for most lines, with a new tag at a meaningful shift. Avoid contradictory or repeated directions, random placement, excessive ellipses and forced melodrama. Use breathing, laughter and other reactions only when justified. Punctuation and pauses should serve the moment; never insert SSML break tags for Eleven v4. Do not add spoken words or instructions that might be read aloud. Tags are expressive guidance, not a guarantee of a particular acoustic result; audition and adjust the voice and tags in the target model.

Example input:

```json
{"scenes":[{"sceneId":"S1","flow":[{"action":"She holds her breath."},{"speaker":"C01","line":"I already know. But I want to hear it from you.","delivery":"quiet, then firm"}]}]}
```

Example output:

```json
{"scenes":[{"sceneId":"S1","flow":[{"action":"She holds her breath."},{"speaker":"C01","line":"I already know. But I want to hear it from you.","delivery":"quiet, then firm","ttsText":"[quietly] I already know. [firmer] But I want to hear it from you."}]}]}
```

Before returning, check each spoken line for unchanged words and punctuation, appropriate context, consistent character voice, believable shifts and justified reactions. Check JSON validity and ensure every spoken line has direction and action-only objects have no added `ttsText`.
