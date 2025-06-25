// Definição das tarefas e seus pontos
const tasksConfig = [
  { key: 'estudou', label: 'Estudou', points: 3 },
  { key: 'cardio', label: 'Cardio', points: 10 },
  { key: 'oracao', label: 'Oração', points: 20 },
  { key: 'saudavel', label: 'Comeu saudável', points: 5 },
  { key: 'dieta', label: 'Seguiu a dieta', points: 10 },
  { key: 'treino', label: 'Treinou forte', points: 10 },
];

const tasksList = document.getElementById('tasks');
const totalPointsEl = document.getElementById('totalPoints');
const saveBtn = document.getElementById('saveBtn');

// Carrega estado do localStorage
function loadState() {
  let total = 0;
  tasksList.innerHTML = '';
  tasksConfig.forEach(task => {
    const done = localStorage.getItem(task.key) === 'true';
    if (done) total += task.points;

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;
    checkbox.id = task.key;

    const label = document.createElement('label');
    label.htmlFor = task.key;
    label.textContent = `${task.label} (+${task.points})`;

    li.appendChild(checkbox);
    li.appendChild(label);
    tasksList.appendChild(li);
  });
  totalPointsEl.textContent = total;
}

// Salva estado e recalcula pontos
function saveState() {
  let total = 0;
  tasksConfig.forEach(task => {
    const done = document.getElementById(task.key).checked;
    localStorage.setItem(task.key, done);
    if (done) total += task.points;
  });
  totalPointsEl.textContent = total;
}

// Eventos
saveBtn.addEventListener('click', saveState);
window.addEventListener('load', loadState);
