const toast = document.querySelector('.toast');
document.querySelectorAll('[data-toast]').forEach((button) => {
  button.addEventListener('click', () => {
    toast.textContent = button.dataset.toast;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rain = document.querySelector('.equation-field');
const equations = [
  '∇θ J(θ)',
  'L(θ) = 1/n Σ(y − ŷ)²',
  'σ(z) = 1/(1 + e⁻ᶻ)',
  'p(y|x) = softmax(Wx + b)',
  'Attention(Q,K,V)',
  'η ← η − α∇L',
  'E[x] = Σ x · p(x)',
];

if (rain) {
  for (let column = 0; column < 18; column += 1) {
    const stream = document.createElement('span');
    stream.className = 'equation-stream';
    stream.style.top = `${5 + column * 5.2 + Math.random() * 3}%`;
    // Keep the equation layer slow and easy to ignore while reading.
    stream.style.animationDuration = `${90 + Math.random() * 60}s`;
    stream.style.animationDelay = `${-Math.random() * 26}s`;
    stream.textContent = Array.from({ length: 5 }, () => equations[Math.floor(Math.random() * equations.length)]).join('   ·   ');
    rain.appendChild(stream);
  }
}

const terminalLines = [
  'J(θ) = 1/n Σ(y − ŷ)²',
  '∇θ J(θ) → update weights',
  'status: learning signal stable_',
];
const terminalTargets = [...document.querySelectorAll('[data-terminal-line]')];

if (terminalTargets.length) {
  const typeLine = (target, text, index = 0) => {
    if (index > text.length) return;
    target.textContent = text.slice(0, index);
    window.setTimeout(() => typeLine(target, text, index + 1), reduceMotion ? 0 : 26);
  };
  terminalTargets.forEach((target, index) => typeLine(target, terminalLines[index]));
}

