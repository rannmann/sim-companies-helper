import { createQueuedProductionUI } from './components/queuedProduction.js';
import { createDailyProductionUI } from './components/dailyProduction.js';

function createUI() {
    const tabs = [
        { name: 'Queued Production', createUI: createQueuedProductionUI },
        { name: 'Daily Production', createUI: createDailyProductionUI }
    ];

    const container = document.createElement('div');
    container.id = 'sim-companies-helper';
    container.style.position = 'fixed';
    container.style.top = '50px';
    container.style.left = '10px';
    container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    container.style.border = '1px solid black';
    container.style.padding = '10px';
    container.style.zIndex = '1000';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    container.style.fontSize = '14px';
    container.style.fontWeight = 'bold';
    container.style.color = '#333';
    container.style.width = 'auto';

    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.borderBottom = '1px solid #000';

    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';

    tabs.forEach((tab, index) => {
        const tabButton = document.createElement('button');
        tabButton.textContent = tab.name;
        tabButton.style.flex = '1';
        tabButton.style.padding = '10px';
        tabButton.style.cursor = 'pointer';
        tabButton.style.border = 'none';
        tabButton.style.backgroundColor = index === 0 ? '#ddd' : '#fff';
        tabButton.addEventListener('click', async () => {
            document.querySelectorAll('#sim-companies-helper button').forEach(btn => btn.style.backgroundColor = '#fff');
            tabButton.style.backgroundColor = '#ddd';
            contentContainer.innerHTML = '';
            const tabContent = await tab.createUI();
            contentContainer.appendChild(tabContent);
        });
        tabContainer.appendChild(tabButton);
    });

    container.appendChild(tabContainer);
    container.appendChild(contentContainer);
    document.body.appendChild(container);

    // Initialize with the first tab
    (async () => {
        const initialContent = await tabs[0].createUI();
        contentContainer.appendChild(initialContent);
    })();
}

export { createUI };