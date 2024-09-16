//import store from './store';

// This should not be exported.  Create wrappers for any API calls.
async function fetchData(endpoint) {
    const baseUrl = 'https://www.simcompanies.com/api/';

    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function updateBuildings() {
    const data = await fetchData('v2/companies/me/buildings');
    if (data) {
        // TODO
        //store.setState({ buildings: data });
    }
    return data;
}

async function getProductionRate(resourceId) {
    const response = await fetch(`https://www.simcompanies.com/api/v4/en/0/encyclopedia/resources/0/${resourceId}/`);
    const data = await response.json();
    return data.producedAnHour;
}

export { updateBuildings, getProductionRate };