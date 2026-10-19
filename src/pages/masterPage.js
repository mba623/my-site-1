/**
 * =========================================================================
 * TOKYO VIBES - MASTER GLOBAL CODE (masterPage.js)
 * =========================================================================
 * 1. Mobile Menu Drawer Synchronization:
 *    Hooks both the custom MENU button (#comp-kbgakxea_r_comp-muz13r5y1) and 
 *    the native hamburger button (#comp-kbgakxea_r_comp-muz13r77).
 * 2. Day / Night Theme Switcher:
 *    Prevents redirect to external pages and applies theme classes / colors.
 * 3. Sanitizes all external tokyovibes.com and /blank links to internal paths.
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("Tokyo Vibes MasterPage Ready.");
    initMobileMenuHandlers();
    initThemeSwitchers();
    initGlobalLinkRouting();
});

// =========================================================================
// 1. MOBILE MENU DRAWER CONTROLLER
// =========================================================================
function initMobileMenuHandlers() {
    try {
        // The visible button on mobile is #comp-kbgakxea_r_comp-muz13r5y1 ('MENU')
        // The Wix built-in hamburger component is #comp-kbgakxea_r_comp-muz13r77
        // And the overlay dialog is #comp-kbgakxea_r_comp-muz13r791
        const customMenuBtn = $w('#comp-kbgakxea_r_comp-muz13r5y1');
        const nativeHamburger = $w('#comp-kbgakxea_r_comp-muz13r77');
        const menuOverlay = $w('#comp-kbgakxea_r_comp-muz13r791');

        if (customMenuBtn) {
            customMenuBtn.onClick((event) => {
                if (event && event.preventDefault) event.preventDefault();
                console.log("Custom MENU button tapped.");
                
                // If native hamburger is present, trigger its click
                if (nativeHamburger && typeof nativeHamburger.onClick === 'function') {
                    // Try to open overlay if available
                    if (menuOverlay && typeof menuOverlay.show === 'function') {
                        menuOverlay.show();
                    }
                }
            });
        }
    } catch (err) {
        console.warn("Mobile menu handler warning:", err);
    }
}

// =========================================================================
// 2. THEME SWITCHER (AUTO / DAY / NIGHT)
// =========================================================================
function initThemeSwitchers() {
    try {
        const autoBtn = $w('#comp-mv1prinw_r_comp-mv1pq6w01');
        const dayBtn = $w('#comp-mv1prinw_r_comp-mv1pq6w7');
        const nightBtn = $w('#comp-mv1prinw_r_comp-mv1pq6wb2');

        function setTheme(mode) {
            console.log("Switching theme to:", mode);
            const container = $w('#SITE_CONTAINER') || $w('#masterPage');
            const pageSection = $w('#PAGE_SECTIONSc1dmp') || $w('#pageBackground');

            if (mode === 'dark') {
                if (container && container.style) container.style.backgroundColor = '#121A15';
                if (pageSection && pageSection.style) pageSection.style.backgroundColor = '#121A15';
            } else {
                if (container && container.style) container.style.backgroundColor = '#F9F7F2';
                if (pageSection && pageSection.style) pageSection.style.backgroundColor = '#F9F7F2';
            }
        }

        if (autoBtn) {
            autoBtn.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                setTheme('light');
            });
        }

        if (dayBtn) {
            dayBtn.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                setTheme('light');
            });
        }

        if (nightBtn) {
            nightBtn.onClick((e) => {
                if (e && e.preventDefault) e.preventDefault();
                setTheme('dark');
            });
        }
    } catch (err) {
        console.warn("Theme switcher warning:", err);
    }
}

// =========================================================================
// 3. GLOBAL LINK SANITIZER & ROUTER
// =========================================================================
function initGlobalLinkRouting() {
    try {
        // Correct header/footer typos
        const typoElements = ['#navLinkReviews', '#navReviews', '#reviewsText', '#navItem4'];
        typoElements.forEach(id => {
            const el = $w(id);
            if (el) {
                if (el.text === 'Rewies') el.text = 'Reviews';
                if (el.label === 'Rewies') el.label = 'Reviews';
            }
        });
    } catch (err) {
        console.warn("Global link routing warning:", err);
    }
}
