/* script.js — la logique du jeu (tu n'as normalement rien à changer ici). */
(() => {
  const $ = (s) => document.querySelector(s);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const screens = { welcome: $("#welcome"), quiz: $("#quiz"), end: $("#end"), letter: $("#letter") };
  const total = QUIZ.length;

  let index = 0, score = 0, answered = false, quizDone = false, skipTyping = false;

  function show(name) {
    // La lettre est verrouillée tant que le quiz n'est pas terminé.
    if (name === "letter" && !quizDone) return;
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo(0, 0);
  }

  /* ---------- Quiz ---------- */
  function renderQuestion() {
    const q = QUIZ[index];
    answered = false;
    $("#count").textContent = `${index + 1}/${total}`;
    $("#score").textContent = `✦ ${score}`;
    $("#bar").style.width = `${(index / total) * 100}%`;
    $("#qtitle").textContent = q.q;
    $("#react").textContent = "";
    $("#next").hidden = true;
    $("#next").textContent = index === total - 1 ? "Terminer" : "Continuer";

    const opts = $("#opts");
    opts.innerHTML = "";
    q.options.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = text;
      b.addEventListener("click", () => answer(i, b));
      opts.appendChild(b);
    });
    const card = $("#qcard");
    card.classList.remove("swap");
    void card.offsetWidth; // relance l'animation
    card.classList.add("swap");
  }

  function answer(i, btn) {
    if (answered) return;
    answered = true;
    const q = QUIZ[index];
    const ok = i === q.correct;
    document.querySelectorAll(".opt").forEach((b) => (b.disabled = true));
    btn.classList.add(ok ? "ok" : "no"); // on ne révèle pas la bonne réponse en cas d'erreur
    if (ok) score++;
    $("#score").textContent = `✦ ${score}`;
    $("#react").textContent = ok ? q.good || pick(GOOD_MESSAGES) : q.bad || pick(BAD_MESSAGES);
    $("#bar").style.width = `${((index + 1) / total) * 100}%`;
    $("#next").hidden = false;
    if (q.fusion) playFusion();
  }

  async function playFusion() {
    const f = $("#fusion");
    f.classList.add("show");
    await wait(2400);
    f.classList.remove("show");
  }

  function nextQuestion() {
    if (!answered) return;
    index++;
    if (index >= total) return finishQuiz();
    renderQuestion();
  }

  function finishQuiz() {
    quizDone = true;
    $("#finalScore").textContent = `Score : ${score}/${total} ${"★".repeat(score)}`;
    show("end");
    sparkles();
  }

  function sparkles() {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = "50%";
      s.style.top = "35%";
      const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 150;
      s.style.setProperty("--x", `${Math.cos(a) * d}px`);
      s.style.setProperty("--y", `${Math.sin(a) * d}px`);
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1900);
    }
  }

  /* ---------- Lettre ---------- */
  async function openLetter() {
    if (!quizDone) return;
    show("letter");
    await wait(900);
    $("#env").classList.add("open");
    await wait(1300);
    $("#env").classList.add("gone");
    $("#paper").hidden = false;
    await typeLetter();
    $("#skip").hidden = true;
    await wait(600);
    $("#after").hidden = false;
    $("#after").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function typeLetter() {
    const box = $("#letterText");
    box.innerHTML = "";
    skipTyping = false;
    for (const para of LETTER) {
      const p = document.createElement("p");
      box.appendChild(p);
      if (skipTyping) { p.textContent = para; continue; }
      p.scrollIntoView({ behavior: "smooth", block: "end" });
      for (const ch of para) {
        if (skipTyping) { p.textContent = para; break; }
        p.textContent += ch;
        await wait(24);
      }
      if (!skipTyping) await wait(350);
    }
  }

  /* ---------- Réactions finales + WhatsApp ---------- */
  function setupFinal() {
    const wrap = $("#reacts");
    FINAL_REACTIONS.forEach((r) => {
      const b = document.createElement("button");
      b.className = "btn";
      b.textContent = r.label;
      b.addEventListener("click", () => ($("#reactMsg").textContent = r.msg));
      wrap.appendChild(b);
    });
    const num = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    $("#wa").href = `https://wa.me/${num}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  }

  /* ---------- Décor (étoiles + cœurs discrets) ---------- */
  function sky() {
    const c = $("#sky"), ctx = c.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, stars = [];
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(Math.min(70, (w * h) / 9000)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.3,
        p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.006, v: Math.random() * 0.1 + 0.02
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.p += s.s; s.y -= s.v; if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
        ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(s.p));
        ctx.fillStyle = s.r > 1.1 ? "#f4a6c4" : "#ffffff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce && !document.hidden) requestAnimationFrame(frame); else if (!reduce) setTimeout(frame, 500);
    }
    resize(); addEventListener("resize", resize); frame();

    const box = $("#hearts");
    for (let i = 0; i < 6; i++) {
      const hEl = document.createElement("span");
      hEl.className = "heart"; hEl.textContent = "♥";
      hEl.style.left = `${8 + Math.random() * 84}%`;
      hEl.style.fontSize = `${10 + Math.random() * 10}px`;
      hEl.style.animationDuration = `${16 + Math.random() * 12}s`;
      hEl.style.animationDelay = `${-Math.random() * 20}s`;
      box.appendChild(hEl);
    }
  }

  /* ---------- Démarrage ---------- */
  $("#start").addEventListener("click", () => { index = 0; score = 0; show("quiz"); renderQuestion(); });
  $("#next").addEventListener("click", nextQuestion);
  $("#reveal").addEventListener("click", openLetter);
  $("#skip").addEventListener("click", () => (skipTyping = true));
  setupFinal();
  sky();
})();
