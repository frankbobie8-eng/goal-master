const addBtn = document.getElementById('add-btn');
const goalInput = document.getElementById('goal-input');
const categoryInput = document.getElementById('category-input');
const goalList = document.getElementById('goal-list');
const fill = document.getElementById('progress-bar-fill');
const completedCountEl = document.getElementById('completed-count');

let goals = JSON.parse(localStorage.getItem('goalsData')) || [];
let totalGoalsCount = parseInt(localStorage.getItem('totalCount')) || 0;
let completedGoalsCount = parseInt(localStorage.getItem('completedCount')) || 0;

function updateStats() {
    const percent = totalGoalsCount === 0 ? 0 : (completedGoalsCount / totalGoalsCount) * 100;
    fill.style.width = percent + '%';
    completedCountEl.textContent = completedGoalsCount;
    
    localStorage.setItem('goalsData', JSON.stringify(goals));
    localStorage.setItem('totalCount', totalGoalsCount);
    localStorage.setItem('completedCount', completedGoalsCount);
}

function renderGoal(goal) {
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

goals.forEach(renderGoal);
updateStats();

addBtn.addEventListener('click', () => {
    if (goalInput.value.trim() !== "") {
        const newGoal = { id: Date.now(), text: goalInput.value.trim(), category: categoryInput.value };
        goals.push(newGoal);
        totalGoalsCount++;
        renderGoal(newGoal);
        updateStats();
        goalInput.value = "";
    }
});

document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm("Reset all data?")) {
        goals = []; totalGoalsCount = 0; completedGoalsCount = 0;
        goalList.innerHTML = '';
        localStorage.clear();
        updateStats();
    }
});