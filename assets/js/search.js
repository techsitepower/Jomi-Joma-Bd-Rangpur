/**
 * Jomi Joma BD Rangpur - Search & Filtering Engine
 * Parses parametric configuration schemas directly to control results listings
 */

const SearchEngine = {
    propertiesData: [],
    
    /**
     * Bootstraps context matrix variables safely
     * @param {Array} sharedPropertiesData 
     */
    init: function(sharedPropertiesData) {
        this.propertiesData = sharedPropertiesData || [];
        this.setupSearchFormBindings();
    },

    /**
     * Sets up operational triggers inside advanced marketplace filter components
     */
    setupSearchFormBindings: function() {
        const searchForm = document.getElementById('advancedSearchForm');
        if (!searchForm) return;

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.executeSearchQuery();
        });

        // Dependent dropdown cascading filter operations (District -> Upazila setup mapping)
        const districtSelect = document.getElementById('filterDistrict');
        if (districtSelect) {
            districtSelect.addEventListener('change', (e) => this.cascadeGeographicFilters(e.target.value));
        }
    },

    /**
     * Extracts values from the input matrix and filters the payload matching user constraints
     */
    executeSearchQuery: function() {
        const typeFilter = document.getElementById('filterAssetType')?.value || 'all';
        const districtFilter = document.getElementById('filterDistrict')?.value || 'all';
        const upazilaFilter = document.getElementById('filterUpazila')?.value || 'all';
        const maxPriceFilter = parseFloat(document.getElementById('filterMaxPrice')?.value) || Infinity;

        const results = this.propertiesData.filter(item => {
            const matchType = (typeFilter === 'all' || item.category === typeFilter);
            const matchDistrict = (districtFilter === 'all' || item.location.district === districtFilter);
            const matchUpazila = (upazilaFilter === 'all' || item.location.upazila === upazilaFilter);
            const matchPrice = (item.price <= maxPriceFilter);

            return matchType && matchDistrict && matchUpazila && matchPrice;
        });

        // Dispatch calculated result payloads cleanly to surface DOM layers
        const searchCompletedEvent = new CustomEvent('searchFiltersExecuted', { 
            detail: { results: results } 
        });
        window.dispatchEvent(searchCompletedEvent);
    },

    /**
     * Standardizes dynamic cascading sub-selections across districts asynchronously
     * @param {string} targetedDistrict 
     */
    cascadeGeographicFilters: async function(targetedDistrict) {
        const upazilaDropdown = document.getElementById('filterUpazila');
        if (!upazilaDropdown) return;

        upazilaDropdown.innerHTML = '';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = 'all';
        defaultOption.setAttribute('data-i18n', 'search.all_upazilas');
        defaultOption.textContent = LanguageEngine.currentLang === 'bn' ? 'সব উপজেলা' : 'All Upazilas';
        upazilaDropdown.appendChild(defaultOption);

        if (targetedDistrict === 'all') return;

        const districtsGeoData = await Utils.fetchData('/data/districts.json');
        if (districtsGeoData && districtsGeoData[targetedDistrict]) {
            districtsGeoData[targetedDistrict].forEach(upazila => {
                const option = document.createElement('option');
                option.value = upazila.id;
                option.textContent = LanguageEngine.currentLang === 'bn' ? upazila.nameBn : upazila.nameEn;
                upazilaDropdown.appendChild(option);
            });
        }
    }
};