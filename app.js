const addBtn = document.getElementById('add-btn');
const goalInput = document.getElementById('goal-input');
const goalList = document.getElementById('goal-list');
const fill = document.getElementById('progress-bar-fill');
const clearBtn = document.getElementById('clear-btn');

// 1. Initial State: Load from LocalStorage
let goals = JSON.parse(localStorage.getItem('goalsData')) || [];
let totalGoalsCount = parseInt(localStorage.getItem('totalCount')) || 0;
let completedGoalsCount = parseInt(localStorage.getItem('completedCount')) || 0;

// Render existing goals on page load
goals.forEach(goalText => renderGoal(goalText));
updateProgress();

function updateProgress() {
    const percent = totalGoalsCount === 0 ? 0 : (completedGoalsCount / totalGoalsCount) * 100;
    fill.style.width = percent + '%';
    
    // Save state to LocalStorage
    localStorage.setItem('goalsData', JSON.stringify(goals));
    localStorage.setItem('totalCount', totalGoalsCount);
    localStorage.setItem('completedCount', completedGoalsCount);
}

function renderGoal(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span> <button class="done-btn">Done</button>`;
    
    li.querySelector('.done-btn').addEventListener('click', (e) => {
        completedGoalsCount++;
        // Remove from UI and array
        e.target.parentElement.remove();
        goals = goals.filter(g => g !== text);
        updateProgress();
    });

    goalList.appendChild(li);
}

// Add Goal Event
addBtn.addEventListener('click', () => {
    const text = goalInput.value.trim();
    if (text !== "") {
        goals.push(text);
        totalGoalsCount++;
        renderGoal(text);
        updateProgress();
        goalInput.value = "";
    }
});

// Clear All Event
clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all goals?")) {
        goals = [];
        totalGoalsCount = 0;
        completedGoalsCount = 0;
        
        goalList.innerHTML = '';
        localStorage.clear();
        updateProgress();
    }
});