// Configuração dos portos — extraída de github.com/cleytonasa/mares (src/data/portsData.ts)
const PORTS_DATA = {
  areia_branca: {
    id: 'areia_branca',
    name: 'Areia Branca',
    fullName: 'Porto de Areia Branca (TERMISA)',
    chartNumber: 'Carta DHN 703 / 701',
    meanLevel: 1.88,
    criticalShallowDepth: 2.2,
    maxNormalDraft: 4.8,
    timeOffsetMinutes: 0,
    heightMultiplier: 1.0,
  },
  macau: {
    id: 'macau',
    name: 'Macau - RN',
    fullName: 'Barra de Macau / Terminal Salineiro de Macau',
    chartNumber: 'Carta DHN 702',
    meanLevel: 1.82,
    criticalShallowDepth: 1.8,
    maxNormalDraft: 4.2,
    timeOffsetMinutes: -18,
    heightMultiplier: 0.96,
  },
};
