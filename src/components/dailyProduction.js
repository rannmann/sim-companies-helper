import { fetchData } from '../api.js';
import { resolveImageUrl } from './utils.js';

async function createDailyProductionUI() {
    const dailyProductionData = await fetchData('v2/companies/me/dailyProduction');
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'Daily Production';
    container.appendChild(title);

    const productionList = document.createElement('ul');
    productionList.style.listStyleType = 'none';
    productionList.style.padding = '0';
    productionList.style.margin = '0';

    for (const resourceId in dailyProductionData) {
        const resource = dailyProductionData[resourceId];
        const listItem = document.createElement('li');
        listItem.style.marginBottom = '5px';
        listItem.innerHTML = `<img src="${resolveImageUrl(resource.image)}" alt="${resource.name}" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> ${resource.name}: ${resource.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} (Cost: ${resource.cost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })})`;
        productionList.appendChild(listItem);
    }

    container.appendChild(productionList);
    return container;
}

export { createDailyProductionUI };