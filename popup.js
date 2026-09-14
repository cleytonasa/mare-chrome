// Maré Brasil - DHN Standalone Browser Extension Script
const PORTS_DATA = [{"id":"p01_barra_norte","name":"01 - Barra Norte - Arco Ramoso (AP/PA)","lat":0.5,"lon":-49.95,"avgHeight":2.1,"range":3.4,"phaseOffset":3.2},{"id":"p02_curua","name":"02 - Igarapé Grande do Curuá (PA)","lat":0.18,"lon":-50.8,"avgHeight":2.05,"range":3.3,"phaseOffset":3.15},{"id":"p03_santana","name":"03 - Porto de Santana (AP)","lat":-0.05,"lon":-51.18,"avgHeight":1.85,"range":2.8,"phaseOffset":3.05},{"id":"p04_guaras","name":"04 - Ilha dos Guarás (PA)","lat":-0.73,"lon":-48.45,"avgHeight":2.15,"range":3.6,"phaseOffset":3.12},{"id":"p05_salinopolis","name":"05 - Fundeadouro de Salinópolis (PA)","lat":-0.6,"lon":-47.35,"avgHeight":2.3,"range":3.9,"phaseOffset":3},{"id":"p06_mosqueiro","name":"06 - Ilha do Mosqueiro (PA)","lat":-1.15,"lon":-48.45,"avgHeight":2.1,"range":3.5,"phaseOffset":3.18},{"id":"belem","name":"07 - Porto de Belém (PA)","lat":-1.45,"lon":-48.5,"avgHeight":2.1,"range":3.4,"phaseOffset":3.1},{"id":"p08_vila_conde","name":"08 - Porto de Vila do Conde (PA)","lat":-1.53,"lon":-48.75,"avgHeight":2.05,"range":3.3,"phaseOffset":3.22},{"id":"p09_breves","name":"09 - Atracadouro de Breves (PA)","lat":-1.68,"lon":-50.48,"avgHeight":1.7,"range":2.6,"phaseOffset":3.3},{"id":"p10_sao_luis","name":"10 - São Luís (MA)","lat":-2.53,"lon":-44.3,"avgHeight":3.1,"range":5.4,"phaseOffset":2.8},{"id":"p11_ponta_madeira","name":"11 - Terminal da Ponta da Madeira (MA)","lat":-2.57,"lon":-44.37,"avgHeight":3.2,"range":5.6,"phaseOffset":2.78},{"id":"p12_itaqui","name":"12 - Porto de Itaqui (MA)","lat":-2.58,"lon":-44.37,"avgHeight":3.15,"range":5.5,"phaseOffset":2.79},{"id":"p13_alumar","name":"13 - Terminal da Alumar (MA)","lat":-2.68,"lon":-44.35,"avgHeight":3.25,"range":5.7,"phaseOffset":2.82},{"id":"p14_tutoia","name":"14 - Porto de Tutóia (MA)","lat":-2.76,"lon":-42.27,"avgHeight":1.95,"range":3.2,"phaseOffset":0.85},{"id":"p15_luis_correia","name":"15 - Porto de Luís Correia (PI)","lat":-2.88,"lon":-41.67,"avgHeight":1.85,"range":3,"phaseOffset":0.5},{"id":"p16_pecem","name":"16 - Terminal Portuário do Pecém (CE)","lat":-3.55,"lon":-38.8,"avgHeight":1.7,"range":2.8,"phaseOffset":0.12},{"id":"fortaleza","name":"17 - Porto de Mucuripe (Fortaleza - CE)","lat":-3.72,"lon":-38.48,"avgHeight":1.75,"range":2.9,"phaseOffset":0.1},{"id":"p18_noronha","name":"18 - Fernando de Noronha (PE)","lat":-3.85,"lon":-32.42,"avgHeight":1.45,"range":2.3,"phaseOffset":0.05},{"id":"areia_branca","name":"19 - Porto de Areia Branca (Termisa - RN)","lat":-4.82,"lon":-37.04,"avgHeight":1.65,"range":2.8,"phaseOffset":0.15},{"id":"p20_macau","name":"20 - Porto de Macau (RN)","lat":-5.11,"lon":-36.63,"avgHeight":1.6,"range":2.7,"phaseOffset":0.2},{"id":"p21_guamare","name":"21 - Porto de Guamaré (RN)","lat":-5.1,"lon":-36.32,"avgHeight":1.58,"range":2.6,"phaseOffset":0.22},{"id":"p22_natal","name":"22 - Porto de Natal (COM3DN - RN)","lat":-5.78,"lon":-35.2,"avgHeight":1.4,"range":2.3,"phaseOffset":0.35},{"id":"p23_cabedelo","name":"23 - Porto de Cabedelo (PB)","lat":-6.97,"lon":-34.83,"avgHeight":1.42,"range":2.3,"phaseOffset":0.4},{"id":"recife","name":"24 - Porto do Recife (PE)","lat":-8.05,"lon":-34.87,"avgHeight":1.45,"range":2.3,"phaseOffset":0.45},{"id":"p25_suape","name":"25 - Porto de Suape (PE)","lat":-8.36,"lon":-34.96,"avgHeight":1.48,"range":2.4,"phaseOffset":0.5},{"id":"p26_maceio","name":"26 - Porto de Maceió (AL)","lat":-9.67,"lon":-35.73,"avgHeight":1.35,"range":2.2,"phaseOffset":0.65},{"id":"p27_inacio_barbosa","name":"27 - Terminal Inácio Barbosa (SE)","lat":-10.82,"lon":-37.05,"avgHeight":1.3,"range":2.1,"phaseOffset":0.75},{"id":"p28_sergipe","name":"28 - Capitania dos Portos de Sergipe (SE)","lat":-10.92,"lon":-37.07,"avgHeight":1.25,"range":2,"phaseOffset":0.78},{"id":"p29_madre_deus","name":"29 - Porto de Madre de Deus (BA)","lat":-12.74,"lon":-38.62,"avgHeight":1.55,"range":2.5,"phaseOffset":0.88},{"id":"p30_aratu","name":"30 - Porto de Aratu - Base Naval (BA)","lat":-12.78,"lon":-38.48,"avgHeight":1.52,"range":2.4,"phaseOffset":0.86},{"id":"salvador","name":"31 - Porto de Salvador (BA)","lat":-12.97,"lon":-38.51,"avgHeight":1.5,"range":2.4,"phaseOffset":0.85},{"id":"p32_ilheus","name":"32 - Porto de Ilhéus - Malhado (BA)","lat":-14.78,"lon":-39.03,"avgHeight":1.2,"range":1.9,"phaseOffset":0.95},{"id":"p33_barra_riacho","name":"33 - Terminal de Barra do Riacho (ES)","lat":-19.83,"lon":-40.06,"avgHeight":0.95,"range":1.4,"phaseOffset":1.15},{"id":"p34_tubarao","name":"34 - Porto de Tubarão (ES)","lat":-20.28,"lon":-40.24,"avgHeight":0.9,"range":1.35,"phaseOffset":1.18},{"id":"p35_vitoria","name":"35 - Porto de Vitória (ES)","lat":-20.32,"lon":-40.33,"avgHeight":0.9,"range":1.35,"phaseOffset":1.2},{"id":"p36_trindade","name":"36 - Ilha da Trindade (ES)","lat":-20.51,"lon":-29.32,"avgHeight":0.75,"range":1.1,"phaseOffset":0.9},{"id":"p37_ponta_ubu","name":"37 - Terminal da Ponta do Ubu (ES)","lat":-20.78,"lon":-40.58,"avgHeight":0.88,"range":1.3,"phaseOffset":1.22},{"id":"p38_acu","name":"38 - Porto do Açu (RJ)","lat":-21.82,"lon":-40.99,"avgHeight":0.85,"range":1.25,"phaseOffset":1.24},{"id":"p39_imbetiba","name":"39 - Terminal de Imbetiba (Macaé - RJ)","lat":-22.38,"lon":-41.77,"avgHeight":0.82,"range":1.2,"phaseOffset":1.25},{"id":"rio_de_janeiro","name":"40 - Rio de Janeiro (Ilha Fiscal - RJ)","lat":-22.9,"lon":-43.16,"avgHeight":0.85,"range":1.2,"phaseOffset":1.25},{"id":"p41_itaguai","name":"41 - Porto de Itaguaí (Sepetiba - RJ)","lat":-22.93,"lon":-43.85,"avgHeight":0.95,"range":1.4,"phaseOffset":1.3},{"id":"p42_forno","name":"42 - Porto do Forno (Arraial do Cabo - RJ)","lat":-22.97,"lon":-42.02,"avgHeight":0.8,"range":1.15,"phaseOffset":1.23},{"id":"p43_ilha_guaiba","name":"43 - Terminal da Ilha Guaíba (RJ)","lat":-23,"lon":-44.03,"avgHeight":0.92,"range":1.35,"phaseOffset":1.32},{"id":"p44_angra_reis","name":"44 - Porto de Angra dos Reis (RJ)","lat":-23.01,"lon":-44.31,"avgHeight":0.9,"range":1.3,"phaseOffset":1.35},{"id":"p45_sao_sebastiao","name":"45 - Porto de São Sebastião (SP)","lat":-23.81,"lon":-45.4,"avgHeight":0.85,"range":1.25,"phaseOffset":1.4},{"id":"santos","name":"46 - Porto de Santos (SP)","lat":-23.96,"lon":-46.33,"avgHeight":0.95,"range":1.4,"phaseOffset":1.45},{"id":"p47_ponta_felix","name":"47 - Terminal Portuário da Ponta do Félix (PR)","lat":-25.43,"lon":-48.71,"avgHeight":1.15,"range":1.8,"phaseOffset":1.68},{"id":"paranagua","name":"48 - Porto de Paranaguá (Cais Oeste - PR)","lat":-25.5,"lon":-48.5,"avgHeight":1.1,"range":1.7,"phaseOffset":1.65},{"id":"p49_paranagua_sueste","name":"49 - Barra de Paranaguá (Canal Sueste - PR)","lat":-25.58,"lon":-48.35,"avgHeight":1.05,"range":1.6,"phaseOffset":1.62},{"id":"p50_paranagua_galheta","name":"50 - Barra de Paranaguá (Canal da Galheta - PR)","lat":-25.6,"lon":-48.32,"avgHeight":1.05,"range":1.6,"phaseOffset":1.6},{"id":"p51_sao_francisco","name":"51 - Porto de São Francisco do Sul (SC)","lat":-26.24,"lon":-48.64,"avgHeight":1,"range":1.5,"phaseOffset":1.7},{"id":"p52_itajai","name":"52 - Porto de Itajaí (SC)","lat":-26.91,"lon":-48.65,"avgHeight":0.75,"range":1.1,"phaseOffset":1.75},{"id":"p53_florianopolis","name":"53 - Porto de Florianópolis (SC)","lat":-27.6,"lon":-48.55,"avgHeight":0.7,"range":1,"phaseOffset":1.8},{"id":"p54_imbituba","name":"54 - Porto de Imbituba (SC)","lat":-28.23,"lon":-48.67,"avgHeight":0.65,"range":0.95,"phaseOffset":1.85},{"id":"p55_rio_grande","name":"55 - Porto do Rio Grande (RS)","lat":-32.05,"lon":-52.1,"avgHeight":0.5,"range":0.7,"phaseOffset":1.95},{"id":"p56_com_ferraz","name":"56 - Estação Antártica Com. Ferraz (Antártica)","lat":-62.08,"lon":-58.4,"avgHeight":1.2,"range":1.9,"phaseOffset":2.4}];

let currentPort = PORTS_DATA.find(p => p.id === "areia_branca") || PORTS_DATA[0];
let selectedDate = new Date();

function getMarineWind(port) {
  const isNordeste = port.lat >= -10 && port.lat <= 0;
  const isSudeste = port.lat < -10 && port.lat >= -24;
  let baseKnots = 11;
  let dirDeg = 106;
  let dirCardinal = "ESE";
  if (isNordeste) {
    baseKnots = 13 + Math.round(Math.sin(port.lat) * 3);
    dirDeg = 110;
    dirCardinal = "ESE";
  } else if (isSudeste) {
    baseKnots = 9 + Math.round(Math.cos(port.lon) * 4);
    dirDeg = 75;
    dirCardinal = "ENE";
  } else {
    baseKnots = 14;
    dirDeg = 190;
    dirCardinal = "SSW";
  }
  return { knots: baseKnots, kmh: Math.round(baseKnots * 1.852), deg: dirDeg, cardinal: dirCardinal };
}

function getDailyExtremesSchedule(port, dateObj) {
  const baseYear = dateObj.getFullYear();
  const baseMonth = dateObj.getMonth();
  const baseDateNum = dateObj.getDate();
  const refDate = new Date(2026, 8, 12, 0, 0, 0);
  const targetDate = new Date(baseYear, baseMonth, baseDateNum, 0, 0, 0);
  const dayDiff = Math.round((targetDate.getTime() - refDate.getTime()) / (1000 * 3600 * 24));
  const dailyDelay = (dayDiff * 0.84) % 24;
  const portOffset = (port.phaseOffset || 0) * 1.8;
  const portScale = (port.range || 2.8) / 2.8;
  const portMean = port.avgHeight || 1.65;

  const baseSchedule = [
    { type: 'preamar', name: 'Preamar', h: 5.0167, height: portMean + (1.93 * portScale) },
    { type: 'baixamar', name: 'Baixa-mar', h: 11.25, height: Math.max(0.05, portMean - (1.51 * portScale)) },
    { type: 'preamar', name: 'Preamar', h: 17.35, height: portMean + (1.78 * portScale) },
    { type: 'baixamar', name: 'Baixa-mar', h: 23.5833, height: Math.max(0.08, portMean - (1.41 * portScale)) }
  ];

  return baseSchedule.map(item => {
    let adjustedHour = (item.h + dailyDelay + portOffset) % 24;
    if (adjustedHour < 0) adjustedHour += 24;
    return {
      type: item.type,
      name: item.name,
      hourDecimal: adjustedHour,
      height: Math.round(item.height * 100) / 100
    };
  }).sort((a, b) => a.hourDecimal - b.hourDecimal);
}

function calculateTideHeight(port, dateObj, targetHour) {
  const dayOffset = Math.floor(targetHour / 24);
  const normalizedHour = ((targetHour % 24) + 24) % 24;
  const d = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + dayOffset);
  const extremes = getDailyExtremesSchedule(port, d);
  const extended = [];
  const prevD = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  const nextD = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

  getDailyExtremesSchedule(port, prevD).forEach(e => extended.push({ ...e, h: e.hourDecimal - 24 }));
  extremes.forEach(e => extended.push({ ...e, h: e.hourDecimal }));
  getDailyExtremesSchedule(port, nextD).forEach(e => extended.push({ ...e, h: e.hourDecimal + 24 }));
  extended.sort((a, b) => a.h - b.h);

  let p1 = extended[0];
  let p2 = extended[1];
  for (let i = 0; i < extended.length - 1; i++) {
    if (normalizedHour >= extended[i].h && normalizedHour <= extended[i + 1].h) {
      p1 = extended[i];
      p2 = extended[i + 1];
      break;
    }
  }

  const interval = p2.h - p1.h;
  if (interval <= 0) return p1.height;
  const fraction = (normalizedHour - p1.h) / interval;
  const mean = (p1.height + p2.height) / 2;
  const amp = (p1.height - p2.height) / 2;
  const height = mean + amp * Math.cos(Math.PI * fraction);
  return Math.max(0.05, Math.round(height * 100) / 100);
}

function findDailyExtremes(port, dateObj) {
  const schedule = getDailyExtremesSchedule(port, dateObj);
  return schedule.map(e => {
    const totalMinutes = Math.round(e.hourDecimal * 60);
    const hours = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    return {
      type: e.type,
      name: e.name,
      hourDecimal: e.hourDecimal,
      height: e.height,
      timeStr: String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0')
    };
  });
}

function renderFuture24hChart() {
  const svg = document.getElementById('tideSvg');
  if (!svg) return;
  const now = new Date();
  const currentHourDecimal = now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);
  const points = [];
  const totalHours = 24;
  const numSamples = 120;
  let maxHeight = 4.0;
  let minHeight = 0.0;

  for (let i = 0; i <= numSamples; i++) {
    const hOffset = (i / numSamples) * totalHours;
    const targetHour = currentHourDecimal + hOffset;
    const val = calculateTideHeight(currentPort, selectedDate, targetHour);
    points.push({ hOffset, val, targetHour });
  }

  const svgW = 600;
  const svgH = 200;
  const padTop = 30;
  const padBottom = 25;
  const padLeft = 35;
  const padRight = 15;
  const graphW = svgW - padLeft - padRight;
  const graphH = svgH - padTop - padBottom;
  const getX = (hOffset) => padLeft + (hOffset / totalHours) * graphW;
  const getY = (val) => padTop + graphH - ((val - minHeight) / (maxHeight - minHeight)) * graphH;

  let dPath = 'M ' + getX(points[0].hOffset) + ' ' + getY(points[0].val);
  for (let i = 1; i < points.length; i++) {
    dPath += ' L ' + getX(points[i].hOffset) + ' ' + getY(points[i].val);
  }

  const dArea = dPath + ' L ' + getX(totalHours) + ' ' + (padTop + graphH) + ' L ' + getX(0) + ' ' + (padTop + graphH) + ' Z';
  let svgHtml = '<defs><linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/><stop offset="100%" stop-color="#0284c7" stop-opacity="0.0"/></linearGradient></defs>';

  [0.0, 1.0, 2.0, 3.0, 4.0].forEach(ym => {
    const yPos = getY(ym);
    svgHtml += '<line x1="' + padLeft + '" y1="' + yPos + '" x2="' + (svgW - padRight) + '" y2="' + yPos + '" stroke="#334155" stroke-dasharray="2 4" stroke-width="0.8"/>' +
               '<text x="' + (padLeft - 6) + '" y="' + (yPos + 3) + '" fill="#64748b" font-size="9" font-family="monospace" text-anchor="end">' + ym.toFixed(1) + 'm</text>';
  });

  svgHtml += '<path d="' + dArea + '" fill="url(#waveGrad)"/>';
  svgHtml += '<path d="' + dPath + '" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>';

  const hoursToMidnight = 24 - currentHourDecimal;
  if (hoursToMidnight > 0 && hoursToMidnight < 24) {
    const midX = getX(hoursToMidnight);
    svgHtml += '<line x1="' + midX + '" y1="' + (padTop - 8) + '" x2="' + midX + '" y2="' + (padTop + graphH) + '" stroke="#06b6d4" stroke-dasharray="3 3" stroke-width="1.5"/>' +
               '<text x="' + midX + '" y="' + (padTop - 12) + '" fill="#22d3ee" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">00h Virada de Dia</text>';
  }

  for (let i = 2; i < points.length - 2; i++) {
    const pPrev = points[i - 1].val;
    const pCurr = points[i].val;
    const pNext = points[i + 1].val;
    if (pCurr > pPrev && pCurr >= pNext && pCurr > 0.5) {
      const px = getX(points[i].hOffset);
      const py = getY(pCurr);
      const peakTotalMinutes = Math.round(points[i].targetHour * 60);
      const peakH = Math.floor(peakTotalMinutes / 60) % 24;
      const peakM = peakTotalMinutes % 60;
      const peakTimeStr = String(peakH).padStart(2, '0') + ':' + String(peakM).padStart(2, '0');
      svgHtml += '<line x1="' + px + '" y1="' + py + '" x2="' + px + '" y2="' + (padTop + graphH) + '" stroke="#38bdf8" stroke-dasharray="2 3" stroke-width="1"/>' +
                 '<circle cx="' + px + '" cy="' + py + '" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>' +
                 '<text x="' + px + '" y="' + (py - 8) + '" fill="#38bdf8" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">' + peakTimeStr + ' (' + pCurr.toFixed(2) + 'm)</text>';
    }
  }

  const startX = getX(0);
  const startY = getY(points[0].val);
  const nowH = String(now.getHours()).padStart(2, '0');
  const nowM = String(now.getMinutes()).padStart(2, '0');

  svgHtml += '<line x1="' + startX + '" y1="' + (padTop - 8) + '" x2="' + startX + '" y2="' + (padTop + graphH) + '" stroke="#f87171" stroke-dasharray="2 2" stroke-width="1.8"/>' +
             '<circle cx="' + startX + '" cy="' + startY + '" r="5.5" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>' +
             '<text x="' + (startX + 4) + '" y="' + (padTop - 12) + '" fill="#f87171" font-size="9" font-family="monospace" font-weight="bold">AGORA (' + nowH + ':' + nowM + ')</text>';

  svg.innerHTML = svgHtml;
}

function updateUI() {
  const now = new Date();
  const curH = now.getHours() + (now.getMinutes() / 60) + (now.getSeconds() / 3600);
  const h = calculateTideHeight(currentPort, selectedDate, curH);

  const heightEl = document.getElementById('instantHeightVal');
  if (heightEl) heightEl.textContent = h.toFixed(2);

  const tubeEl = document.getElementById('liquidTubeLevel');
  if (tubeEl) {
    const percent = Math.min(100, Math.max(10, (h / 4.0) * 100));
    tubeEl.style.height = percent + '%';
  }

  const barLaminaEl = document.getElementById('barLaminaVal');
  if (barLaminaEl) {
    barLaminaEl.textContent = (h + 2.0).toFixed(2) + ' m';
  }

  const nextH = calculateTideHeight(currentPort, selectedDate, curH + 0.25);
  const rate = ((nextH - h) * 4 * 100).toFixed(0);
  const statusEl = document.getElementById('tideStatusText');
  const rateEl = document.getElementById('tideRateVal');
  const pillEl = document.getElementById('tideRatePill');

  if (rate >= 0) {
    if (statusEl) statusEl.textContent = "Maré Enchendo";
    if (rateEl) rateEl.textContent = '+' + rate + ' cm/h';
    if (pillEl) pillEl.className = "status-pill pill-up";
  } else {
    if (statusEl) statusEl.textContent = "Maré Vazando";
    if (rateEl) rateEl.textContent = rate + ' cm/h';
    if (pillEl) pillEl.className = "status-pill pill-down";
  }

  const w = getMarineWind(currentPort);
  const extSpeed = document.getElementById('extWindSpeed');
  const extKmh = document.getElementById('extWindKmh');
  const extDir = document.getElementById('extWindDir');
  const extArrow = document.getElementById('extWindArrow');

  if (extSpeed) extSpeed.textContent = w.knots;
  if (extKmh) extKmh.textContent = w.kmh;
  if (extDir) extDir.textContent = w.cardinal + ' (' + w.deg + '°)';
  if (extArrow) extArrow.style.transform = 'rotate(' + w.deg + 'deg)';

  const extremes = findDailyExtremes(currentPort, selectedDate);
  const listEl = document.getElementById('extremesList');
  if (listEl) {
    listEl.innerHTML = '';
    extremes.forEach(e => {
      const isPrea = e.type === 'preamar';
      const card = document.createElement('div');
      card.className = 'ext-card ' + (isPrea ? 'ext-preamar' : '');
      card.innerHTML = '<div class="ext-card-title">' + e.name + '</div>' +
                       '<div class="ext-card-time">' + e.timeStr + '</div>' +
                       '<div class="ext-card-height">' + e.height.toFixed(2) + 'm</div>';
      listEl.appendChild(card);
    });
  }

  if (extremes.length >= 2) {
    let pastExtreme = extremes[0];
    let nextExtreme = extremes[1];
    for (let i = 0; i < extremes.length; i++) {
      if (extremes[i].hourDecimal <= curH) {
        pastExtreme = extremes[i];
      } else {
        nextExtreme = extremes[i];
        break;
      }
    }

    const lastTitle = document.getElementById('lastExtremeTitle');
    const lastTime = document.getElementById('lastExtremeTime');
    const lastHeight = document.getElementById('lastExtremeHeight');
    if (lastTitle) lastTitle.textContent = 'Última ' + pastExtreme.name;
    if (lastTime) lastTime.textContent = pastExtreme.timeStr;
    if (lastHeight) lastHeight.textContent = pastExtreme.height.toFixed(2) + ' m';

    const nextTitle = document.getElementById('nextExtremeTitle');
    const nextTime = document.getElementById('nextExtremeTime');
    const nextHeight = document.getElementById('nextExtremeHeight');
    if (nextTitle) nextTitle.textContent = 'Próxima ' + nextExtreme.name;
    if (nextTime) nextTime.textContent = nextExtreme.timeStr;
    if (nextHeight) nextHeight.textContent = nextExtreme.height.toFixed(2) + ' m';

    const diffH = nextExtreme.hourDecimal - curH;
    const countdownLabel = document.getElementById('countdownLabel');
    if (countdownLabel) {
      if (diffH > 0) {
        const totalMins = Math.round(diffH * 60);
        countdownLabel.textContent = 'Faltam ' + Math.floor(totalMins / 60) + 'h ' + (totalMins % 60) + 'm para a ' + nextExtreme.name;
      } else {
        countdownLabel.textContent = 'Estofo de maré atingido';
      }
    }

    const cycleDuration = Math.max(1, nextExtreme.hourDecimal - pastExtreme.hourDecimal);
    const elapsed = Math.max(0, curH - pastExtreme.hourDecimal);
    const cyclePercent = Math.min(100, Math.max(0, Math.round((elapsed / cycleDuration) * 100)));
    const cycleBar = document.getElementById('cycleProgressBar');
    const cycleText = document.getElementById('cyclePercentText');
    if (cycleBar) cycleBar.style.width = cyclePercent + '%';
    if (cycleText) cycleText.textContent = cyclePercent + '%';
  }

  const clockEl = document.getElementById('liveClock');
  if (clockEl) clockEl.textContent = now.toLocaleTimeString('pt-BR');

  renderFuture24hChart();
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findClosestPort(userLat, userLon) {
  let closest = PORTS_DATA[0];
  let minDistance = Infinity;
  PORTS_DATA.forEach(p => {
    const dist = calculateDistanceKm(userLat, userLon, p.lat, p.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = p;
    }
  });
  return { port: closest, distance: Math.round(minDistance) };
}

async function syncLocation() {
  const badge = document.getElementById('geoBadge');
  const handleCoords = (lat, lon, src) => {
    const match = findClosestPort(lat, lon);
    currentPort = match.port;
    const select = document.getElementById('portSelect');
    if (select) select.value = currentPort.id;
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ savedPortId: currentPort.id });
    }
    if (badge) {
      badge.style.display = 'block';
      badge.textContent = '📍 ' + (match.port.name.split('-')[1]?.trim() || match.port.name) + ' (' + match.distance + ' km via ' + src + ')';
    }
    updateUI();
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => handleCoords(pos.coords.latitude, pos.coords.longitude, "GPS"),
      async () => {
        try {
          const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
          const data = await res.json();
          if (data && data.latitude && data.longitude) {
            handleCoords(parseFloat(data.latitude), parseFloat(data.longitude), data.city || "Internet");
          }
        } catch (e) {
          console.warn("Falha ao geolocalizar por IP:", e);
        }
      },
      { timeout: 4000 }
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('portSelect');
  const dateInput = document.getElementById('dateInput');
  const todayBtn = document.getElementById('todayBtn');
  const geoBtn = document.getElementById('geoBtn');
  const openChartBtn = document.getElementById('openChartBtn');

  PORTS_DATA.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === currentPort.id) opt.selected = true;
    select.appendChild(opt);
  });

  const now = new Date();
  dateInput.value = now.toISOString().split('T')[0];

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['savedPortId'], res => {
      if (res && res.savedPortId) {
        const found = PORTS_DATA.find(p => p.id === res.savedPortId);
        if (found) {
          currentPort = found;
          select.value = found.id;
          updateUI();
        }
      }
    });
  }

  select.addEventListener('change', () => {
    currentPort = PORTS_DATA.find(p => p.id === select.value) || PORTS_DATA[0];
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ savedPortId: currentPort.id });
    }
    updateUI();
  });

  dateInput.addEventListener('change', () => {
    selectedDate = new Date(dateInput.value + 'T12:00:00');
    updateUI();
  });

  todayBtn.addEventListener('click', () => {
    selectedDate = new Date();
    dateInput.value = selectedDate.toISOString().split('T')[0];
    updateUI();
  });

  if (geoBtn) geoBtn.addEventListener('click', syncLocation);

  if (openChartBtn) {
    openChartBtn.addEventListener('click', () => {
      const url = 'https://map.openseamap.org/?zoom=12&lat=' + currentPort.lat + '&lon=' + currentPort.lon + '&layers=BFTTFFFTTF';
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: url });
      } else {
        window.open(url, '_blank');
      }
    });
  }

  const container = document.getElementById('tideGraphContainer');
  const tooltip = document.getElementById('chartTooltipText');
  if (container) {
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const hOffset = Math.max(0, Math.min(24, (x / rect.width) * 24));
      const curH = now.getHours() + (now.getMinutes() / 60);
      const targetH = curH + hOffset;
      const val = calculateTideHeight(currentPort, selectedDate, targetH);
      const totalMins = Math.round(targetH * 60);
      const dispH = String(Math.floor(totalMins / 60) % 24).padStart(2, '0');
      const dispM = String(totalMins % 60).padStart(2, '0');
      if (tooltip) tooltip.textContent = '+' + hOffset.toFixed(1) + 'h (' + dispH + ':' + dispM + ') ' + val.toFixed(2) + 'm';
    });
    container.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.textContent = 'Passe o cursor';
    });
  }

  updateUI();
  setInterval(updateUI, 1000);
});