// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfA...",
    authDomain: "biblioteca-78f44.firebaseapp.com",
    databaseURL: "https://biblioteca-78f44-default-rtdb.firebaseio.com",
    projectId: "biblioteca-78f44",
    storageBucket: "biblioteca-78f44.firebasestorage.app",
    messagingSenderId: "715514751731",
    appId: "1:715514751731:web:0c65f5f5e79d8e878de586"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ================= BUSCAR DO FIREBASE =================
function carregarPoemas() {
    const poemasRef = ref(db, "poemas");

    onValue(poemasRef, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            document.getElementById("poems-grid").innerHTML = "<p>Sem poemas ainda...</p>";
            return;
        }

        // transforma objeto em array
        const poems = Object.values(data);

        renderPoems(poems);
    });
}

// ================= RENDER =================
function renderPoems(poems) {
    const grid = document.getElementById("poems-grid");
    const modalContainer = document.getElementById("modal-container");

    grid.innerHTML = "";
    modalContainer.innerHTML = "";

    // mais recentes primeiro
    poems.reverse().forEach(poema => {

        const card = document.createElement("a");
        card.href = `#modal-${poema.id}`;
        card.className = "card";

        card.innerHTML = `
            <div class="card-image">
                <img src="${poema.imagem}">
            </div>
            <div class="card-overlay"></div>
            <div class="card-content">
                <h3>${poema.titulo}</h3>
                <p>${poema.poema.slice(0, 50)}...</p>
            </div>
        `;

        grid.appendChild(card);

        const modal = document.createElement("div");
        modal.id = `modal-${poema.id}`;
        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-content">
                <a href="#" class="close-modal">&times;</a>

                <div class="modal-poema-header">
                    <div class="modal-capa">
                        <img src="${poema.imagem}">
                    </div>
                    <div class="modal-info">
                        <h3>${poema.titulo}</h3>
                        <div class="modal-autor">por ${poema.autor}</div>
                    </div>
                </div>

                <div class="poema-texto-modal">
                    ${poema.poema}
                </div>

                <div class="reflexao-modal">
                    <div class="reflexao-item-modal">
                        <h4>✍️ O que eu pensei</h4>
                        <p>${poema.ideia}</p>
                    </div>
                    <div class="reflexao-item-modal">
                        <h4>💡 Ideia</h4>
                        <p>${poema.pensamento}</p>
                    </div>
                </div>
            </div>
        `;

        modalContainer.appendChild(modal);
    });
}

// ================= INIT =================
window.addEventListener("load", () => {
    carregarPoemas();
});