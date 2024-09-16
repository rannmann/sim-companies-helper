import { resolveImageUrl } from './utils.js';

// UI Module
function createUI(productionData) {
    const container = document.createElement('div');
    container.id = 'sim-companies-helper';
    container.style.position = 'fixed';
    container.style.top = '50px'; // Adjusted to avoid the navbar
    container.style.left = '10px'; // Adjusted to avoid clipping to the right
    container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    container.style.border = '1px solid black';
    container.style.padding = '10px';
    container.style.zIndex = '1000';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    container.style.fontSize = '14px';
    container.style.fontWeight = 'bold';
    container.style.color = '#333';
    container.style.cursor = 'move';
    container.style.width = 'auto'; // Ensure the width is auto to prevent resizing

    const titleBar = document.createElement('div');
    titleBar.style.display = 'flex';
    titleBar.style.justifyContent = 'space-between';
    titleBar.style.alignItems = 'center';
    titleBar.style.cursor = 'move';

    const title = document.createElement('h2');
    title.textContent = 'Queued Production';
    title.style.margin = '0';
    title.style.fontSize = '16px';
    title.style.color = '#000';
    titleBar.appendChild(title);

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.style.marginLeft = '10px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.backgroundColor = '#fff'; // Set background color to white
    minimizeButton.style.border = '1px solid #000'; // Add a black border
    minimizeButton.style.color = '#000'; // Set text color to black
    minimizeButton.style.padding = '2px 5px'; // Add some padding
    minimizeButton.style.borderRadius = '3px'; // Add border radius for rounded corners
    titleBar.appendChild(minimizeButton);

    container.appendChild(titleBar);

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

    document.body.appendChild(container);

    // Dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            container.style.left = `${e.clientX - offsetX}px`;
            container.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Minimize/Maximize functionality
    minimizeButton.addEventListener('click', () => {
        if (productionList.style.display === 'none') {
            productionList.style.display = 'block';
            minimizeButton.textContent = '-';
        } else {
            productionList.style.display = 'none';
            minimizeButton.textContent = '+';
        }
    });
}

export { createUI };