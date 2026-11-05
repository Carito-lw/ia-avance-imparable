/**
 * IA: AVANCE IMPARABLE — CYBER PLATFORMER (MARIO STYLE 4-WORLD SAGA)
 * Mundo 1-1: La Red Local (Fundamentos y Pisotón)
 * Mundo 1-2: La Ciudad Conectada (Drones y Plataformas Móviles)
 * Mundo 1-3: El Núcleo Central (Matrix, Blaster Láser y Jefe Mega-Glitch)
 * Mundo 1-4: La Nube Cuántica & Estación Orbital (Doble Salto, Trampolines, Barras Láser y Phishing Drones)
 */

// --- CONFIGURACIÓN PRINCIPAL ---
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

// Constantes físicas estilo Mario
const GRAVITY = 0.58;
const MAX_FALL_SPEED = 14;
const RUN_ACCEL = 0.65;
const BASE_MAX_SPEED = 6.2;
const OVERCLOCK_MAX_SPEED = 9.4;
const FRICTION = 0.84;
const JUMP_FORCE_INITIAL = -11.2;
const JUMP_HOLD_BOOST = -0.42;
const MAX_JUMP_FRAMES = 14;
const STOMP_BOUNCE = -10.5;

// ========================================================
// SINTETIZADOR DE AUDIO RETRO (Web Audio API Arcade Synth)
// ========================================================
class RetroAudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.music = new Audio('assets/audio/music_ambient.mp3');
    this.music.loop = true;
    this.music.volume = 0.4;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.playMusic();
  }

  playMusic() {
    if (this.muted) return;
    this.music.play().catch(() => {});
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.music.pause();
    } else {
      this.playMusic();
    }
    return !this.muted;
  }

  playCoin() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playJump() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(490, now + 0.16);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playDoubleJump() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.14);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playSpring() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  playStomp() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playBlockBump() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  playLaserShot() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  playPowerup() {
    if (this.muted || !this.ctx) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    });
  }

  playHurt() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  playBossExplosion() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.8);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  playFanfare() {
    if (this.muted || !this.ctx) return;
    this.music.pause();
    const melody = [
      { f: 523.25, d: 0.14 },
      { f: 659.25, d: 0.14 },
      { f: 783.99, d: 0.14 },
      { f: 1046.50, d: 0.28 },
      { f: 880.00, d: 0.16 },
      { f: 1046.50, d: 0.55 }
    ];

    let t = this.ctx.currentTime + 0.1;
    melody.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + n.d);
      t += n.d + 0.04;
    });
  }
}

// ========================================================
// CONTROLES DE ENTRADA
// ========================================================
class InputState {
  constructor() {
    this.left = false;
    this.right = false;
    this.jump = false;
    this.jumpJustPressed = false;
    this.down = false;
    this.shootJustPressed = false;

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.right = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.down = true;
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (!this.jump) this.jumpJustPressed = true;
        this.jump = true;
        e.preventDefault();
      }
      if (e.code === 'KeyF' || e.code === 'KeyE') {
        this.shootJustPressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.right = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.down = false;
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        this.jump = false;
        this.jumpJustPressed = false;
      }
      if (e.code === 'KeyF' || e.code === 'KeyE') {
        this.shootJustPressed = false;
      }
    });
  }
}

// ========================================================
// PARTICULAS Y TEXTOS FLOTANTES
// ========================================================
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatTexts = [];
  }

  emit(x, y, count, color = '#00f3ff') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.0;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 3 + Math.random() * 4,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.03
      });
    }
  }

  addText(x, y, text, color = '#ffd700') {
    this.floatTexts.push({
      x, y, text, color,
      vy: -2,
      alpha: 1,
      decay: 0.025
    });
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }
    for (let i = this.floatTexts.length - 1; i >= 0; i--) {
      const t = this.floatTexts[i];
      t.y += t.vy;
      t.alpha -= t.decay;
      if (t.alpha <= 0) this.floatTexts.splice(i, 1);
    }
  }

  draw(ctx, cameraX) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - cameraX, p.y, p.size, p.size);
      ctx.restore();
    });

    this.floatTexts.forEach(t => {
      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.font = 'bold 16px "Press Start 2P", monospace';
      ctx.fillStyle = t.color;
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
      ctx.fillText(t.text, t.x - cameraX, t.y);
      ctx.restore();
    });
  }
}

// ========================================================
// PROYECTIL LÁSER CUÁNTICO
// ========================================================
class LaserProjectile {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.vx = dir * 9;
    this.vy = 2.5;
    this.width = 16;
    this.height = 16;
    this.alive = true;
    this.bounces = 0;
  }

  update(platforms, game) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.45;

    platforms.forEach(plat => {
      if (
        this.x + this.width > plat.x &&
        this.x < plat.x + plat.width &&
        this.y + this.height >= plat.y &&
        this.y + this.height <= plat.y + 16 &&
        this.vy > 0
      ) {
        this.y = plat.y - this.height;
        this.vy = -6;
        this.bounces++;
        if (this.bounces > 4) this.alive = false;
      }
    });

    if (this.y > CANVAS_HEIGHT + 50) this.alive = false;

    game.enemies.forEach(enemy => {
      if (!enemy.alive) return;
      if (
        this.x + this.width > enemy.x &&
        this.x < enemy.x + enemy.width &&
        this.y + this.height > enemy.y &&
        this.y < enemy.y + enemy.height
      ) {
        this.alive = false;
        enemy.stomp();
        game.sound.playStomp();
        game.addScore(250);
        game.particles.emit(enemy.x + 20, enemy.y + 15, 18, '#00f3ff');
        game.particles.addText(enemy.x, enemy.y - 10, '+250', '#00f3ff');
      }
    });

    if (game.boss && game.boss.alive) {
      const b = game.boss;
      if (
        this.x + this.width > b.x &&
        this.x < b.x + b.width &&
        this.y + this.height > b.y &&
        this.y < b.y + b.height
      ) {
        this.alive = false;
        b.takeHit(game, 1);
        game.particles.emit(this.x, this.y, 14, '#ff0055');
      }
    }
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    ctx.save();
    ctx.fillStyle = '#00f3ff';
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(rx + 8, this.y + 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(rx + 8, this.y + 8, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ========================================================
// NUEVOS ELEMENTOS DE NIVEL 4 (ORBITAL & ATHLETIC)
// ========================================================

// 1. Trampolín / Nodo de Rebote Cuántico
class BouncePad {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 46;
    this.height = 20;
    this.compress = 0;
  }

  update() {
    if (this.compress > 0) this.compress -= 0.1;
  }

  trigger(player, game) {
    player.vy = -16.8;
    player.onGround = false;
    this.compress = 1;
    game.sound.playSpring();
    game.particles.emit(this.x + 23, this.y, 16, '#10b981');
    game.particles.addText(this.x - 4, this.y - 20, '¡BOING!', '#10b981');
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    const squishH = this.compress * 8;
    ctx.save();
    ctx.fillStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.fillRect(rx, this.y + squishH, this.width, this.height - squishH);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, this.y + squishH, this.width, this.height - squishH);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▲', rx + this.width / 2, this.y + this.height - 4);
    ctx.restore();
  }
}

// 2. Barras Láser Giratorias (Firebars clásicas de Mario)
class LaserBar {
  constructor(x, y, length = 110, speed = 0.025, arms = 2) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = 0;
    this.speed = speed;
    this.arms = arms;
  }

  update() {
    this.angle += this.speed;
  }

  checkCollision(player, game) {
    for (let a = 0; a < this.arms; a++) {
      const curAngle = this.angle + (a * Math.PI * 2) / this.arms;
      const endX = this.x + Math.cos(curAngle) * this.length;
      const endY = this.y + Math.sin(curAngle) * this.length;

      // Colisión línea contra caja del jugador
      const px = player.x + player.width / 2;
      const py = player.y + player.height / 2;
      const dist = this.distToSegment(px, py, this.x, this.y, endX, endY);
      if (dist < 26) {
        player.takeDamage(game);
        break;
      }
    }
  }

  distToSegment(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    ctx.save();
    // Nodo central
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(rx, this.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brazos láser giratorios
    for (let a = 0; a < this.arms; a++) {
      const curAngle = this.angle + (a * Math.PI * 2) / this.arms;
      const endX = rx + Math.cos(curAngle) * this.length;
      const endY = this.y + Math.sin(curAngle) * this.length;

      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(rx, this.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Esferas de plasma a lo largo del rayo
      for (let f = 0.25; f <= 1.0; f += 0.25) {
        const sx = rx + Math.cos(curAngle) * (this.length * f);
        const sy = this.y + Math.sin(curAngle) * (this.length * f);
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

// 3. Dron Satelital de Phishing (Lakitu Orbital)
class PhishingDrone {
  constructor(x, y, rangeX = 350) {
    this.startX = x;
    this.x = x;
    this.y = y;
    this.width = 54;
    this.height = 42;
    this.rangeX = rangeX;
    this.vx = 2.0;
    this.alive = true;
    this.squished = false;
    this.squishTimer = 0;
    this.dropTimer = 0;
  }

  update(game) {
    if (!this.alive) {
      this.squishTimer += 1 / 60;
      return;
    }

    this.x += this.vx;
    if (this.x < this.startX - this.rangeX) {
      this.x = this.startX - this.rangeX;
      this.vx = Math.abs(this.vx);
    } else if (this.x > this.startX + this.rangeX) {
      this.x = this.startX + this.rangeX;
      this.vx = -Math.abs(this.vx);
    }

    // Suelta periódicamente trampas de spam
    this.dropTimer += 1 / 60;
    if (this.dropTimer > 3.2) {
      this.dropTimer = 0;
      if (Math.abs(this.x - game.player.x) < 450) {
        game.enemies.push(new SpamMine(this.x + 18, this.y + 40));
        game.particles.emit(this.x + 24, this.y + 40, 6, '#ffd700');
      }
    }
  }

  stomp() {
    this.alive = false;
    this.squished = true;
  }

  draw(ctx, cameraX) {
    if (!this.alive && this.squishTimer > 0.4) return;
    const rx = this.x - cameraX;
    const ry = this.y;

    ctx.save();
    if (this.squished) {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(rx, ry + 20, this.width, 10);
      ctx.restore();
      return;
    }

    // Nube / Dron Satélite
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(rx + 6, ry + 10, this.width - 12, this.height - 18);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx + 6, ry + 10, this.width - 12, this.height - 18);

    // Paneles solares desplegados a los lados
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(rx - 12, ry + 14, 16, 12);
    ctx.fillRect(rx + this.width - 4, ry + 14, 16, 12);

    // Antena con luz parpadeante
    ctx.strokeStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(rx + this.width / 2, ry + 10);
    ctx.lineTo(rx + this.width / 2, ry - 6);
    ctx.stroke();

    ctx.fillStyle = '#ff0055';
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(rx + this.width / 2, ry - 6, 4, 0, Math.PI * 2);
    ctx.fill();

    // Carita de phishing
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(rx + 16, ry + 18, 6, 6);
    ctx.fillRect(rx + 32, ry + 18, 6, 6);
    ctx.restore();
  }
}

// 4. Mina de Spam / Malware descendente
class SpamMine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 28;
    this.vy = 2.2;
    this.alive = true;
    this.squished = false;
    this.squishTimer = 0;
  }

  update() {
    if (!this.alive) {
      this.squishTimer += 1 / 60;
      return;
    }
    this.y += this.vy;
    if (this.y > CANVAS_HEIGHT + 60) this.alive = false;
  }

  stomp() {
    this.alive = false;
    this.squished = true;
  }

  draw(ctx, cameraX) {
    if (!this.alive && this.squishTimer > 0.3) return;
    const rx = this.x - cameraX;
    const ry = this.y;

    ctx.save();
    // Paracaídas de datos
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rx + 12, ry - 4, 12, Math.PI, 0);
    ctx.stroke();
    ctx.lineTo(rx + 12, ry + 4);

    // Mina
    ctx.fillStyle = '#ff0055';
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 8;
    ctx.fillRect(rx + 4, ry + 4, 16, 16);
    ctx.restore();
  }
}

// ========================================================
// ENTIDADES BASE
// ========================================================

class DataBit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 32;
    this.collected = false;
    this.animOffset = Math.random() * Math.PI * 2;
  }

  update() {
    this.floatY = Math.sin(Date.now() / 200 + this.animOffset) * 4;
  }

  draw(ctx, cameraX) {
    if (this.collected) return;
    const rx = this.x - cameraX;
    const ry = this.y + this.floatY;

    ctx.save();
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 12;

    ctx.fillStyle = '#00f3ff';
    ctx.beginPath();
    ctx.moveTo(rx + this.width / 2, ry);
    ctx.lineTo(rx + this.width, ry + this.height / 2);
    ctx.lineTo(rx + this.width / 2, ry + this.height);
    ctx.lineTo(rx, ry + this.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(rx + this.width / 2, ry + this.height / 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class MysteryBlock {
  constructor(x, y, content = 'coin') {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 48;
    this.content = content; // 'coin', 'shield', 'overclock', 'laser', 'wings'
    this.used = false;
    this.bounceY = 0;
    this.bouncing = false;
  }

  hit(game) {
    if (this.used || this.bouncing) return;
    this.bouncing = true;
    this.used = true;
    game.sound.playBlockBump();

    let bumpTime = 0;
    const bumpInterval = setInterval(() => {
      bumpTime += 0.2;
      this.bounceY = -Math.sin(bumpTime) * 12;
      if (bumpTime >= Math.PI) {
        clearInterval(bumpInterval);
        this.bounceY = 0;
        this.bouncing = false;
      }
    }, 16);

    if (this.content === 'coin') {
      game.addBits(1);
      game.addScore(100);
      game.sound.playCoin();
      game.particles.emit(this.x + 24, this.y, 14, '#ffd700');
      game.particles.addText(this.x + 10, this.y - 15, '+100', '#ffd700');
    } else if (this.content === 'shield') {
      game.player.hasShield = true;
      game.addScore(500);
      game.sound.playPowerup();
      game.particles.emit(this.x + 24, this.y, 20, '#00f3ff');
      game.particles.addText(this.x - 10, this.y - 20, '¡FIREWALL!', '#00f3ff');
      game.triggerNexusMsg('¡Firewall activado! Te protegerá de un impacto.');
    } else if (this.content === 'overclock') {
      game.player.activateOverclock();
      game.addScore(1000);
      game.sound.playPowerup();
      game.particles.emit(this.x + 24, this.y, 30, '#ffd700');
      game.particles.addText(this.x - 20, this.y - 20, '¡OVERCLOCK! ★', '#ffd700');
      game.triggerNexusMsg('¡OVERCLOCK! Velocidad e invencibilidad.');
    } else if (this.content === 'laser') {
      game.player.hasLaser = true;
      game.addScore(800);
      game.sound.playPowerup();
      game.particles.emit(this.x + 24, this.y, 25, '#00f3ff');
      game.particles.addText(this.x - 30, this.y - 20, '¡BLASTER! ⚡', '#00f3ff');
      game.triggerNexusMsg('¡BLASTER CUÁNTICO! Presioná [F] para disparar.');
    } else if (this.content === 'wings') {
      game.player.hasWings = true;
      game.addScore(900);
      game.sound.playPowerup();
      game.particles.emit(this.x + 24, this.y, 30, '#10b981');
      game.particles.addText(this.x - 35, this.y - 20, '¡BOTAS CUÁNTICAS! 🪽', '#10b981');
      game.triggerNexusMsg('¡BOTAS CUÁNTICAS! Ahora puedes hacer DOBLE SALTO en el aire.');
    }
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    const ry = this.y + this.bounceY;

    ctx.save();
    if (!this.used) {
      const pulse = (Math.sin(Date.now() / 250) + 1) / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(rx, ry, this.width, this.height);

      let glyph = '?';
      let col = '#00f3ff';
      if (this.content === 'overclock') { glyph = '★'; col = '#ffd700'; }
      if (this.content === 'laser') { glyph = '⚡'; col = '#00f3ff'; }
      if (this.content === 'wings') { glyph = '🪽'; col = '#10b981'; }

      ctx.strokeStyle = col;
      ctx.lineWidth = 3;
      ctx.shadowColor = col;
      ctx.shadowBlur = 8 + pulse * 10;
      ctx.strokeRect(rx + 2, ry + 2, this.width - 4, this.height - 4);

      ctx.fillStyle = col;
      ctx.font = 'bold 20px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(glyph, rx + this.width / 2, ry + this.height / 2 + 2);
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(rx, ry, this.width, this.height);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, this.width, this.height);

      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(rx + 4, ry + 4, 3, 3);
      ctx.fillRect(rx + this.width - 7, ry + 4, 3, 3);
      ctx.fillRect(rx + 4, ry + this.height - 7, 3, 3);
      ctx.fillRect(rx + this.width - 7, ry + this.height - 7, 3, 3);
    }
    ctx.restore();
  }
}

class MovingPlatform {
  constructor(x, y, width, height, moveDistX = 180, moveDistY = 0, speed = 1.6) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.moveDistX = moveDistX;
    this.moveDistY = moveDistY;
    this.speed = speed;
    this.vx = moveDistX ? speed : 0;
    this.vy = moveDistY ? speed : 0;
  }

  update() {
    if (this.moveDistX) {
      this.x += this.vx;
      if (this.x < this.startX - this.moveDistX) {
        this.x = this.startX - this.moveDistX;
        this.vx = Math.abs(this.vx);
      } else if (this.x > this.startX + this.moveDistX) {
        this.x = this.startX + this.moveDistX;
        this.vx = -Math.abs(this.vx);
      }
    }
    if (this.moveDistY) {
      this.y += this.vy;
      if (this.y < this.startY - this.moveDistY) {
        this.y = this.startY - this.moveDistY;
        this.vy = Math.abs(this.vy);
      } else if (this.y > this.startY + this.moveDistY) {
        this.y = this.startY + this.moveDistY;
        this.vy = -Math.abs(this.vy);
      }
    }
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    const ry = this.y;

    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx, ry, this.width, this.height);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10;
    ctx.strokeRect(rx, ry, this.width, this.height);

    ctx.fillStyle = '#00f3ff';
    ctx.fillRect(rx, ry, this.width, 4);

    ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';
    ctx.fillRect(rx + 12, ry + this.height, 16, 6);
    ctx.fillRect(rx + this.width - 28, ry + this.height, 16, 6);
    ctx.restore();
  }
}

class GlitchBug {
  constructor(x, y, patrolDist = 180) {
    this.startX = x;
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 38;
    this.vx = -1.6;
    this.patrolDist = patrolDist;
    this.alive = true;
    this.squished = false;
    this.squishTimer = 0;
    this.animTime = 0;
  }

  update() {
    if (!this.alive) {
      if (this.squished) this.squishTimer += 1 / 60;
      return;
    }

    this.x += this.vx;
    this.animTime += 0.15;

    if (this.x < this.startX - this.patrolDist) {
      this.x = this.startX - this.patrolDist;
      this.vx = Math.abs(this.vx);
    } else if (this.x > this.startX + this.patrolDist) {
      this.x = this.startX + this.patrolDist;
      this.vx = -Math.abs(this.vx);
    }
  }

  stomp() {
    this.alive = false;
    this.squished = true;
  }

  draw(ctx, cameraX) {
    if (!this.alive && this.squishTimer > 0.45) return;
    const rx = this.x - cameraX;
    const ry = this.y;

    ctx.save();
    if (this.squished) {
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(rx - 4, ry + this.height - 10, this.width + 8, 10);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(rx + 4, ry + this.height - 8, 6, 6);
      ctx.fillRect(rx + this.width - 10, ry + this.height - 8, 6, 6);
    } else {
      const legOffset = Math.sin(this.animTime * 6) * 3;

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.ellipse(rx + this.width / 2, ry + this.height, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rx + 4, ry + this.height - 6);
      ctx.lineTo(rx - 2, ry + this.height + legOffset);
      ctx.moveTo(rx + this.width - 4, ry + this.height - 6);
      ctx.lineTo(rx + this.width + 2, ry + this.height - legOffset);
      ctx.stroke();

      ctx.fillStyle = '#7e22ce';
      ctx.fillRect(rx + 2, ry + 6, this.width - 4, this.height - 10);

      ctx.fillStyle = '#ff0055';
      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 10;
      ctx.fillRect(rx + 8, ry + 12, this.width - 16, this.height - 20);

      ctx.fillStyle = '#fff';
      const eyeDir = this.vx > 0 ? 4 : -4;
      ctx.fillRect(rx + 10 + eyeDir, ry + 12, 6, 6);
      ctx.fillRect(rx + 26 + eyeDir, ry + 12, 6, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(rx + 12 + eyeDir, ry + 14, 3, 3);
      ctx.fillRect(rx + 28 + eyeDir, ry + 14, 3, 3);
    }
    ctx.restore();
  }
}

class SpyDrone {
  constructor(x, y, rangeY = 60, speed = 0.04) {
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.width = 48;
    this.height = 36;
    this.rangeY = rangeY;
    this.speed = speed;
    this.time = Math.random() * Math.PI * 2;
    this.alive = true;
    this.squished = false;
    this.squishTimer = 0;
  }

  update() {
    if (!this.alive) {
      this.squishTimer += 1 / 60;
      return;
    }
    this.time += this.speed;
    this.y = this.baseY + Math.sin(this.time) * this.rangeY;
  }

  stomp() {
    this.alive = false;
    this.squished = true;
  }

  draw(ctx, cameraX) {
    if (!this.alive && this.squishTimer > 0.4) return;
    const rx = this.x - cameraX;
    const ry = this.y;

    ctx.save();
    if (this.squished) {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(rx, ry + 16, this.width, 10);
      ctx.restore();
      return;
    }

    const rotorSpin = Math.sin(Date.now() / 30) * 14;
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx - 4 + rotorSpin, ry + 4);
    ctx.lineTo(rx + 18 - rotorSpin, ry + 4);
    ctx.moveTo(rx + this.width - 18 + rotorSpin, ry + 4);
    ctx.lineTo(rx + this.width + 4 - rotorSpin, ry + 4);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx + 6, ry + 8, this.width - 12, this.height - 12);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx + 6, ry + 8, this.width - 12, this.height - 12);

    ctx.fillStyle = '#ff0055';
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(rx + this.width / 2, ry + 20, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.beginPath();
    ctx.moveTo(rx + this.width / 2, ry + 26);
    ctx.lineTo(rx - 15, ry + 95);
    ctx.lineTo(rx + this.width + 15, ry + 95);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

class BossMegaGlitch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.vx = -2.2;
    this.maxHp = 6;
    this.hp = 6;
    this.alive = true;
    this.invulnerableTimer = 0;
    this.jumpTimer = 0;
    this.vy = 0;
    this.onGround = true;
  }

  update(game) {
    if (!this.alive) return;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= 1 / 60;

    this.x += this.vx;
    if (this.x < 4420) {
      this.x = 4420;
      this.vx = Math.abs(this.vx);
    } else if (this.x > 4850) {
      this.x = 4850;
      this.vx = -Math.abs(this.vx);
    }

    this.jumpTimer += 1 / 60;
    if (this.jumpTimer > 3.0 && this.onGround) {
      this.jumpTimer = 0;
      this.vy = -12;
      this.onGround = false;
      game.sound.playJump();
    }

    this.vy += GRAVITY * 0.9;
    this.y += this.vy;
    if (this.y >= 570 - this.height) {
      this.y = 570 - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  takeHit(game, damage = 1) {
    if (this.invulnerableTimer > 0 || !this.alive) return;
    this.hp -= damage;
    this.invulnerableTimer = 1.0;
    game.sound.playHurt();

    const hpPercent = Math.max(0, (this.hp / this.maxHp) * 100);
    document.getElementById('boss-hp-fill').style.width = hpPercent + '%';

    game.particles.emit(this.x + this.width / 2, this.y + this.height / 2, 25, '#ff0055');
    game.particles.addText(this.x + 20, this.y - 20, `¡IMPACTO! HP: ${this.hp}`, '#ff0055');

    if (this.hp <= 0) {
      this.defeat(game);
    }
  }

  defeat(game) {
    this.alive = false;
    game.sound.playBossExplosion();
    game.addScore(5000);
    document.getElementById('boss-hud').classList.add('hidden');

    for (let i = 0; i < 50; i++) {
      game.particles.emit(this.x + Math.random() * this.width, this.y + Math.random() * this.height, 4, '#ffd700');
    }

    game.triggerNexusMsg('¡MEGA-GLITCH ELIMINADO! El Núcleo de la IA ha sido liberado.');
    setTimeout(() => {
      game.onLevelComplete();
    }, 1800);
  }

  draw(ctx, cameraX) {
    if (!this.alive) return;
    const rx = this.x - cameraX;
    const ry = this.y;

    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 70) % 2 === 0) return;

    ctx.save();
    const pulse = (Math.sin(Date.now() / 150) + 1) / 2;
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 20 + pulse * 15;

    ctx.fillStyle = '#0f051d';
    ctx.fillRect(rx, ry, this.width, this.height);
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 4;
    ctx.strokeRect(rx, ry, this.width, this.height);

    ctx.fillStyle = '#ff0055';
    ctx.beginPath();
    ctx.arc(rx + this.width / 2, ry + this.height / 2, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx + this.width / 2 - 16, ry + this.height / 2 - 16, 32, 32);

    ctx.fillStyle = '#ffd700';
    ctx.fillRect(rx + 22, ry + 24, 18, 12);
    ctx.fillRect(rx + this.width - 40, ry + 24, 18, 12);
    ctx.restore();
  }
}

class PurgeBridgeSwitch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.triggered = false;
  }

  trigger(game) {
    if (this.triggered) return;
    this.triggered = true;
    game.sound.playPowerup();
    game.particles.emit(this.x + 20, this.y + 20, 30, '#10b981');
    game.particles.addText(this.x - 40, this.y - 25, '¡PURGA ACTIVADA!', '#10b981');
    if (game.boss && game.boss.alive) {
      game.boss.defeat(game);
    }
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;
    ctx.save();
    ctx.fillStyle = this.triggered ? '#334155' : '#10b981';
    ctx.shadowColor = this.triggered ? '#000' : '#10b981';
    ctx.shadowBlur = 15;
    ctx.fillRect(rx, this.y, this.width, this.height);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, this.y, this.width, this.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚡', rx + 20, this.y + 28);
    ctx.restore();
  }
}

class DataGoalPole {
  constructor(x, y, height = 380) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.flagY = y;
    this.reached = false;
  }

  draw(ctx, cameraX) {
    const rx = this.x - cameraX;

    ctx.save();
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 6;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(rx, this.y);
    ctx.lineTo(rx, this.y + this.height);
    ctx.stroke();

    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(rx, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(rx + 3, this.flagY + 10);
    ctx.lineTo(rx + 55, this.flagY + 28);
    ctx.lineTo(rx + 3, this.flagY + 46);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rx - 24, this.y + this.height, 48, 40);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx - 24, this.y + this.height, 48, 40);
    ctx.restore();
  }
}

// ========================================================
// JUGADOR: LUCAS
// ========================================================
class MarioLucas {
  constructor(x, y) {
    this.spawnX = x;
    this.spawnY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = 48;
    this.height = 96;
    this.onGround = false;
    this.facing = 1;

    this.hearts = 3;
    this.hasShield = false;
    this.isOverclocked = false;
    this.overclockTimer = 0;
    this.hasLaser = false;
    this.hasWings = false;
    this.canDoubleJump = false;
    this.invulnerableTimer = 0;

    this.jumpFrames = 0;
    this.isJumping = false;
    this.coyoteTime = 0;

    this.animTime = 0;
    this.walkFrame = 0;

    this.climbingGoal = false;
    this.goalCompleted = false;
  }

  reset() {
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.vx = 0;
    this.vy = 0;
    this.onGround = true;
    this.isOverclocked = false;
    this.overclockTimer = 0;
    this.canDoubleJump = false;
    this.invulnerableTimer = 0;
    this.climbingGoal = false;
    this.goalCompleted = false;
  }

  activateOverclock() {
    this.isOverclocked = true;
    this.overclockTimer = 11;
  }

  shoot(game) {
    if (!this.hasLaser) return;
    const shotX = this.facing === 1 ? this.x + this.width + 4 : this.x - 20;
    game.projectiles.push(new LaserProjectile(shotX, this.y + 40, this.facing));
    game.sound.playLaserShot();
    game.particles.emit(shotX, this.y + 48, 6, '#00f3ff');
  }

  update(input, game) {
    if (this.climbingGoal) {
      this.y += 4.5;
      const groundY = 570 - this.height;
      if (this.y >= groundY) {
        this.y = groundY;
        this.climbingGoal = false;
        this.goalCompleted = true;
        game.onLevelComplete();
      }
      return;
    }

    if (this.invulnerableTimer > 0) this.invulnerableTimer -= 1 / 60;
    if (this.overclockTimer > 0) {
      this.overclockTimer -= 1 / 60;
      if (this.overclockTimer <= 0) this.isOverclocked = false;
    }

    if (input.shootJustPressed) {
      input.shootJustPressed = false;
      this.shoot(game);
    }

    // 1. Movimiento horizontal
    const maxSpeed = this.isOverclocked ? OVERCLOCK_MAX_SPEED : BASE_MAX_SPEED;
    if (input.left) {
      this.vx -= RUN_ACCEL * (this.isOverclocked ? 1.4 : 1);
      if (this.vx < -maxSpeed) this.vx = -maxSpeed;
      this.facing = -1;
    } else if (input.right) {
      this.vx += RUN_ACCEL * (this.isOverclocked ? 1.4 : 1);
      if (this.vx > maxSpeed) this.vx = maxSpeed;
      this.facing = 1;
    } else {
      this.vx *= FRICTION;
      if (Math.abs(this.vx) < 0.15) this.vx = 0;
    }

    if (this.isOverclocked && Math.abs(this.vx) > 1) {
      const rainbow = ['#ff0055', '#ffd700', '#00f3ff', '#a855f7'][Math.floor(Math.random() * 4)];
      game.particles.emit(this.x + this.width / 2, this.y + this.height - 10, 2, rainbow);
    }

    // 2. Salto variable + Doble Salto con Botas Cuánticas
    if (this.onGround) {
      this.coyoteTime = 6;
      this.canDoubleJump = true;
    } else if (this.coyoteTime > 0) {
      this.coyoteTime--;
    }

    if (input.jumpJustPressed) {
      if (this.coyoteTime > 0) {
        this.vy = JUMP_FORCE_INITIAL;
        this.isJumping = true;
        this.jumpFrames = 0;
        this.onGround = false;
        this.coyoteTime = 0;
        game.sound.playJump();
      } else if (this.hasWings && this.canDoubleJump) {
        // ¡DOBLE SALTO CUÁNTICO!
        this.vy = JUMP_FORCE_INITIAL * 0.95;
        this.isJumping = true;
        this.jumpFrames = 0;
        this.canDoubleJump = false;
        game.sound.playDoubleJump();
        game.particles.emit(this.x + this.width / 2, this.y + this.height, 12, '#10b981');
      }
    }

    if (this.isJumping) {
      if (input.jump && this.jumpFrames < MAX_JUMP_FRAMES) {
        this.vy += JUMP_HOLD_BOOST;
        this.jumpFrames++;
      } else {
        this.isJumping = false;
      }
    }

    // 3. Gravedad
    this.vy += GRAVITY;
    if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

    // 4. Movimiento y colisiones
    this.x += this.vx;
    this.resolveCollisionsX(game.platforms);

    this.y += this.vy;
    this.onGround = false;
    this.resolveCollisionsY(game.platforms, game);
    this.resolveMovingPlatforms(game.movingPlatforms);

    // Trampolines (Nivel 4)
    if (game.bouncePads) {
      game.bouncePads.forEach(pad => {
        if (
          this.x + this.width > pad.x &&
          this.x < pad.x + pad.width &&
          this.y + this.height >= pad.y &&
          this.y + this.height <= pad.y + 18 &&
          this.vy >= 0
        ) {
          pad.trigger(this, game);
        }
      });
    }

    // Barras Láser (Nivel 4)
    if (game.laserBars) {
      game.laserBars.forEach(lb => lb.checkCollision(this, game));
    }

    this.checkMysteryBlocks(game.mysteryBlocks, game);
    this.checkDataBits(game.dataBits, game);
    this.checkEnemies(game.enemies, game);
    this.checkBoss(game);
    this.checkPurgeSwitch(game.purgeSwitch, game);

    if (this.y > CANVAS_HEIGHT + 100) {
      this.takeDamage(game, true);
    }

    if (game.goalPole && !game.goalPole.reached) {
      if (
        this.x + this.width > game.goalPole.x - 10 &&
        this.x < game.goalPole.x + 20 &&
        this.y < game.goalPole.y + game.goalPole.height
      ) {
        game.goalPole.reached = true;
        this.climbingGoal = true;
        this.vx = 0;
        this.vy = 0;
        this.x = game.goalPole.x - 20;
        game.sound.playFanfare();
        game.particles.emit(this.x + 24, this.y, 30, '#ffd700');
        game.addScore(1500);
      }
    }

    if (Math.abs(this.vx) > 0.4 && this.onGround) {
      this.animTime += 1 / 60;
      this.walkFrame = Math.floor(this.animTime * (this.isOverclocked ? 16 : 10)) % 6;
    } else {
      this.animTime = 0;
      this.walkFrame = 0;
    }
  }

  resolveCollisionsX(platforms) {
    platforms.forEach(plat => {
      if (this.y + this.height > plat.y && this.y < plat.y + plat.height) {
        if (this.vx > 0 && this.x + this.width > plat.x && this.x < plat.x) {
          this.x = plat.x - this.width;
          this.vx = 0;
        } else if (this.vx < 0 && this.x < plat.x + plat.width && this.x + this.width > plat.x + plat.width) {
          this.x = plat.x + plat.width;
          this.vx = 0;
        }
      }
    });
  }

  resolveCollisionsY(platforms, game) {
    platforms.forEach(plat => {
      if (this.x + this.width > plat.x + 4 && this.x < plat.x + plat.width - 4) {
        if (this.vy >= 0 && this.y + this.height >= plat.y && this.y + this.height <= plat.y + 18) {
          this.y = plat.y - this.height;
          this.vy = 0;
          this.onGround = true;
          this.isJumping = false;
        } else if (this.vy < 0 && this.y <= plat.y + plat.height && this.y >= plat.y + plat.height - 18) {
          this.y = plat.y + plat.height;
          this.vy = 0;
          this.isJumping = false;
        }
      }
    });
  }

  resolveMovingPlatforms(movingPlatforms) {
    movingPlatforms.forEach(plat => {
      if (
        this.x + this.width > plat.x + 4 &&
        this.x < plat.x + plat.width - 4 &&
        this.vy >= 0 &&
        this.y + this.height >= plat.y &&
        this.y + this.height <= plat.y + 18
      ) {
        this.y = plat.y - this.height;
        this.vy = 0;
        this.onGround = true;
        this.isJumping = false;
        this.x += plat.vx;
        this.y += plat.vy;
      }
    });
  }

  checkMysteryBlocks(blocks, game) {
    blocks.forEach(block => {
      if (
        this.vy < 0 &&
        this.x + this.width > block.x + 4 &&
        this.x < block.x + block.width - 4 &&
        this.y <= block.y + block.height &&
        this.y >= block.y + block.height - 16
      ) {
        this.y = block.y + block.height;
        this.vy = 0;
        this.isJumping = false;
        block.hit(game);
      } else if (
        this.vy >= 0 &&
        this.x + this.width > block.x + 4 &&
        this.x < block.x + block.width - 4 &&
        this.y + this.height >= block.y &&
        this.y + this.height <= block.y + 16
      ) {
        this.y = block.y - this.height;
        this.vy = 0;
        this.onGround = true;
        this.isJumping = false;
      }
    });
  }

  checkDataBits(bits, game) {
    bits.forEach(bit => {
      if (bit.collected) return;
      if (
        this.x + this.width > bit.x &&
        this.x < bit.x + bit.width &&
        this.y + this.height > bit.y &&
        this.y < bit.y + bit.height
      ) {
        bit.collected = true;
        game.addBits(1);
        game.addScore(100);
        game.sound.playCoin();
        game.particles.emit(bit.x + 12, bit.y + 16, 10, '#00f3ff');
      }
    });
  }

  checkEnemies(enemies, game) {
    enemies.forEach(enemy => {
      if (!enemy.alive) return;

      const overlapX = this.x + this.width > enemy.x + 6 && this.x < enemy.x + enemy.width - 6;
      const overlapY = this.y + this.height > enemy.y && this.y < enemy.y + enemy.height;

      if (overlapX && overlapY) {
        if (this.isOverclocked) {
          enemy.stomp();
          game.sound.playStomp();
          game.addScore(300);
          game.particles.emit(enemy.x + enemy.width / 2, enemy.y + 10, 20, '#ffd700');
          game.particles.addText(enemy.x, enemy.y - 15, '¡OVERCLOCK! +300', '#ffd700');
          return;
        }

        if (this.invulnerableTimer > 0) return;

        if (this.vy > 0 && this.y + this.height <= enemy.y + 24) {
          enemy.stomp();
          this.vy = STOMP_BOUNCE;
          this.isJumping = false;
          game.sound.playStomp();
          game.addScore(200);
          game.particles.emit(enemy.x + enemy.width / 2, enemy.y + 10, 16, '#a855f7');
          game.particles.addText(enemy.x, enemy.y - 15, '¡STOMP! +200', '#a855f7');
        } else {
          this.takeDamage(game);
        }
      }
    });
  }

  checkBoss(game) {
    if (!game.boss || !game.boss.alive) return;
    const b = game.boss;

    const overlapX = this.x + this.width > b.x + 8 && this.x < b.x + b.width - 8;
    const overlapY = this.y + this.height > b.y && this.y < b.y + b.height;

    if (overlapX && overlapY) {
      if (this.isOverclocked) {
        b.takeHit(game, 2);
        this.vy = STOMP_BOUNCE;
        return;
      }

      if (this.invulnerableTimer > 0) return;

      if (this.vy > 0 && this.y + this.height <= b.y + 30) {
        b.takeHit(game, 1);
        this.vy = STOMP_BOUNCE * 1.15;
        this.isJumping = false;
      } else {
        this.takeDamage(game);
      }
    }
  }

  checkPurgeSwitch(sw, game) {
    if (!sw || sw.triggered) return;
    if (
      this.x + this.width > sw.x &&
      this.x < sw.x + sw.width &&
      this.y + this.height >= sw.y &&
      this.y <= sw.y + sw.height
    ) {
      sw.trigger(game);
    }
  }

  takeDamage(game, instantKill = false) {
    if (this.isOverclocked && !instantKill) return;

    if (instantKill) {
      this.hearts = 0;
      game.updateHeartsHUD();
      game.sound.playHurt();
      game.onGameOver();
      return;
    }

    if (this.hasShield) {
      this.hasShield = false;
      this.invulnerableTimer = 1.6;
      this.vy = -6;
      this.vx = -this.facing * 4;
      game.sound.playBlockBump();
      game.particles.emit(this.x + 24, this.y + 48, 20, '#00f3ff');
      game.triggerNexusMsg('¡El Firewall absorbió el ataque de malware!');
      return;
    }

    this.hearts--;
    game.updateHeartsHUD();
    game.sound.playHurt();
    this.invulnerableTimer = 1.8;
    this.vy = -7;
    this.vx = -this.facing * 4.5;

    if (this.hearts <= 0) {
      game.onGameOver();
    }
  }

  draw(ctx, assets, cameraX) {
    const rx = Math.round(this.x - cameraX);
    const ry = Math.round(this.y);

    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0) return;

    ctx.save();

    if (this.isOverclocked) {
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 25;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.strokeRect(rx - 2, ry - 2, this.width + 4, this.height + 4);
    } else if (this.hasShield) {
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(rx + this.width / 2, ry + this.height / 2, 42, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Botas cuánticas en los pies
    if (this.hasWings) {
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.fillRect(rx + 6, ry + this.height - 10, 14, 8);
      ctx.fillRect(rx + this.width - 20, ry + this.height - 10, 14, 8);
    }

    if (this.hasLaser) {
      ctx.fillStyle = '#00f3ff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 8;
      ctx.fillRect(rx + (this.facing === 1 ? this.width - 6 : 2), ry + 36, 4, 12);
    }

    if (this.facing === -1) {
      ctx.translate(rx + this.width / 2, ry + this.height / 2);
      ctx.scale(-1, 1);
      ctx.translate(-(rx + this.width / 2), -(ry + this.height / 2));
    }

    const renderHeight = 104;
    const renderWidth = 52;
    const drawX = rx + (this.width - renderWidth) / 2;
    const drawY = ry + this.height - renderHeight;

    if (!this.onGround) {
      const jumpImg = assets.lucasJump;
      if (jumpImg && jumpImg.complete) {
        const sx = this.vy < 0 ? 396 : 1188;
        ctx.drawImage(jumpImg, sx, 0, 396, 793, drawX - 2, drawY, renderWidth + 4, renderHeight);
      }
    } else if (Math.abs(this.vx) > 0.4) {
      const walkImg = assets.lucasWalk;
      if (walkImg && walkImg.complete) {
        const sx = this.walkFrame * 362;
        ctx.drawImage(walkImg, sx, 0, 362, 724, drawX, drawY, renderWidth, renderHeight);
      }
    } else {
      const idleImg = assets.lucasIdle;
      if (idleImg && idleImg.complete) {
        ctx.drawImage(idleImg, 23, 23, 1023, 1225, drawX, drawY, renderWidth, renderHeight);
      } else {
        const walkImg = assets.lucasWalk;
        if (walkImg && walkImg.complete) {
          ctx.drawImage(walkImg, 0, 0, 362, 724, drawX, drawY, renderWidth, renderHeight);
        }
      }
    }

    ctx.restore();
  }
}

// ========================================================
// PARALLAX BACKGROUND SYSTEM (4 MUNDOS)
// ========================================================
class ParallaxCyberBackground {
  constructor(levelWidth, worldNum = '1-1') {
    this.levelWidth = levelWidth;
    this.worldNum = worldNum;

    this.stars = [];
    for (let i = 0; i < 110; i++) {
      this.stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * (CANVAS_HEIGHT * 0.7),
        size: 1 + Math.random() * 2.8,
        twinkle: Math.random() * Math.PI * 2
      });
    }

    this.skylineFar = [];
    let curX = 0;
    while (curX < levelWidth * 0.35) {
      const w = 70 + Math.random() * 80;
      const h = 260 + Math.random() * 220;
      this.skylineFar.push({ x: curX, w, h });
      curX += w + 10;
    }

    this.skylineMid = [];
    curX = 0;
    while (curX < levelWidth * 0.65) {
      const w = 90 + Math.random() * 110;
      const h = 200 + Math.random() * 250;
      this.skylineMid.push({ x: curX, w, h });
      curX += w + 20;
    }

    this.trafficCars = [];
    if (worldNum === '1-2') {
      for (let i = 0; i < 18; i++) {
        this.trafficCars.push({
          x: Math.random() * levelWidth,
          y: 340 + Math.random() * 160,
          speed: 3 + Math.random() * 4,
          color: i % 2 === 0 ? '#00f3ff' : '#ff0055'
        });
      }
    }

    this.matrixStreams = [];
    if (worldNum === '1-3') {
      for (let i = 0; i < 40; i++) {
        this.matrixStreams.push({
          x: Math.random() * CANVAS_WIDTH,
          y: Math.random() * CANVAS_HEIGHT,
          speed: 4 + Math.random() * 6,
          chars: ['0', '1', 'AI', 'ERR', '010', 'LOCK'][Math.floor(Math.random() * 6)]
        });
      }
    }

    // Nubes Cuánticas y Satélites (Nivel 4)
    this.orbitalClouds = [];
    if (worldNum === '1-4') {
      for (let i = 0; i < 12; i++) {
        this.orbitalClouds.push({
          x: Math.random() * levelWidth,
          y: 80 + Math.random() * 240,
          width: 140 + Math.random() * 180,
          speed: 0.4 + Math.random() * 0.6
        });
      }
    }
  }

  draw(ctx, cameraX) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    if (this.worldNum === '1-4') {
      // Espacio Orbital: Azul noche cósmico con brillo de la atmósfera terrestre abajo
      skyGrad.addColorStop(0, '#01020a');
      skyGrad.addColorStop(0.65, '#071630');
      skyGrad.addColorStop(1, '#0284c7');
    } else if (this.worldNum === '1-3') {
      skyGrad.addColorStop(0, '#0a0007');
      skyGrad.addColorStop(0.5, '#20000e');
      skyGrad.addColorStop(1, '#000000');
    } else if (this.worldNum === '1-2') {
      skyGrad.addColorStop(0, '#020024');
      skyGrad.addColorStop(0.5, '#2b0938');
      skyGrad.addColorStop(1, '#091e3a');
    } else {
      skyGrad.addColorStop(0, '#03071e');
      skyGrad.addColorStop(0.5, '#0f172a');
      skyGrad.addColorStop(1, '#1e1b4b');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // En Nivel 4: Curvatura de la Tierra abajo y satélite gigante
    if (this.worldNum === '1-4') {
      ctx.save();
      // Curva de la Tierra en el horizonte inferior
      ctx.fillStyle = '#0369a1';
      ctx.beginPath();
      ctx.ellipse(CANVAS_WIDTH / 2, CANVAS_HEIGHT + 240, 1100, 360, 0, 0, Math.PI * 2);
      ctx.fill();

      // Atmósfera celeste brillante
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 20;
      ctx.stroke();

      // Nubes cuánticas orbitales
      ctx.fillStyle = 'rgba(0, 243, 255, 0.14)';
      const cloudOffset = cameraX * 0.25;
      this.orbitalClouds.forEach(cl => {
        cl.x += cl.speed;
        if (cl.x > this.levelWidth) cl.x = 0;
        const cx = cl.x - cloudOffset;
        if (cx > -250 && cx < CANVAS_WIDTH + 250) {
          ctx.beginPath();
          ctx.ellipse(cx, cl.y, cl.width / 2, 28, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();
    } else {
      // Luna Cuántica en mundos 1-1, 1-2, 1-3
      ctx.save();
      const moonX = CANVAS_WIDTH - 240 - (cameraX * 0.02);
      const moonY = 120;
      let moonColor = 'rgba(0, 243, 255, 0.9)';
      if (this.worldNum === '1-2') moonColor = 'rgba(255, 0, 110, 0.85)';
      if (this.worldNum === '1-3') moonColor = 'rgba(255, 0, 50, 0.95)';

      const moonGrad = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 65);
      moonGrad.addColorStop(0, moonColor);
      moonGrad.addColorStop(0.6, 'rgba(181, 23, 158, 0.4)');
      moonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Lluvia binaria en Nivel 3
    if (this.worldNum === '1-3') {
      ctx.save();
      ctx.font = '10px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(255, 0, 85, 0.35)';
      this.matrixStreams.forEach(stream => {
        stream.y += stream.speed;
        if (stream.y > CANVAS_HEIGHT) stream.y = 0;
        ctx.fillText(stream.chars, stream.x, stream.y);
      });
      ctx.restore();
    }

    // Estrellas
    ctx.fillStyle = '#fff';
    this.stars.forEach(s => {
      const alpha = (Math.sin(Date.now() / 400 + s.twinkle) + 1) / 2;
      ctx.globalAlpha = 0.3 + alpha * 0.7;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    });
    ctx.globalAlpha = 1;

    // Skyline Lejano (Excepto en el espacio de 1-4)
    if (this.worldNum !== '1-4') {
      ctx.fillStyle = this.worldNum === '1-3' ? '#140008' : (this.worldNum === '1-2' ? '#110920' : '#090d16');
      const offsetFar = cameraX * 0.12;
      this.skylineFar.forEach(b => {
        const bx = b.x - offsetFar;
        if (bx + b.w > 0 && bx < CANVAS_WIDTH) {
          ctx.fillRect(bx, CANVAS_HEIGHT - b.h, b.w, b.h);
        }
      });
    }

    // Tráfico en 1-2
    if (this.worldNum === '1-2') {
      const trafficOffset = cameraX * 0.5;
      this.trafficCars.forEach(car => {
        car.x += car.speed;
        if (car.x > this.levelWidth) car.x = 0;
        const cx = car.x - trafficOffset;
        if (cx > -20 && cx < CANVAS_WIDTH + 20) {
          ctx.save();
          ctx.fillStyle = car.color;
          ctx.shadowColor = car.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(cx, car.y, 16, 4);
          ctx.restore();
        }
      });
    }
  }
}

// ========================================================
// MOTOR PRINCIPAL DEL JUEGO MULTINIVEL
// ========================================================
class PlatformerGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sound = new RetroAudioSynth();
    this.input = new InputState();
    this.particles = new ParticleSystem();

    this.currentWorld = '1-1';
    this.levelWidth = 4600;
    this.background = new ParallaxCyberBackground(this.levelWidth, this.currentWorld);
    this.cameraX = 0;
    this.isRunning = false;

    this.score = 0;
    this.bits = 0;
    this.timeRemaining = 300;
    this.timeTimer = null;

    this.assets = {
      lucasWalk: null,
      lucasJump: null,
      lucasIdle: null
    };

    this.platforms = [];
    this.movingPlatforms = [];
    this.bouncePads = [];
    this.laserBars = [];
    this.mysteryBlocks = [];
    this.dataBits = [];
    this.enemies = [];
    this.projectiles = [];
    this.boss = null;
    this.purgeSwitch = null;
    this.goalPole = null;

    this.player = new MarioLucas(120, 460);

    this.initDOM();
    this.loadAssets().then(() => {
      this.loadLevel('1-1');
      requestAnimationFrame((t) => this.loop(t));
    });
  }

  initDOM() {
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.sound.init();
      document.getElementById('screen-intro').classList.add('hidden');
      this.startLevel();
    });

    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      const active = this.sound.toggleMute();
      document.getElementById('sound-icon').textContent = active ? '🔊' : '🔇';
    });

    document.getElementById('btn-retry').addEventListener('click', () => {
      document.getElementById('screen-game-over').classList.add('hidden');
      this.restartLevel();
    });

    // Avanzar de nivel
    document.getElementById('btn-next-level').addEventListener('click', () => {
      document.getElementById('screen-victory').classList.add('hidden');
      if (this.currentWorld === '1-1') this.loadLevel('1-2');
      else if (this.currentWorld === '1-2') this.loadLevel('1-3');
      else if (this.currentWorld === '1-3') this.loadLevel('1-4');
      this.startLevel();
    });

    // Jugar de nuevo campaña completa
    document.getElementById('btn-play-again').addEventListener('click', () => {
      document.getElementById('screen-victory').classList.add('hidden');
      this.score = 0;
      this.bits = 0;
      this.loadLevel('1-1');
      this.startLevel();
    });
  }

  loadAssets() {
    const list = [
      { key: 'lucasWalk', src: 'assets/images/lucas_walk.png' },
      { key: 'lucasJump', src: 'assets/images/lucas_jump.png' },
      { key: 'lucasIdle', src: 'assets/images/lucas_idle.png' }
    ];

    return Promise.all(list.map(item => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
          this.assets[item.key] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });
    }));
  }

  loadLevel(worldId) {
    this.currentWorld = worldId;
    document.getElementById('hud-world-num').textContent = worldId;
    this.projectiles = [];
    this.boss = null;
    this.purgeSwitch = null;
    this.bouncePads = [];
    this.laserBars = [];
    document.getElementById('boss-hud').classList.add('hidden');

    if (worldId === '1-1') this.buildLevel1();
    else if (worldId === '1-2') this.buildLevel2();
    else if (worldId === '1-3') this.buildLevel3();
    else if (worldId === '1-4') this.buildLevel4();
  }

  // --- MUNDO 1-1 ---
  buildLevel1() {
    this.levelWidth = 4600;
    this.background = new ParallaxCyberBackground(this.levelWidth, '1-1');
    this.platforms = [];
    this.movingPlatforms = [];
    this.mysteryBlocks = [];
    this.dataBits = [];
    this.enemies = [];

    const floorY = 570;
    this.platforms.push({ x: 0, y: floorY, width: 1200, height: 160 });
    this.platforms.push({ x: 1350, y: floorY, width: 1100, height: 160 });
    this.platforms.push({ x: 2600, y: floorY, width: 900, height: 160 });
    this.platforms.push({ x: 3650, y: floorY, width: 1000, height: 160 });

    const addServer = (x, height) => this.platforms.push({ x, y: floorY - height, width: 70, height });
    addServer(600, 70);
    addServer(980, 110);
    addServer(1750, 85);
    addServer(2950, 120);

    const addPlat = (x, y, width) => this.platforms.push({ x, y, width, height: 26 });
    addPlat(400, 430, 150);
    addPlat(720, 390, 180);
    addPlat(1450, 420, 140);
    addPlat(1920, 380, 200);
    addPlat(2250, 340, 160);
    addPlat(3180, 490, 80);
    addPlat(3260, 430, 80);
    addPlat(3340, 370, 80);
    addPlat(3420, 310, 80);

    this.mysteryBlocks.push(new MysteryBlock(340, 420, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(460, 420, 'shield'));
    this.mysteryBlocks.push(new MysteryBlock(780, 260, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(830, 260, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(880, 260, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(1600, 420, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(2000, 240, 'shield'));
    this.mysteryBlocks.push(new MysteryBlock(2050, 240, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(2750, 420, 'coin'));

    for (let i = 0; i < 5; i++) this.dataBits.push(new DataBit(560 + i * 36, 450 - Math.sin((i / 4) * Math.PI) * 55));
    for (let i = 0; i < 4; i++) this.dataBits.push(new DataBit(740 + i * 40, 340));
    for (let i = 0; i < 3; i++) this.dataBits.push(new DataBit(1240 + i * 38, 480));
    for (let i = 0; i < 5; i++) this.dataBits.push(new DataBit(1930 + i * 36, 330));

    this.enemies.push(new GlitchBug(480, floorY - 38, 140));
    this.enemies.push(new GlitchBug(820, floorY - 38, 120));
    this.enemies.push(new GlitchBug(1550, floorY - 38, 160));
    this.enemies.push(new GlitchBug(1880, floorY - 38, 120));
    this.enemies.push(new GlitchBug(2300, floorY - 38, 150));
    this.enemies.push(new GlitchBug(2800, floorY - 38, 130));

    this.goalPole = new DataGoalPole(4250, floorY - 380, 380);
    this.player.spawnX = 120;
    this.player.spawnY = 460;
    this.player.reset();
  }

  // --- MUNDO 1-2 ---
  buildLevel2() {
    this.levelWidth = 5200;
    this.background = new ParallaxCyberBackground(this.levelWidth, '1-2');
    this.platforms = [];
    this.movingPlatforms = [];
    this.mysteryBlocks = [];
    this.dataBits = [];
    this.enemies = [];

    const floorY = 570;
    this.platforms.push({ x: 0, y: floorY, width: 850, height: 160 });
    this.platforms.push({ x: 1200, y: floorY, width: 750, height: 160 });
    this.platforms.push({ x: 2350, y: floorY, width: 950, height: 160 });
    this.platforms.push({ x: 3700, y: floorY, width: 700, height: 160 });
    this.platforms.push({ x: 4700, y: floorY, width: 600, height: 160 });

    this.movingPlatforms.push(new MovingPlatform(980, 520, 140, 24, 90, 0, 1.8));
    this.movingPlatforms.push(new MovingPlatform(2100, 470, 150, 24, 110, 0, 2.0));
    this.movingPlatforms.push(new MovingPlatform(3480, 480, 140, 24, 0, 90, 1.6));
    this.movingPlatforms.push(new MovingPlatform(4520, 500, 130, 24, 80, 0, 2.2));

    const addPlat = (x, y, width) => this.platforms.push({ x, y, width, height: 26 });
    addPlat(350, 440, 160);
    addPlat(620, 370, 180);
    addPlat(1350, 410, 180);
    addPlat(1680, 340, 200);
    addPlat(2550, 420, 260);
    addPlat(2900, 360, 200);
    addPlat(3950, 490, 90);
    addPlat(4080, 420, 90);
    addPlat(4210, 350, 90);
    addPlat(4340, 280, 110);

    this.mysteryBlocks.push(new MysteryBlock(280, 430, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(450, 280, 'overclock'));
    this.mysteryBlocks.push(new MysteryBlock(1400, 280, 'shield'));
    this.mysteryBlocks.push(new MysteryBlock(1450, 280, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(1750, 200, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(2650, 280, 'overclock'));
    this.mysteryBlocks.push(new MysteryBlock(3000, 220, 'shield'));

    for (let i = 0; i < 6; i++) this.dataBits.push(new DataBit(640 + i * 36, 300));
    for (let i = 0; i < 4; i++) this.dataBits.push(new DataBit(1360 + i * 40, 340));
    for (let i = 0; i < 8; i++) this.dataBits.push(new DataBit(2560 + i * 36, 350 - Math.sin((i / 7) * Math.PI) * 60));
    for (let i = 0; i < 5; i++) this.dataBits.push(new DataBit(4220 + i * 36, 210));

    this.enemies.push(new GlitchBug(450, floorY - 38, 150));
    this.enemies.push(new SpyDrone(920, 410, 70, 0.04));
    this.enemies.push(new GlitchBug(1420, floorY - 38, 140));
    this.enemies.push(new SpyDrone(1980, 380, 80, 0.05));
    this.enemies.push(new GlitchBug(2480, floorY - 38, 160));
    this.enemies.push(new GlitchBug(2750, floorY - 38, 140));
    this.enemies.push(new SpyDrone(3350, 420, 90, 0.04));
    this.enemies.push(new SpyDrone(4450, 360, 75, 0.05));

    this.goalPole = new DataGoalPole(4950, floorY - 380, 380);
    this.player.spawnX = 120;
    this.player.spawnY = 460;
    this.player.reset();
  }

  // --- MUNDO 1-3 ---
  buildLevel3() {
    this.levelWidth = 5300;
    this.background = new ParallaxCyberBackground(this.levelWidth, '1-3');
    this.platforms = [];
    this.movingPlatforms = [];
    this.mysteryBlocks = [];
    this.dataBits = [];
    this.enemies = [];

    const floorY = 570;
    this.platforms.push({ x: 0, y: floorY, width: 800, height: 160 });
    this.platforms.push({ x: 1050, y: floorY, width: 650, height: 160 });
    this.platforms.push({ x: 1950, y: floorY, width: 700, height: 160 });
    this.platforms.push({ x: 2900, y: floorY, width: 800, height: 160 });
    this.platforms.push({ x: 4050, y: floorY, width: 1250, height: 160 });

    const addPlat = (x, y, width) => this.platforms.push({ x, y, width, height: 26 });
    addPlat(300, 430, 160);
    addPlat(560, 360, 140);
    addPlat(1200, 420, 180);
    addPlat(1500, 340, 160);
    addPlat(2100, 420, 150);
    addPlat(2400, 350, 160);

    this.movingPlatforms.push(new MovingPlatform(890, 490, 120, 24, 60, 0, 1.8));
    this.movingPlatforms.push(new MovingPlatform(1800, 480, 120, 24, 0, 80, 1.6));
    this.movingPlatforms.push(new MovingPlatform(2760, 490, 110, 24, 50, 0, 2.0));

    this.mysteryBlocks.push(new MysteryBlock(260, 420, 'laser'));
    this.mysteryBlocks.push(new MysteryBlock(580, 240, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(1300, 300, 'shield'));
    this.mysteryBlocks.push(new MysteryBlock(2200, 300, 'laser'));
    this.mysteryBlocks.push(new MysteryBlock(3200, 420, 'overclock'));

    for (let i = 0; i < 6; i++) this.dataBits.push(new DataBit(310 + i * 36, 320));
    for (let i = 0; i < 5; i++) this.dataBits.push(new DataBit(1220 + i * 36, 260));
    for (let i = 0; i < 6; i++) this.dataBits.push(new DataBit(2120 + i * 36, 260));

    this.enemies.push(new GlitchBug(400, floorY - 38, 140));
    this.enemies.push(new SpyDrone(860, 380, 70, 0.05));
    this.enemies.push(new GlitchBug(1250, floorY - 38, 140));
    this.enemies.push(new SpyDrone(1750, 360, 80, 0.05));
    this.enemies.push(new GlitchBug(2150, floorY - 38, 160));
    this.enemies.push(new SpyDrone(2700, 400, 70, 0.05));
    this.enemies.push(new GlitchBug(3100, floorY - 38, 180));

    this.boss = new BossMegaGlitch(4620, floorY - 110);
    this.purgeSwitch = new PurgeBridgeSwitch(5050, floorY - 40);
    this.goalPole = null;

    this.player.spawnX = 120;
    this.player.spawnY = 460;
    this.player.reset();
  }

  // --- MUNDO 1-4: LA NUBE CUÁNTICA & ESTACIÓN ORBITAL (NIVEL ATLÉTICO AÉREO) ---
  buildLevel4() {
    this.levelWidth = 5600;
    this.background = new ParallaxCyberBackground(this.levelWidth, '1-4');
    this.platforms = [];
    this.movingPlatforms = [];
    this.bouncePads = [];
    this.laserBars = [];
    this.mysteryBlocks = [];
    this.dataBits = [];
    this.enemies = [];

    const floorY = 570;

    // Islas flotantes en la estratosfera (¡Abismo abajo!)
    this.platforms.push({ x: 0, y: floorY, width: 650, height: 160 });
    this.platforms.push({ x: 900, y: floorY - 40, width: 500, height: 200 });
    this.platforms.push({ x: 1900, y: floorY - 80, width: 650, height: 240 });
    this.platforms.push({ x: 3100, y: floorY - 50, width: 700, height: 210 });
    this.platforms.push({ x: 4400, y: floorY, width: 1200, height: 160 }); // Estación Satelital Meta

    // Plataformas flotantes altas de nubes de datos
    const addPlat = (x, y, width) => this.platforms.push({ x, y, width, height: 24 });
    addPlat(450, 430, 140);
    addPlat(680, 360, 160);
    addPlat(1100, 330, 160);
    addPlat(1520, 420, 180);
    addPlat(1760, 340, 140);
    addPlat(2200, 310, 180);
    addPlat(2680, 380, 180);
    addPlat(3400, 360, 160);
    addPlat(3700, 290, 180);
    addPlat(4000, 230, 200);

    // Plataformas Móviles de Alta Altitud
    this.movingPlatforms.push(new MovingPlatform(1500, 490, 130, 24, 70, 0, 2.2));
    this.movingPlatforms.push(new MovingPlatform(2600, 450, 140, 24, 0, 100, 1.8)); // Ascensor vertical
    this.movingPlatforms.push(new MovingPlatform(3850, 420, 140, 24, 90, 0, 2.4));

    // Nodos de Rebote Cuántico (Trampolines elásticos)
    this.bouncePads.push(new BouncePad(560, floorY - 20));
    this.bouncePads.push(new BouncePad(1350, floorY - 60));
    this.bouncePads.push(new BouncePad(2450, floorY - 100));
    this.bouncePads.push(new BouncePad(3650, floorY - 70));

    // Barras Láser Giratorias (Firebars)
    this.laserBars.push(new LaserBar(1180, 250, 95, 0.03, 2));
    this.laserBars.push(new LaserBar(2300, 230, 110, -0.028, 3));
    this.laserBars.push(new LaserBar(3480, 280, 100, 0.032, 2));

    // Bloques misteriosos con BOTAS CUÁNTICAS (Doble Salto)
    this.mysteryBlocks.push(new MysteryBlock(320, 420, 'wings')); // ¡DOBLE SALTO!
    this.mysteryBlocks.push(new MysteryBlock(720, 260, 'laser'));
    this.mysteryBlocks.push(new MysteryBlock(1200, 220, 'coin'));
    this.mysteryBlocks.push(new MysteryBlock(2050, 380, 'shield'));
    this.mysteryBlocks.push(new MysteryBlock(2750, 280, 'overclock')); // Estrella en el cielo
    this.mysteryBlocks.push(new MysteryBlock(3750, 200, 'wings'));

    // Data-Bits en constelaciones flotantes
    for (let i = 0; i < 7; i++) this.dataBits.push(new DataBit(480 + i * 40, 290 - Math.sin((i / 6) * Math.PI) * 70));
    for (let i = 0; i < 5; i++) this.dataBits.push(new DataBit(1540 + i * 36, 260));
    for (let i = 0; i < 6; i++) this.dataBits.push(new DataBit(2700 + i * 36, 220));
    for (let i = 0; i < 8; i++) this.dataBits.push(new DataBit(3920 + i * 36, 170 - Math.sin((i / 7) * Math.PI) * 60));

    // Enemigos: Glitch Bugs, Drones Espía y Phishing Drones (Lakitu orbital)
    this.enemies.push(new GlitchBug(360, floorY - 38, 120));
    this.enemies.push(new PhishingDrone(1100, 120, 250)); // Lakitu suelta minas de spam
    this.enemies.push(new SpyDrone(1700, 380, 70, 0.04));
    this.enemies.push(new GlitchBug(2050, floorY - 118, 140));
    this.enemies.push(new PhishingDrone(2800, 110, 280)); // Segundo Lakitu
    this.enemies.push(new SpyDrone(3300, 340, 80, 0.05));
    this.enemies.push(new SpyDrone(4150, 260, 60, 0.06));

    // Meta Satelital Uplink
    this.goalPole = new DataGoalPole(5250, floorY - 380, 380);
    this.boss = null;
    this.purgeSwitch = null;

    this.player.spawnX = 100;
    this.player.spawnY = 460;
    this.player.reset();
  }

  startLevel() {
    this.isRunning = true;
    this.timeRemaining = 300;
    this.sound.playMusic();
    this.updateHUD();

    if (this.timeTimer) clearInterval(this.timeTimer);
    this.timeTimer = setInterval(() => {
      if (this.isRunning && !this.player.climbingGoal && !this.player.goalCompleted) {
        this.timeRemaining--;
        document.getElementById('hud-timer').textContent = this.timeRemaining;
        if (this.timeRemaining <= 0) {
          this.player.takeDamage(this, true);
        }
      }
    }, 1000);

    setTimeout(() => {
      if (this.currentWorld === '1-1') {
        this.triggerNexusMsg('¡Lucas! El sector está lleno de Glitches. ¡Aplástalos saltando sobre ellos!');
      } else if (this.currentWorld === '1-2') {
        this.triggerNexusMsg('¡MUNDO 1-2! Cuidado con los Drones. ¡Usa las plataformas móviles para cruzar!');
      } else if (this.currentWorld === '1-3') {
        this.triggerNexusMsg('¡ALERTA MÁXIMA! Has entrado al Núcleo Central. ¡Encuentra el Blaster Cuántico [F] y destruye al Mega-Glitch!');
      } else if (this.currentWorld === '1-4') {
        this.triggerNexusMsg('¡MUNDO 1-4! La Nube Cuántica Orbital. ¡Encuentra las Botas Cuánticas [🪽] para realizar DOBLE SALTO en el aire!');
      }
    }, 800);
  }

  restartLevel() {
    this.player.hearts = 3;
    this.player.hasShield = false;
    this.player.isOverclocked = false;
    this.player.hasLaser = false;
    this.player.hasWings = false;
    this.player.reset();
    this.loadLevel(this.currentWorld);
    this.startLevel();
  }

  addScore(pts) {
    this.score += pts;
    document.getElementById('hud-score').textContent = String(this.score).padStart(6, '0');
  }

  addBits(count) {
    this.bits += count;
    document.getElementById('hud-bits-count').textContent = String(this.bits).padStart(2, '0');
    if (this.bits >= 100) {
      this.bits -= 100;
      if (this.player.hearts < 3) {
        this.player.hearts++;
        this.updateHeartsHUD();
        this.sound.playPowerup();
        this.triggerNexusMsg('¡100 Data-Bits alcanzados! Vida regenerada.');
      }
    }
  }

  updateHeartsHUD() {
    const container = document.getElementById('hud-hearts');
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      span.className = 'heart ' + (i < this.player.hearts ? 'active' : 'lost');
      span.textContent = '❤️';
      container.appendChild(span);
    }
  }

  updateHUD() {
    document.getElementById('hud-score').textContent = String(this.score).padStart(6, '0');
    document.getElementById('hud-bits-count').textContent = String(this.bits).padStart(2, '0');
    document.getElementById('hud-timer').textContent = this.timeRemaining;
    document.getElementById('hud-world-num').textContent = this.currentWorld;
    this.updateHeartsHUD();
  }

  triggerNexusMsg(msg, duration = 4000) {
    const comm = document.getElementById('nexus-live-comm');
    const txt = document.getElementById('nexus-comm-text');
    txt.textContent = msg;
    comm.classList.remove('hidden');

    if (this.nexusTimer) clearTimeout(this.nexusTimer);
    this.nexusTimer = setTimeout(() => {
      comm.classList.add('hidden');
    }, duration);
  }

  onGameOver() {
    this.isRunning = false;
    clearInterval(this.timeTimer);
    document.getElementById('boss-hud').classList.add('hidden');
    document.getElementById('go-score').textContent = this.score;
    document.getElementById('go-bits').textContent = this.bits;
    document.getElementById('screen-game-over').classList.remove('hidden');
  }

  onLevelComplete() {
    this.isRunning = false;
    clearInterval(this.timeTimer);
    document.getElementById('boss-hud').classList.add('hidden');

    const bitsBonus = this.bits * 100;
    const timeBonus = this.timeRemaining * 10;
    const finalScore = this.score + bitsBonus + timeBonus;

    document.getElementById('vic-base-score').textContent = this.score;
    document.getElementById('vic-bits-score').textContent = bitsBonus;
    document.getElementById('vic-time-score').textContent = timeBonus;
    document.getElementById('vic-total-score').textContent = finalScore;

    const nextBtn = document.getElementById('btn-next-level');
    const playAgainBtn = document.getElementById('btn-play-again');

    if (this.currentWorld === '1-1') {
      document.getElementById('vic-badge').textContent = '¡MUNDO 1-1 SUPERADO!';
      document.getElementById('vic-title').textContent = 'RED LOCAL DESINFECTADA';
      document.getElementById('vic-sub').textContent = 'Has neutralizado el malware de la habitación. Próximo destino: La Ciudad Conectada.';
      document.getElementById('vic-verdict-text').textContent = 'NEXUS: Gran trabajo, Lucas. La red de transporte de la ciudad está colapsando. Debemos investigar el sector 1-2.';
      nextBtn.textContent = 'AVANZAR A MUNDO 1-2: LA CIUDAD CONECTADA ❯';
      nextBtn.style.display = 'inline-block';
      playAgainBtn.style.display = 'none';
    } else if (this.currentWorld === '1-2') {
      document.getElementById('vic-badge').textContent = '¡MUNDO 1-2 SUPERADO!';
      document.getElementById('vic-title').textContent = 'ESTACIÓN CENTRAL ALCANZADA';
      document.getElementById('vic-sub').textContent = 'El tráfico fue restablecido. El origen de la corrupción proviene del Núcleo Central.';
      document.getElementById('vic-verdict-text').textContent = 'NEXUS: La fuente del malware ha sido localizada en la Fortaleza del Núcleo Central. Prepárate para la batalla final.';
      nextBtn.textContent = '¡ENTRAR A MUNDO 1-3: EL NÚCLEO CENTRAL! ❯';
      nextBtn.style.display = 'inline-block';
      playAgainBtn.style.display = 'none';
    } else if (this.currentWorld === '1-3') {
      document.getElementById('vic-badge').textContent = '¡MUNDO 1-3 SUPERADO!';
      document.getElementById('vic-title').textContent = 'MEGA-GLITCH DERROTADO';
      document.getElementById('vic-sub').textContent = 'El malware central fue destruido, pero fragmentos han escapado a la Nube Cuántica Orbital.';
      document.getElementById('vic-verdict-text').textContent = 'NEXUS: ¡Increíble victoria contra el coloso! Pero los restos del virus amenazan los satélites globales. ¡Debemos subir a la Nube!';
      nextBtn.textContent = '¡VOLAR A MUNDO 1-4: LA NUBE CUÁNTICA! ❯';
      nextBtn.style.display = 'inline-block';
      playAgainBtn.style.display = 'none';
    } else {
      document.getElementById('vic-badge').textContent = '★★★★ ¡CAMPAÑA ORBITAL COMPLETADA! ★★★★';
      document.getElementById('vic-title').textContent = 'RED GLOBAL LIBERADA Y SEGURA';
      document.getElementById('vic-sub').textContent = 'Has completado los 4 Mundos. La Inteligencia Artificial y la humanidad ahora avanzan en armonía ética.';
      document.getElementById('vic-verdict-text').textContent = 'NEXUS: ¡Eres una leyenda, Lucas! Gracias a tu pensamiento crítico, agilidad y principios éticos, todo el planeta está a salvo de la vigilancia masiva.';
      nextBtn.style.display = 'none';
      playAgainBtn.style.display = 'inline-block';
      this.sound.playFanfare();
    }

    setTimeout(() => {
      document.getElementById('screen-victory').classList.remove('hidden');
    }, 1200);
  }

  updateCamera() {
    if (this.currentWorld === '1-3' && this.player.x > 4050) {
      document.getElementById('boss-hud').classList.remove('hidden');
      const targetX = 4050;
      this.cameraX += (targetX - this.cameraX) * 0.1;
      return;
    }

    const targetX = this.player.x - CANVAS_WIDTH * 0.38;
    this.cameraX += (targetX - this.cameraX) * 0.12;
    if (this.cameraX < 0) this.cameraX = 0;
    if (this.cameraX > this.levelWidth - CANVAS_WIDTH) {
      this.cameraX = this.levelWidth - CANVAS_WIDTH;
    }
  }

  loop(timestamp) {
    if (this.isRunning) {
      this.player.update(this.input, this);
      this.movingPlatforms.forEach(p => p.update());
      this.bouncePads.forEach(bp => bp.update());
      this.laserBars.forEach(lb => lb.update());

      // Actualizar enemigos
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        e.update(this);
        if (!e.alive && (e.squishTimer > 0.5 || e.y > CANVAS_HEIGHT + 100)) {
          this.enemies.splice(i, 1);
        }
      }

      if (this.boss) this.boss.update(this);

      // Actualizar proyectiles
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const pr = this.projectiles[i];
        pr.update(this.platforms, this);
        if (!pr.alive) this.projectiles.splice(i, 1);
      }

      this.dataBits.forEach(b => b.update());
      this.particles.update();
      this.updateCamera();
    }

    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 1. Fondos Parallax
    this.background.draw(ctx, this.cameraX);

    // 2. Plataformas fijas
    this.renderPlatforms(ctx);

    // 3. Plataformas móviles
    this.movingPlatforms.forEach(p => p.draw(ctx, this.cameraX));

    // 4. Trampolines / Nodos de Rebote
    this.bouncePads.forEach(bp => bp.draw(ctx, this.cameraX));

    // 5. Barras Láser Giratorias
    this.laserBars.forEach(lb => lb.draw(ctx, this.cameraX));

    // 6. Bloques [?]
    this.mysteryBlocks.forEach(b => b.draw(ctx, this.cameraX));

    // 7. Data-Bits
    this.dataBits.forEach(b => b.draw(ctx, this.cameraX));

    // 8. Meta o Interruptor
    if (this.goalPole) this.goalPole.draw(ctx, this.cameraX);
    if (this.purgeSwitch) this.purgeSwitch.draw(ctx, this.cameraX);

    // 9. Jefe Final
    if (this.boss) this.boss.draw(ctx, this.cameraX);

    // 10. Proyectiles
    this.projectiles.forEach(pr => pr.draw(ctx, this.cameraX));

    // 11. Enemigos
    this.enemies.forEach(e => e.draw(ctx, this.cameraX));

    // 12. Lucas
    this.player.draw(ctx, this.assets, this.cameraX);

    // 13. Partículas y Textos Flotantes
    this.particles.draw(ctx, this.cameraX);
  }

  renderPlatforms(ctx) {
    const floorY = 570;
    const isLevel2 = this.currentWorld === '1-2';
    const isLevel3 = this.currentWorld === '1-3';
    const isLevel4 = this.currentWorld === '1-4';

    this.platforms.forEach(plat => {
      const rx = plat.x - this.cameraX;
      if (rx + plat.width < 0 || rx > CANVAS_WIDTH) return;

      ctx.save();
      if (plat.y >= floorY - 80) {
        // Suelo cibernético
        let fill = '#0a1022';
        let neon = '#00f3ff';
        if (isLevel2) { fill = '#120a22'; neon = '#ff0055'; }
        if (isLevel3) { fill = '#080004'; neon = '#ff0055'; }
        if (isLevel4) { fill = '#031936'; neon = '#38bdf8'; }

        ctx.fillStyle = fill;
        ctx.fillRect(rx, plat.y, plat.width, plat.height);

        ctx.fillStyle = neon;
        ctx.fillRect(rx, plat.y, plat.width, 4);

        ctx.strokeStyle = neon;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        for (let gx = rx; gx < rx + plat.width; gx += 32) {
          ctx.beginPath();
          ctx.moveTo(gx, plat.y + 4);
          ctx.lineTo(gx, plat.y + plat.height);
          ctx.stroke();
        }
      } else if (plat.width === 70) {
        // Servidor vertical
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(rx, plat.y, plat.width, plat.height);
        ctx.strokeStyle = isLevel4 ? '#38bdf8' : (isLevel3 ? '#ff0055' : (isLevel2 ? '#ff0055' : '#00f3ff'));
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, plat.y, plat.width, plat.height);

        ctx.fillStyle = '#334155';
        ctx.fillRect(rx - 4, plat.y, plat.width + 8, 12);
        ctx.strokeStyle = ctx.strokeStyle;
        ctx.strokeRect(rx - 4, plat.y, plat.width + 8, 12);
      } else {
        // Plataformas suspendidas
        ctx.fillStyle = isLevel4 ? 'rgba(7, 30, 60, 0.92)' : (isLevel3 ? 'rgba(20, 5, 12, 0.95)' : 'rgba(15, 23, 42, 0.9)');
        ctx.fillRect(rx, plat.y, plat.width, plat.height);

        const borderCol = isLevel4 ? '#38bdf8' : (isLevel3 ? '#ff0055' : (isLevel2 ? '#00f3ff' : '#b5179e'));
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.shadowColor = borderCol;
        ctx.shadowBlur = 8;
        ctx.strokeRect(rx, plat.y, plat.width, plat.height);

        ctx.fillStyle = isLevel4 ? '#10b981' : (isLevel3 ? '#ffd700' : (isLevel2 ? '#ff0055' : '#00f3ff'));
        ctx.fillRect(rx, plat.y, plat.width, 3);
      }
      ctx.restore();
    });
  }
}

// Iniciar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  window.game = new PlatformerGame();
});
