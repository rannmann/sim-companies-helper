import { fetchData } from './api.js';
import { processPendingProductionData } from './utils.js';
import { createUI } from './ui.js';

let isInitialized = false; // Add a flag to track initialization
let debounceTimeout; // Add a timeout variable for debouncing

// Debounce function to limit the rate of function calls
function debounce(func, wait) {
    return function(...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(this, args), wait);
    };
}

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
        if (!container && !isInitialized) { // Check the flag before initializing
            await init();
            isInitialized = true; // Set the flag to true after initialization
        }
    } else {
        if (container) {
            container.remove();
            isInitialized = false; // Reset the flag when navigating away
        }
    }
}

// Debounced version of handleUrlChange
const debouncedHandleUrlChange = debounce(handleUrlChange, 100);

// Run the init function when the page loads
window.addEventListener('load', debouncedHandleUrlChange);

// Monitor URL changes
window.addEventListener('popstate', debouncedHandleUrlChange);
window.addEventListener('pushState', debouncedHandleUrlChange);
window.addEventListener('replaceState', debouncedHandleUrlChange);

// MutationObserver to detect URL changes in SPAs
const observer = new MutationObserver(debouncedHandleUrlChange);
observer.observe(document, { subtree: true, childList: true });