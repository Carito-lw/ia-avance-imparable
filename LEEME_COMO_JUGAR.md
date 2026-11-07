# IA: Avance Imparable — Edición Web Nativa

Videojuego arcade 2D educativo sobre Inteligencia Artificial, privacidad, sesgos y uso responsable.
Corre, salta, esquiva malware y derrota jefes mientras tomas decisiones breves que explican conceptos reales y afectan las recompensas de la partida.
Desarrollado con **HTML5 Canvas, CSS3 y JavaScript (Vanilla ES6+)**.

---

## 🚀 Cómo jugar (1 solo clic)

Tienes dos formas directas de jugarlo:

1. **Opción Rápida (Recomendada):**  
   Haz doble clic sobre el archivo **`jugar.bat`** en la carpeta principal.  
   *Se iniciará automáticamente un servidor local y se abrirá tu navegador web predeterminado.*

2. **Opción Manual:**  
   Entra a la carpeta `ia-avance-imparable-web` y abre el archivo **`index.html`** directamente con tu navegador favorito (Chrome, Edge, Firefox, Brave).

---

## 🎮 Controles

* **Mover a Lucas:** Teclas `A` / `D` o las `Flechas Izquierda / Derecha`.
* **Saltar:** `Espacio`, `W` o `Flecha Arriba` (doble salto al conseguir las botas cuánticas en el mundo 1-4).
* **Disparar:** `F` o `E` cuando tengas el bláster.
* **Pausar / continuar:** `P`.
* **Subniveles secretos:** acércate al portal verde y pulsa `S` o `Flecha Abajo`; usa el portal azul para salir.
* **Móvil o pantalla táctil:** gira el teléfono a horizontal y usa los botones en pantalla, incluido `▼` para entrar o salir de portales. Al jugar se intenta activar pantalla completa; usa `⛶` para entrar o salir si el navegador lo permite.
* **Mundo 1-6, bajo el agua:** mantén `Espacio` / `▲` para nadar hacia arriba y `S` / `▼` para bucear; en pantalla táctil mantén los botones para impulsarte.
* **Decisiones educativas y menús:** clic o toque sobre las opciones.
* **Sonido:** Botón 🔊 en la esquina superior derecha para silenciar o reactivar el audio.

---

## 📦 Contenido incluido

* **Mundo 1-1 — La Red Local:** elección sobre permisos y principio de recopilar solo los datos necesarios.
* **Mundo 1-2 — La Ciudad Conectada:** detección del sesgo causado por datos poco representativos.
* **Mundo 1-3 — El Núcleo Central:** explicabilidad, derecho a revisar decisiones automatizadas y batalla contra el Guardián Corrupto, una IA blindada que protege el núcleo.
* **Mundo 1-4 — La Nube Cuántica y Estación Orbital:** uso responsable y supervisión humana.
* **Mundo 1-5 — El Archivo de las Decisiones:** plataformas de bóveda, láseres y drones; responsabilidad y rendición de cuentas cuando una IA causa daño.
* **Mundo 1-6 — El Abismo de Datos:** Lucas nada y bucea por cardúmenes, peces corruptos, medusas eléctricas, ruinas y chorros de presión; privacidad y minimización de datos en una reserva marina.
* Las decisiones correctas dan recompensas útiles; cada opción muestra una explicación para aprender sin salir de la partida.
* Una respuesta correcta puede dar Firewall, Bláster, tiempo, Overclock y vidas extra. Una respuesta incorrecta resta 500 puntos y una vida.
* Las vidas no tienen un tope de tres: se acumulan entre mundos, y cada 100 Data-Bits concede una vida. El contador del HUD muestra el total.
* Los cubos de Bláster ⚡, Firewall 🛡 y Overclock ★ vuelven a activarse tras un breve tiempo cuando pierdes la mejora. Al recibir un impacto sin Firewall, Lucas pierde el Bláster y puede recuperarlo en otro cubo ⚡.
* Hay dos subniveles opcionales: la **Cámara Secreta** y el **Túnel de Datos**. Conservan el estado del mundo principal al entrar y volver; las mejoras y Data-Bits que recojas se suman a la campaña.
* Cada mundo da 7 minutos. Si el tiempo se agota, pierdes una vida y recibes un minuto adicional.
* El progreso y las decisiones de la campaña se guardan en este navegador y se retoman al iniciar. “Jugar campaña completa de nuevo” borra ese progreso.

## Ampliar la campaña

Los mundos se construyen en `game.js` mediante `buildLevel1` a `buildLevel6`, y se seleccionan desde `loadLevel`. Para agregar un mundo: crea su función `buildLevelN`, registra su identificador en `loadLevel`, añade su reto educativo en `checkEthicsChallenge`, y actualiza el mapa de avance y los textos de victoria. Los activos de imagen y audio están en `assets/`.
