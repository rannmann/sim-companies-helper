// Utility functions
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

async function processDailyProductionData(buildings) {
    const production = {};

    for (const building of buildings) {
        if (building.busy && building.busy.resource) {
            const resource = building.busy.resource;
            const resourceId = resource.kind;
            const baseHourlyProduction = await getProductionRate(resourceId);
            const buildingLevel = building.size; // Size corresponds to "level"

            // Building level is a simple multiplier of the base production rate.
            const hourlyProduction = baseHourlyProduction * buildingLevel;

            if (!production[resourceId]) {
                production[resourceId] = {
                    name: resource.name,
                    total: 0,
                    unitCost: resource.unitCost,
                    image: resource.image
                };
            }

            // Correctly aggregate the total production
            production[resourceId].total += hourlyProduction * 24;
        }
    }

    return production;
}

export { processPendingProductionData, processDailyProductionData };