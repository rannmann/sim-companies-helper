import { fetchData } from '../api.js';
import { resolveImageUrl } from './utils.js';

async function createQueuedProductionUI() {
    const buildings = await fetchData('v2/companies/me/buildings');
    const productionData = processPendingProductionData(buildings);
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'Queued Production';
    container.appendChild(title);

    const productionList = document.createElement('ul');
    productionList.style.listStyleType = 'none';
    productionList.style.padding = '0';
    productionList.style.margin = '0';

    for (const resourceId in productionData) {
        const resource = productionData[resourceId];
        const listItem = document.createElement('li');
        listItem.style.marginBottom = '5px';
        listItem.innerHTML = `<img src="${resolveImageUrl(resource.image)}" alt="${resource.name}" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> ${resource.name}: ${resource.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        productionList.appendChild(listItem);
    }

    container.appendChild(productionList);
    return container;
}

function processPendingProductionData(buildings) {
    const production = {};

    buildings.forEach(building => {
        if (building.busy && building.busy.resource) {
            const resource = building.busy.resource;
            const resourceId = resource.kind;

            if (!production[resourceId]) {
                production[resourceId] = {
                    name: resource.name,
                    total: 0,
                    unitCost: resource.unitCost,
                    image: resource.image
                };
            }

            production[resourceId].total += resource.amount;
        }
    });

    return production;
}

export { createQueuedProductionUI };