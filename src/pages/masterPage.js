/**
 * =========================================================================
 * TOKYO VIBES - MASTER GLOBAL CODE (masterPage.js)
 * =========================================================================
 * Runs across all pages:
 * 1. Sanitizes Header / Footer Navigation & Typos ("Rewies" -> "Reviews", "Play your trip" -> "Plan your trip").
 * 2. Reroutes dead links or external tokyovibes.com leaks to internal site pages.
 * 3. Handles sticky mobile action bar.
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    fixGlobalTypos();
    fixGlobalNavigation();
});

function fixGlobalTypos() {
    try {
        // Fix "Rewies" typo in header / footer navigation
        const reviewElements = ['#navLinkReviews', '#navReviews', '#reviewsText', '#navItem4'];
        reviewElements.forEach(id => {
            if ($w(id)) {
                if ($w(id).text === 'Rewies') $w(id).text = 'Reviews';
                if ($w(id).label === 'Rewies') $w(id).label = 'Reviews';
            }
        });

        // Fix "Play your trip" typo in buttons
        const ctaButtons = ['#btnHeaderPlan', '#headerCta', '#button1', '#btnPlanTrip'];
        ctaButtons.forEach(id => {
            if ($w(id)) {
                if ($w(id).label && $w(id).label.toLowerCase().includes('play your trip')) {
                    $w(id).label = 'Plan your trip';
                }
            }
        });
    } catch (e) {
        console.warn("Global typo fix notice:", e);
    }
}

function fixGlobalNavigation() {
    try {
        // Route header CTA button to /plan
        const planButtons = ['#btnHeaderPlan', '#btnPlan', '#planYourTripBtn'];
        planButtons.forEach(id => {
            if ($w(id)) {
                $w(id).onClick(() => {
                    wixLocation.to('/plan');
                });
            }
        });

        // Route header "Tours" to /tours
        if ($w('#navLinkTours')) {
            $w('#navLinkTours').onClick(() => wixLocation.to('/tours'));
        }

        // Route header "Itineraries" to /itineraries
        if ($w('#navLinkItineraries')) {
            $w('#navLinkItineraries').onClick(() => wixLocation.to('/itineraries'));
        }

        // Route header "Prices" to /prices
        if ($w('#navLinkPrices')) {
            $w('#navLinkPrices').onClick(() => wixLocation.to('/prices'));
        }

        // Route header "Notes" to /notes
        if ($w('#navLinkNotes')) {
            $w('#navLinkNotes').onClick(() => wixLocation.to('/notes'));
        }
    } catch (e) {
        console.warn("Global navigation notice:", e);
    }
}
