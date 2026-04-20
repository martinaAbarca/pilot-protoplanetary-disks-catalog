// ======================================
// SYNTHETIC PROTOPLANETARY DISK SIMULATION
// V2 refinada: física + estética + dos planetas + asimetrías
// ======================================
//
// Este archivo construye una simulación sintética, no un disco real
// específico. La idea es crear un modelo pedagógico, interactivo y
// científicamente razonable para mostrar cómo ciertas propiedades del
// disco y de los planetas afectan la morfología observada.
//
// Base física usada:
//
// 1) Kanagawa:
//    La profundidad del gap responde a:
//    - masa planetaria
//    - espesor local del disco h/r
//    - turbulencia / viscosidad efectiva alpha
//
// 2) Crida:
//    La apertura y el ancho del gap no dependen solo de la gravedad
//    del planeta. También importan:
//    - la presión
//    - la viscosidad
//    - el espesor del disco
//
// 3) Pinilla et al.:
//    Nos inspira para:
//    - usar dos planetas
//    - separar gas / small dust / mm dust
//    - generar pressure bumps
//    - producir trapping
//    - permitir asimetrías tipo eccentricidad o tipo vórtice
//
// 4) Andrews:
//    La idea general de que el polvo milimétrico se concentra en
//    máximos locales de presión es la interpretación física que guía
//    toda esta herramienta.
//
// Importante:
// Este simulador NO reemplaza simulaciones hidrodinámicas reales.
// Es una herramienta sintética y pedagógica.
// ======================================


// --------------------------------------
// 1. ESTADO PRINCIPAL DE LA SIMULACIÓN
// --------------------------------------

const estadoSimulacion = {
  // -------- DISCO GLOBAL --------
  radioPolvo: 120,              // AU
  radioGas: 220,                // AU
  masaDisco: 1.0,               // factor relativo respecto al modelo base
  indiceFlaring: 1.25,          // H(R) ∝ R^psi
  temperaturaBase: 200,         // K a 1 AU
  masaEstelar: 1.0,             // masas solares

  // -------- PLANETA 1 --------
   radioPlaneta: 40,             // AU
  masaPlaneta: 0.8,             // masas de Júpiter
  relacionAspecto: 0.055,       // h_p = H(Rp)/Rp
  alfaTurb: 1.5e-3,             // turbulencia / viscosidad efectiva
  velocidadFragmentacion: 10,   // m/s

  // -------- PLANETA 2 --------
  modoDosPlanetas: false,
  radioPlanetaExterno: 85,      // AU
  masaPlanetaExterno: 5.0,      // masas de Júpiter

  // -------- ASIMETRÍAS --------
  // modoAsimetria = lo que el usuario pide
  // modoAsimetriaActivo = lo que el régimen físico termina permitiendo
  modoAsimetria: "ninguna",     // "ninguna", "excentricidad", "vortice"
  modoAsimetriaActivo: "ninguna",

  // -------- CAPAS VISUALES --------
  mostrarGas: true,
  mostrarPolvoFino: true,
  mostrarPolvoMm: true,
  mostrarPlaneta: true,
  mostrarEtiquetas: true,
  mostrarPresion: true,

  // -------- INTERFAZ --------
  presetActual: "base",

  // -------- VARIABLES INTERNAS PLANETA 1 --------
  q1: 0,
  radioHill1: 0,
  parametroK1: 0,
  profundidadGap1: 1.0,
  abreGap1: false,
  anchoGap1: 0,
  radioRing1: 0,
  indiceTrapping1: 0,
  nivelFiltrado1: 0,

  // -------- VARIABLES INTERNAS PLANETA 2 --------
  q2: 0,
  radioHill2: 0,
  parametroK2: 0,
  profundidadGap2: 1.0,
  abreGap2: false,
  anchoGap2: 0,
  radioRing2: 0,
  indiceTrapping2: 0,
  nivelFiltrado2: 0,

  // -------- ASIMETRÍA VISUAL --------
  amplitudAsimetria: 0,
  anguloAsimetria: -30 * Math.PI / 180,

  // -------- PERFILES RADIALES --------
  radios: [],
  perfilGas: [],
  perfilPolvoFino: [],
  perfilPolvoMm: [],
  perfilTemperatura: [],
  perfilScaleHeight: [],
  perfilPresion: []
};


// --------------------------------------
// 2. MODELO BASE PARA RESET
// --------------------------------------

const modeloBase = {
  radioPolvo: 120,
  radioGas: 220,
  masaDisco: 1.0,
  indiceFlaring: 1.25,
  temperaturaBase: 200,
  masaEstelar: 1.0,

    radioPlaneta: 40,
  masaPlaneta: 0.8,
  relacionAspecto: 0.055,
  alfaTurb: 1.5e-3,
  velocidadFragmentacion: 10,

  modoDosPlanetas: false,
  radioPlanetaExterno: 85,
  masaPlanetaExterno: 5.0,
  modoAsimetria: "ninguna",
  modoAsimetriaActivo: "ninguna",

  mostrarGas: true,
  mostrarPolvoFino: true,
  mostrarPolvoMm: true,
  mostrarPlaneta: true,
  mostrarEtiquetas: true,
  mostrarPresion: true,

  presetActual: "base"
};


// --------------------------------------
// 3. CONTROLES Y PRESETS
// --------------------------------------

const controlesPrincipales = [
  {
    variable: "radioPolvo",
    etiqueta: "Dust outer radius",
    unidad: "AU",
    min: 30,
    max: 250,
    step: 1,
    grupo: "Disk"
  },
  {
    variable: "radioGas",
    etiqueta: "Gas outer radius",
    unidad: "AU",
    min: 60,
    max: 400,
    step: 1,
    grupo: "Disk"
  },
  {
    variable: "masaDisco",
    etiqueta: "Disk density",
    unidad: "× base",
    min: 0.3,
    max: 3.0,
    step: 0.1,
    grupo: "Disk"
  },
  {
    variable: "relacionAspecto",
    etiqueta: "Disk thickness h/r",
    unidad: "",
    min: 0.03,
    max: 0.10,
    step: 0.005,
    grupo: "Disk"
  },
  {
    variable: "alfaTurb",
    etiqueta: "Turbulence α",
    unidad: "",
    min: 0.0001,
    max: 0.01,
    step: 0.0001,
    grupo: "Disk"
  },
  {
    variable: "indiceFlaring",
    etiqueta: "Flaring",
    unidad: "",
    min: 1.10,
    max: 1.50,
    step: 0.01,
    grupo: "Disk"
  },

  {
    variable: "radioPlaneta",
    etiqueta: "Planet orbital radius",
    unidad: "AU",
    min: 5,
    max: 120,
    step: 1,
    grupo: "Planet 1"
  },
  {
    variable: "masaPlaneta",
    etiqueta: "Planet mass",
    unidad: "M_Jup",
    min: 0.1,
    max: 10,
    step: 0.1,
    grupo: "Planet 1"
  },

  {
    variable: "velocidadFragmentacion",
    etiqueta: "Fragmentation velocity",
    unidad: "m/s",
    min: 5,
    max: 30,
    step: 1,
    grupo: "Dust"
  }
];

const controlesAvanzados = [
  {
    variable: "modoDosPlanetas",
    etiqueta: "Enable two-planet mode",
    tipo: "checkbox",
    grupo: "Advanced V2"
  },
  {
    variable: "radioPlanetaExterno",
    etiqueta: "Outer planet radius",
    unidad: "AU",
    min: 15,
    max: 200,
    step: 1,
    tipo: "range",
    grupo: "Advanced V2"
  },
  {
    variable: "masaPlanetaExterno",
    etiqueta: "Outer planet mass",
    unidad: "M_Jup",
    min: 0.5,
    max: 15,
    step: 0.1,
    tipo: "range",
    grupo: "Advanced V2"
  },
  {
    variable: "modoAsimetria",
    etiqueta: "Asymmetry mode",
    tipo: "select",
    opciones: [
      { valor: "ninguna", texto: "Off" },
      { valor: "excentricidad", texto: "Eccentric" },
      { valor: "vortice", texto: "Vortex-like" }
    ],
    grupo: "Advanced V2"
  }
];

const presets = {
  base: {
    radioPolvo: 120,
    radioGas: 220,
    masaDisco: 1.0,
    radioPlaneta: 40,
    masaPlaneta: 0.8,
    relacionAspecto: 0.055,
    alfaTurb: 1.5e-3,
    indiceFlaring: 1.25,
    velocidadFragmentacion: 10,
    modoDosPlanetas: false,
    radioPlanetaExterno: 85,
    masaPlanetaExterno: 5.0,
    modoAsimetria: "ninguna"
  },

  "weak-gap": {
    radioPolvo: 120,
    radioGas: 220,
    masaDisco: 1.0,
    radioPlaneta: 45,
    masaPlaneta: 0.4,
    relacionAspecto: 0.08,
    alfaTurb: 5e-3,
    indiceFlaring: 1.25,
    velocidadFragmentacion: 8,
    modoDosPlanetas: false,
    radioPlanetaExterno: 85,
    masaPlanetaExterno: 5.0,
    modoAsimetria: "ninguna"
  },

  "strong-trap": {
    radioPolvo: 130,
    radioGas: 240,
    masaDisco: 1.3,
    radioPlaneta: 45,
    masaPlaneta: 4.0,
    relacionAspecto: 0.045,
    alfaTurb: 5e-4,
    indiceFlaring: 1.23,
    velocidadFragmentacion: 20,
    modoDosPlanetas: false,
    radioPlanetaExterno: 85,
    masaPlanetaExterno: 5.0,
    modoAsimetria: "ninguna"
  },

  "two-planets-eccentric": {
    radioPolvo: 145,
    radioGas: 270,
    masaDisco: 1.1,
    radioPlaneta: 28,
    masaPlaneta: 1.2,
    relacionAspecto: 0.05,
    alfaTurb: 1e-3,
    indiceFlaring: 1.24,
    velocidadFragmentacion: 10,
    modoDosPlanetas: true,
    radioPlanetaExterno: 86,
    masaPlanetaExterno: 7.0,
    modoAsimetria: "excentricidad"
  },

  "two-planets-vortex": {
    radioPolvo: 150,
    radioGas: 280,
    masaDisco: 1.2,
    radioPlaneta: 28,
    masaPlaneta: 1.2,
    relacionAspecto: 0.045,
    alfaTurb: 5e-4,
    indiceFlaring: 1.23,
    velocidadFragmentacion: 18,
    modoDosPlanetas: true,
    radioPlanetaExterno: 90,
    masaPlanetaExterno: 9.0,
    modoAsimetria: "vortice"
  }
};


// --------------------------------------
// 4. FUNCIONES AUXILIARES
// --------------------------------------

function clamp(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function gauss(x, centro, sigma) {
  const s = Math.max(sigma, 1e-6);
  return Math.exp(-0.5 * Math.pow((x - centro) / s, 2));
}

function normalizarArray(arr) {
  const maximo = Math.max(...arr, 1e-12);
  return arr.map(v => v / maximo);
}

function suavizarArray(arr, ventana = 7) {
  const resultado = [];
  const k = Math.floor(ventana / 2);

  for (let i = 0; i < arr.length; i++) {
    let suma = 0;
    let n = 0;

    for (let j = i - k; j <= i + k; j++) {
      if (j >= 0 && j < arr.length) {
        suma += arr[j];
        n += 1;
      }
    }

    resultado.push(suma / Math.max(n, 1));
  }

  return resultado;
}

function formatearValor(variable, valor) {
  if (variable === "alfaTurb") return Number(valor).toExponential(1);
  if (variable === "relacionAspecto" || variable === "indiceFlaring") return Number(valor).toFixed(3);

  if (
    variable === "masaDisco" ||
    variable === "masaPlaneta" ||
    variable === "masaPlanetaExterno"
  ) {
    return Number(valor).toFixed(1);
  }

  if (typeof valor === "boolean") {
    return valor ? "On" : "Off";
  }

  return Number(valor).toFixed(0);
}

function aspectRatioEnRadio(r) {
  // Si H(R) = h_p R_p (R/R_p)^psi,
  // entonces H(R)/R = h_p (R/R_p)^(psi - 1)
  const rp = estadoSimulacion.radioPlaneta;
  const hp = estadoSimulacion.relacionAspecto;
  const psi = estadoSimulacion.indiceFlaring;
  const rr = Math.max(r, 0.5);

  return hp * Math.pow(rr / rp, psi - 1);
}

function limitarEstado() {
  if (estadoSimulacion.radioGas < estadoSimulacion.radioPolvo) {
    estadoSimulacion.radioGas = estadoSimulacion.radioPolvo;
  }

  const separacionMinima = Math.max(12, 0.9 * estadoSimulacion.radioPlaneta);
  if (estadoSimulacion.radioPlanetaExterno <= estadoSimulacion.radioPlaneta + separacionMinima) {
    estadoSimulacion.radioPlanetaExterno = estadoSimulacion.radioPlaneta + separacionMinima;
  }

  estadoSimulacion.radioPlanetaExterno = clamp(
    estadoSimulacion.radioPlanetaExterno,
    15,
    200
  );
}


// --------------------------------------
// 5. FÍSICA DE GAPS Y TRAPS
// --------------------------------------

function calcularGapParaPlaneta(masaPlanetaMjup, radioPlanetaAU, esPlanetaExterno = false) {
  const q = masaPlanetaMjup * 0.001; // aprox. Mjup / Msun
  const alpha = Math.max(estadoSimulacion.alfaTurb, 1e-6);
  const h = aspectRatioEnRadio(radioPlanetaAU);

  const radioHill = radioPlanetaAU * Math.pow(q / 3, 1 / 3);

  // -------- KANAGAWA --------
  const K = (q * q) * Math.pow(h, -5) / alpha;
  const profundidadGap = 1 / (1 + 0.04 * K);

  // -------- CRIDA SIMPLIFICADO --------
  const H = h * radioPlanetaAU;
  const reynoldsInverso = alpha / Math.max(radioPlanetaAU * radioPlanetaAU, 1e-6);
  const criterio =
    (3 / 4) * (H / Math.max(radioHill, 1e-6)) +
    50 * reynoldsInverso / Math.max(q, 1e-6);

  const abreGap = criterio <= 1.2;

  // -------- ANCHO DEL GAP --------
  const gapStrength = clamp(1 - profundidadGap, 0, 1);
  const factorMasa = 1 + 0.55 * Math.sqrt(masaPlanetaMjup);
  const factorViscosidad = 0.9 + 1.8 * Math.sqrt(alpha / 1e-3);
  const factorEspesor = 0.85 + 4.5 * h;
  const factorProfundidad = 0.8 + 1.2 * gapStrength;

  let anchoBruto =
    radioHill *
    factorMasa *
    factorViscosidad *
    factorEspesor *
    factorProfundidad;

  if (esPlanetaExterno) {
    anchoBruto *= 1.10;
  }

  const anchoGap = clamp(anchoBruto, 0.06 * radioPlanetaAU, 0.40 * radioPlanetaAU);

   // -------- PRESSURE BUMP / RING --------
  //
  // Antes el ring exterior estaba quedando demasiado lejos.
  // Aquí lo acercamos para que siga siendo exterior al planeta,
  // pero no de forma exagerada.
  //
  // La idea física es:
  // - el ring debe quedar más allá de la órbita planetaria
  // - pero su posición no debería dispararse demasiado
  // - el planeta exterior puede empujarlo un poco más lejos que el interior

  let offsetEnHill;
  if (!esPlanetaExterno) {
    offsetEnHill = 1.15 + 0.10 * Math.sqrt(masaPlanetaMjup);
  } else {
    offsetEnHill = 1.45 + 0.12 * Math.sqrt(masaPlanetaMjup) + 0.10 * Math.sqrt(1e-3 / alpha);
  }

  const offsetPorHill = offsetEnHill * radioHill;
  const offsetPorGap = 0.45 * anchoGap;

  const radioRing =
    radioPlanetaAU + Math.max(offsetPorHill, offsetPorGap);
  // -------- TRAPPING Y FILTRADO --------
  const alphaNorm = Math.sqrt(1e-3 / alpha);
  const vfNorm = estadoSimulacion.velocidadFragmentacion / 10.0;

  let indiceTrapping = clamp(
    0.55 * gapStrength + 0.35 * alphaNorm + 0.25 * vfNorm + 0.12 * masaPlanetaMjup,
    0,
    3.2
  );

  let nivelFiltrado = clamp(
    gapStrength *
      Math.sqrt(masaPlanetaMjup / 5) *
      alphaNorm *
      (12 / estadoSimulacion.velocidadFragmentacion),
    0,
    1
  );

  if (esPlanetaExterno) {
    indiceTrapping = clamp(indiceTrapping * 1.12, 0, 3.5);
    nivelFiltrado = clamp(nivelFiltrado * 1.15, 0, 1);
  }

  return {
    q,
    h,
    radioHill,
    K,
    profundidadGap,
    abreGap,
    anchoGap,
    radioRing,
    indiceTrapping,
    nivelFiltrado
  };
}

function calcularModoAsimetriaActivo() {
  if (!estadoSimulacion.modoDosPlanetas) {
    estadoSimulacion.modoAsimetriaActivo = "ninguna";
    estadoSimulacion.amplitudAsimetria = 0;
    return;
  }

  const alpha = Math.max(estadoSimulacion.alfaTurb, 1e-6);
  const masaExterior = estadoSimulacion.masaPlanetaExterno;
  const trappingExterior = estadoSimulacion.indiceTrapping2 || 0;
  const pedido = estadoSimulacion.modoAsimetria;

  if (pedido === "ninguna") {
    estadoSimulacion.modoAsimetriaActivo = "ninguna";
    estadoSimulacion.amplitudAsimetria = 0;
    return;
  }

  if (pedido === "excentricidad") {
    estadoSimulacion.modoAsimetriaActivo = "excentricidad";
    estadoSimulacion.amplitudAsimetria = clamp(
      0.05 + 0.015 * masaExterior + 0.06 * Math.sqrt(1e-3 / alpha),
      0.05,
      0.24
    );
    return;
  }

  if (pedido === "vortice") {
    // Solo dejamos el modo vórtice si el régimen realmente lo favorece.
    if (alpha <= 1e-3 && masaExterior >= 5 && trappingExterior >= 1.6) {
      estadoSimulacion.modoAsimetriaActivo = "vortice";
      estadoSimulacion.amplitudAsimetria = clamp(
        0.16 + 0.035 * masaExterior + 0.14 * Math.sqrt(1e-3 / alpha),
        0.16,
        0.68
      );
    } else {
      // Si no, degradamos a eccentricidad.
      estadoSimulacion.modoAsimetriaActivo = "excentricidad";
      estadoSimulacion.amplitudAsimetria = clamp(
        0.05 + 0.012 * masaExterior + 0.05 * Math.sqrt(1e-3 / alpha),
        0.05,
        0.18
      );
    }
  }
}

function calcularVariablesInternas() {
  // -------- PLANETA 1 --------
  const p1 = calcularGapParaPlaneta(
    estadoSimulacion.masaPlaneta,
    estadoSimulacion.radioPlaneta,
    false
  );

  estadoSimulacion.q1 = p1.q;
  estadoSimulacion.radioHill1 = p1.radioHill;
  estadoSimulacion.parametroK1 = p1.K;
  estadoSimulacion.profundidadGap1 = p1.profundidadGap;
  estadoSimulacion.abreGap1 = p1.abreGap;
  estadoSimulacion.anchoGap1 = p1.anchoGap;
  estadoSimulacion.radioRing1 = p1.radioRing;
  estadoSimulacion.indiceTrapping1 = p1.indiceTrapping;
  estadoSimulacion.nivelFiltrado1 = p1.nivelFiltrado;

  // -------- PLANETA 2 --------
  if (estadoSimulacion.modoDosPlanetas) {
    const p2 = calcularGapParaPlaneta(
      estadoSimulacion.masaPlanetaExterno,
      estadoSimulacion.radioPlanetaExterno,
      true
    );

    estadoSimulacion.q2 = p2.q;
    estadoSimulacion.radioHill2 = p2.radioHill;
    estadoSimulacion.parametroK2 = p2.K;
    estadoSimulacion.profundidadGap2 = p2.profundidadGap;
    estadoSimulacion.abreGap2 = p2.abreGap;
    estadoSimulacion.anchoGap2 = p2.anchoGap;
    estadoSimulacion.radioRing2 = p2.radioRing;
    estadoSimulacion.indiceTrapping2 = p2.indiceTrapping;
    estadoSimulacion.nivelFiltrado2 = p2.nivelFiltrado;
  } else {
    estadoSimulacion.q2 = 0;
    estadoSimulacion.radioHill2 = 0;
    estadoSimulacion.parametroK2 = 0;
    estadoSimulacion.profundidadGap2 = 1.0;
    estadoSimulacion.abreGap2 = false;
    estadoSimulacion.anchoGap2 = 0;
    estadoSimulacion.radioRing2 = 0;
    estadoSimulacion.indiceTrapping2 = 0;
    estadoSimulacion.nivelFiltrado2 = 0;
  }

  // -------- ASIMETRÍA --------
  calcularModoAsimetriaActivo();
}


// --------------------------------------
// 6. PERFILES RADIALES
// --------------------------------------

function calcularPerfilTemperatura(radios) {
  return radios.map(r => {
    const rr = Math.max(r, 0.5);
    return estadoSimulacion.temperaturaBase * Math.pow(rr, -0.5);
  });
}

function calcularPerfilScaleHeight(radios) {
  const rp = estadoSimulacion.radioPlaneta;
  const hp = estadoSimulacion.relacionAspecto;
  const psi = estadoSimulacion.indiceFlaring;

  return radios.map(r => {
    const rr = Math.max(r, 0.5);
    return hp * rp * Math.pow(rr / rp, psi);
  });
}

function calcularPerfilGasBase(radios) {
  const rc = Math.max(30, 0.45 * estadoSimulacion.radioPolvo);
  const factorMasa = estadoSimulacion.masaDisco;

  return radios.map(r => {
    const rr = Math.max(r, 0.5);
    return factorMasa * (rc / rr) * Math.exp(-rr / rc);
  });
}

function aplicarGapSimple(radios, perfilBase, centro, sigma, profundidad, abreGap) {
  return perfilBase.map((valor, i) => {
    const g = gauss(radios[i], centro, sigma);

    const profundidadObjetivo = abreGap
      ? profundidad
      : Math.max(0.55, profundidad);

    const factor = 1 - (1 - profundidadObjetivo) * g;
    return valor * factor;
  });
}

function calcularPerfilGas(radios) {
  let perfil = calcularPerfilGasBase(radios);

  const sigma1 = Math.max(estadoSimulacion.anchoGap1 / 2.355, 1.0);
  perfil = aplicarGapSimple(
    radios,
    perfil,
    estadoSimulacion.radioPlaneta,
    sigma1,
    estadoSimulacion.profundidadGap1,
    estadoSimulacion.abreGap1
  );

  if (estadoSimulacion.modoDosPlanetas) {
    const sigma2 = Math.max(estadoSimulacion.anchoGap2 / 2.355, 1.0);
    perfil = aplicarGapSimple(
      radios,
      perfil,
      estadoSimulacion.radioPlanetaExterno,
      sigma2,
      estadoSimulacion.profundidadGap2,
      estadoSimulacion.abreGap2
    );
  }

  return perfil;
}

function calcularPolvoFino(radios, perfilGasConGap) {
  return perfilGasConGap.map((valor, i) => {
    const rr = radios[i];
    let perfil = valor;

    const sigmaGap1 = Math.max(estadoSimulacion.anchoGap1 / 2.5, 1.5);
    const dep1 = 0.55 * estadoSimulacion.nivelFiltrado1 * gauss(rr, estadoSimulacion.radioPlaneta, sigmaGap1);
    perfil *= (1 - dep1);

    if (estadoSimulacion.modoDosPlanetas) {
      const sigmaGap2 = Math.max(estadoSimulacion.anchoGap2 / 2.5, 1.5);
      const dep2 = 0.55 * estadoSimulacion.nivelFiltrado2 * gauss(rr, estadoSimulacion.radioPlanetaExterno, sigmaGap2);
      perfil *= (1 - dep2);
    }

    if (rr < estadoSimulacion.radioPlaneta) {
      perfil *= 0.86 + 0.24 * (1 - estadoSimulacion.nivelFiltrado1);
    }

    if (rr > estadoSimulacion.radioPolvo) {
      perfil *= 0.25;
    }

    return Math.max(perfil, 0);
  });
}

function calcularPolvoMm(radios, perfilGasConGap, perfilTemperatura) {
  return perfilGasConGap.map((valor, i) => {
    const rr = radios[i];
    const temp = perfilTemperatura[i];
    const alpha = Math.max(estadoSimulacion.alfaTurb, 1e-6);
    const vf = estadoSimulacion.velocidadFragmentacion;

    const cs2Factor = Math.max(temp / 100, 0.1);
    const aMaxRel = (valor / alpha) * Math.pow(vf / 10, 2) / cs2Factor;

    let perfil = valor;

    // ----- planeta 1 -----
    const sigmaGap1 = Math.max(estadoSimulacion.anchoGap1 / 2.0, 1.5);
    const sigmaRing1 = Math.max(0.12 * estadoSimulacion.radioRing1 + 0.22 * estadoSimulacion.anchoGap1, 2.0);

    const sup1 = 1 - 0.92 * gauss(rr, estadoSimulacion.radioPlaneta, sigmaGap1);
    const enh1 =
      1 + clamp(0.55 * estadoSimulacion.indiceTrapping1 + 0.0006 * aMaxRel, 0, 6) *
      gauss(rr, estadoSimulacion.radioRing1, sigmaRing1);

    perfil *= sup1 * enh1;

    // ----- planeta 2 -----
    if (estadoSimulacion.modoDosPlanetas) {
      const sigmaGap2 = Math.max(estadoSimulacion.anchoGap2 / 2.0, 1.5);
      const sigmaRing2 = Math.max(0.12 * estadoSimulacion.radioRing2 + 0.22 * estadoSimulacion.anchoGap2, 2.0);

      const sup2 = 1 - 0.95 * gauss(rr, estadoSimulacion.radioPlanetaExterno, sigmaGap2);
      const enh2 =
        1 + clamp(0.72 * estadoSimulacion.indiceTrapping2 + 0.0007 * aMaxRel, 0, 8) *
        gauss(rr, estadoSimulacion.radioRing2, sigmaRing2);

      perfil *= sup2 * enh2;
    }

    if (rr > estadoSimulacion.radioPolvo) {
      perfil *= 0.05;
    }

    if (rr < 0.75 * estadoSimulacion.radioPlaneta) {
      perfil *= 0.25;
    }

    return Math.max(perfil, 0);
  });
}

function calcularPerfilPresion(perfilGas, perfilTemperatura, perfilScaleHeight, radios) {
  const raw = perfilGas.map((valorGas, i) => {
    const T = perfilTemperatura[i];
    const H = Math.max(perfilScaleHeight[i], 1e-6);
    return (valorGas * T) / H;
  });

  const rawMax = Math.max(...raw, 1e-12);

  const comprimido = raw.map((v, i) => {
    const rr = radios[i];
    const dampingInterior = 1 - Math.exp(-rr / 12);
    return Math.log1p(25 * v / rawMax) * dampingInterior;
  });

  return suavizarArray(comprimido, 11);
}

function calcularPerfiles() {
  const rMax = Math.max(
    estadoSimulacion.radioGas,
    estadoSimulacion.radioPolvo,
    estadoSimulacion.radioPlanetaExterno + 60,
    estadoSimulacion.radioPlaneta + 40
  );

  const n = 560;

  estadoSimulacion.radios = Array.from(
    { length: n },
    (_, i) => 0.5 + (rMax - 0.5) * i / (n - 1)
  );

  estadoSimulacion.perfilTemperatura = calcularPerfilTemperatura(estadoSimulacion.radios);
  estadoSimulacion.perfilScaleHeight = calcularPerfilScaleHeight(estadoSimulacion.radios);

  estadoSimulacion.perfilGas = calcularPerfilGas(estadoSimulacion.radios);
  estadoSimulacion.perfilPolvoFino = calcularPolvoFino(
    estadoSimulacion.radios,
    estadoSimulacion.perfilGas
  );
  estadoSimulacion.perfilPolvoMm = calcularPolvoMm(
    estadoSimulacion.radios,
    estadoSimulacion.perfilGas,
    estadoSimulacion.perfilTemperatura
  );
  estadoSimulacion.perfilPresion = calcularPerfilPresion(
    estadoSimulacion.perfilGas,
    estadoSimulacion.perfilTemperatura,
    estadoSimulacion.perfilScaleHeight,
    estadoSimulacion.radios
  );
}


// --------------------------------------
// 7. TEXTO DE RESUMEN
// --------------------------------------

function actualizarTextoParametros() {
  const texto = document.getElementById("texto-parametros");
  if (!texto) return;

  let bloquePlaneta2 = "";
  if (estadoSimulacion.modoDosPlanetas) {
    bloquePlaneta2 = `
      Outer planet radius: <strong>${formatearValor("radioPlanetaExterno", estadoSimulacion.radioPlanetaExterno)} AU</strong><br>
      Outer planet mass: <strong>${formatearValor("masaPlanetaExterno", estadoSimulacion.masaPlanetaExterno)} M_Jup</strong><br>
      Outer gap depth Σp/Σ0: <strong>${estadoSimulacion.profundidadGap2.toFixed(3)}</strong><br>
      Outer ring radius: <strong>${estadoSimulacion.radioRing2.toFixed(1)} AU</strong><br>
      Outer trapping strength: <strong>${estadoSimulacion.indiceTrapping2.toFixed(2)}</strong><br>
    `;
  }

  texto.innerHTML = `
    Dust radius: <strong>${formatearValor("radioPolvo", estadoSimulacion.radioPolvo)} AU</strong><br>
    Gas radius: <strong>${formatearValor("radioGas", estadoSimulacion.radioGas)} AU</strong><br>
    Planet radius: <strong>${formatearValor("radioPlaneta", estadoSimulacion.radioPlaneta)} AU</strong><br>
    Planet mass: <strong>${formatearValor("masaPlaneta", estadoSimulacion.masaPlaneta)} M_Jup</strong><br>
    h/r: <strong>${formatearValor("relacionAspecto", estadoSimulacion.relacionAspecto)}</strong><br>
    α: <strong>${formatearValor("alfaTurb", estadoSimulacion.alfaTurb)}</strong><br>
    v<sub>f</sub>: <strong>${formatearValor("velocidadFragmentacion", estadoSimulacion.velocidadFragmentacion)} m/s</strong><br>
    Gap depth Σp/Σ0: <strong>${estadoSimulacion.profundidadGap1.toFixed(3)}</strong><br>
    Gap opening: <strong>${estadoSimulacion.abreGap1 ? "Yes" : "Partial / shallow"}</strong><br>
    Outer ring radius: <strong>${estadoSimulacion.radioRing1.toFixed(1)} AU</strong><br>
    Trapping strength: <strong>${estadoSimulacion.indiceTrapping1.toFixed(2)}</strong><br>
    Small-dust filtering: <strong>${estadoSimulacion.nivelFiltrado1.toFixed(2)}</strong><br>
    Two-planet mode: <strong>${estadoSimulacion.modoDosPlanetas ? "On" : "Off"}</strong><br>
    Requested asymmetry: <strong>${estadoSimulacion.modoAsimetria}</strong><br>
    Active asymmetry: <strong>${estadoSimulacion.modoAsimetriaActivo}</strong><br>
    ${bloquePlaneta2}
  `;
}


// --------------------------------------
// 8. CREAR CONTROLES
// --------------------------------------

function crearTituloGrupo(texto) {
  const titulo = document.createElement("h4");
  titulo.className = "subtitulo-bloque";
  titulo.textContent = texto;
  return titulo;
}

function crearControles() {
  const contenedor = document.getElementById("contenedor-controles");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  contenedor.appendChild(crearTituloGrupo("Disk"));
  controlesPrincipales
    .filter(c => c.grupo === "Disk")
    .forEach(control => crearControlRango(control, contenedor));

  contenedor.appendChild(crearTituloGrupo("Planet 1"));
  controlesPrincipales
    .filter(c => c.grupo === "Planet 1")
    .forEach(control => crearControlRango(control, contenedor));

  contenedor.appendChild(crearTituloGrupo("Dust"));
  controlesPrincipales
    .filter(c => c.grupo === "Dust")
    .forEach(control => crearControlRango(control, contenedor));

  contenedor.appendChild(crearTituloGrupo("Advanced V2"));
  controlesAvanzados.forEach(control => crearControlAvanzado(control, contenedor));
}

function crearControlRango(control, contenedor) {
  const grupo = document.createElement("div");
  grupo.className = "control-grupo";

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", control.variable);
  etiqueta.textContent = control.etiqueta;

  const valorTexto = document.createElement("div");
  valorTexto.id = `valor-${control.variable}`;
  valorTexto.style.fontSize = "0.95rem";
  valorTexto.style.marginBottom = "0.35rem";
  valorTexto.textContent =
    `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();

  const slider = document.createElement("input");
  slider.type = "range";
  slider.id = control.variable;
  slider.min = control.min;
  slider.max = control.max;
  slider.step = control.step;
  slider.value = estadoSimulacion[control.variable];

  slider.addEventListener("input", () => {
    estadoSimulacion[control.variable] = Number(slider.value);
    actualizarSimulacion();

    const nuevoTexto = document.getElementById(`valor-${control.variable}`);
    if (nuevoTexto) {
      nuevoTexto.textContent =
        `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();
    }

    if (control.variable === "radioPolvo") {
      const sliderGas = document.getElementById("radioGas");
      const textoGas = document.getElementById("valor-radioGas");
      if (sliderGas) sliderGas.value = estadoSimulacion.radioGas;
      if (textoGas) textoGas.textContent = `${formatearValor("radioGas", estadoSimulacion.radioGas)} AU`;
    }

    if (control.variable === "radioPlaneta") {
      actualizarControlesDesdeEstado();
    }
  });

  grupo.appendChild(etiqueta);
  grupo.appendChild(valorTexto);
  grupo.appendChild(slider);
  contenedor.appendChild(grupo);
}

function crearControlAvanzado(control, contenedor) {
  const grupo = document.createElement("div");
  grupo.className = "control-grupo";

  const etiqueta = document.createElement("label");
  etiqueta.textContent = control.etiqueta;
  grupo.appendChild(etiqueta);

  if (control.tipo === "checkbox") {
    const wrapper = document.createElement("label");
    wrapper.className = "opcion-check";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = control.variable;
    input.checked = estadoSimulacion[control.variable];

    const span = document.createElement("span");
    span.id = `texto-${control.variable}`;
    span.textContent = estadoSimulacion[control.variable] ? "On" : "Off";

    input.addEventListener("change", () => {
      estadoSimulacion[control.variable] = input.checked;
      span.textContent = input.checked ? "On" : "Off";
      actualizarControlesDesdeEstado();
      actualizarSimulacion();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(span);
    grupo.appendChild(wrapper);
  }

  if (control.tipo === "range") {
    const valorTexto = document.createElement("div");
    valorTexto.id = `valor-${control.variable}`;
    valorTexto.style.fontSize = "0.95rem";
    valorTexto.style.marginBottom = "0.35rem";
    valorTexto.textContent =
      `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = control.variable;
    slider.min = control.min;
    slider.max = control.max;
    slider.step = control.step;
    slider.value = estadoSimulacion[control.variable];

    slider.addEventListener("input", () => {
      estadoSimulacion[control.variable] = Number(slider.value);
      actualizarSimulacion();

      const nuevoTexto = document.getElementById(`valor-${control.variable}`);
      if (nuevoTexto) {
        nuevoTexto.textContent =
          `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();
      }
    });

    grupo.appendChild(valorTexto);
    grupo.appendChild(slider);
  }

  if (control.tipo === "select") {
    const select = document.createElement("select");
    select.id = control.variable;
    select.className = "selector-asimetria";

    control.opciones.forEach((op) => {
      const option = document.createElement("option");
      option.value = op.valor;
      option.textContent = op.texto;
      if (estadoSimulacion[control.variable] === op.valor) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      estadoSimulacion[control.variable] = select.value;
      actualizarSimulacion();
    });

    grupo.appendChild(select);
  }

  contenedor.appendChild(grupo);
}

function actualizarControlesDesdeEstado() {
  const todos = [...controlesPrincipales, ...controlesAvanzados];

  todos.forEach((control) => {
    const elemento = document.getElementById(control.variable);
    if (!elemento) return;

    if (control.tipo === "checkbox") {
      elemento.checked = estadoSimulacion[control.variable];
      const texto = document.getElementById(`texto-${control.variable}`);
      if (texto) texto.textContent = estadoSimulacion[control.variable] ? "On" : "Off";
    } else if (control.tipo === "select") {
      elemento.value = estadoSimulacion[control.variable];
    } else {
      elemento.value = estadoSimulacion[control.variable];
      const texto = document.getElementById(`valor-${control.variable}`);
      if (texto) {
        const unidad = control.unidad || "";
        texto.textContent =
          `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${unidad}`.trim();
      }
    }
  });

  const radio2 = document.getElementById("radioPlanetaExterno");
  const masa2 = document.getElementById("masaPlanetaExterno");
  const asim = document.getElementById("modoAsimetria");

  if (radio2) radio2.disabled = !estadoSimulacion.modoDosPlanetas;
  if (masa2) masa2.disabled = !estadoSimulacion.modoDosPlanetas;
  if (asim) asim.disabled = !estadoSimulacion.modoDosPlanetas;
}


// --------------------------------------
// 9. PRESETS
// --------------------------------------

function aplicarPreset(nombrePreset) {
  const preset = presets[nombrePreset];
  if (!preset) return;

  Object.assign(estadoSimulacion, preset);
  estadoSimulacion.presetActual = nombrePreset;

  actualizarControlesDesdeEstado();
  sincronizarControlesVisuales();
  actualizarSimulacion();
}


// --------------------------------------
// 10. TOGGLES Y RESET
// --------------------------------------

function sincronizarControlesVisuales() {
  const tg = document.getElementById("toggle-gas");
  const tf = document.getElementById("toggle-polvo-fino");
  const tm = document.getElementById("toggle-polvo-mm");
  const tp = document.getElementById("toggle-planeta");
  const te = document.getElementById("toggle-etiquetas");
  const tpr = document.getElementById("toggle-presion");
  const sp = document.getElementById("selector-preset");

  if (tg) tg.checked = estadoSimulacion.mostrarGas;
  if (tf) tf.checked = estadoSimulacion.mostrarPolvoFino;
  if (tm) tm.checked = estadoSimulacion.mostrarPolvoMm;
  if (tp) tp.checked = estadoSimulacion.mostrarPlaneta;
  if (te) te.checked = estadoSimulacion.mostrarEtiquetas;
  if (tpr) tpr.checked = estadoSimulacion.mostrarPresion;
  if (sp) sp.value = estadoSimulacion.presetActual;
}

function configurarOpcionesVisuales() {
  const toggleGas = document.getElementById("toggle-gas");
  const togglePolvoFino = document.getElementById("toggle-polvo-fino");
  const togglePolvoMm = document.getElementById("toggle-polvo-mm");
  const togglePlaneta = document.getElementById("toggle-planeta");
  const toggleEtiquetas = document.getElementById("toggle-etiquetas");
  const togglePresion = document.getElementById("toggle-presion");
  const botonReset = document.getElementById("boton-reset");
  const selectorPreset = document.getElementById("selector-preset");

  if (toggleGas) {
    toggleGas.addEventListener("change", () => {
      estadoSimulacion.mostrarGas = toggleGas.checked;
      renderizarVistas();
    });
  }

  if (togglePolvoFino) {
    togglePolvoFino.addEventListener("change", () => {
      estadoSimulacion.mostrarPolvoFino = togglePolvoFino.checked;
      renderizarVistas();
    });
  }

  if (togglePolvoMm) {
    togglePolvoMm.addEventListener("change", () => {
      estadoSimulacion.mostrarPolvoMm = togglePolvoMm.checked;
      renderizarVistas();
    });
  }

  if (togglePlaneta) {
    togglePlaneta.addEventListener("change", () => {
      estadoSimulacion.mostrarPlaneta = togglePlaneta.checked;
      renderizarVistas();
    });
  }

  if (toggleEtiquetas) {
    toggleEtiquetas.addEventListener("change", () => {
      estadoSimulacion.mostrarEtiquetas = toggleEtiquetas.checked;
      renderizarVistas();
    });
  }

  if (togglePresion) {
    togglePresion.addEventListener("change", () => {
      estadoSimulacion.mostrarPresion = togglePresion.checked;
      renderizarVistas();
    });
  }

  if (selectorPreset) {
    selectorPreset.addEventListener("change", () => {
      aplicarPreset(selectorPreset.value);
    });
  }

  if (botonReset) {
    botonReset.addEventListener("click", () => {
      Object.assign(estadoSimulacion, modeloBase);
      actualizarControlesDesdeEstado();
      sincronizarControlesVisuales();
      actualizarSimulacion();
    });
  }
}


// --------------------------------------
// 11. DIBUJO DEL DISCO
// --------------------------------------

function mapearRadioVisual(r, rMax, radioVisualMax) {
  const x = clamp(r / Math.max(rMax, 1), 0, 1);
  return radioVisualMax * Math.pow(x, 0.75);
}

function dibujarAnillo(ctx, cx, cy, radioInterno, radioExterno, color) {
  if (radioExterno <= radioInterno) return;

  ctx.beginPath();
  ctx.arc(cx, cy, radioExterno, 0, 2 * Math.PI);
  ctx.arc(cx, cy, radioInterno, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function dibujarArco(ctx, cx, cy, radioInterno, radioExterno, angulo0, angulo1, color) {
  if (radioExterno <= radioInterno) return;

  ctx.beginPath();
  ctx.arc(cx, cy, radioExterno, angulo0, angulo1);
  ctx.arc(cx, cy, radioInterno, angulo1, angulo0, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function dibujarOrbita(ctx, cx, cy, radio, color = "rgba(255,255,255,0.16)") {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.arc(cx, cy, radio, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
}

function dibujarGlowCentral(ctx, cx, cy) {
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 85);
  glow.addColorStop(0, "rgba(255, 241, 166, 0.22)");
  glow.addColorStop(0.25, "rgba(255, 220, 130, 0.12)");
  glow.addColorStop(1, "rgba(255, 180, 80, 0.00)");

  ctx.beginPath();
  ctx.arc(cx, cy, 85, 0, 2 * Math.PI);
  ctx.fillStyle = glow;
  ctx.fill();
}

function dibujarCapaRadial(ctx, cx, cy, radios, perfil, tipo, rMax, radioVisualMax) {
  const perfilNorm = normalizarArray(perfil);

  let alphaMin = 0.03;
  let alphaMax = 0.22;

  if (tipo === "gas") {
    alphaMin = 0.04;
    alphaMax = 0.22;
  } else if (tipo === "polvoFino") {
    alphaMin = 0.03;
    alphaMax = 0.16;
  } else if (tipo === "polvoMm") {
    alphaMin = 0.05;
    alphaMax = 0.46;
  }

  for (let i = radios.length - 1; i > 0; i--) {
    const rIn = mapearRadioVisual(radios[i - 1], rMax, radioVisualMax);
    const rOut = mapearRadioVisual(radios[i], rMax, radioVisualMax);
    const intensidad = Math.pow(perfilNorm[i], 0.48);

    const alpha = alphaMin + (alphaMax - alphaMin) * intensidad;

    let color = "";
    if (tipo === "gas") {
      color = `rgba(75, 135, 255, ${alpha})`;
    } else if (tipo === "polvoFino") {
      color = `rgba(255, 236, 186, ${alpha})`;
    } else if (tipo === "polvoMm") {
      color = `rgba(255, 176, 78, ${alpha})`;
    }

    dibujarAnillo(ctx, cx, cy, rIn, rOut, color);
  }
}

function dibujarEtiqueta(ctx, texto, x, y, align = "left") {
  ctx.save();
  ctx.font = "12px sans-serif";
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(0,0,0,0.78)";
  ctx.strokeText(texto, x, y);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(texto, x, y);
  ctx.restore();
}

function dibujarAsimetria(ctx, cx, cy, rMax, radioVisualMax) {
  if (estadoSimulacion.modoAsimetriaActivo === "ninguna") return;

  const radioBase = estadoSimulacion.modoDosPlanetas
    ? estadoSimulacion.radioRing2
    : estadoSimulacion.radioRing1;

  const anchoBaseFisico = estadoSimulacion.modoDosPlanetas
    ? Math.max(0.22 * estadoSimulacion.anchoGap2, 3.0)
    : Math.max(0.22 * estadoSimulacion.anchoGap1, 3.0);

  const rIn = mapearRadioVisual(Math.max(radioBase - anchoBaseFisico, 0.5), rMax, radioVisualMax);
  const rOut = mapearRadioVisual(radioBase + anchoBaseFisico, rMax, radioVisualMax);

   if (estadoSimulacion.modoAsimetriaActivo === "excentricidad") {
    // Aquí queremos que la excentricidad se vea como una modulación
    // azimutal amplia y suave, no como un clump localizado.
    //
    // Para lograrlo hacemos:
    // 1) un arco principal más brillante
    // 2) un arco opuesto más tenue
    // 3) un refuerzo fino para que el contraste se note mejor

    const amp = estadoSimulacion.amplitudAsimetria;
    const centro = estadoSimulacion.anguloAsimetria;
    const anchoAzimutalPrincipal = 1.05;
    const anchoAzimutalSecundario = 0.80;

    // Lado más brillante
    dibujarArco(
      ctx,
      cx,
      cy,
      rIn,
      rOut,
      centro - anchoAzimutalPrincipal,
      centro + anchoAzimutalPrincipal,
      `rgba(255, 228, 170, ${0.16 + 0.34 * amp})`
    );

    // Lado opuesto más tenue
    dibujarArco(
      ctx,
      cx,
      cy,
      rIn,
      rOut,
      centro + Math.PI - anchoAzimutalSecundario,
      centro + Math.PI + anchoAzimutalSecundario,
      `rgba(255, 170, 70, ${0.05 + 0.10 * amp})`
    );

    // Refuerzo fino para que el ojo perciba mejor la asimetría
    dibujarArco(
      ctx,
      cx,
      cy,
      mapearRadioVisual(Math.max(radioBase - 0.35 * anchoBaseFisico, 0.5), rMax, radioVisualMax),
      mapearRadioVisual(radioBase + 0.20 * anchoBaseFisico, rMax, radioVisualMax),
      centro - 0.75,
      centro + 0.75,
      `rgba(255, 245, 210, ${0.08 + 0.14 * amp})`
    );
  }

  if (estadoSimulacion.modoAsimetriaActivo === "vortice") {
    const amp = estadoSimulacion.amplitudAsimetria;
    const centro = estadoSimulacion.anguloAsimetria;
    const medioAncho = 0.22;

    dibujarArco(
      ctx,
      cx,
      cy,
      rIn,
      rOut,
      centro - medioAncho,
      centro + medioAncho,
      `rgba(255, 220, 130, ${0.20 + 0.34 * amp})`
    );

    dibujarArco(
      ctx,
      cx,
      cy,
      mapearRadioVisual(Math.max(radioBase - 0.45 * anchoBaseFisico, 0.5), rMax, radioVisualMax),
      mapearRadioVisual(radioBase + 0.35 * anchoBaseFisico, rMax, radioVisualMax),
      centro - medioAncho * 0.65,
      centro + medioAncho * 0.65,
      `rgba(255, 150, 60, ${0.26 + 0.44 * amp})`
    );

    dibujarArco(
      ctx,
      cx,
      cy,
      mapearRadioVisual(Math.max(radioBase - 0.28 * anchoBaseFisico, 0.5), rMax, radioVisualMax),
      mapearRadioVisual(radioBase + 0.20 * anchoBaseFisico, rMax, radioVisualMax),
      centro - medioAncho * 0.42,
      centro + medioAncho * 0.42,
      `rgba(255, 245, 200, ${0.14 + 0.28 * amp})`
    );
  }
}

function dibujarDisco() {
  const canvas = document.getElementById("lienzo-disco");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const ancho = canvas.width;
  const alto = canvas.height;
  const cx = ancho / 2;
  const cy = alto / 2;

  ctx.clearRect(0, 0, ancho, alto);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ancho, alto);

  const rMax = Math.max(...estadoSimulacion.radios, 1);
  const radioVisualMax = 0.405 * Math.min(ancho, alto);

  dibujarGlowCentral(ctx, cx, cy);

  if (estadoSimulacion.mostrarGas) {
    dibujarCapaRadial(
      ctx,
      cx,
      cy,
      estadoSimulacion.radios,
      estadoSimulacion.perfilGas,
      "gas",
      rMax,
      radioVisualMax
    );
  }

  if (estadoSimulacion.mostrarPolvoFino) {
    dibujarCapaRadial(
      ctx,
      cx,
      cy,
      estadoSimulacion.radios,
      estadoSimulacion.perfilPolvoFino,
      "polvoFino",
      rMax,
      radioVisualMax
    );
  }

  // Gap planeta 1
  const gapAnchoFisico1 = Math.max(estadoSimulacion.anchoGap1, 2);
  const gap1InPix = mapearRadioVisual(
    Math.max(estadoSimulacion.radioPlaneta - gapAnchoFisico1 / 2, 0.5),
    rMax,
    radioVisualMax
  );
  const gap1OutPix = mapearRadioVisual(
    estadoSimulacion.radioPlaneta + gapAnchoFisico1 / 2,
    rMax,
    radioVisualMax
  );
  const gap1Oscuridad = 0.16 + 0.44 * clamp(1 - estadoSimulacion.profundidadGap1, 0, 1);
  dibujarAnillo(ctx, cx, cy, gap1InPix, gap1OutPix, `rgba(0, 0, 0, ${gap1Oscuridad})`);

  // Gap planeta 2
  if (estadoSimulacion.modoDosPlanetas) {
    const gapAnchoFisico2 = Math.max(estadoSimulacion.anchoGap2, 2);
    const gap2InPix = mapearRadioVisual(
      Math.max(estadoSimulacion.radioPlanetaExterno - gapAnchoFisico2 / 2, 0.5),
      rMax,
      radioVisualMax
    );
    const gap2OutPix = mapearRadioVisual(
      estadoSimulacion.radioPlanetaExterno + gapAnchoFisico2 / 2,
      rMax,
      radioVisualMax
    );
    const gap2Oscuridad = 0.16 + 0.44 * clamp(1 - estadoSimulacion.profundidadGap2, 0, 1);
    dibujarAnillo(ctx, cx, cy, gap2InPix, gap2OutPix, `rgba(0, 0, 0, ${gap2Oscuridad})`);
  }

  if (estadoSimulacion.mostrarPolvoMm) {
    dibujarCapaRadial(
      ctx,
      cx,
      cy,
      estadoSimulacion.radios,
      estadoSimulacion.perfilPolvoMm,
      "polvoMm",
      rMax,
      radioVisualMax
    );

    // Ring 1
    const ring1AnchoFisico = Math.max(0.22 * estadoSimulacion.anchoGap1, 2.5);
    const ring1InPix = mapearRadioVisual(
      Math.max(estadoSimulacion.radioRing1 - ring1AnchoFisico, 0.5),
      rMax,
      radioVisualMax
    );
    const ring1OutPix = mapearRadioVisual(
      estadoSimulacion.radioRing1 + ring1AnchoFisico,
      rMax,
      radioVisualMax
    );
    dibujarAnillo(ctx, cx, cy, ring1InPix, ring1OutPix, "rgba(255, 190, 90, 0.24)");

    // Ring 2
    if (estadoSimulacion.modoDosPlanetas) {
      const ring2AnchoFisico = Math.max(0.22 * estadoSimulacion.anchoGap2, 2.5);
      const ring2InPix = mapearRadioVisual(
        Math.max(estadoSimulacion.radioRing2 - ring2AnchoFisico, 0.5),
        rMax,
        radioVisualMax
      );
      const ring2OutPix = mapearRadioVisual(
        estadoSimulacion.radioRing2 + ring2AnchoFisico,
        rMax,
        radioVisualMax
      );
      dibujarAnillo(ctx, cx, cy, ring2InPix, ring2OutPix, "rgba(255, 190, 90, 0.20)");
    }
  }

  // Asimetría
  dibujarAsimetria(ctx, cx, cy, rMax, radioVisualMax);

  // Órbitas
  const orbitaPlaneta1Pix = mapearRadioVisual(estadoSimulacion.radioPlaneta, rMax, radioVisualMax);
  dibujarOrbita(ctx, cx, cy, orbitaPlaneta1Pix);

  let orbitaPlaneta2Pix = 0;
  if (estadoSimulacion.modoDosPlanetas) {
    orbitaPlaneta2Pix = mapearRadioVisual(estadoSimulacion.radioPlanetaExterno, rMax, radioVisualMax);
    dibujarOrbita(ctx, cx, cy, orbitaPlaneta2Pix, "rgba(255,255,255,0.12)");
  }

  // Estrella
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff2a8";
  ctx.shadowColor = "rgba(255, 240, 170, 0.7)";
  ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Planeta 1
  if (estadoSimulacion.mostrarPlaneta) {
    const xPlaneta1 = cx + orbitaPlaneta1Pix;
    const yPlaneta1 = cy;

    ctx.beginPath();
    ctx.arc(xPlaneta1, yPlaneta1, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff6b6b";
    ctx.fill();
  }

  // Planeta 2
  if (estadoSimulacion.modoDosPlanetas && estadoSimulacion.mostrarPlaneta) {
    const xPlaneta2 = cx + orbitaPlaneta2Pix * Math.cos(0.65);
    const yPlaneta2 = cy + orbitaPlaneta2Pix * Math.sin(0.65);

    ctx.beginPath();
    ctx.arc(xPlaneta2, yPlaneta2, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#8bd3ff";
    ctx.fill();
  }

  if (estadoSimulacion.mostrarEtiquetas) {
    const gasLabelR = mapearRadioVisual(0.72 * estadoSimulacion.radioGas, rMax, radioVisualMax);
    const dustLabelR = mapearRadioVisual(0.55 * estadoSimulacion.radioPolvo, rMax, radioVisualMax);
    const ring1LabelR = mapearRadioVisual(estadoSimulacion.radioRing1, rMax, radioVisualMax);

    dibujarEtiqueta(ctx, "Gas", cx - gasLabelR * 0.70, cy - gasLabelR * 0.62);
    dibujarEtiqueta(ctx, "Small dust", cx - dustLabelR * 0.55, cy - dustLabelR * 0.36);
    dibujarEtiqueta(ctx, "Mm ring 1", cx + ring1LabelR + 16, cy - 12);
    dibujarEtiqueta(ctx, "Star", cx + 12, cy - 10);
    dibujarEtiqueta(ctx, "Planet 1", cx + orbitaPlaneta1Pix + 14, cy + 12);

    if (estadoSimulacion.modoDosPlanetas) {
      const ring2LabelR = mapearRadioVisual(estadoSimulacion.radioRing2, rMax, radioVisualMax);
      dibujarEtiqueta(ctx, "Mm ring 2", cx + ring2LabelR + 16, cy + 18);

      const x2 = cx + orbitaPlaneta2Pix * Math.cos(0.65);
      const y2 = cy + orbitaPlaneta2Pix * Math.sin(0.65);
      dibujarEtiqueta(ctx, "Planet 2", x2 + 14, y2 + 12);
    }

        if (estadoSimulacion.modoAsimetriaActivo !== "ninguna") {
      let textoAsim = "Asymmetry: ";

      if (estadoSimulacion.modoAsimetriaActivo === "excentricidad") {
        textoAsim += "eccentric";
      } else if (estadoSimulacion.modoAsimetriaActivo === "vortice") {
        textoAsim += "vortex-like";
      } else {
        textoAsim += estadoSimulacion.modoAsimetriaActivo;
      }

      dibujarEtiqueta(ctx, textoAsim, 24, 22);
    }
  }
}


// --------------------------------------
// 12. GRÁFICA RADIAL
// --------------------------------------

function dibujarLeyendaPerfiles(ctx, x, y) {
  const entradas = [
    { texto: "Gas", color: "rgba(75, 135, 255, 1)" },
    { texto: "Small dust", color: "rgba(255, 235, 180, 1)" },
    { texto: "Mm dust", color: "rgba(255, 176, 78, 1)" }
  ];

  if (estadoSimulacion.mostrarPresion) {
    entradas.push({ texto: "Pressure proxy", color: "rgba(90, 255, 150, 1)" });
  }

  let offsetX = x;

  entradas.forEach((entrada) => {
    ctx.strokeStyle = entrada.color;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(offsetX, y);
    ctx.lineTo(offsetX + 18, y);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "12px sans-serif";
    ctx.fillText(entrada.texto, offsetX + 24, y + 4);

    offsetX += 138;
  });
}

function obtenerIndicesVisibles(radios, rMinVisible, rMaxVisible) {
  const indices = [];

  for (let i = 0; i < radios.length; i++) {
    if (radios[i] >= rMinVisible && radios[i] <= rMaxVisible) {
      indices.push(i);
    }
  }

  return indices;
}

function normalizarTramoVisible(perfil, indices) {
  if (!indices.length) return [];

  const valores = indices.map(i => perfil[i]);
  const maximo = Math.max(...valores, 1e-12);

  return valores.map(v => v / maximo);
}

function dibujarCurvaPerfil(ctx, perfil, radios, color, area, rMinVisible, rMaxVisible) {
  if (!perfil || perfil.length === 0) return;

  const { x0, y0, w, h } = area;
  const indices = obtenerIndicesVisibles(radios, rMinVisible, rMaxVisible);

  if (indices.length < 2) return;

  const perfilNorm = normalizarTramoVisible(perfil, indices);

  ctx.beginPath();

  indices.forEach((indiceReal, k) => {
    const r = radios[indiceReal];
    const valor = perfilNorm[k];

    const x = x0 + ((r - rMinVisible) / (rMaxVisible - rMinVisible)) * w;
    const y = y0 + h - valor * h;

    if (k === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.stroke();
}

function dibujarMarcadoresRadiales(ctx, area, rMinVisible, rMaxVisible) {
  const { x0, y0, w, h } = area;

  function xRadial(r) {
    return x0 + ((r - rMinVisible) / (rMaxVisible - rMinVisible)) * w;
  }

  if (
    estadoSimulacion.radioPlaneta >= rMinVisible &&
    estadoSimulacion.radioPlaneta <= rMaxVisible
  ) {
    const xPlaneta1 = xRadial(estadoSimulacion.radioPlaneta);

    ctx.beginPath();
    ctx.moveTo(xPlaneta1, y0);
    ctx.lineTo(xPlaneta1, y0 + h);
    ctx.strokeStyle = "rgba(255, 107, 107, 0.7)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "11px sans-serif";
    ctx.fillText("Planet 1", xPlaneta1 + 5, y0 + 14);
  }

  if (
    estadoSimulacion.radioRing1 >= rMinVisible &&
    estadoSimulacion.radioRing1 <= rMaxVisible
  ) {
    const xRing1 = xRadial(estadoSimulacion.radioRing1);

    ctx.beginPath();
    ctx.moveTo(xRing1, y0);
    ctx.lineTo(xRing1, y0 + h);
    ctx.strokeStyle = "rgba(255, 190, 90, 0.7)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "11px sans-serif";
    ctx.fillText("Ring 1", xRing1 + 5, y0 + 56);
  }

  if (estadoSimulacion.modoDosPlanetas) {
    if (
      estadoSimulacion.radioPlanetaExterno >= rMinVisible &&
      estadoSimulacion.radioPlanetaExterno <= rMaxVisible
    ) {
      const xPlaneta2 = xRadial(estadoSimulacion.radioPlanetaExterno);

      ctx.beginPath();
      ctx.moveTo(xPlaneta2, y0);
      ctx.lineTo(xPlaneta2, y0 + h);
      ctx.strokeStyle = "rgba(139, 211, 255, 0.7)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "11px sans-serif";
      ctx.fillText("Planet 2", xPlaneta2 + 5, y0 + 28);
    }

    if (
      estadoSimulacion.radioRing2 >= rMinVisible &&
      estadoSimulacion.radioRing2 <= rMaxVisible
    ) {
      const xRing2 = xRadial(estadoSimulacion.radioRing2);

      ctx.beginPath();
      ctx.moveTo(xRing2, y0);
      ctx.lineTo(xRing2, y0 + h);
      ctx.strokeStyle = "rgba(255, 210, 120, 0.7)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "11px sans-serif";
      ctx.fillText("Ring 2", xRing2 + 5, y0 + 42);
    }
  }

  ctx.setLineDash([]);
}

function dibujarEjesPerfiles(ctx, area, rMinVisible, rMaxVisible) {
  const { x0, y0, w, h } = area;

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(x0, y0 + h);
  ctx.lineTo(x0 + w, y0 + h);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y0 + h);
  ctx.stroke();

  for (let i = 0; i <= 4; i++) {
    const yy = y0 + (h * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x0, yy);
    ctx.lineTo(x0 + w, yy);
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.stroke();
  }

  const ticks = 5;
  for (let i = 0; i <= ticks; i++) {
    const frac = i / ticks;
    const xx = x0 + frac * w;
    const valor = Math.round(rMinVisible + frac * (rMaxVisible - rMinVisible));

    ctx.beginPath();
    ctx.moveTo(xx, y0 + h);
    ctx.lineTo(xx, y0 + h + 5);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "11px sans-serif";
    ctx.fillText(String(valor), xx - 8, y0 + h + 18);
  }

  for (let i = 0; i <= 4; i++) {
    const frac = i / 4;
    const yy = y0 + h - frac * h;
    const valor = frac.toFixed(1);

    ctx.beginPath();
    ctx.moveTo(x0 - 5, yy);
    ctx.lineTo(x0, yy);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "11px sans-serif";
    ctx.fillText(valor, x0 - 28, yy + 4);
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "12px sans-serif";
  ctx.fillText("Radius (AU)", x0 + w / 2 - 28, y0 + h + 36);

  ctx.save();
  ctx.translate(x0 - 42, y0 + h / 2 + 10);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Normalized profile", 0, 0);
  ctx.restore();
}

function dibujarGraficaRadial() {
  const canvas = document.getElementById("lienzo-perfiles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const ancho = canvas.width;
  const alto = canvas.height;

  ctx.clearRect(0, 0, ancho, alto);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ancho, alto);

  const area = {
    x0: 70,
    y0: 30,
    w: ancho - 110,
    h: alto - 78
  };

  const rMaxTotal = Math.max(...estadoSimulacion.radios, 1);
  const rMinVisible = 8;
  const rMaxVisible = rMaxTotal;

  dibujarEjesPerfiles(ctx, area, rMinVisible, rMaxVisible);

  if (estadoSimulacion.mostrarGas) {
    dibujarCurvaPerfil(
      ctx,
      estadoSimulacion.perfilGas,
      estadoSimulacion.radios,
      "rgba(75, 135, 255, 1)",
      area,
      rMinVisible,
      rMaxVisible
    );
  }

  if (estadoSimulacion.mostrarPolvoFino) {
    dibujarCurvaPerfil(
      ctx,
      estadoSimulacion.perfilPolvoFino,
      estadoSimulacion.radios,
      "rgba(255, 235, 180, 1)",
      area,
      rMinVisible,
      rMaxVisible
    );
  }

  if (estadoSimulacion.mostrarPolvoMm) {
    dibujarCurvaPerfil(
      ctx,
      estadoSimulacion.perfilPolvoMm,
      estadoSimulacion.radios,
      "rgba(255, 176, 78, 1)",
      area,
      rMinVisible,
      rMaxVisible
    );
  }

  if (estadoSimulacion.mostrarPresion) {
    dibujarCurvaPerfil(
      ctx,
      estadoSimulacion.perfilPresion,
      estadoSimulacion.radios,
      "rgba(90, 255, 150, 1)",
      area,
      rMinVisible,
      rMaxVisible
    );
  }

  dibujarMarcadoresRadiales(ctx, area, rMinVisible, rMaxVisible);
  dibujarLeyendaPerfiles(ctx, 92, 18);
}


// --------------------------------------
// 13. RENDER GENERAL
// --------------------------------------

function renderizarVistas() {
  dibujarDisco();
  dibujarGraficaRadial();
}

function actualizarSimulacion() {
  limitarEstado();
  calcularVariablesInternas();
  calcularPerfiles();
  actualizarTextoParametros();
  renderizarVistas();
}


// --------------------------------------
// 14. INICIO
// --------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  crearControles();
  configurarOpcionesVisuales();
  actualizarControlesDesdeEstado();
  sincronizarControlesVisuales();
  actualizarSimulacion();
});