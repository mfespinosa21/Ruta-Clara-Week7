# Development back-and-forth — truthful record

This document summarizes the available build exchange. It is not a verbatim export of every tool call or a claim of a separate coding-agent chat.

User: Supplied the Week 7 assignment and the Fernanda brief and Team 1 Blueprint. Then said «sigue».

Assistant: Read both PDFs. Selected a narrow temporary-stop change on one fictional colectivo route. Kept voluntary participation, verification, correction, expiration, driver governance and no profiling.

Assistant: Researched Digital Matatus, Trufi and GTFS Realtime first-party pages. Generated an image mockup and wrote docs/PACKET.md before any product code. Wrote docs/IMPLEMENTATION_PROMPT.md with features, criteria and commit plan.

Assistant: Implemented a static route map with fictional geodata; browser-side Naive Bayes category suggestion trained on fictional phrases; optional speech recognition; driver form; simulated human review; passenger-only verified/current notice; correction/withdrawal; and a simulated decision.

Assistant: Made four source commits and deployed the first version. The private Site deployment succeeded.

Assistant: Mechanical review found that passenger decision controls remained active when no notice existed. Disabled those controls in that state and cleared stale decisions. Added a browser smoke script, but its execution was blocked by missing Chromium and a failed browser download. This limitation is recorded in MECHANICAL.md rather than reported as a passing test.

Assistant: Wrote a preliminary synthetic persona walkthrough of screen copy. The required separate fresh-chat screenshot walkthrough remains to be done. Prepared second deployment, PDFs and recording script.

User: Said «sigue».

Assistant: Ran a separate fresh synthetic persona agent on the product copy and mockup. Rosa could not identify which pharmacy or infer that the decision buttons were only a test. The assistant revised the fictional landmark and side of street, displayed a date and time, and renamed the buttons as test choices. A VM-based state test passed invalid-input, pending, verification, expiry, decision and withdrawal checks. The 30 classifier inputs were mostly training examples, so its 27 correct / 3 abstentions are not evidence of generalization. A full screenshot persona walkthrough and browser test remain outstanding.

The exact conversation can be exported from the ChatGPT conversation itself if the instructor requires the full unabridged transcript.
