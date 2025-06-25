let currentUser = 'julia';
let calendar, chart;

// Salva no localStorage
function saveStats() {
  localStorage.setItem('habitsStats', JSON.stringify(window.stats));
}

// Retorna ou cria entrada do dia
function getEntry(date) {
  let entry = window.stats.find(e => e.date === date);
  if (!entry) {
    entry = { date, missions: {} };
    window.defaultMissions.forEach(m => entry.missions[m] = { julia: 0, rafael: 0 });
    window.stats.push(entry);
  }
  return entry;
}

// Inicia o calendário
function initCalendar() {
  if (calendar) calendar.destroy();
  calendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'dayGridMonth',
      height: 'auto',
      dateClick: onDateClick,
      events: window.stats.map(e => ({
        title: window.defaultMissions.reduce((sum, m) => sum + (e.missions[m][currentUser] || 0), 0).toString(),
        date: e.date
      }))
    }
  );
  calendar.render();
}

// Ao clicar no dia
function onDateClick(info) {
  const date = info.dateStr;
  const entry = getEntry(date);
  renderModal(date, entry.missions);
}

// Renderiza modal com inputs numéricos
function renderModal(date, missions) {
  document.getElementById('modal-date').textContent = date;
  const container = document.getElementById('missions-list');
  container.innerHTML = '';
  Object.keys(missions).forEach(mName => {
    const div = document.createElement('div');
    div.className = 'mission-item';

    const label = document.createElement('label');
    label.textContent = mName;
    label.style.flex = '1';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.value = missions[mName][currentUser] || 0;
    input.style.width = '60px';
    input.onchange = () => {
      const val = parseInt(input.value, 10) || 0;
      missions[mName][currentUser] = val;
    };

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
  });
  document.getElementById('mission-modal').classList.remove('hidden');
}

// Inicia gráfico
function initChart() {
  const ctx = document.getElementById('total-chart').getContext('2d');
  const labels = window.stats.map(e => e.date);
  const dataPoints = window.stats.map(e =>
    window.defaultMissions.reduce((sum, m) => sum + (e.missions[m][currentUser] || 0), 0)
  );
  const total = dataPoints.reduce((a, b) => a + b, 0);

  document.getElementById('total-display').textContent =
    `Total Geral de ${currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}: ${total}`;

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: currentUser, data: dataPoints }] },
    options: {
      responsive: true,
      scales: { x: { ticks: { maxRotation: 45 } } }
    }
  });
}

// Alterna usuário e atualiza
function switchUser(user) {
  currentUser = user;
  document.getElementById('user-title').textContent = user;
  document.querySelectorAll('.user-buttons button')
    .forEach(btn => btn.classList.toggle('active', btn.id === 'btn-' + user));
  initCalendar();
  initChart();
}

// Setup após DOM
window.addEventListener('DOMContentLoaded', () => {
  if (!window.stats) window.stats = [];

  document.getElementById('save-missions').onclick = () => {
    saveStats();
    initCalendar();
    initChart();
    document.getElementById('mission-modal').classList.add('hidden');
  };
  document.getElementById('close-modal').onclick = () => {
    document.getElementById('mission-modal').classList.add('hidden');
  };
  document.getElementById('btn-julia').onclick = () => switchUser('julia');
  document.getElementById('btn-rafael').onclick = () => switchUser('rafael');

  initCalendar();
  initChart();
});