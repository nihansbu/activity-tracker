const { ipcRenderer } = require('electron');

window.onload = function() {
    ipcRenderer.send('getSkills');

    ipcRenderer.on('skills', (event, skills) => {
        const container = document.getElementById('skills-container');
        skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';

            const name = document.createElement('div');
            name.textContent = skill.name;
            card.appendChild(name);

            const level = document.createElement('div');
            level.textContent = `Level: ${skill.currentLevel}/${skill.maxLevel}`;
            card.appendChild(level);

            const img = document.createElement('img');
            img.src = `../../assets/${skill.image}`;
            card.appendChild(img);

            container.appendChild(card);
        });
    });
};