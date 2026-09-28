# Mechanical pass — 27 Sep 2026

First deploy: version 1 published privately. Syntax check of dist/app.js passed; static checks found no secrets, API calls, persistence or real personal data. Forms have fixed permitted segments/categories/expiry, length constraints, browser required fields, and insert reports using textContent. Case review of state transitions: pending is not published; verified and unexpired is visible; withdrawn/rejected/expired is hidden.

**Bug found:** after the only notice was withdrawn or expired, the passenger's two decision buttons remained actionable. This could record a decision about a nonexistent alternative.

**Fix:** disable both buttons in the no-alert state, clear the stale decision, and provide an explanatory title. The second deploy includes this fix.

**Second pass:** tests/state.cjs executed the actual application logic in a simulated DOM. It checked an invalid short description, pending invisibility, explicit verification, expiration, withdrawal, a changed passenger decision, and disabling/clearing actions without a current notice. All assertions passed. Its 30 synthetic phrases produced 27 correct category suggestions and three abstentions (10/10, 9/10, 8/10 by category). Those phrases substantially overlap the training set, so this is a smoke test, not a valid estimate of field accuracy or a comparison against a fixed form.

**Verification limit:** The separate browser test in tests/smoke.cjs could not run because this runtime had no installed Chromium binary and its browser download failed. The published Site requires owner sign-in, so a full UI run in the private site was not completed here. The browser script remains available for a browser-enabled environment.

Test inputs to run before grading: blank and seven-character descriptions; 181 characters; invalid segment/expiry from devtools; pending invisibility; verify then withdraw; expiry after 15 minutes; browser with no speech recognition; keyboard and narrow viewport.
