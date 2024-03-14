const { ipcRenderer } = require('electron');


// Chronicles display
ipcRenderer.on('chronicles', (event, chronicles) => {
    const container = document.getElementById('chronicles');
  
    chronicles.forEach(chronicle => {
        const card = document.createElement('div');
        card.className = 'chronicle-card';

        const name = document.createElement('div');
        name.className = 'chronicle-name';
        // Capitalize first letter of name
        // Look for a better way to do this
        name.textContent = chronicle.name.charAt(0).toUpperCase() + chronicle.name.slice(1);
        card.appendChild(name);

        const img = document.createElement('img');
        img.className = 'chronicle-img';
        img.src = '../../assets/' + chronicle.image;
        card.appendChild(img);

        const infoContainer = document.createElement('div');
        infoContainer.className = 'chronicle-info-container';

        const unit = document.createElement('div');
        unit.className = 'chronicle-unit';
        unit.textContent = chronicle.unitCount + " " + chronicle.unit;
        infoContainer.appendChild(unit);

        const reward = document.createElement('div');
        reward.className = 'reward';
        reward.textContent = chronicle.reward;
        infoContainer.appendChild(reward);

        const counter = document.createElement('div');
        counter.className = 'chronicle-counter';
        counter.textContent = chronicle.counter;
        infoContainer.appendChild(counter);

        card.appendChild(infoContainer);

        const tagContainer = document.createElement('div');
        tagContainer.className = 'chronicle-tag-container';

        const tag1 = document.createElement('div');
        tag1.className = 'chronicle-tag';
        tag1.textContent = chronicle.type1;
        tagContainer.appendChild(tag1);

        const tag2 = document.createElement('div');
        tag2.className = 'chronicle-tag';
        tag2.textContent = chronicle.type2;
        tagContainer.appendChild(tag2);

        const tag3 = document.createElement('div');
        tag3.className = 'chronicle-tag';
        tag3.textContent = chronicle.type3;
        tagContainer.appendChild(tag3);

        card.appendChild(tagContainer);

        container.appendChild(card);

        card.addEventListener('click', () => {
            chronicle.counter++;
            card.querySelector('.chronicle-counter').textContent = `${chronicle.counter}`;
        
            // Save the updated counter to the database
            ipcRenderer.send('updateChronicleCounter', chronicle);
            ipcRenderer.send('rewardPlayerRap', chronicle.reward);
        });
    });
});

