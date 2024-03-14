const { getPlayerCurrentRap } = require('../../database/database_operations_player.js');

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    background-color: #333;
                    color: white;
                }
                h1 {
                    margin: 0;
                }
                #rap {
                    margin-left: auto;
                }
            </style>
            <nav>
                <a href="../index/index.html">Home</a>
                <h1>${document.title}</h1>
                <div id="rap">Loading...</div>
            </nav>
        `;
    }

    connectedCallback() {
        this.updateRap();
        this.intervalId = setInterval(() => this.updateRap(), 500);
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }

    async updateRap() {
        try {
            const currentRap = await getPlayerCurrentRap();
            const formattedRap = Number(currentRap).toLocaleString();
            this.shadowRoot.querySelector('#rap').textContent = `RAP: ${formattedRap}`;
        } catch (err) {
            console.error(err);
            this.shadowRoot.querySelector('#rap').textContent = 'Error loading RAP';
        }
    }
}

customElements.define('nav-bar', NavBar);