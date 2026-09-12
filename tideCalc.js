// Cálculo harmônico de maré — portado de github.com/cleytonasa/mares (src/utils/tideCalculations.ts)

function parseTideDate(year, month, day, timeStr, timeOffsetMinutes) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  if (timeOffsetMinutes) date.setMinutes(date.getMinutes() + timeOffsetMinutes);
  return date;
}

function getChronologicalEvents(targetDate, port) {
  const result = [];
  for (let offset = -2; offset <= 3; offset++) {
    const d = new Date(targetDate);
    d.setDate(d.getDate() + offset);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayTides = getTidesForDay(year, month, day);
    for (const evt of dayTides.events) {
      const evtDate = parseTideDate(year, month, day, evt.time, port.timeOffsetMinutes);
      const adjustedHeight = Number((evt.height * port.heightMultiplier).toFixed(2));
      result.push({
        date: evtDate,
        timeStr: `${String(evtDate.getHours()).padStart(2, '0')}:${String(evtDate.getMinutes()).padStart(2, '0')}`,
        height: adjustedHeight,
        type: evt.type,
        timestamp: evtDate.getTime(),
      });
    }
  }
  result.sort((a, b) => a.timestamp - b.timestamp);
  return result;
}

function calculateCurrentTide(targetDate, port) {
  const events = getChronologicalEvents(targetDate, port);
  const nowTs = targetDate.getTime();

  let prev = events[0];
  let next = events[events.length - 1];

  for (let i = 0; i < events.length - 1; i++) {
    if (nowTs >= events[i].timestamp && nowTs <= events[i + 1].timestamp) {
      prev = events[i];
      next = events[i + 1];
      break;
    }
  }
  if (nowTs < events[0].timestamp) {
    prev = events[0];
    next = events[1] || events[0];
  } else if (nowTs > events[events.length - 1].timestamp) {
    prev = events[events.length - 2] || events[events.length - 1];
    next = events[events.length - 1];
  }

  const durationMs = next.timestamp - prev.timestamp;
  const elapsedMs = Math.max(0, Math.min(durationMs, nowTs - prev.timestamp));
  const fraction = durationMs > 0 ? elapsedMs / durationMs : 0;

  const cosFactor = (1 - Math.cos(Math.PI * fraction)) / 2;
  const currentHeight = Number((prev.height + (next.height - prev.height) * cosFactor).toFixed(2));

  const durationHours = durationMs / (1000 * 60 * 60);
  const totalChangeM = next.height - prev.height;
  const currentRateCmH = durationHours > 0
    ? ((totalChangeM * Math.PI) / (2 * durationHours)) * Math.sin(Math.PI * fraction) * 100
    : 0;

  let trend = 'ESTOFO';
  let trendDescription = 'Estofo de Maré';
  if (Math.abs(currentRateCmH) < 8) {
    trend = 'ESTOFO';
    trendDescription = prev.height > next.height ? 'Estofo de Baixa-mar (Inversão)' : 'Estofo de Preamar (Inversão)';
  } else if (next.height > prev.height) {
    trend = 'ENCHENDO';
    trendDescription = 'Maré Enchendo (Fluxo / Enchente)';
  } else {
    trend = 'VAZANDO';
    trendDescription = 'Maré Vazando (Refluxo / Vazante)';
  }

  const amplitude = Math.abs(next.height - prev.height);
  let coefficientType = 'INTERMEDIÁRIA';
  if (amplitude >= 2.7) coefficientType = 'SIZÍGIA';
  else if (amplitude <= 1.8) coefficientType = 'QUADRATURA';

  const minutesToNextEvent = Math.max(0, Math.round((next.timestamp - nowTs) / (1000 * 60)));
  const currentWaterDepth = Number((port.criticalShallowDepth + currentHeight).toFixed(2));

  let nextHighEvent = events.find((evt) => evt.type === 'high' && evt.timestamp > nowTs);
  if (!nextHighEvent) nextHighEvent = next.type === 'high' ? next : prev;
  const minutesToNextHighEvent = Math.max(0, Math.round((nextHighEvent.timestamp - nowTs) / (1000 * 60)));

  return {
    currentHeight,
    rateOfChangeCmPerHour: Number(currentRateCmH.toFixed(1)),
    trend,
    trendDescription,
    previousEvent: prev,
    nextEvent: next,
    nextHighEvent,
    percentCycle: Math.round(fraction * 100),
    amplitude: Number(amplitude.toFixed(2)),
    coefficientType,
    minutesToNextEvent,
    minutesToNextHighEvent,
    currentWaterDepth,
  };
}

// Curva do dia inteiro, usada no mini-gráfico do popup
function get24hTideCurve(referenceDate, port, pointsCount) {
  pointsCount = pointsCount || 48;
  const startOfDay = new Date(referenceDate);
  startOfDay.setHours(0, 0, 0, 0);
  const points = [];
  for (let i = 0; i <= pointsCount; i++) {
    const d = new Date(startOfDay.getTime() + (i * 24 * 60 * 60 * 1000) / pointsCount);
    const state = calculateCurrentTide(d, port);
    points.push({ timestamp: d.getTime(), height: state.currentHeight });
  }
  return points;
}
