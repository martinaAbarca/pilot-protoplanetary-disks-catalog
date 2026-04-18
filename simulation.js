// ======================================
// SIMULACIÓN SINTÉTICA DE DISCO PROTOPLANETARIO
// Base inicial de variables y configuración
// ======================================

// --------------------------------------
// 1. ESTADO PRINCIPAL DE LA SIMULACIÓN
// --------------------------------------
// Aquí se guarda TODO lo que usa el simulador.
// Algunas variables las modifica el usuario con sliders.
// Otras son calculadas internamente.

const estadoSimulacion = {
  // -----------------------------
  // PARÁMETROS GLOBALES DEL DISCO
  // -----------------------------
  radioPolvo: 120,              // AU
  radioGas: 220,                // AU
  masaDisco: 1.0,               // factor adimensional respecto al modelo base
  indiceFlaring: 1.25,          // exponente de flaring
  temperaturaBase: 200,         // K a 1 AU, valor de referencia del modelo
  masaEstelar: 1.0,             // masas solares, fija en V1

  // -----------------------------
  // PLANETA PRINCIPAL
  // -----------------------------
  radioPlaneta: 40,             // AU
  masaPlaneta: 1.0,             // masas de Júpiter
  relacionAspecto: 0.05,        // h_p = H(Rp)/Rp
  alfaTurb: 1e-3,               // viscosidad / turbulencia efectiva
  velocidadFragmentacion: 10,   // m/s

  // -----------------------------
  // OPCIONES AVANZADAS (V2)
  // -----------------------------
  modoDosPlanetas: false,
  radioPlanetaExterno: 80,      // AU
  masaPlanetaExterno: 5.0,      // masas de Júpiter
  modoAsimetria: "ninguna",     // "ninguna", "excentricidad", "vortice"

  // -----------------------------
  // OPCIONES DE VISUALIZACIÓN
  // -----------------------------
  mostrarGas: true,
  mostrarPolvoFino: true,
  mostrarPolvoMm: true,
  mostrarPlaneta: true,
  mostrarEtiquetas: true,

  // -----------------------------
  // VARIABLES INTERNAS CALCULADAS
  // -----------------------------
  radioHill: 0,                 // AU
  parametroK: 0,                // adimensional
  profundidadGap: 1.0,          // Sigma_p / Sigma_0
  abreGap: false,               // true o false
  anchoGap: 0,                  // AU

  // perfiles radiales
  radios: [],                   // AU
  perfilGas: [],
  perfilPolvoFino: [],
  perfilPolvoMm: [],
  perfilTemperatura: [],
  perfilScaleHeight: []
};

// ======================================
// 2. CONFIGURACIÓN DE CONTROLES
// ======================================

const controlesPrincipales = [
  {
    variable: "radioPolvo",
    etiqueta: "Dust outer radius",
    unidad: "AU",
    min: 30,
    max: 250,
    step: 1
  },
  {
    variable: "radioGas",
    etiqueta: "Gas outer radius",
    unidad: "AU",
    min: 60,
    max: 400,
    step: 1
  },
  {
    variable: "masaDisco",
    etiqueta: "Disk density",
    unidad: "x base",
    min: 0.3,
    max: 3.0,
    step: 0.1
  },
  {
    variable: "radioPlaneta",
    etiqueta: "Planet orbital radius",
    unidad: "AU",
    min: 5,
    max: 120,
    step: 1
  },
  {
    variable: "masaPlaneta",
    etiqueta: "Planet mass",
    unidad: "M_Jup",
    min: 0.1,
    max: 10,
    step: 0.1
  },
  {
    variable: "relacionAspecto",
    etiqueta: "Disk thickness h/r",
    unidad: "",
    min: 0.03,
    max: 0.10,
    step: 0.005
  },
  {
    variable: "alfaTurb",
    etiqueta: "Turbulence α",
    unidad: "",
    min: 0.0001,
    max: 0.01,
    step: 0.0001
  },
  {
    variable: "indiceFlaring",
    etiqueta: "Flaring",
    unidad: "",
    min: 1.10,
    max: 1.50,
    step: 0.01
  },
  {
    variable: "velocidadFragmentacion",
    etiqueta: "Fragmentation velocity",
    unidad: "m/s",
    min: 5,
    max: 30,
    step: 1
  }
];

// ======================================
// 3. FUNCIONES AUXILIARES
// ======================================

function formatearValor(variable, valor) {
  if (variable === "alfaTurb") {
    return Number(valor).toExponential(1);
  }

  if (variable === "relacionAspecto" || variable === "indiceFlaring") {
    return Number(valor).toFixed(3);
  }

  if (variable === "masaDisco" || variable === "masaPlaneta") {
    return Number(valor).toFixed(1);
  }

  return Number(valor).toFixed(0);
}

function limitarEstado() {
  if (estadoSimulacion.radioGas < estadoSimulacion.radioPolvo) {
    estadoSimulacion.radioGas = estadoSimulacion.radioPolvo;
  }
}

function calcularVariablesInternas() {
  const q = estadoSimulacion.masaPlaneta * 0.001;
  const h = estadoSimulacion.relacionAspecto;
  const alpha = estadoSimulacion.alfaTurb;
  const rp = estadoSimulacion.radioPlaneta;

  estadoSimulacion.radioHill = rp * Math.pow(q / 3, 1 / 3);
  estadoSimulacion.parametroK = (q * q) * Math.pow(h, -5) / alpha;
  estadoSimulacion.profundidadGap = 1 / (1 + 0.04 * estadoSimulacion.parametroK);

  const criterioGap =
    (3 / 4) * (h * rp / Math.max(estadoSimulacion.radioHill, 1e-6)) +
    50 / Math.max(q * (rp * rp / Math.max(alpha, 1e-6)), 1e-6);

  estadoSimulacion.abreGap = criterioGap <= 1;

  const anchoBase = rp * (0.08 + 0.12 * estadoSimulacion.masaPlaneta / 10);
  const factorViscosidad = 1 + 8 * alpha;
  const factorEspesor = 1 + 6 * h;
  estadoSimulacion.anchoGap = anchoBase * factorViscosidad * factorEspesor;
}

function actualizarTextoParametros() {
  const texto = document.getElementById("texto-parametros");
  if (!texto) return;

  texto.innerHTML = `
    Dust radius: <strong>${formatearValor("radioPolvo", estadoSimulacion.radioPolvo)} AU</strong><br>
    Gas radius: <strong>${formatearValor("radioGas", estadoSimulacion.radioGas)} AU</strong><br>
    Planet radius: <strong>${formatearValor("radioPlaneta", estadoSimulacion.radioPlaneta)} AU</strong><br>
    Planet mass: <strong>${formatearValor("masaPlaneta", estadoSimulacion.masaPlaneta)} M_Jup</strong><br>
    h/r: <strong>${formatearValor("relacionAspecto", estadoSimulacion.relacionAspecto)}</strong><br>
    α: <strong>${formatearValor("alfaTurb", estadoSimulacion.alfaTurb)}</strong><br>
    Gap depth Σp/Σ0: <strong>${estadoSimulacion.profundidadGap.toFixed(3)}</strong><br>
    Gap opening: <strong>${estadoSimulacion.abreGap ? "Yes" : "No / partial"}</strong>
  `;
}

// ======================================
// 4. CREAR CONTROLES EN LA PÁGINA
// ======================================

function crearControles() {
  const contenedor = document.getElementById("contenedor-controles");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  controlesPrincipales.forEach((control) => {
    const grupo = document.createElement("div");
    grupo.style.marginBottom = "1rem";

    const etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", control.variable);
    etiqueta.style.display = "block";
    etiqueta.style.fontWeight = "600";
    etiqueta.style.marginBottom = "0.25rem";
    etiqueta.textContent = control.etiqueta;

    const valorTexto = document.createElement("div");
    valorTexto.id = `valor-${control.variable}`;
    valorTexto.style.fontSize = "0.95rem";
    valorTexto.style.marginBottom = "0.35rem";
    valorTexto.textContent = `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();

    const slider = document.createElement("input");
    slider.type = "range";
    slider.id = control.variable;
    slider.min = control.min;
    slider.max = control.max;
    slider.step = control.step;
    slider.value = estadoSimulacion[control.variable];
    slider.style.width = "100%";

    slider.addEventListener("input", () => {
      estadoSimulacion[control.variable] = Number(slider.value);
      limitarEstado();
      calcularVariablesInternas();
      actualizarTextoParametros();
      dibujarDisco();

      valorTexto.textContent =
        `${formatearValor(control.variable, estadoSimulacion[control.variable])} ${control.unidad}`.trim();

      if (control.variable === "radioPolvo") {
        const valorRadioGas = document.getElementById("radioGas");
        const textoRadioGas = document.getElementById("valor-radioGas");

        if (valorRadioGas) {
          valorRadioGas.value = estadoSimulacion.radioGas;
        }
        if (textoRadioGas) {
          textoRadioGas.textContent =
            `${formatearValor("radioGas", estadoSimulacion.radioGas)} AU`;
        }
      }
    });

    grupo.appendChild(etiqueta);
    grupo.appendChild(valorTexto);
    grupo.appendChild(slider);
    contenedor.appendChild(grupo);
  });
}

// ======================================
// 5. DIBUJO DEL DISCO
// ======================================

function dibujarCirculo(ctx, x, y, radio, color) {
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function dibujarAnillo(ctx, x, y, radioInterno, radioExterno, color) {
  ctx.beginPath();
  ctx.arc(x, y, radioExterno, 0, 2 * Math.PI);
  ctx.arc(x, y, radioInterno, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
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

  // Fondo
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ancho, alto);

  const radioMaximoFisico = Math.max(estadoSimulacion.radioGas, 250);
  const escala = 200 / radioMaximoFisico;

  const radioGasPx = estadoSimulacion.radioGas * escala;
  const radioPolvoPx = estadoSimulacion.radioPolvo * escala;
  const radioPlanetaPx = estadoSimulacion.radioPlaneta * escala;
  const anchoGapPx = estadoSimulacion.anchoGap * escala;

  // Gas
  if (estadoSimulacion.mostrarGas) {
    dibujarCirculo(ctx, cx, cy, radioGasPx, "rgba(80, 140, 255, 0.15)");
  }

  // Polvo fino
  if (estadoSimulacion.mostrarPolvoFino) {
    dibujarCirculo(ctx, cx, cy, radioPolvoPx, "rgba(255, 220, 120, 0.12)");
  }

  // Gap principal
  const factorProfundidad = 1 - estadoSimulacion.profundidadGap;
  const opacidadGap = 0.15 + 0.55 * factorProfundidad;

  dibujarAnillo(
    ctx,
    cx,
    cy,
    Math.max(radioPlanetaPx - anchoGapPx / 2, 0),
    radioPlanetaPx + anchoGapPx / 2,
    `rgba(0, 0, 0, ${opacidadGap})`
  );

  // Ring exterior simple
  const radioRingPx = (estadoSimulacion.radioPlaneta + 1.3 * estadoSimulacion.anchoGap) * escala;
  const anchoRingPx = Math.max(6, 0.25 * anchoGapPx);

  if (estadoSimulacion.mostrarPolvoMm) {
    dibujarAnillo(
      ctx,
      cx,
      cy,
      Math.max(radioRingPx - anchoRingPx / 2, 0),
      radioRingPx + anchoRingPx / 2,
      "rgba(255, 180, 80, 0.40)"
    );
  }

  // Estrella central
  dibujarCirculo(ctx, cx, cy, 8, "#fff2a8");

  // Planeta
  if (estadoSimulacion.mostrarPlaneta) {
    dibujarCirculo(ctx, cx + radioPlanetaPx, cy, 4, "#ff6b6b");
  }

  // Etiquetas
  if (estadoSimulacion.mostrarEtiquetas) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px sans-serif";
    ctx.fillText("Star", cx + 12, cy - 10);
    ctx.fillText("Planet", cx + radioPlanetaPx + 8, cy - 8);
    ctx.fillText("Gas", cx - radioGasPx + 10, cy - radioGasPx - 8);
    ctx.fillText("Dust", cx - radioPolvoPx + 10, cy - radioPolvoPx + 12);
  }
}

// ======================================
// 6. ACTUALIZACIÓN GENERAL
// ======================================

function actualizarSimulacion() {
  limitarEstado();
  calcularVariablesInternas();
  actualizarTextoParametros();
  dibujarDisco();
}

// ======================================
// 7. INICIO
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  crearControles();
  actualizarSimulacion();
});