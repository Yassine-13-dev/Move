(function (){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d', {alpha:true});
  let cw, ch, fontSize, columns, drops, speeds;

  function resize() {
    cw = canvas.width = innerWidth;
    ch = canvas.height = innerHeight;
    fontSize = Math.max(14, Math.floor(cw / 70));
    columns = Math.floor(cw / fontSize);
    drops = new Array(columns);
    speeds = new Array(columns);
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * ch / fontSize);
      speeds[i] = (0.6 + Math.random() * 2.2);
    }
    ctx.textBaseline = 'top';
    ctx.font = `${fontSize}px monospace`;
  }

  const characters = "01#$%&ABXJQZ";
  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0, 0, cw, ch);

    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const chChar = characters.charAt(Math.floor(Math.random() * characters.length));
      const grad = ctx.createLinearGradient(0, y - fontSize, 0, y + fontSize);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.25, "rgba(180,255,200,0.85)");
      grad.addColorStop(0.6, "rgba(60,255,150,0.55)");
      grad.addColorStop(1, "rgba(0,200,120,0.18)");
      ctx.fillStyle = grad;
      ctx.fillText(chChar, x, y);
      drops[i] += speeds[i];
      if (drops[i] * fontSize > ch + Math.random() * ch * 0.5) {
        drops[i] = -Math.floor(Math.random() * 20);
        speeds[i] = (0.1 + Math.random() * 2.2);
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();

  // Element & placeholders
  const btn = document.getElementById('breach-trigger');
  const firewall = document.querySelector('.firewall-shape');

  // Function called when the button is clicked: connect later to the breach animation
  function triggerBreach() {
    // Visual quick feedback: add class to firewall, disable button
    firewall.classList.add('breach-start');
    btn.classList.add('clicked');
    btn.disabled = true;
    btn.setAttribute('aria-pressed', 'true');

    // Example visual: quick scale + stronger glow (CSS-driven via class)
    firewall.style.transition = 'transform 250ms ease, box-shadow 260ms ease';
    firewall.style.transform = 'scale(1.02)';
    setTimeout(()=> firewall.style.transform = '', 260);

    // TODO: ici on déclenchera l'animation d'explosion / transition (Étape 7)
    console.log('[DEBUG] breach triggered — placeholder: implement rupture animation here');

    // If you have audio, play it here (placeholder):
    // const audio = new Audio('assets/breach-sfx.mp3'); audio.play();
  }

  // Click handler (stops event from bubbling to canvas)
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerBreach();
  });

  // Keyboard: Enter/Space handled automatically by <button>, but we can add explicit handler for accessibility
  btn.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' || e.key === ' '){
      // space key sometimes inserts space; already handled, but safe to call:
      triggerBreach();
    }
  });