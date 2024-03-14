const { ipcRenderer } = require('electron');

ipcRenderer.on('floors', (event, floors) => {
  const container = document.getElementById('floors-container');

  floors.forEach(floor => {
    const button = document.createElement('button');
    button.textContent = `${floor.name}`;
    button.className = 'floor-button';
    container.appendChild(button);
  });
}); 