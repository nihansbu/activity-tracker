// frontend/resource_components/sidebar.js

function generateSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';

    // Add your navigation links here
    const navLink1 = document.createElement('a');
    navLink1.href = '../index/index.html';
    navLink1.textContent = 'Home';
    sidebar.appendChild(navLink1);

    // Repeat for other links...

    return sidebar;
}

module.exports = { generateSidebar };