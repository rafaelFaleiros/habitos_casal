// Missões pré-definidas por dia (você pode ajustar)
window.defaultMissions = [
  'Acordar cedo',
  'Exercitar-se',
  'Meditar',
  'Estudar',
  'Ler um livro'
];
// Estrutura de armazenamento
window.stats = JSON.parse(localStorage.getItem('habitsStats') || '[]');