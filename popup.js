const TREND_COLOR = {
  ENCHENDO: 'var(--rise)',
  VAZANDO: 'var(--fall)',
  ESTOFO: 'var(--slack)',
};

function fmtTime(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function fmtMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m} min`;
  return `${h}h${String(m).padStart(2, '0')}`;
}

function drawCurve(svg, points, nowTs, portMean) {
  svg.innerHTML = '';
  const w = 320, h = 84, pad = 4;
  const heights = points.map((p) => p.height);
  const min = Math.min(...heights), max = Math.max(...heights);
  const range = Math.max(0.1, max - min);
  const t0 = points[0].timestamp, t1 = points[points.length - 1].timestamp;

  const x = (t) => pad + ((t - t0) / (t1 - t0)) * (w - pad * 2);
  const y = (v) => h - pad - ((v - min) / range) * (h - pad * 2);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.timestamp).toFixed(1)} ${y(p.height).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${x(t1).toFixed(1)} ${h} L ${x(t0).toFixed(1)} ${h} Z`;

  const ns = 'http://www.w3.org/2000/svg';
  const area = document.createElementNS(ns, 'path');
  area.setAttribute('d', areaPath);
  area.setAttribute('fill', 'rgba(44,107,71,0.14)');
  svg.appendChild(area);

  const line = document.createElementNS(ns, 'path');
  line.setAttribute('d', linePath);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#2c6b47');
  line.setAttribute('stroke-width', '1.6');
  svg.appendChild(line);

  // "now" marker
  const nowX = x(Math.min(Math.max(nowTs, t0), t1));
  const nowLine = document.createElementNS(ns, 'line');
  nowLine.setAttribute('x1', nowX); nowLine.setAttribute('x2', nowX);
  nowLine.setAttribute('y1', 0); nowLine.setAttribute('y2', h);
  nowLine.setAttribute('stroke', 'rgba(0,57,27,0.3)');
  nowLine.setAttribute('stroke-width', '1');
  nowLine.setAttribute('stroke-dasharray', '2,2');
  svg.appendChild(nowLine);
}

function render(portKey) {
  const port = PORTS_DATA[portKey];
  const now = new Date();
  const state = calculateCurrentTide(now, port);
  const curve = get24hTideCurve(now, port, 48);

  document.getElementById('height-value').textContent = state.currentHeight.toFixed(2);

  const TREND_SHORT = { ENCHENDO: 'Enchendo', VAZANDO: 'Vazando', ESTOFO: 'Estofo' };
  const trendEl = document.getElementById('trend-label');
  trendEl.textContent = `${TREND_SHORT[state.trend]} · ${Math.abs(state.rateOfChangeCmPerHour).toFixed(0)} cm/h`;
  trendEl.style.color = TREND_COLOR[state.trend] || 'var(--paper)';

  drawCurve(document.getElementById('curve-svg'), curve, now.getTime(), port.meanLevel);

  document.getElementById('cycle-fill').style.width = `${state.percentCycle}%`;
  document.getElementById('cycle-marker').style.left = `${state.percentCycle}%`;
  document.getElementById('label-prev').textContent =
    `${state.previousEvent.timeStr} · ${state.previousEvent.height.toFixed(2)}m ${state.previousEvent.type === 'high' ? '(preamar)' : '(baixamar)'}`;
  document.getElementById('label-next').textContent =
    `${state.nextEvent.timeStr} · ${state.nextEvent.height.toFixed(2)}m ${state.nextEvent.type === 'high' ? '(preamar)' : '(baixamar)'}`;

  document.getElementById('stat-rate').textContent =
    `${state.rateOfChangeCmPerHour > 0 ? '+' : ''}${state.rateOfChangeCmPerHour.toFixed(1)} cm/h`;
  document.getElementById('stat-coef').textContent =
    state.coefficientType.charAt(0) + state.coefficientType.slice(1).toLowerCase();
  document.getElementById('stat-depth').textContent = `${state.currentWaterDepth.toFixed(2)} m`;
  document.getElementById('stat-nexthigh').textContent =
    `${state.nextHighEvent.timeStr} · em ${fmtMinutes(state.minutesToNextHighEvent)}`;

  document.getElementById('footer-updated').textContent = `atualizado às ${fmtTime(now)}`;
}

function setActivePort(portKey) {
  document.querySelectorAll('.portswitch__btn').forEach((btn) => {
    const active = btn.dataset.port === portKey;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  chrome.storage && chrome.storage.local && chrome.storage.local.set({ selectedPort: portKey });
  render(portKey);
}

document.querySelectorAll('.portswitch__btn').forEach((btn) => {
  btn.addEventListener('click', () => setActivePort(btn.dataset.port));
});

function init() {
  const start = (portKey) => {
    setActivePort(portKey || 'areia_branca');
    setInterval(() => {
      const active = document.querySelector('.portswitch__btn.is-active');
      render(active ? active.dataset.port : 'areia_branca');
    }, 60000);
  };
  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['selectedPort'], (res) => start(res.selectedPort));
  } else {
    start('areia_branca');
  }
}

init();
