# Implementation prompt — Ruta Clara
Build a free, static, responsive Spanish demo from PACKET.md. Commit in at least five meaningful steps. Use fictional Route 12, fixed GeoJSON segments and an accessible schematic map. The driver form accepts one event category, segment, brief description and 15/30/60 minute expiry; optional speech transcription fills the description, with a text fallback. Train a small transparent Naive Bayes classifier on synthetic examples; suggest one of the three classes only above a confidence threshold, otherwise abstain; never publish from ML. An operator review explicitly verifies or rejects, and can correct or withdraw. A passenger sees only verified unexpired alerts and a clear alternative stop; record a simulated decision. Validate all fields; use textContent. No secrets, personal data, tracking, server database or worker scores. Label simulated inputs and outputs. Test invalid submissions, pending isolation, publication, withdrawal, expiry and no-voice fallback. Find and fix a bug, redeploy. Run a synthetic persona walkthrough, log confusion and fix the worst issue. Update DECISIONS.md and push after each session. Deliver URL, source, PDF packet/persona/buildchat and a demo script; do not claim real pilot impact.

## Acceptance criteria
1. At first load, passenger can read an example verified, current change on the fictional route, with source, expiry and alternative stop.
2. Driver can enter a valid report in under a minute while stopped; pending is never shown in passenger view.
3. Suggestion may be accepted or overridden. An uncertain phrase says «No se pudo clasificar».
4. Operator may verify only complete reports, reject or request correction; reports expire and can be withdrawn.
5. Passenger action changes a demo decision tally; copy makes clear this is not measured field value.
6. Forms reject empty, oversized and invalid input; no HTML injection.
7. Desktop and mobile remain readable, keyboard controls and accessible labels work.

## Commit plan
1. Packet, generated mockup and implementation prompt.
2. Route map, passenger view and basic layout.
3. Driver form, optional voice and classifier.
4. Verification, correction, expiry and decision loop.
5. Validation, accessibility, Security Floor and mechanical test.
6. Persona correction, decisions and final handoff.
