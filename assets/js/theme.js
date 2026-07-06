/**
 * Jomi Joma BD Rangpur - Light/Dark Theme Engine
 * Non-blocking LocalStorage state management
 */

const ThemeEngine = {
    storageKey: 'jomijoma_theme_state',

    /**
     * Initializes theme context on window loading bounds
     */
    init: function() {
        const savedTheme = localStorage.getItem(this.storageKey);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Defaulting safely to systems lighting scheme settings
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
        this.bindEvents();
    },

    /**
     * Binds structural theme toggle triggers to DOM states
     */
    bindEvents: function() {
        document.addEventListener('click', (event) => {
            const toggleTrigger = event.target.closest('[data-action="toggle-theme"]');
            if (toggleTrigger) {
                event.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(nextTheme);
            }
        });
    },

    /**
     * Applies target theme parameter attributes directly onto document DOM nodes
     * @param {string} themeName 
     */
    setTheme: function(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem(this.storageKey, themeName);
        
        // Dispatch custom global event allowing peripheral views to adapt synchronously
        const event = new CustomEvent('themeChanged', { detail: { theme: themeName } });
        window.dispatchEvent(event);
    }
};

// Initialize immediately upon ingestion script layer loading
ThemeEngine.init();