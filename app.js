// Shared Data
let goals = JSON.parse(localStorage.getItem('goalsData')) || [];
let totalGoalsCount = parseInt(localStorage.getItem('totalCount')) || 0;
let completedGoalsCount = parseInt(localStorage.getItem('completedCount')) || 0;

// Update function (Safe for both pages)
function updateStats() {
    const fill = document.getElementById('progress-bar-fill');
    const completedCountEl = document.getElementById('completed-count');
    
    if (fill) {
        const percent = totalGoalsCount === 0 ? 0 : (completedGoalsCount / totalGoalsCount) * 100;
        fill.style.width = percent + '%';
    }
    if (completedCountEl) {
        completedCountEl.textContent = completedGoalsCount;
    }
    
    localStorage.setItem('goalsData', JSON.stringify(goals));
    localStorage.setItem('totalCount', totalGoalsCount);
    localStorage.setItem('completedCount', completedGoalsCount);
}

// Logic for Manage Goals page
const goalList = document.getElementById('goal-list');
if (goalList) {
    goals.forEach(renderGoal);
    
    document.getElementById('add-btn').addEventListener('click', () => {
        const input = document.getElementById('goal-input');
        const cat = document.getElementById('category-input');
        if (input.value.trim() !== "") {
            const newGoal = { id: Date.now(), text: input.value.trim(), category: cat.value };
            goals.push(newGoal);
            totalGoalsCount++;
            renderGoal(newGoal);
            updateStats();
            input.value = "";
        }
    });
}

function renderGoal(goal) {
    if (!goalList) return;
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>[${goal.category}]</strong> ${goal.text}</div> 
                    <button class="done-btn">Done</button>`;
    li.querySelector('.done-btn').addEventListener('click', () => {
        completedGoalsCount++;
        goals = goals.filter(g => g.id !== goal.id);
        li.remove();
        updateStats();
    });
    goalList.appendChild(li);
}

// Clear all logic
const clearBtn = document.getElementById('clear-btn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        if (confirm("Reset all data?")) {
            goals = []; totalGoalsCount = 0; completedGoalsCount = 0;
            goalList.innerHTML = '';
            localStorage.clear();
            updateStats();
        }
    });
}

// Run on load
updateStats();