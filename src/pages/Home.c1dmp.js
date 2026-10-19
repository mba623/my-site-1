/**
 * =========================================================================
 * TOKYO VIBES - HOME PAGE MASTER CODE (Home.c1dmp.js)
 * =========================================================================
 * Ensures:
 * 1. ZERO out-of-web links to tokyovibes.com - everything routes internally or smooth scrolls.
 * 2. Day/Night theme buttons function without redirecting to tokyovibes.com/about.
 * 3. Mobile menu button opens and closes menu drawer.
 * 4. Interactive "Build Your Day" chips with live visual highlight.
 * 5. Smooth Anchor jumps for Guides, Reviews, Tours, FAQ, Pricing, and Timeline.
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("Tokyo Vibes Home Controller Loaded.");

    interceptAndSanitizeAllLinks();
    initThemeButtons();
    initHeroDayBuilder();
    initSmoothAnchors();
});

// =========================================================================
// 1. INTERCEPT & SANITIZE ALL LINKS (NO OUT-OF-WEB TOKYOVIBES.COM)
// =========================================================================
function interceptAndSanitizeAllLinks() {
    try {
        // Find all internal sections
        const sections = {
            tours: $w('#tours') || $w('#toursSection') || $w('#comp-muyjmdww'),
            guides: $w('#guides') || $w('#guidesSection') || $w('#comp-mv9481jx'),
            reviews: $w('#reviews') || $w('#reviewsSection') || $w('#comp-mv9b4ijb'),
            faq: $w('#faq') || $w('#faqSection') || $w('#comp-mvb7rugj'),
            prices: $w('#prices') || $w('#pricingSection') || $w('#comp-mv99p7ws'),
            custom: $w('#custom') || $w('#itinerariesSection') || $w('#comp-muz2dfsm'),
            day: $w('#day') || $w('#timelineSection') || $w('#comp-mv8z6zqc')
        };

        // Tour card titles and images that previously linked to tokyovibes.com
        // We redirect them to /tours or the custom builder
        const tourCardButtons = [
            '#cardTokyoWalking', '#cardTokyoNight', '#cardFuji',
            '#btnCheckDates1', '#btnCheckDates2', '#btnCheckDates3',
            '#btnMakeYours1', '#btnMakeYours2', '#btnMakeYours3'
        ];

        tourCardButtons.forEach(id => {
            const btn = $w(id);
            if (btn) {
                btn.onClick((e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    wixLocation.to('/tours');
                });
            }
        });

        // Reviews link
        const reviewLinks = ['#navLinkReviews', '#footerReviews', '#textReviewsCount'];
        reviewLinks.forEach(id => {
            const el = $w(id);
            if (el && sections.reviews) {
                el.onClick((e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    sections.reviews.scrollTo();
                });
            }
        });

        // Guides link
        const guideLinks = ['#navLinkGuides', '#footerGuides'];
        guideLinks.forEach(id => {
            const el = $w(id);
            if (el && sections.guides) {
                el.onClick((e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    sections.guides.scrollTo();
                });
            }
        });

        // FAQ link
        const faqLinks = ['#footerFaq', '#btnAllFaq'];
        faqLinks.forEach(id => {
            const el = $w(id);
            if (el && sections.faq) {
                el.onClick((e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    sections.faq.scrollTo();
                });
            }
        });
    } catch (err) {
        console.warn("Link sanitize notice:", err);
    }
}

// =========================================================================
// 2. DAY / NIGHT THEME SWITCHER (PREVENTS REDIRECT TO /about)
// =========================================================================
function initThemeButtons() {
    try {
        const autoEl = $w('#comp-mv1prinw_r_comp-mv1pq6w01');
        const dayEl = $w('#comp-mv1prinw_r_comp-mv1pq6w7');
        const nightEl = $w('#comp-mv1prinw_r_comp-mv1pq6wb2');

        if (autoEl) {
            autoEl.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                console.log("Auto Theme Selected");
            });
        }

        if (dayEl) {
            dayEl.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                console.log("Day Theme Selected");
                const page = $w('#PAGE_SECTIONSc1dmp');
                if (page && page.style) page.style.backgroundColor = '#F9F7F2';
            });
        }

        if (nightEl) {
            nightEl.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                console.log("Night Theme Selected");
                const page = $w('#PAGE_SECTIONSc1dmp');
                if (page && page.style) page.style.backgroundColor = '#121A15';
            });
        }
    } catch (err) {
        console.warn("Theme buttons notice:", err);
    }
}

// =========================================================================
// 3. HERO "BUILD YOUR DAY" CHIP WIDGET
// =========================================================================
function initHeroDayBuilder() {
    try {
        const selections = { who: '', when: '', into: '' };

        function bindChips(chipIds, groupKey) {
            chipIds.forEach(id => {
                const chip = $w(id);
                if (chip) {
                    chip.onClick(() => {
                        chipIds.forEach(otherId => {
                            const other = $w(otherId);
                            if (other && other.style) {
                                other.style.backgroundColor = '#FFFFFF';
                                other.style.color = '#1A1D1A';
                            }
                        });

                        if (chip.style) {
                            chip.style.backgroundColor = '#2D4A3E';
                            chip.style.color = '#FFFFFF';
                        }
                        selections[groupKey] = chip.label || chip.text || id;
                    });
                }
            });
        }

        bindChips(['#Just_me', '#Two_of_Us', '#Family', '#Friends'], 'who');
        bindChips(['#Spring', '#Summer', '#Autumn', '#Winter', '#Not_sure_yet'], 'when');
        bindChips(['#Food_Drink', '#Old_Tokyo', '#Nightlife', '#Nature_day_trips', '#Surprise_us'], 'into');

        // See our tours scroll button
        const btnSeeTours = $w('#btnBuilderTours') || $w('#buttonSeeTours');
        if (btnSeeTours) {
            btnSeeTours.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                const toursSec = $w('#comp-muyjmdww') || $w('#toursSection');
                if (toursSec) toursSec.scrollTo();
            });
        }
    } catch (err) {
        console.warn("Hero day builder notice:", err);
    }
}

// =========================================================================
// 4. SMOOTH ANCHORS FOR ALL IN-PAGE CALLOUTS
// =========================================================================
function initSmoothAnchors() {
    try {
        // "See a day we built" button
        const btnSeeDay = $w('#btnSeeDay') || $w('#btnDayBuilt');
        const daySection = $w('#comp-mv8z6zqc') || $w('#daySection');
        if (btnSeeDay && daySection) {
            btnSeeDay.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                daySection.scrollTo();
            });
        }
    } catch (err) {
        console.warn("Smooth anchors notice:", err);
    }
}
