// Participantes e receitas para o quadrado
const squareParticipants = ['Tati', 'Nica', 'Carol', 'JC'];
const squareRecipes = {
    'Tati': [
        '🍝 Macarrão à Carbonara',
        '🥗 Salada Caesar',
        '🍕 Pizza Margherita',
        '🥘 Risoto de Funghi'
    ],
    'Nica': [
        '🍖 Strogonoff de Frango',
        '🥘 Feijoada',
        '🍗 Frango Assado',
        '🥩 Bife à Parmegiana'
    ],
    'Carol': [
        '🍰 Bolo de Chocolate',
        '🍪 Cookies de Chocolate',
        '🧁 Cupcakes de Baunilha',
        '🍮 Pudim de Leite Condensado'
    ],
    'JC': [
        '🍔 Hambúrguer Artesanal',
        '🌮 Tacos Mexicanos',
        '🍖 Churrasco',
        '🥪 Sanduíche Gourmet'
    ]
};

const square = document.getElementById('square');
const spinBtn = document.getElementById('spinBtn');
const result = document.getElementById('result');
const winnerText = document.getElementById('winnerText');
const recipeCard = document.getElementById('recipeCard');

let isSpinning = false;
let currentRotation = 0;

function getRandomRecipeSquare(participant) {
    const participantRecipes = squareRecipes[participant];
    const randomIndex = Math.floor(Math.random() * participantRecipes.length);
    return participantRecipes[randomIndex];
}

function getSquareWinner(rotation) {
    // Normalizar a rotação para 0-360 graus
    const normalized = ((rotation % 360) + 360) % 360;
    // Cada lado tem 90 graus, começando do topo (0 = Tati, 90 = Nica, 180 = Carol, 270 = JC)
    const index = Math.round(normalized / 90) % 4;
    return squareParticipants[index];
}

function spinSquare() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    result.classList.remove('show');

    // Sortear um lado (0, 1, 2, 3)
    const side = Math.floor(Math.random() * 4);
    // Girar múltiplos de 360 para animação + ângulo do lado sorteado
    const spins = 2 + Math.floor(Math.random() * 2); // 2 ou 3 voltas
    const finalAngle = side * 90;
    const totalRotation = spins * 360 + finalAngle;
    currentRotation += totalRotation;
    square.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const winner = getSquareWinner(currentRotation);
        const recipe = getRandomRecipeSquare(winner);
        winnerText.textContent = `🎉 ${winner} é o cozinheiro da vez! 🎉`;
        result.classList.add('show');
        result.classList.add('bounce');
        recipeCard.innerHTML = `<p class="recipe-text">${recipe}</p>`;
        recipeCard.classList.add('bounce');
        isSpinning = false;
        spinBtn.disabled = false;
        setTimeout(() => {
            result.classList.remove('bounce');
            recipeCard.classList.remove('bounce');
        }, 1000);
    }, 2000);
}

spinBtn.onclick = spinSquare;

// Gerar nomes nas fatias da roleta
function renderWheelNames() {
    const wheelSections = document.querySelectorAll('.wheel-section');
    participants.forEach((name, i) => {
        // Remover qualquer texto anterior
        wheelSections[i].innerHTML = '';
        // Criar o span do nome
        const span = document.createElement('span');
        span.textContent = name;
        // Centralizar radialmente e rotacionar para acompanhar a fatia
        // Cada fatia tem 90 graus, então rotacionamos o texto -45deg para centralizar
        span.style.position = 'absolute';
        span.style.left = '50%';
        span.style.top = '50%';
        span.style.transform = `rotate(${-90 * i - 45}deg) translateY(-90px)`;
        span.style.transformOrigin = 'center center';
        span.style.fontSize = '1.05rem';
        span.style.fontWeight = '600';
        span.style.color = 'white';
        span.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
        span.style.width = '90px';
        span.style.textAlign = 'center';
        span.style.pointerEvents = 'none';
        span.style.whiteSpace = 'normal';
        span.style.wordBreak = 'break-word';
        wheelSections[i].appendChild(span);
    });
}

// Chamar ao carregar a página
renderWheelNames();

// Event listeners
spinBtn.addEventListener('click', spinWheel);

// Adicionar efeito de som ao botão (opcional)
spinBtn.addEventListener('mouseenter', () => {
    if (!isSpinning) {
        spinBtn.style.transform = 'translateY(-2px) scale(1.05)';
    }
});

spinBtn.addEventListener('mouseleave', () => {
    if (!isSpinning) {
        spinBtn.style.transform = 'translateY(0) scale(1)';
    }
});

// Efeito de entrada da página
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

// Adicionar efeito de confete quando alguém ganha (opcional)
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            document.body.removeChild(confetti);
        };
    }
}

// Modificar a função spinWheel para incluir confete
const originalSpinWheel = spinWheel;
spinWheel = function() {
    originalSpinWheel();
    
    // Adicionar confete após mostrar o resultado
    setTimeout(() => {
        if (!isSpinning) {
            createConfetti();
        }
    }, 4500);
}; 