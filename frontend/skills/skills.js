const { ipcRenderer } = require('electron');
const { levelUpSkill } = require('../../database/database_operations_skills.js');

window.onload = function() {
    ipcRenderer.send('getSkills');

    ipcRenderer.on('skills', (event, skills) => {
        const container = document.getElementById('skills-container');
        skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';

            const infoContainer = document.createElement('div');
            infoContainer.className = 'skill-info-container';

            const name = document.createElement('div');
            name.className = 'skill-name';
            name.textContent = skill.name.charAt(0).toUpperCase() + skill.name.slice(1);
            infoContainer.appendChild(name);

            const level = document.createElement('div');
            level.className = 'skill-level';
            level.textContent = `${skill.currentLevel}/${skill.maxLevel}`;
            infoContainer.appendChild(level);

            card.appendChild(infoContainer);

            const img = document.createElement('img');
            img.className = 'skill-img';
            img.src = `../../assets/${skill.image}`;
            card.appendChild(img);

            card.addEventListener('click', () => {
                levelUpSkill(skill.name, () => {
                    console.log('Skill leveled up!');
                    // You might want to update the displayed level here
                    level.textContent = `${skill.currentLevel + 1}/${skill.maxLevel}`;
                });
            });

            container.appendChild(card);
        });
    });
};