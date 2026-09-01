document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('skillset_graph');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Ruby', 'RubyOnRails', 'Elixir', 'Javascript', 'SASS', 'Haml', 'Elm', 'Unix', 'PostgreSQL',
        'MySQL', 'GraphQL', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Project Management', 'HTML',
        'CSS', 'Mentoring', 'Graphic design', 'Python', 'Software architecture', 'API design',
        'Clojure', 'CicleCI', 'SCRUM', 'Kanban'
      ],
      datasets: [{
        label: 'Level of expertise and knowledge',
        data: [10, 10, 8, 7, 3, 4, 7, 10, 8, 5, 4, 9, 7, 7, 8, 6, 8, 7, 9, 5, 5, 8, 9, 3, 5, 8, 6],
        borderWidth: 1,
        backgroundColor: ['#FF9F29', '#1A4D2E']
      }]
    },
    options: {
      maintainAspectRatio: false,
      aspectRatio: "1|2",
      animation: true,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      },
    }
  });
});
