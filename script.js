// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('main-nav-mobile');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}

// Grafo de conocimiento del hero: una sola secuencia de aparición,
// no animación continua. Respeta prefers-reduced-motion.
(function drawGraph() {
  const svg = document.getElementById('graph-svg');
  if (!svg) return;

  const nodesGroup = document.getElementById('graph-nodes');
  const edgesGroup = document.getElementById('graph-edges');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Posiciones fijas: un clúster denso (el archivo ya estructurado)
  // conectando hacia nodos dispersos (fuentes aún por integrar).
  const nodes = [
    [210, 190], [180, 160], [235, 165], [255, 205], [200, 225],
    [165, 205], [225, 235], [150, 175], [270, 180], [190, 250],
    [110, 120], [320, 90], [70, 260], [340, 260], [90, 330],
    [330, 340], [250, 60], [50, 190],
  ];

  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[1,7],[2,8],[3,6],[4,5],
    [4,9],[5,6],[1,2],[2,3],[6,9],[7,10],[8,11],[4,12],
    [3,13],[9,14],[6,15],[2,16],[7,17],
  ];

  edges.forEach(([a, b]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', nodes[a][0]);
    line.setAttribute('y1', nodes[a][1]);
    line.setAttribute('x2', nodes[b][0]);
    line.setAttribute('y2', nodes[b][1]);
    line.setAttribute('stroke-opacity', '0.5');
    edgesGroup.appendChild(line);
  });

  nodes.forEach(([x, y], i) => {
    const isCore = i < 10;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', isCore ? 6 : 4);
    circle.setAttribute('fill', isCore ? '#A9782F' : '#1F4E4A');
    if (!reduceMotion) {
      circle.style.opacity = '0';
      circle.style.transition = `opacity .5s ease ${i * 0.05}s`;
    }
    nodesGroup.appendChild(circle);
  });

  if (!reduceMotion) {
    requestAnimationFrame(() => {
      nodesGroup.querySelectorAll('circle').forEach((c) => (c.style.opacity = '1'));
    });
  }
})();
