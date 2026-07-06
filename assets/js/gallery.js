/**
 * Jomi Joma BD Rangpur - Media Gallery Showcase Components Manager
 * Interfaces image arrays seamlessly to enable zero-dependency slide tracking
 */

const GalleryEngine = {
    imageCollection: [],
    activeIndex: 0,

    /**
     * Ingestion entry sequence setting up elements anchors
     * @param {Array} imagesList 
     */
    init: function(imagesList) {
        this.imageCollection = imagesList.length > 0 ? imagesList : ['/assets/images/placeholders/no-image.svg'];
        this.activeIndex = 0;
        this.renderGalleryStructuralStrip();
        this.bindGalleryInteractions();
    },

    /**
     * Creates target elements nodes directly matching thumbnails matrices
     */
    renderGalleryStructuralStrip: function() {
        const mainDisplayFrame = document.getElementById('listingHeroDisplayImage');
        if (mainDisplayFrame) {
            mainDisplayFrame.setAttribute('src', this.imageCollection[this.activeIndex]);
            mainDisplayFrame.setAttribute('alt', 'Main Asset Visual');
        }

        const thumbnailsContainer = document.getElementById('listingThumbnailsStripContainer');
        if (!thumbnailsContainer) return;

        thumbnailsContainer.innerHTML = '';

        this.imageCollection.forEach((srcUrl, index) => {
            const thumbnailNode = document.createElement('button');
            thumbnailNode.className = `thumbnail-node-element ${index === this.activeIndex ? 'is-active' : ''}`;
            thumbnailNode.setAttribute('data-index', index);
            thumbnailNode.setAttribute('aria-label', `View media assets frame ${index + 1}`);

            const innerImage = document.createElement('img');
            innerImage.setAttribute('src', srcUrl);
            innerImage.setAttribute('alt', 'Asset structural view mini');
            innerImage.setAttribute('loading', 'lazy');

            thumbnailNode.appendChild(innerImage);
            thumbnailsContainer.appendChild(thumbnailNode);
        });
    },

    /**
     * Monitors click cascades traversing across targeted thumbnails elements node arrays
     */
    bindGalleryInteractions: function() {
        const thumbnailsContainer = document.getElementById('listingThumbnailsStripContainer');
        if (!thumbnailsContainer) return;

        thumbnailsContainer.addEventListener('click', (event) => {
            const targetButton = event.target.closest('.thumbnail-node-element');
            if (!targetButton) return;

            event.preventDefault();
            const targetedIndex = parseInt(targetButton.getAttribute('data-index'), 10);
            
            if (targetedIndex !== this.activeIndex) {
                this.activeIndex = targetedIndex;
                this.updateActiveDisplayState();
            }
        });
    },

    /**
     * Switches active state markers seamlessly without tearing DOM rendering structures
     */
    updateActiveDisplayState: function() {
        const mainDisplayFrame = document.getElementById('listingHeroDisplayImage');
        if (mainDisplayFrame) {
            mainDisplayFrame.setAttribute('src', this.imageCollection[this.activeIndex]);
        }

        const activeClassStr = 'is-active';
        const collectionNodes = document.querySelectorAll('.thumbnail-node-element');
        collectionNodes.forEach((node, idx) => {
            if (idx === this.activeIndex) {
                node.classList.add(activeClassStr);
            } else {
                node.classList.remove(activeClassStr);
            }
        });
    }
};