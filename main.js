// ================= TEXTO DIGITANDO =================
const phrases = [
    "Ecos da Alma",
    "onde o silêncio escreve",
    "e a dor vira verso"
];

let phraseIndex = 0;
let charIndex = 0;
let currentText = "";

function typeLoop() {
    if (charIndex < phrases[phraseIndex].length) {
        currentText += phrases[phraseIndex].charAt(charIndex);
        document.getElementById("typing-text").innerHTML = currentText;
        charIndex++;
        setTimeout(typeLoop, 80);
    } else {
        setTimeout(() => {
            currentText = "";
            charIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeLoop();
        }, 2000);
    }
}

// ================= CHUVA =================
const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const section = document.querySelector(".poems-section");
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
}

let drops = [];

function initRain() {
    drops = [];
    for (let i = 0; i < 120; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 4 + 3
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(200, 200, 255, 0.3)";
    ctx.lineWidth = 1;

    for (let drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
            drop.y = -20;
            drop.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(drawRain);
}

// ================= DADOS (SIMULA BACKEND) =================
// const poems = [
//     {
//         id: 1,
//         titulo: "Chuva nos Vidros",
//         autor: "Sofia Lunar",
//         imagem: "https://picsum.photos/id/42/400/560",
//         texto: `A chuva desenha mapas no vidro,
// rotas líquidas que nunca levarei.
// Cada gota, um compromisso antigo
// com os dias em que ainda te esperei.

// A cidade lá fora é só borrão,
// e dentro de mim, a mesma inundação.`,
//         pensando: "O vidro representa o presente embaçado.",
//         ideia: "A chuva como memória emocional.",

//     },

//     {
//         id: 2,
//         titulo: "Labirinto Interior",
//         autor: "Sofia Lunar",
//         imagem: "https://picsum.photos/id/95/400/560",
//         texto: `Dentro de mim há um labirinto
// sem fio de Ariadne nem vitral.
// Esqueci onde deixei o instinto,
// vagueio à procura de um sinal.`,
//         pensando: "O erro como caminho.",
//         ideia: "Ansiedade e escolhas.",

//     }
// ];

const poems = JSON.parse(localStorage.getItem("poema"));

// ================= RENDERIZAÇÃO =================
function renderPoems() {
    const grid = document.getElementById("poems-grid");
    const modalContainer = document.getElementById("modal-container");

    poems.forEach(poema => {

        // CARD
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

        // MODAL
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
                    ${poema.texto}
                </div>

                <div class="reflexao-modal">
                    <div class="reflexao-item-modal">
                        <h4>✍️ O que eu pensei</h4>
                        <p>${poema.ideia}</p>
                    </div>
                    <div class="reflexao-item-modal">
                        <h4>💡 Ideia</h4>
                        <p>${poema.pensando}</p>
                    </div>
                </div>
            </div>
        `;

        modalContainer.appendChild(modal);
    });
}

// ================= INIT =================
window.addEventListener("load", () => {
    typeLoop();

    resizeCanvas();
    initRain();
    drawRain();

    renderPoems();
});

window.addEventListener("resize", () => {
    resizeCanvas();
    initRain();
});