let diceCount = 1;
let isRolling = false;

// Inizializza
document.addEventListener('DOMContentLoaded', () => {
    updateDiceDisplay();
    document.querySelector('[data-count="1"]').classList.add('active');
});

// Gestione selezione numero dadi
document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', () => {
        if (isRolling) return;
        
        document.querySelectorAll('.controls button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        diceCount = parseInt(button.dataset.count);
        updateDiceDisplay();
    });
});

// Gestione lancio
document.getElementById('roll-btn').addEventListener('click', () => {
    if (isRolling) return;
    rollDice();
});

function updateDiceDisplay() {
    const container = document.getElementById('dice-container');
    container.innerHTML = '';
    
    for (let i = 0; i < diceCount; i++) {
        const die = document.createElement('div');
        die.className = 'die';
        die.textContent = '?';
        container.appendChild(die);
    }
}

function rollDice() {
    if (isRolling) return;
    isRolling = true;
    
    const dice = document.querySelectorAll('.die');
    const rollBtn = document.getElementById('roll-btn');
    
    rollBtn.disabled = true;
    rollBtn.textContent = ' Lancio in corso...';
    
    // Aggiungi animazione a tutti i dadi
    dice.forEach(die => {
        die.classList.add('rolling');
    });
    
    // Dopo l'animazione, mostra i risultati
    setTimeout(() => {
        dice.forEach(die => {
            die.classList.remove('rolling');
            const randomValue = Math.floor(Math.random() * 6) + 1;
            die.textContent = randomValue;
        });
        
        rollBtn.disabled = false;
        rollBtn.textContent = 'Lancia!';
        isRolling = false;
    }, 500);
}