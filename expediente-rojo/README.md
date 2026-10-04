# Expediente Rojo · web promocional

Landing para presentar una línea de juegos de mesa en los que hay que resolver un asesinato con pruebas físicas y digitales.

HTML, CSS y JavaScript sin dependencias ni proceso de build. Abre `index.html` en el navegador o sírvelo con cualquier servidor estático (`npx serve .`).

## Secciones

1. **Hero**: gradientes animados, efecto linterna que sigue al cursor (esconde un mensaje), titular con glitch.
2. **La caja**: tarjetas que giran con los tipos de prueba (informe forense, audios, planos, declaraciones, cifrados, registros, fotos, prensa).
3. **Cómo se juega**: cuatro pasos, sistema de pistas, puntuación.
4. **Niveles**: pestañas Fácil / Medio / Difícil / Muy difícil, cada una con su caso, duración, nº de pruebas y cuánta ayuda recibe el jugador.
5. **Caso de prueba jugable** («El último brindis»): 4 sospechosos que se pueden descartar, 10 pruebas (audio con voz sintetizada, plano interactivo, nota con cifrado César, registro de cerradura…), 3 pistas progresivas, temporizador, 3 intentos y verificación de culpable + método + móvil con rango final y reconstrucción del caso.
6. **Diferenciales**, **lista de espera** y **FAQ**.

## Pendiente antes de publicar

- **Nombre y marca**: «Expediente Rojo» es provisional.
- **Lista de espera**: ahora solo guarda en `localStorage`. Hay que conectarla a un proveedor (MailerLite, Brevo, etc.) en el bloque `LISTA DE ESPERA` de `app.js`.
- **Precios, fechas y datos de los casos medio/difícil/muy difícil**: son propuestas de contenido, ajústalos a lo que vayáis a producir.
- **Audio real**: el mensaje de voz usa la síntesis de voz del navegador; en producción, sustituir por una grabación.

La solución del caso de prueba está en `app.js` (codificada en base64 para que no salte a la vista).
