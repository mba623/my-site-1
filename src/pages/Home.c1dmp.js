/**
 * =========================================================================
 * TOKYO VIBES - HOME PAGE INTERACTIVE & AUTO-FIX CODE (Home.c1dmp.js)
 * =========================================================================
 * Powers the Home Page:
 * 1. Automatically fixes on-page typos & formatting.
 * 2. Reroutes buttons away from broken /blank and external tokyovibes.com.
 * 3. Interactive Hero "Build Your Day" Chips with dynamic state & link updates.
 * 4. Guides Carousel slide transitions.
 * 5. Viewport Scroll Reveal animations.
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("Tokyo Vibes Home Engine Active.");

    initPageAutoFixes();
    initSmoothAnchorScrolling();
    initDayBuilderWidget();
    initGuidesCarousel();
    initScrollAnimations();
});

// ========================================================
// 1. TYPO & TEXT AUTO-CORRECTION
// ========================================================
function initPageAutoFixes() {
    try {
        // Pricing badge: "/   4   HOURS" -> "/ 4 hours"
        const priceBadges = ['#priceBadgeText', '#textPricingSub', '#priceHours', '#pricingSub'];
        priceBadges.forEach(id => {
            if ($w(id) && $w(id).text && $w(id).text.includes('HOURS')) {
                $w(id).text = '/ 4 hours';
            }
        });

        // Review counter: "92 reviews" -> "103 reviews"
        const reviewStats = ['#reviewLedgerText', '#reviewStats', '#textReviewsCount'];
        reviewStats.forEach(id => {
            if ($w(id) && $w(id).text && $w(id).text.includes('92 reviews')) {
                $w(id).text = $w(id).text.replace('92 reviews', '103 reviews');
            }
        });
    } catch (e) {
        console.warn("Home typo fix notice:", e);
    }
}

// ========================================================
// 2. SMOOTH INTERNAL ANCHOR NAVIGATION (PREVENTS /blank)
// ========================================================
function initSmoothAnchorScrolling() {
    try {
        const sections = {
            tours: $w('#tours') || $w('#toursSection') || $w('#section2'),
            guides: $w('#guides') || $w('#guidesSection') || $w('#section4'),
            reviews: $w('#reviews') || $w('#reviewsSection') || $w('#section6'),
            faq: $w('#faq') || $w('#faqSection') || $w('#section7'),
            prices: $w('#prices') || $w('#pricingSection') || $w('#section5'),
            custom: $w('#custom') || $w('#itinerariesSection') || $w('#section3'),
            day: $w('#day') || $w('#timelineSection')
        };

        // Header and Footer Anchor Links
        const anchorBindings = [
            { id: '#navLinkGuides', sec: sections.guides },
            { id: '#navLinkReviews', sec: sections.reviews },
            { id: '#footerGuides', sec: sections.guides },
            { id: '#footerReviews', sec: sections.reviews },
            { id: '#footerFaq', sec: sections.faq },
            { id: '#footerPrices', sec: sections.prices },
            { id: '#btnSeeDayBuilt', sec: sections.day }
        ];

        anchorBindings.forEach(binding => {
            if ($w(binding.id) && binding.sec) {
                $w(binding.id).onClick((e) => {
                    e.preventDefault();
                    binding.sec.scrollTo();
                });
            }
        });

        // Action buttons inside tour cards
        const checkDatesButtons = ['#btnCheckDates1', '#btnCheckDates2', '#btnCheckDates3', '#btnTourBook'];
        checkDatesButtons.forEach(id => {
            if ($w(id)) {
                $w(id).onClick((e) => {
                    // Navigate to itineraries/custom inquiry if date check isn't separated
                    if (sections.custom) {
                        e.preventDefault();
                        sections.custom.scrollTo();
                    } else {
                        wixLocation.to('/plan');
                    }
                });
            }
        });

        // "Make it yours" buttons
        const makeItYoursButtons = ['#btnMakeYours1', '#btnMakeYours2', '#btnMakeYours3'];
        makeItYoursButtons.forEach(id => {
            if ($w(id)) {
                $w(id).onClick(() => {
                    wixLocation.to('/itineraries');
                });
            }
        });
    } catch (e) {
        console.warn("Smooth anchor notice:", e);
    }
}

// ========================================================
// 3. INTERACTIVE HERO "BUILD YOUR DAY" WIDGET
// ========================================================
function initDayBuilderWidget() {
    try {
        const selections = {
            who: '',
            when: '',
            into: ''
        };

        function setupChipGroup(chipIds, groupKey) {
            chipIds.forEach(id => {
                const chip = $w(id);
                if (chip) {
                    chip.onClick(() => {
                        // Reset all chips in group
                        chipIds.forEach(otherId => {
                            const other = $w(otherId);
                            if (other && other.style) {
                                other.style.backgroundColor = '#FFFFFF';
                                other.style.color = '#1A1D1A';
                                other.style.borderColor = '#E2DDD1';
                            }
                        });

                        // Highlight selected chip with Tokyo Vibes Green
                        if (chip.style) {
                            chip.style.backgroundColor = '#2D4A3E';
                            chip.style.color = '#FFFFFF';
                            chip.style.borderColor = '#2D4A3E';
                        }

                        selections[groupKey] = chip.label || chip.text || id;
                        updateBuilderCustomLink(selections);
                    });
                }
            });
        }

        // Bind standard chip groups
        setupChipGroup(['#chipWho1', '#chipWho2', '#chipWho3', '#chipWho4'], 'who');
        setupChipGroup(['#chipWhen1', '#chipWhen2', '#chipWhen3', '#chipWhen4', '#chipWhen5'], 'when');
        setupChipGroup(['#chipInto1', '#chipInto2', '#chipInto3', '#chipInto4', '#chipInto5'], 'into');

        // "See our tours" button scrolls to #tours
        const btnSeeTours = $w('#btnBuilderTours') || $w('#buttonSeeTours');
        if (btnSeeTours) {
            btnSeeTours.onClick(() => {
                const toursSec = $w('#tours') || $w('#toursSection') || $w('#section2');
                if (toursSec) toursSec.scrollTo();
            });
        }
    } catch (e) {
        console.warn("Day builder notice:", e);
    }
}

function updateBuilderCustomLink(selections) {
    const btn = $w('#btnBuilderCustom') || $w('#btnBuildItinerary');
    if (btn) {
        const params = [];
        if (selections.who) params.push(`who=${encodeURIComponent(selections.who)}`);
        if (selections.when) params.push(`when=${encodeURIComponent(selections.when)}`);
        if (selections.into) params.push(`into=${encodeURIComponent(selections.into)}`);
        const query = params.length > 0 ? `?tour=custom&${params.join('&')}` : '?tour=custom';
        btn.link = `/plan${query}`;
    }
}

// ========================================================
// 4. GUIDES CAROUSEL SLIDE CONTROLS
// ========================================================
function initGuidesCarousel() {
    try {
        const slideshow = $w('#guidesSlideshow') || $w('#guidesBox');
        const btnNext = $w('#btnGuideNext') || $w('#guideArrowRight');
        const btnPrev = $w('#btnGuidePrev') || $w('#guideArrowLeft');

        if (slideshow && btnNext && btnNext.onClick) {
            btnNext.onClick(() => {
                if (slideshow.next) slideshow.next();
            });
        }

        if (slideshow && btnPrev && btnPrev.onClick) {
            btnPrev.onClick(() => {
                if (slideshow.previous) slideshow.previous();
            });
        }
    } catch (e) {
        console.warn("Guides carousel notice:", e);
    }
}

// ========================================================
// 5. VIEWPORT SCROLL ANIMATIONS (FADE-IN REVEAL)
// ========================================================
function initScrollAnimations() {
    try {
        const sectionsToAnimate = [
            '#builderBox',
            '#toursSection',
            '#timelineSection',
            '#guidesSection',
            '#pricingSection',
            '#faqSection'
        ];

        sectionsToAnimate.forEach(id => {
            const el = $w(id);
            if (el && el.onViewportEnter) {
                el.onViewportEnter(() => {
                    el.show('fade', { duration: 600 });
                });
            }
        });
    } catch (e) {
        console.warn("Scroll animation notice:", e);
    }
}
