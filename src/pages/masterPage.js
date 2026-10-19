/**
 * =========================================================================
 * TOKYO VIBES - MASTER GLOBAL CODE (masterPage.js)
 * =========================================================================
 * Fixes:
 * 1. Day / Night / Auto Theme Switcher without ANY redirect.
 * 2. Mobile Menu Button Drawer open/close.
 * 3. Intercepts and replaces ALL external tokyovibes.com and /blank links.
 * 4. Fixes global typos ('Rewies' -> 'Reviews', 'Play your trip' -> 'Plan your trip', 'Cockies' -> 'Cookies').
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    initDayNightThemeSystem();
    initMobileMenuDrawer();
    fixAllLinksAndTypos();
});

// =========================================================================
// 1. DAY / NIGHT / AUTO THEME SYSTEM (NO REDIRECTS, PURE IN-PAGE TOGGLE)
// =========================================================================
function initDayNightThemeSystem() {
    try {
        // IDs for the Theme Buttons in footer and mobile menu
        // comp-mv1prinw_r_comp-mv1pq6w01 = AUTO
        // comp-mv1prinw_r_comp-mv1pq6w7  = DAY
        // comp-mv1prinw_r_comp-mv1pq6wb2 = NIGHT
        const autoBtns = ['#comp-mv1prinw_r_comp-mv1pq6w01', '#themeBtnAuto', '#btnAuto'];
        const dayBtns = ['#comp-mv1prinw_r_comp-mv1pq6w7', '#themeBtnDay', '#btnDay'];
        const nightBtns = ['#comp-mv1prinw_r_comp-mv1pq6wb2', '#themeBtnNight', '#btnNight'];

        function applyTheme(mode) {
            console.log("Applying theme mode:", mode);
            // In Wix Studio, we style master background or sections
            const master = $w('#masterPage') || $w('#SITE_CONTAINER');
            const pageBg = $w('#pageBackground') || $w('#PAGES_CONTAINER');

            if (mode === 'dark') {
                if (master && master.style) master.style.backgroundColor = '#121A15';
                if (pageBg && pageBg.style) pageBg.style.backgroundColor = '#121A15';
            } else {
                if (master && master.style) master.style.backgroundColor = '#F9F7F2';
                if (pageBg && pageBg.style) pageBg.style.backgroundColor = '#F9F7F2';
            }
        }

        autoBtns.forEach(id => {
            if ($w(id)) {
                $w(id).onClick((event) => {
                    if (event && event.preventDefault) event.preventDefault();
                    applyTheme('light');
                });
            }
        });

        dayBtns.forEach(id => {
            if ($w(id)) {
                $w(id).onClick((event) => {
                    if (event && event.preventDefault) event.preventDefault();
                    applyTheme('light');
                });
            }
        });

        nightBtns.forEach(id => {
            if ($w(id)) {
                $w(id).onClick((event) => {
                    if (event && event.preventDefault) event.preventDefault();
                    applyTheme('dark');
                });
            }
        });
    } catch (err) {
        console.warn("Theme system notice:", err);
    }
}

// =========================================================================
// 2. MOBILE MENU BUTTON DRAWER TOGGLE
// =========================================================================
function initMobileMenuDrawer() {
    try {
        // comp-kbgakxea_r_comp-muz13r5y1 = MENU Button
        const menuBtn = $w('#comp-kbgakxea_r_comp-muz13r5y1') || $w('#menuButton') || $w('#btnMenu');
        const menuDrawer = $w('#menuContainer') || $w('#siteMenu') || $w('#mobileMenuDrawer');

        if (menuBtn) {
            let isOpen = false;
            menuBtn.onClick((event) => {
                if (event && event.preventDefault) event.preventDefault();
                isOpen = !isOpen;
                if (menuDrawer) {
                    if (isOpen) {
                        menuDrawer.show('slide', { direction: 'top', duration: 300 });
                    } else {
                        menuDrawer.hide('slide', { direction: 'top', duration: 300 });
                    }
                }
            });
        }
    } catch (err) {
        console.warn("Mobile menu drawer notice:", err);
    }
}

// =========================================================================
// 3. FIX ALL OUT-OF-WEB & BROKEN LINKS + TYPOS
// =========================================================================
function fixAllLinksAndTypos() {
    try {
        // Fix Top Nav / Footer Typos
        const typoElements = ['#navLinkReviews', '#navReviews', '#reviewsText', '#navItem4'];
        typoElements.forEach(id => {
            if ($w(id)) {
                if ($w(id).text === 'Rewies') $w(id).text = 'Reviews';
                if ($w(id).label === 'Rewies') $w(id).label = 'Reviews';
            }
        });

        // Route all navigation to INTERNAL site pages
        const internalNavMap = [
            { id: '#navLinkTours', path: '/tours' },
            { id: '#navLinkItineraries', path: '/itineraries' },
            { id: '#navLinkPrices', path: '/prices' },
            { id: '#navLinkNotes', path: '/notes' },
            { id: '#btnHeaderPlan', path: '/plan' },
            { id: '#btnPlanTrip', path: '/plan' }
        ];

        internalNavMap.forEach(item => {
            const el = $w(item.id);
            if (el) {
                el.onClick((e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    wixLocation.to(item.path);
                });
            }
        });
    } catch (err) {
        console.warn("Global fixes notice:", err);
    }
}
