/**
 * Jomi Joma BD Rangpur - Internationalization Engine
 * Handles decoupled local memory switching between Bangla and English
 */

const LanguageEngine = {
    storageKey: 'jomijoma_lang_state',
    currentLang: 'bn', // Strict project structural baseline default
    dictionary: null,

    /**
     * Evaluates settings and bootstraps localized strings asynchronously
     */
    init: async function() {
        const savedLang = localStorage.getItem(this.storageKey);
        this.currentLang = savedLang === 'en' ? 'en' : 'bn';
        
        document.body.setAttribute('lang', this.currentLang);
        await this.loadDictionary();
        this.bindEvents();
    },

    /**
     * Fetches core localization mapping dictionary asynchronously
     */
    loadDictionary: async function() {
        const dataPath = this.currentLang === 'en' ? '/data/en.json' : '/data/bn.json';
        const data = await Utils.fetchData(dataPath);
        if (data) {
            this.dictionary = data;
            this.translateDOM();
        }
    },

    /**
     * Loops over text tokens within the DOM containing translation directives
     */
    translateDOM: function() {
        if (!this.dictionary) return;
        
        const nodes = document.querySelectorAll('[data-i18n]');
        nodes.forEach(node => {
            const key = node.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            if (translation) {
                if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                    if (node.hasAttribute('placeholder')) {
                        node.setAttribute('placeholder', translation);
                    }
                } else {
                    node.textContent = translation;
                }
            }
        });
    },

    /**
     * Resolves dot-notation strings safely across JSON dictionaries
     * @param {string} path 
     * @returns {string|null}
     */
    getNestedTranslation: function(path) {
        return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, this.dictionary);
    },

    /**
     * Setup user toggle binding triggers
     */
    bindEvents: function() {
        document.addEventListener('click', async (event) => {
            const languageTrigger = event.target.closest('[data-action="toggle-language"]');
            if (languageTrigger) {
                event.preventDefault();
                this.currentLang = this.currentLang === 'bn' ? 'en' : 'bn';
                localStorage.setItem(this.storageKey, this.currentLang);
                document.body.setAttribute('lang', this.currentLang);
                
                await this.loadDictionary();
                
                // Dispatch event notification across individual active controllers
                const changeEvent = new CustomEvent('languageChanged', { detail: { lang: this.currentLang } });
                window.dispatchEvent(changeEvent);
            }
        });
    }
};

// Bootstrap runtime initialization
document.addEventListener('DOMContentLoaded', () => LanguageEngine.init());