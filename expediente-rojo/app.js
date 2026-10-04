(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* modo privado: seguimos sin guardar */ }
    },
    remove(key) { try { localStorage.removeItem(key); } catch { /* nada */ } }
  };

  /* ---------- NAV, PROGRESO, MENÚ ---------- */
  const nav = $(".nav");
  const bar = $(".scroll-progress span");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- LINTERNA EN EL HERO ---------- */
  const hero = $("#hero");
  const hidden = $(".hidden-message");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    hero.style.setProperty("--mx", x + "px");
    hero.style.setProperty("--my", y + "px");
    hero.classList.add("lit");
    const hr = hidden.getBoundingClientRect();
    const d = Math.hypot(e.clientX - (hr.left + hr.width / 2), e.clientY - (hr.top + hr.height / 2));
    hidden.style.setProperty("--reveal", Math.max(0, 1 - d / 220).toFixed(2));
  });
  hero.addEventListener("pointerleave", () => hero.classList.remove("lit"));

  /* ---------- APARICIÓN AL HACER SCROLL ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const siblings = [...en.target.parentElement.children].filter(c => c.classList.contains("reveal"));
      en.target.style.transitionDelay = Math.min(siblings.indexOf(en.target), 6) * 80 + "ms";
      en.target.classList.add("in");
      io.unobserve(en.target);
    });
  }, { threshold: .12 });
  const observeReveal = root => $$(".reveal", root).forEach(el => io.observe(el));
  observeReveal(document);

  /* tarjetas que giran: en móvil, al tocar */
  $$(".flip").forEach(f => {
    f.addEventListener("click", () => f.classList.toggle("flipped"));
    f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f.classList.toggle("flipped"); } });
  });

  /* inclinación y foco de luz en las tarjetas de diferenciales */
  if (!reduceMotion) {
    $$(".tilt").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(800px) rotateX(${(.5 - py) * 8}deg) rotateY(${(px - .5) * 10}deg)`;
        card.style.setProperty("--px", px * 100 + "%");
        card.style.setProperty("--py", py * 100 + "%");
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- NIVELES ---------- */
  const LEVELS = [
    {
      name: "Fácil", color: "var(--easy)", bars: 1, status: "Primer lanzamiento",
      title: "El último brindis", setting: "Bodega Lander, La Rioja · 2026",
      synopsis: "Un bodeguero muere envenenado en su fiesta de sesenta cumpleaños, delante de cuarenta invitados. Cuatro sospechosos, una sola copa con veneno. Ideal para estrenarse.",
      stats: [["Duración", "60–90 min"], ["Jugadores", "1–4"], ["Pruebas", "15"], ["Sospechosos", "4"]],
      includes: ["Informe forense", "Buzón de voz", "Plano de la bodega", "Registro de cerradura", "Nota cifrada"],
      help: "Tres etapas guiadas. Cada sobre te dice qué tienes que averiguar antes de abrir el siguiente."
    },
    {
      name: "Medio", color: "var(--mid)", bars: 2, status: "En desarrollo",
      title: "Marea baja", setting: "Faro de Punta Anxeles, Costa da Morte · 1994",
      synopsis: "El farero aparece al pie del acantilado la noche del temporal. Su diario se interrumpe a medianoche. La marea decide quién pudo llegar hasta el faro y quién no.",
      stats: [["Duración", "2–3 h"], ["Jugadores", "1–5"], ["Pruebas", "30"], ["Sospechosos", "5"]],
      includes: ["Tabla de mareas", "Cintas de radio", "Carta náutica", "Diario cifrado", "Fotos con reloj de fondo"],
      help: "Objetivos por etapas, pero con pistas falsas. Hay que cruzar las horas de la marea con cada coartada."
    },
    {
      name: "Difícil", color: "var(--hard)", bars: 3, status: "En desarrollo",
      title: "Habitación 214", setting: "Hotel Imperial, Madrid · 1977",
      synopsis: "Un periodista muere en su habitación la víspera de publicar un reportaje. El hotel está lleno, la centralita lo registra todo y nadie dice la verdad completa.",
      stats: [["Duración", "3–4 h"], ["Jugadores", "1–6"], ["Pruebas", "45"], ["Sospechosos", "6"]],
      includes: ["Libro de registro", "Centralita a la que puedes llamar", "Planos de dos plantas", "Negativos fotográficos", "Cifrado de libro"],
      help: "Sin objetivos intermedios explícitos. Dos testigos mienten, pero por motivos que no tienen nada que ver con el crimen."
    },
    {
      name: "Muy difícil", color: "var(--extreme)", bars: 4, status: "En desarrollo",
      title: "Protocolo Medusa", setting: "Laboratorio Helix, Barcelona · 2031",
      synopsis: "Una investigadora muere en una sala blanca con acceso biométrico. Tienes la intranet de la empresa, sus correos y los registros de cada puerta. Y más de un culpable.",
      stats: [["Duración", "2 sesiones de 3 h"], ["Jugadores", "2–6"], ["Pruebas", "70+"], ["Sospechosos", "8"]],
      includes: ["Intranet con contraseñas", "Correos internos", "Logs de acceso", "Audios con ruido que filtrar", "Cifrado Vigenère"],
      help: "Ni objetivos ni orden recomendado. Las pistas solo orientan por categoría. Para ganar hay que explicar la secuencia completa."
    }
  ];
  const stage = $("#levelStage");
  const tabs = $$(".lvl-tab");
  const renderLevel = i => {
    const l = LEVELS[i];
    tabs.forEach((t, j) => t.setAttribute("aria-selected", String(i === j)));
    stage.innerHTML = `
      <article class="level-card" style="--c:${l.color}">
        <div>
          <span class="badge">${l.name} · ${l.status}</span>
          <h3>${l.title}</h3>
          <p class="setting">${l.setting}</p>
          <p class="synopsis">${l.synopsis}</p>
          <div class="meter" aria-label="Dificultad ${l.bars} de 4">${[1, 2, 3, 4].map(n => `<i class="${n <= l.bars ? "on" : ""}" style="animation-delay:${n * 90}ms"></i>`).join("")}</div>
          <p class="help"><strong>Cuánta ayuda tienes:</strong> ${l.help}</p>
        </div>
        <div>
          <div class="stats">${l.stats.map(([k, v]) => `<div class="stat"><span>${k}</span><strong>${v}</strong></div>`).join("")}</div>
          <ul class="includes">${l.includes.map(x => `<li>${x}</li>`).join("")}</ul>
          ${i === 0 ? `<p style="margin-top:1.5rem"><a class="btn btn-glow" href="#demo">Probar una parte ahora</a></p>` : ""}
        </div>
      </article>`;
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => renderLevel(i));
    t.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[n].focus(); renderLevel(n);
    });
  });
  renderLevel(0);

  /* ---------- CASO DE PRUEBA ---------- */
  const SUSPECTS = [
    { id: "elena", name: "Elena Lander", role: "Esposa, 52 años", g: "linear-gradient(135deg,#6b3fa0,#d7263d)", bio: "Casada con Octavio desde hace 25 años. Heredaría la mitad de la bodega." },
    { id: "bruno", name: "Bruno Lander", role: "Hijo, 28 años", g: "linear-gradient(135deg,#1f6f8b,#3ccf91)", bio: "Le debe dinero a gente poco recomendable. Su padre se negó a ayudarle." },
    { id: "clara", name: "Clara Ibarra", role: "Enóloga, 35 años", g: "linear-gradient(135deg,#a8541d,#f4c95d)", bio: "Preparó las copas del brindis. Se rumoreaba que Octavio iba a despedirla." },
    { id: "martin", name: "Martín Sáez", role: "Socio, 58 años", g: "linear-gradient(135deg,#444,#8c1023)", bio: "Socio desde hace quince años. Quería vender la bodega a un grupo francés." }
  ];

  const wave = n => Array.from({ length: n }, (_, i) => `<i style="--i:${i};--h:${20 + Math.round(Math.abs(Math.sin(i * 1.7)) * 75)}%"></i>`).join("");

  const EVIDENCE = [
    {
      id: 1, icon: "📄", tag: "Prueba 1 · Instituto de Medicina Legal", title: "Informe forense preliminar",
      html: `<div class="doc">
        <p><strong>Fallecido:</strong> Octavio Lander Ruiz, 60 años.</p>
        <p><strong>Causa de la muerte:</strong> parada cardiaca por intoxicación aguda con <mark>digitoxina</mark>.</p>
        <p><strong>Ingestión estimada:</strong> entre las <mark>22:00 y las 22:20</mark>, compatible con el brindis (22:12).</p>
        <p><strong>Análisis toxicológico:</strong></p>
        <table><tr><th>Muestra</th><th>Resultado</th></tr>
          <tr><td>Copa grabada «60» (la de la víctima)</td><td><mark>POSITIVO</mark></td></tr>
          <tr><td>Botella del brindis</td><td>Negativo</td></tr>
          <tr><td>Resto de copas (39)</td><td>Negativo</td></tr>
          <tr><td>Restos de la cena</td><td>Negativo</td></tr></table>
        <p><strong>Historia clínica:</strong> la víctima no tomaba ninguna medicación cardiaca.</p>
        <p class="note">Firmado: Dra. Inés Calvo, médico forense.</p></div>`
    },
    {
      id: 2, icon: "🎙️", tag: "Prueba 2 · Buzón de voz de Martín Sáez", title: "Mensaje de voz, 19:12",
      audio: "Martín, soy Octavio. He revisado las facturas de Logroño. Todas. El lunes a primera hora llamo al auditor. Esta noche no quiero hablar de ello, es mi cumpleaños. Pero que lo sepas.",
      html: `<div class="player" id="player">
          <div class="meta"><span>De: Octavio Lander</span><span>Sábado · 19:12 · 0:14</span></div>
          <div class="wave">${wave(48)}</div>
          <button class="btn btn-sm" id="playBtn">▶ Escuchar</button>
          <button class="btn btn-ghost btn-sm" id="transBtn">Ver transcripción</button>
        </div>
        <div class="transcript" id="transcript" hidden></div>
        <p class="note">El mensaje se reproduce con la voz de tu navegador. En el juego real es una grabación con actor.</p>`
    },
    {
      id: 3, icon: "🗺️", tag: "Prueba 3 · Planta baja", title: "Plano de la bodega",
      map: true,
      html: `<div class="map-wrap">
        <svg viewBox="0 0 600 380" role="group" aria-label="Plano interactivo de la bodega">
          <rect class="room" data-room="jardin" tabindex="0" x="10" y="10" width="180" height="360"/><text class="room-label" x="60" y="190">JARDÍN</text>
          <rect class="room" data-room="comedor" tabindex="0" x="200" y="10" width="240" height="190"/><text class="room-label" x="285" y="110">COMEDOR</text>
          <rect class="room" data-room="cocina" tabindex="0" x="450" y="10" width="140" height="120"/><text class="room-label" x="490" y="75">COCINA</text>
          <rect class="room" data-room="catas" tabindex="0" x="450" y="140" width="140" height="110"/><text class="room-label" x="462" y="200">SALA DE CATAS</text>
          <rect class="room" data-room="banos" tabindex="0" x="450" y="260" width="140" height="110"/><text class="room-label" x="495" y="320">BAÑOS</text>
          <rect class="room" data-room="despacho" tabindex="0" x="200" y="210" width="115" height="160"/><text class="room-label" x="218" y="295">DESPACHO</text>
          <rect class="room" data-room="barricas" tabindex="0" x="325" y="210" width="115" height="100"/><text class="room-label" x="345" y="265">BARRICAS</text>
          <rect class="room" data-room="entrada" tabindex="0" x="325" y="320" width="115" height="50"/><text class="room-label" x="350" y="350">ENTRADA</text>
        </svg></div>
        <div class="map-info" id="mapInfo">Toca una sala para ver las notas del inspector.</div>`
    },
    {
      id: 4, icon: "🔑", tag: "Prueba 4 · Sistema de control de accesos", title: "Registro de la cerradura de la sala de catas",
      html: `<div class="doc">
        <p>Puerta con lector de tarjeta. Sábado, de 20:00 a 23:00.</p>
        <table><tr><th>Hora</th><th>Tarjeta</th><th>Observación</th></tr>
          <tr><td>21:20</td><td>C. IBARRA</td><td>Entrada (preparación de copas)</td></tr>
          <tr><td>21:56</td><td><mark>M. SÁEZ</mark></td><td>Entrada</td></tr>
          <tr><td>22:08</td><td>C. IBARRA</td><td>Entrada (recogida de bandeja)</td></tr></table>
        <p class="note">La tarjeta de socio de Martín Sáez abre todas las puertas del edificio. Elena y Bruno no tienen tarjeta para esta sala.</p></div>`
    },
    {
      id: 5, icon: "🗂️", tag: "Prueba 5 · Comisaría de Haro", title: "Declaraciones",
      html: `<div class="doc">
        <div class="stmt"><strong>Elena Lander</strong>«Estuve en el jardín con los invitados desde las nueve y media hasta que nos llamaron a la mesa, sobre las diez y cinco.»</div>
        <div class="stmt"><strong>Bruno Lander</strong>«Estuve en el despacho de mi padre revisando unos papeles. No vi a nadie.»</div>
        <div class="stmt"><strong>Clara Ibarra</strong>«Preparé las copas con Andrés a las nueve y veinte. Volvimos juntos a por la bandeja justo antes del brindis. No me separé de él.»</div>
        <div class="stmt"><strong>Martín Sáez</strong>«Me sentó mal la cena. Estuve en el baño de diez menos diez a diez, más o menos. Luego fui directo al comedor.»</div>
        <div class="stmt"><strong>Andrés Quiroga (chef, testigo)</strong>«Clara no salió de la cocina en toda la noche, salvo las dos veces que fuimos a la sala de catas. Las dos veces fue conmigo.»</div></div>`
    },
    {
      id: 6, icon: "💊", tag: "Prueba 6 · Guardarropa", title: "Receta hallada en una chaqueta",
      html: `<div class="doc">
        <p>Encontrada en el bolsillo interior de una americana gris, colgada en el guardarropa con el ticket nº 14.</p>
        <table><tr><td>Paciente</td><td><mark>Martín Sáez Ortega</mark></td></tr>
          <tr><td>Medicamento</td><td>Digitoxina 0,1 mg · 20 comprimidos</td></tr>
          <tr><td>Pauta</td><td>1 comprimido al día</td></tr>
          <tr><td>Dispensado</td><td>Jueves (hace 2 días)</td></tr></table>
        <p>El blíster que acompaña la receta tiene <mark>12 huecos vacíos</mark>.</p>
        <p class="note">Nota del inspector: con esa pauta deberían faltar dos o tres.</p></div>`
    },
    {
      id: 7, icon: "📸", tag: "Prueba 7 · Fotógrafo del evento", title: "Foto del aperitivo en el jardín",
      html: `<figure class="polaroid"><div class="pic"><span style="left:20%"></span><span style="left:34%"></span><span style="left:48%;height:26%"></span><span style="left:64%"></span><span style="left:78%"></span></div>
        <span class="stampdate">SÁB 21:58</span><figcaption>Elena Lander (tercera por la izquierda) con invitados</figcaption></figure>
        <p class="note">El fotógrafo confirma que Elena estuvo en el grupo durante toda la sesión, de 21:45 a 22:05.</p>`
    },
    {
      id: 8, icon: "🧾", tag: "Prueba 8 · Cartera de Bruno Lander", title: "Ticket de aparcamiento y chat",
      html: `<div class="doc">
        <table><tr><td>Parking Plaza Mayor · Haro</td><td></td></tr>
          <tr><td>Entrada</td><td><mark>21:52</mark></td></tr>
          <tr><td>Salida</td><td><mark>22:04</mark></td></tr>
          <tr><td>Importe</td><td>0,60 €</td></tr></table>
        <p>En su móvil, un mensaje enviado a las 21:41 a un contacto guardado como «K»: <em>«Tengo lo tuyo. Te lo bajo ahora a la plaza.»</em></p>
        <p class="note">La bodega está a diez minutos en coche de la plaza. Varios invitados vieron entrar a Bruno en el comedor justo cuando empezaba el brindis.</p></div>`
    },
    {
      id: 9, icon: "🔐", tag: "Prueba 9 · Agenda de Octavio Lander", title: "Nota cifrada",
      cipher: "PDUWLQ PH URED",
      html: `<div class="cipher">
        <p>En la página del sábado, escrito a lápiz, y debajo: «Lunes 9:00 — auditor».</p>
        <p class="code">PDUWLQ PH URED</p>
        <p>Octavio cifraba sus notas desplazando cada letra del alfabeto. Mueve la rueda hasta que el texto tenga sentido.</p>
        <input type="range" min="0" max="25" value="0" id="shift" aria-label="Desplazamiento">
        <p>Desplazamiento: <strong id="shiftVal">0</strong></p>
        <p class="out" id="cipherOut">PDUWLQ PH URED</p></div>`
    },
    {
      id: 10, icon: "📰", tag: "Prueba 10 · La Gaceta del Ebro", title: "Recorte de prensa (hace un mes)",
      html: `<div class="newspaper"><h4>Un grupo francés quiere comprar Bodegas Lander</h4>
        <p>El grupo Vauclair ha ofrecido 14 millones de euros por la bodega de Haro. Según fuentes cercanas, Octavio Lander se niega a vender, mientras que su socio, Martín Sáez, sería partidario de aceptar la oferta.</p>
        <p>La familia Lander mantiene el 60 % de la propiedad. En el sector se comenta además que la bodega prepara cambios en su equipo técnico, empezando por la dirección enológica, que ocupa Clara Ibarra desde 2021.</p></div>`
    }
  ];

  const ROOMS = {
    jardin: "Jardín: aperitivo de 21:30 a 22:05. La foto de la prueba 7 se hizo aquí.",
    comedor: "Comedor: cena y brindis a las 22:12. Las copas llegaron en una bandeja desde la sala de catas.",
    cocina: "Cocina: el chef Andrés Quiroga y Clara Ibarra trabajaron aquí toda la noche.",
    catas: "Sala de catas: aquí se prepararon las copas, entre ellas la de Octavio, grabada con un «60». Puerta con tarjeta (prueba 4).",
    banos: "Baños: al final del pasillo, a diez pasos de la puerta de la sala de catas.",
    despacho: "Despacho: el guarda asegura que la luz estuvo apagada toda la noche.",
    barricas: "Sala de barricas: cerrada con llave. Nadie entró.",
    entrada: "Entrada: da al aparcamiento. Haro queda a diez minutos en coche."
  };

  const HINTS = [
    "El forense lo deja claro: el veneno estaba en una sola copa, no en la botella ni en la comida. ¿Quién pudo estar a solas con esa copa?",
    "Compara cada declaración con el registro de la cerradura, el ticket y la foto. Tres coartadas se sostienen o se explican. Una no.",
    "La nota de la agenda usa un desplazamiento de 3 letras. Léela junto al mensaje de voz de las 19:12."
  ];

  // solución codificada para que no salte a la vista al leer el código
  const SOLUTION = atob("bWFydGlufGNvcGF8ZGVzZmFsY28=").split("|");

  const KEY = "er-demo-v1";
  const fresh = () => ({ seen: [], ruled: [], hints: 0, tries: 3, start: null, elapsed: 0, solved: false, score: null });
  let state = Object.assign(fresh(), store.get(KEY, {}));
  const save = () => store.set(KEY, state);

  // tarjetas de sospechosos
  const suspectsEl = $("#suspects");
  const renderSuspects = () => {
    suspectsEl.innerHTML = SUSPECTS.map(s => `
      <button class="suspect reveal in ${state.ruled.includes(s.id) ? "ruled-out" : ""}" data-id="${s.id}" aria-pressed="${state.ruled.includes(s.id)}">
        <div class="avatar" style="--g:${s.g}">${s.name.split(" ").map(w => w[0]).join("")}</div>
        <h4>${s.name}</h4><p class="role">${s.role}</p><p>${s.bio}</p>
      </button>`).join("");
  };
  suspectsEl.addEventListener("click", e => {
    const b = e.target.closest(".suspect"); if (!b) return;
    const id = b.dataset.id;
    state.ruled = state.ruled.includes(id) ? state.ruled.filter(x => x !== id) : [...state.ruled, id];
    save(); renderSuspects();
  });

  // tablero de pruebas
  const board = $("#board");
  const renderBoard = () => {
    board.innerHTML = EVIDENCE.map((ev, i) => `
      <button class="ev-card ${state.seen.includes(ev.id) ? "seen" : ""}" data-id="${ev.id}" style="--r:${((i * 37) % 7) - 3}deg">
        <span class="ev-n">Nº ${String(ev.id).padStart(2, "0")}</span>
        <span class="ev-type" aria-hidden="true">${ev.icon}</span>
        <strong>${ev.title}</strong>
      </button>`).join("");
    $("#seenCount").textContent = `${state.seen.length}/${EVIDENCE.length}`;
  };
  board.addEventListener("click", e => {
    const c = e.target.closest(".ev-card"); if (!c) return;
    openEvidence(Number(c.dataset.id));
  });

  // temporizador
  const timerEl = $("#timer");
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const elapsed = () => state.solved || !state.start ? state.elapsed : state.elapsed + Math.floor((Date.now() - state.start) / 1000);
  const startTimer = () => { if (!state.start && !state.solved) { state.start = Date.now(); save(); } };
  setInterval(() => { timerEl.textContent = fmt(elapsed()); }, 1000);
  // al volver a la página, no contamos el tiempo que estuvo cerrada
  window.addEventListener("pagehide", () => {
    if (state.start && !state.solved) { state.elapsed = elapsed(); state.start = null; save(); }
  });
  if (state.start) { state.start = Date.now(); }

  /* ---------- MODAL ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  const openModal = (tag, title, html) => {
    lastFocus = document.activeElement;
    $("#modalTag").textContent = tag;
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  };
  const closeModal = () => {
    stopAudio();
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") { // mantener el foco dentro del modal
      const f = $$("button, input, select, [tabindex='0']", modal).filter(el => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  function openEvidence(id) {
    const ev = EVIDENCE.find(x => x.id === id);
    startTimer();
    if (!state.seen.includes(id)) { state.seen.push(id); save(); renderBoard(); }
    openModal(ev.tag, ev.title, ev.html);
    if (ev.audio) setupAudio(ev.audio);
    if (ev.map) setupMap();
    if (ev.cipher) setupCipher(ev.cipher);
  }

  /* audio: tono de buzón + síntesis de voz */
  let audioCtx = null;
  function stopAudio() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    const p = $("#player"); if (p) p.classList.remove("playing");
  }
  function beep() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = 880; g.gain.value = .08;
      o.connect(g).connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + .35);
    } catch { /* sin audio, no pasa nada */ }
  }
  function setupAudio(text) {
    const player = $("#player"), play = $("#playBtn"), trans = $("#transcript");
    trans.textContent = "«" + text + "»";
    $("#transBtn").addEventListener("click", () => { trans.hidden = !trans.hidden; });
    const canSpeak = "speechSynthesis" in window;
    if (!canSpeak) { play.disabled = true; play.textContent = "Audio no disponible"; trans.hidden = false; return; }
    play.addEventListener("click", () => {
      if (player.classList.contains("playing")) { stopAudio(); play.textContent = "▶ Escuchar"; return; }
      beep();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-ES"; u.rate = .92; u.pitch = .8;
      const voice = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith("es"));
      if (voice) u.voice = voice;
      u.onend = () => { player.classList.remove("playing"); play.textContent = "▶ Escuchar"; };
      setTimeout(() => speechSynthesis.speak(u), 450);
      player.classList.add("playing"); play.textContent = "■ Parar";
    });
  }

  function setupMap() {
    const info = $("#mapInfo");
    $$(".room", modal).forEach(r => {
      const show = () => {
        $$(".room", modal).forEach(x => x.classList.remove("active"));
        r.classList.add("active");
        info.textContent = ROOMS[r.dataset.room];
      };
      r.addEventListener("click", show);
      r.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
    });
  }

  function setupCipher(code) {
    const range = $("#shift"), out = $("#cipherOut"), val = $("#shiftVal");
    const decode = (s, k) => s.replace(/[A-Z]/g, ch => String.fromCharCode(((ch.charCodeAt(0) - 65 - k + 26) % 26) + 65));
    range.addEventListener("input", () => {
      const k = Number(range.value);
      val.textContent = k;
      const txt = decode(code, k);
      out.textContent = txt;
      out.classList.toggle("solved", k === 3);
    });
  }

  /* ---------- PISTAS ---------- */
  const hintBtn = $("#hintBtn"), hintList = $("#hintList");
  const renderHints = () => {
    hintList.innerHTML = HINTS.slice(0, state.hints).map(h => `<li>${h}</li>`).join("");
    $("#hintCount").textContent = `${state.hints}/${HINTS.length}`;
    hintBtn.disabled = state.hints >= HINTS.length || state.solved;
    hintBtn.textContent = state.hints >= HINTS.length ? "No quedan más pistas" : "Pedir una pista (−10 puntos)";
  };
  hintBtn.addEventListener("click", () => {
    if (state.hints >= HINTS.length) return;
    startTimer();
    state.hints++; save(); renderHints();
  });

  /* ---------- ACUSACIÓN ---------- */
  const form = $("#accuseForm"), verdict = $("#verdict"), tryEl = $("#tryCount");
  const LABELS = { who: "Culpable", how: "Método", why: "Móvil" };
  const rankFor = s => s >= 90 ? "Inspector jefe" : s >= 70 ? "Detective" : s >= 50 ? "Agente" : "Becario de comisaría";

  const renderTries = () => {
    tryEl.textContent = state.tries;
    const btn = $("button[type=submit]", form);
    btn.disabled = state.solved || state.tries <= 0;
  };

  const showSolved = () => {
    verdict.innerHTML = `<div class="box ok">
      <p class="kicker" style="color:var(--ok)">Caso cerrado</p>
      <p class="rank">${rankFor(state.score)} · ${state.score} puntos</p>
      <p>Tiempo: ${fmt(state.elapsed)} · Pistas: ${state.hints} · Intentos fallidos: ${3 - state.tries}</p>
      <div class="reconstruction">
        <p><strong>Qué pasó.</strong> Octavio descubrió que su socio llevaba años desviando dinero con facturas falsas de Logroño y se lo dijo en un mensaje de voz a las 19:12: el lunes llamaría al auditor.</p>
        <p>Martín Sáez dijo que estaba en el baño, pero a las 21:56 su tarjeta abrió la sala de catas, a diez pasos. Disolvió su propia digitoxina en la copa grabada con el «60», la única que iba a beber Octavio. Por eso solo esa copa dio positivo y en su blíster faltaban muchos más comprimidos de la cuenta.</p>
        <p>Las demás pistas eran ruido: Bruno mintió para ocultar que estaba pagando una deuda en Haro (el ticket lo sitúa fuera), Elena sale en la foto del jardín y Clara nunca estuvo sola con las copas.</p>
      </div></div>`;
  };

  const showFailed = () => {
    verdict.innerHTML = `<div class="box ko"><p><strong>Sin intentos.</strong> El juez archiva el caso por falta de pruebas.</p>
      <p>Puedes reiniciar y volver a intentarlo. En el juego completo, la web te muestra la reconstrucción completa también cuando fallas.</p></div>`;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (state.solved || state.tries <= 0) return;
    const data = new FormData(form);
    const answer = ["who", "how", "why"].map(k => data.get(k));
    if (answer.some(a => !a)) {
      verdict.innerHTML = `<div class="box ko"><p>Te falta algo. Una acusación necesita culpable, método y móvil.</p></div>`;
      return;
    }
    startTimer();
    const hits = answer.map((a, i) => a === SOLUTION[i]);
    if (hits.every(Boolean)) {
      state.elapsed = elapsed(); state.start = null; state.solved = true;
      const minutes = Math.floor(state.elapsed / 60);
      const timePenalty = Math.max(0, Math.floor((minutes - 20) / 5)) * 2;
      state.score = Math.max(10, 100 - state.hints * 10 - (3 - state.tries) * 15 - timePenalty);
      save(); renderTries(); renderHints(); showSolved();
      celebrate();
      return;
    }
    state.tries--; save(); renderTries();
    form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
    if (state.tries <= 0) { showFailed(); return; }
    const right = hits.filter(Boolean).length;
    verdict.innerHTML = `<div class="box ko">
      <p><strong>${right === 0 ? "No encaja nada." : right === 1 ? "Vas por buen camino, pero no." : "Casi. Hay una pieza que no cuadra."}</strong></p>
      <ul class="parts">${["who", "how", "why"].map((k, i) => `<li>${hits[i] ? "✅" : "❌"} ${LABELS[k]}</li>`).join("")}</ul>
      <p>Te quedan ${state.tries} ${state.tries === 1 ? "intento" : "intentos"}.</p></div>`;
  });

  function celebrate() {
    if (reduceMotion) return;
    const colors = ["#d7263d", "#f4a259", "#3ccf91", "#ece8e1"];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement("span");
      const size = 6 + Math.random() * 8;
      Object.assign(p.style, {
        position: "fixed", left: 50 + (Math.random() - .5) * 30 + "vw", top: "-20px", width: size + "px", height: size * .4 + "px",
        background: colors[i % colors.length], zIndex: 90, pointerEvents: "none", borderRadius: "2px"
      });
      document.body.appendChild(p);
      p.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${(Math.random() - .5) * 400}px, ${window.innerHeight + 60}px) rotate(${Math.random() * 720}deg)`, opacity: .8 }
      ], { duration: 1800 + Math.random() * 1400, easing: "cubic-bezier(.2,.6,.4,1)" }).onfinish = () => p.remove();
    }
  }

  $("#resetCase").addEventListener("click", () => {
    if (!confirm("¿Seguro? Se borra tu progreso en este caso.")) return;
    store.remove(KEY);
    state = fresh();
    form.reset(); verdict.innerHTML = "";
    renderAll();
  });

  function renderAll() {
    renderSuspects(); renderBoard(); renderHints(); renderTries();
    timerEl.textContent = fmt(elapsed());
    if (state.solved) showSolved(); else if (state.tries <= 0) showFailed();
  }
  renderAll();

  /* texto a máquina del informe inicial */
  const brief = $("#briefText");
  const fullText = brief.dataset.text;
  if (reduceMotion) { brief.textContent = fullText; brief.classList.add("done"); }
  else {
    const typeIO = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      typeIO.disconnect();
      let i = 0;
      const tick = () => {
        brief.textContent = fullText.slice(0, ++i);
        if (i < fullText.length) setTimeout(tick, fullText[i - 1] === "." ? 260 : 22);
        else brief.classList.add("done");
      };
      tick();
    }, { threshold: .4 });
    typeIO.observe(brief);
  }

  /* ---------- LISTA DE ESPERA ---------- */
  // Solo en el navegador. Conectar con el proveedor de email que se elija (MailerLite, etc.).
  const waitForm = $("#waitForm"), waitMsg = $("#waitMsg");
  waitForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = $("#email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      waitMsg.textContent = "Ese correo no parece válido. Revísalo.";
      return;
    }
    const list = store.get("er-waitlist", []);
    if (!list.some(x => x.email === email)) list.push({ email, level: $("#pref").value, at: new Date().toISOString() });
    store.set("er-waitlist", list);
    waitMsg.textContent = "Apuntado. Te escribimos cuando el primer expediente esté listo.";
    waitForm.reset();
  });
})();
