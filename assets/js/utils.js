/**
 * Jomi Joma BD Rangpur - Utility Functions
 * Global Helpers for Currency, Localized Conversions, and DOM Queries
 */

const Utils = {
    /**
     * Converts standard digits to localized Bangla digits
     * @param {string|number} input
     * @returns {string}
     */
    toBanglaNumber: function(input) {
        if (input === undefined || input === null) return '';
        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return input.toString().replace(/[0-9]/g, match => banglaDigits[parseInt(match)]);
    },

    /**
     * Formats pricing context strictly in BDT (Taka) based on application language
     * @param {number} amount 
     * @param {string} langCode 
     * @returns {string}
     */
    formatPrice: function(amount, langCode) {
        if (isNaN(amount)) return '';
        
        if (langCode === 'bn') {
            if (amount >= 10000000) {
                const crore = amount / 10000000;
                return `${this.toBanglaNumber(crore.toFixed(1))} কোটি টাকা`;
            } else if (amount >= 100000) {
                const lakh = amount / 100000;
                return `${this.toBanglaNumber(lakh.toFixed(1))} লক্ষ টাকা`;
            }
            return `${this.toBanglaNumber(amount.toLocaleString('bn-BD'))} টাকা`;
        } else {
            if (amount >= 10000000) {
                const crore = amount / 10000000;
                return `${crore.toFixed(1)} Crore BDT`;
            } else if (amount >= 100000) {
                const lakh = amount / 100000;
                return `${lakh.toFixed(1)} Lakh BDT`;
            }
            return `${amount.toLocaleString('en-US')} BDT`;
        }
    },

    /**
     * Formats land and structural area measurements dynamically
     * @param {number} size 
     * @param {string} unit 
     * @param {string} langCode 
     * @returns {string}
     */
    formatArea: function(size, unit, langCode) {
        const localizedSize = langCode === 'bn' ? this.toBanglaNumber(size) : size;
        
        // Dynamic map mapping localized units safely
        const unitMap = {
            'bn': { 'decimal': 'শতক', 'katha': 'কাঠা', 'bigha': 'বিঘা', 'sqft': 'বর্গফুট' },
            'en': { 'decimal': 'Decimal', 'katha': 'Katha', 'bigha': 'Bigha', 'sqft': 'Sq. Ft.' }
        };

        const unitString = unitMap[langCode][unit.toLowerCase()] || unit;
        return `${localizedSize} ${unitString}`;
    },

    /**
     * Extracts URL parameters safely for client-side routing filter state
     * @returns {Object}
     */
    getUrlParams: function() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    },

    /**
     * Safe asynchronous data fetch execution targeting mock JSON layers
     * @param {string} url 
     * @returns {Promise<any>}
     */
    fetchData: async function(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Application Data Fetch Error Matrix: ${error.message}`);
            return null;
        }
    }
};