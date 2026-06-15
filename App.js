const addBtn = document.getElementById('add-btn');
const goalInput = document.getElementById('goal-input');
const goalList = document.getElementById('goal-list');
const fill = document.getElementById('progress-bar-fill');

let totalGoals = 0;
let completedGoals = 0;

function updateProgress() {
    const percent = totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;
    fill.style.width = percent + '%';
}

addBtn.addEventListener('click', () => {
    const goalText = goalInput.value;
    if (goalText.trim() !== "") {
        totalGoals++;
        
        const li = document.createElement('li');
        li.innerHTML = `<span>${goalText}</span> <button class="done-btn">Done</button>`;
        
        li.querySelector('.done-btn').addEventListener('click', (e) => {
            completedGoals++;
            e.target.parentElement.remove();
            updateProgress();
        });

        goalList.appendChild(li);
        goalInput.value = "";
        updateProgress();
    } else {
        alert("Please enter a goal!");
    }
});