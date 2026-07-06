/**
 * Jomi Joma BD Rangpur - Dynamic Property Profile Controller
 * Controls DOM binding expansions inside full single listings pages
 */

const PropertyController = {
    currentListing: null,

    /**
     * Initializes core structural modules targeting details layout injection
     */
    init: async function() {
        const urlParams = Utils.getUrlParams();
        const listingId = urlParams.id;

        if (!listingId) {
            this.handleMissingListingContext();
            return;
        }

        const dataPayload = await Utils.fetchData('/data/properties.json');
        if (dataPayload) {
            this.currentListing = dataPayload.find(item => item.id.toString() === listingId.toString());
            if (this.currentListing) {
                this.renderListingDetails();
                // Handshake initialization with Gallery Engine component structures
                if (typeof GalleryEngine !== 'undefined') {
                    GalleryEngine.init(this.currentListing.images || []);
                }
            } else {
                this.handleMissingListingContext();
            }
        }

        // Listen for lang context transformations to execute re-render loops dynamically
        window.addEventListener('languageChanged', () => {
            if (this.currentListing) this.renderListingDetails();
        });
    },

    /**
     * Injects translated JSON properties data arrays cleanly into semantic DOM blocks
     */
    renderListingDetails: function() {
        if (!this.currentListing) return;

        const currentLang = LanguageEngine.currentLang || 'bn';
        
        // Element mapping assignments 
        const titleElement = document.getElementById('listingProfileTitle');
        if (titleElement) {
            titleElement.textContent = currentLang === 'bn' ? this.currentListing.titleBn : this.currentListing.titleEn;
        }

        const priceElement = document.getElementById('listingProfilePrice');
        if (priceElement) {
            priceElement.textContent = Utils.formatPrice(this.currentListing.price, currentLang);
        }

        const areaElement = document.getElementById('listingProfileArea');
        if (areaElement) {
            areaElement.textContent = Utils.formatArea(this.currentListing.size, this.currentListing.sizeUnit, currentLang);
        }

        const descElement = document.getElementById('listingProfileDescription');
        if (descElement) {
            descElement.textContent = currentLang === 'bn' ? this.currentListing.descriptionBn : this.currentListing.descriptionEn;
        }
    },

    /**
     * Gracefully diverts traffic out of broken listing indices safely
     */
    handleMissingListingContext: function() {
        window.location.replace('/pages/404.html');
    }
};

// Auto boot individual property module layers only within property profile page parameters
if (window.location.pathname.includes('property.html')) {
    document.addEventListener('DOMContentLoaded', () => PropertyController.init());
}