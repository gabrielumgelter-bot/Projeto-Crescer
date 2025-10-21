document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.getElementById("yearDash").textContent = year;

  const ctx1 = document.getElementById("donationsChart");
  const ctx2 = document.getElementById("volunteersChart");
  const ctx3 = document.getElementById("engagementChart");

  // Doações mensais
  new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      datasets: [{
        label: 'Doações (R$)',
        data: [1200, 1800, 2600, 2400, 3200, 4000, 4200, 4800, 5200, 5600, 6100, 6500],
        borderWidth: 2,
        borderColor: '#0a73ff',
        fill: true,
        backgroundColor: 'rgba(10,115,255,0.1)',
        tension: 0.3
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Voluntários ativos
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Educação', 'Saúde', 'Meio Ambiente', 'Infraestrutura'],
      datasets: [{
        label: 'Voluntários',
        data: [30, 15, 25, 10],
        backgroundColor: ['#0a73ff','#1ec997','#ff9f40','#ff4d4d']
      }]
    },
    options: { responsive: true }
  });

  // Engajamento por projeto
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Projeto A','Projeto B','Projeto C','Projeto D'],
      datasets: [{
        label: 'Participações',
        data: [45, 60, 25, 35],
        backgroundColor: '#1ec997'
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
});
