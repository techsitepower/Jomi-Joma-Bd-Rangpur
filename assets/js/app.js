/**
 * Jomi Joma BD Rangpur - Core Orchestration Application Shell
 * Main bootstrap orchestration layer managing system startup handshakes
 */

const AppShell = {
    globalPropertiesInventory: [],

    /**
     * System startup initialization sequence
     */
    init: async function() {
        console.log('Jomi Joma BD Rangpur application lifecycle initializing...');
        
        // Fetch universal property collections upfront to feed down-funnel features
        await this.loadGlobalPropertiesPayload();
        this.orchestrateCoreUIHandlers();
    },

    /**
     * Pre-fetches database assets arrays to decouple network bindings from individual views
     */
    loadGlobalPropertiesPayload: async function() {
        const payload = await Utils.fetchData('/data/properties.json');
        if (payload) {
            this.globalPropertiesInventory = payload;
            
            // Introspect context layers to assign runtime search parameters cleanly
            if (typeof SearchEngine !== 'undefined') {
                SearchEngine.init(this.globalPropertiesInventory);
            }
        }
    },

    /**
     * Global UI component event tracking declarations (FAQ accordions, Mobile Menu Toggles)
     */
    orchestrateCoreUIHandlers: function() {
        // Universal Mobile Drawer Toggler handler matrix
        document.addEventListener('click', (event) => {
            const mobileMenuBtn = event.target.closest('[data-action="toggle-mobile-menu"]');
            if (mobileMenuBtn) {
                event.preventDefault();
                const navigationMenu = document.querySelector('.main-navigation-menu');
                if (navigationMenu) {
                    navigationMenu.classList.toggle('is-visible-mobile');
                }
            }

            // Universal FAQ Layout Blueprints Accordion interaction handler
            const faqTrigger = event.target.closest('.faq-accordion-trigger');
            if (faqTrigger) {
                event.preventDefault();
                const parentItem = faqTrigger.closest('.faq-accordion-item');
                if (parentItem) {
                    const isActive = parentItem.classList.contains('is-active');
                    
                    // Collapse open structures globally to favor clean layout flow
                    document.querySelectorAll('.faq-accordion-item').forEach(item => {
                        item.classList.remove('is-active');
                    });

                    if (!isActive) {
                        parentItem.classList.add('is-active');
                    }
                }
            }
        });
    }
};

// Bootstrap standard execution thread immediately upon DOM readiness validation
document.addEventListener('DOMContentLoaded', () => AppShell.init());