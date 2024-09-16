import { fetchData } from './api.js';
import { processPendingProductionData } from './utils.js';
import { createUI } from './ui.js';

// Initialize the script
async function init() {
    const buildings = await fetchData('v2/companies/me/buildings');
    if (buildings) {
        const productionData = processPendingProductionData(buildings);
        // const productionData = await processDailyProductionData(buildings); // Uncomment if needed
        createUI(productionData);
    }
}

// Function to handle URL changes
async function handleUrlChange() {
    const container = document.getElementById('sim-companies-helper');
    if (window.location.pathname === '/landscape/') {
        if (!container) {
            await init();
        }
    } else {
        if (container) {
            container.remove();
        }
    }
}

// Run the init function when the page loads
//window.addEventListener('load', handleUrlChange);

// Monitor URL changes
window.addEventListener('popstate', handleUrlChange);
window.addEventListener('pushState', handleUrlChange);
window.addEventListener('replaceState', handleUrlChange);

// MutationObserver to detect URL changes in SPAs
const observer = new MutationObserver(handleUrlChange);
observer.observe(document, { subtree: true, childList: true });