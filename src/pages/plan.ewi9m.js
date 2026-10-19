/**
 * =========================================================================
 * TOKYO VIBES - PLAN YOUR TRIP PAGE CODE (plan.ewi9m.js)
 * =========================================================================
 * Reads query params from URL:
 * e.g. /plan?tour=custom&who=Family&when=Spring&into=Food+%26+drink
 * Automatically pre-selects the form fields based on the user's Day Builder choices.
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    const query = wixLocation.query;

    if (query) {
        console.log("Plan page loaded with query parameters:", query);

        // Pre-fill 'Who is coming' if field exists
        if (query.who) {
            const whoField = $w('#inputWho') || $w('#dropdownWho') || $w('#tagsWho');
            if (whoField) {
                whoField.value = query.who;
            }
        }

        // Pre-fill 'When' if field exists
        if (query.when) {
            const whenField = $w('#inputWhen') || $w('#dropdownWhen') || $w('#tagsWhen');
            if (whenField) {
                whenField.value = query.when;
            }
        }

        // Pre-fill 'What you are into' if field exists
        if (query.into) {
            const intoField = $w('#inputInto') || $w('#dropdownInto') || $w('#tagsInto');
            if (intoField) {
                intoField.value = query.into;
            }
        }
    }
});
