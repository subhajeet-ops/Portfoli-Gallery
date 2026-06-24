(function () {

  /* ─────────────────────────────────────────────
     CONSTANTS
  ───────────────────────────────────────────── */
  const WORLD_W = 2600;
  const SPEED   = 5.8;

  const FRAME_QUOTES = [
    `"Women will have to lead it from the very front"`,
    `"How's the Josh? High, Sir."`,
    `"Happiness is most genuine when it is unfiltered."`,
    `"Yeh Dil Maange More Sir, Yeh Dil Maange More"`,
    `"The Eyes, They never Lie. And They believe."`
  ];

  /* ─────────────────────────────────────────────
     HALLWAY
  ───────────────────────────────────────────── */
  const hall     = document.getElementById('hall');
  const charHall = document.getElementById('char-hall');
  const hallRig  = document.getElementById('hall-rig');
  const hallDog  = document.getElementById('hall-dog');

  let hallX       = hall.clientWidth * 0.45;
  let hallTarget  = hallX;
  let hallCb      = null;
  let hallTicking = false;

  charHall.style.left = hallX + 'px';

  function hallLoop() {
    const dx = hallTarget - hallX;
    if (Math.abs(dx) <= 3) {
      hallX = hallTarget;
      hallRig.classList.remove('walking');
      charHall.style.left = hallX + 'px';
      hallTicking = false;
      if (hallCb) { const f = hallCb; hallCb = null; f(); }
      return;
    }
    hallX += Math.sign(dx) * 5.5;
    hallRig.classList.toggle('flip', dx < 0);
    hallDog.classList.toggle('flip', dx < 0);
    charHall.style.left = hallX + 'px';
    requestAnimationFrame(hallLoop);
  }

  function hallWalkTo(x, cb) {
    hallTarget = Math.max(50, Math.min(hall.clientWidth - 50, x));
    hallCb = cb || null;
    if (!hallTicking) {
      hallTicking = true;
      hallRig.classList.add('walking');
      requestAnimationFrame(hallLoop);
    }
  }

  hall.addEventListener('click', e => {
    if (e.target.closest('.door-wrap')) return;
    hallWalkTo(e.clientX - hall.getBoundingClientRect().left);
  });

  /* dog fidget on hover */
  window.addEventListener('mousemove', e => {
    const dogEl = document.querySelector('#char-hall .dog-rig');
    if (!dogEl || !hall.classList.contains('active')) return;
    const r = dogEl.getBoundingClientRect();
    dogEl.classList.toggle('fidget',
      Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 130
    );
  });

  /* locked door tooltip */
  const lockedTip = document.getElementById('locked-tip');
  document.querySelectorAll('.door-wrap').forEach(dw => {
    dw.addEventListener('mouseenter', () => {
      if (!dw.classList.contains('locked')) return;
      const r = dw.getBoundingClientRect();
      lockedTip.style.left = (r.left + r.width / 2) + 'px';
      lockedTip.style.top  = r.top + 'px';
      lockedTip.textContent = dw.dataset.tip || 'Coming soon';
      lockedTip.style.display = 'block';
    });
    dw.addEventListener('mouseleave', () => lockedTip.style.display = 'none');
    dw.addEventListener('click', () => {
      if (dw.classList.contains('locked')) return;
      const r     = dw.getBoundingClientRect();
      const hRect = hall.getBoundingClientRect();
      hallWalkTo(r.left - hRect.left + r.width / 2,
        () => setTimeout(() => enterRoom(dw.dataset.room), 200));
    });
  });

  /* ─────────────────────────────────────────────
     SCENE SWITCHING
  ───────────────────────────────────────────── */
  function enterRoom(id) {
    hall.classList.remove('active');
    document.getElementById(id).classList.add('active');
  }

  function exitToHall() {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    hall.classList.add('active');
  }

  document.getElementById('backBtn').addEventListener('click', exitToHall);

  /* ─────────────────────────────────────────────
     ROOM 1 — GAME LOOP
  ───────────────────────────────────────────── */
  const room1    = document.getElementById('room1');
  const r1world  = document.getElementById('r1world');
  const charR1   = document.getElementById('char-room1');
  const r1Rig    = document.getElementById('r1-rig');
  const r1Dog    = document.getElementById('r1-dog');
  const exitHint = document.getElementById('exitHint');

  let playerX = 220;
  let vpW     = window.innerWidth;
  let keys    = { left: false, right: false };

  charR1.style.position  = 'absolute';
  charR1.style.bottom    = '17%';
  charR1.style.transform = 'translateX(-50%)';

  function getCamera() {
    return Math.max(0, Math.min(WORLD_W - vpW, playerX - vpW * 0.38));
  }

  function renderR1() {
    vpW = window.innerWidth;
    const cam = getCamera();
    r1world.style.transform = `translateX(-${cam}px)`;
    charR1.style.left = (playerX - cam) + 'px';
    exitHint.classList.toggle('show', playerX > WORLD_W - 360);
  }

  /* arm raise on frame hover */
  let cursorNearFrame = false;
  document.querySelectorAll('#r1world .frame').forEach(frameEl => {
    frameEl.addEventListener('mouseenter', () => { cursorNearFrame = true;  r1Rig.classList.add('pointing'); });
    frameEl.addEventListener('mouseleave', () => { cursorNearFrame = false; r1Rig.classList.remove('pointing'); });
  });

  /* dog fidget in room */
  window.addEventListener('mousemove', e => {
    if (!room1.classList.contains('active')) return;
    const dogEl = document.querySelector('#char-room1 .dog-rig');
    if (!dogEl) return;
    const r = dogEl.getBoundingClientRect();
    dogEl.classList.toggle('fidget',
      Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 130
    );
  });

  function r1Frame() {
    if (room1.classList.contains('active')) {
      const moving = keys.left || keys.right;
      if (keys.left)  { playerX = Math.max(60, playerX - SPEED);     r1Rig.classList.add('flip');    r1Dog.classList.add('flip'); }
      if (keys.right) { playerX = Math.min(WORLD_W, playerX + SPEED); r1Rig.classList.remove('flip'); r1Dog.classList.remove('flip'); }
      r1Rig.classList.toggle('walking', moving);
      r1Dog.classList.toggle('walking', moving);
      if (moving && !cursorNearFrame) r1Rig.classList.remove('pointing');
      renderR1();
      if (playerX >= WORLD_W - 30) { playerX = 220; exitToHall(); renderR1(); }
    }
    requestAnimationFrame(r1Frame);
  }

  /* keyboard */
  window.addEventListener('keydown', e => {
    if (overlayOpen()) return;
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { keys.left  = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.right = true; e.preventDefault(); }
  });
  window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') keys.left  = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });

  /* mobile buttons */
  ['btnLeft', 'btnRight'].forEach((id, i) => {
    const btn = document.getElementById(id);
    const dir = i === 0 ? 'left' : 'right';
    btn.addEventListener('pointerdown',  () => keys[dir] = true);
    btn.addEventListener('pointerup',    () => keys[dir] = false);
    btn.addEventListener('pointerleave', () => keys[dir] = false);
  });

  window.addEventListener('resize', () => renderR1());
  renderR1();
  r1Frame();

  /* ─────────────────────────────────────────────
     FRAME OVERLAY
  ───────────────────────────────────────────── */
  const overlay    = document.getElementById('frame-overlay');
  const oImg       = document.getElementById('overlay-img');
  const oNoteTitle = document.getElementById('note-title');
  const oNoteQuote = document.getElementById('note-quote');
  const oNoteBody  = document.getElementById('note-body');

  function overlayOpen() { return overlay.classList.contains('show'); }

  Array.from(document.querySelectorAll('#r1world .frame')).forEach((f, i) => {
    f.addEventListener('click', () => {
      const imgEl = f.querySelector('img');
      if (imgEl) { oImg.src = imgEl.src; oImg.style.display = 'block'; }
      oNoteTitle.textContent = f.dataset.title || 'Untitled';
      oNoteQuote.textContent = FRAME_QUOTES[i] || '';
      oNoteBody.textContent  = f.dataset.desc  || '';
      overlay.classList.add('show');
      keys.left = keys.right = false;
    });
  });

  function closeOverlay() { overlay.classList.remove('show'); }
  document.getElementById('overlayClose').addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

})();
