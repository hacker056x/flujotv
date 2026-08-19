(function() {
  // Elementos del DOM
  const rollBtn = document.getElementById('rollBtn');
  const result = document.getElementById('result');
  const countdown = document.getElementById('countdown');
  const accountDisplay = document.getElementById('account');

  // Constantes
  const STORAGE_PREFIX = 'flujo';

  // Lista de cuentas
  const accounts = [
    'usuario : 00000000000000000000000\ncontraseña : 11111111',
    'usuario : 00000000000000000000000\ncontraseña : 11111111',
    'usuario : Kleg45\ncontraseña : klear2026',
    'usuario : jprsesr\ncontraseña : casa5763',
    'usuario : Frecc44\ncontraseña : adm556',
    'usuario : Josxxx1\ncontraseña : Sofi2024',
    'usuario : FabianMarin\ncontraseña : Olga2495',
    'usuario : Josccr2\ncontraseña : milton63',
    'usuario : bmlge345\ncontraseña : admcby67',
    'usuario : cfhr03561457485\ncontraseña : diana2026'
  ];

  // Funciones de almacenamiento
  function getStorage(key, fallback) {
    const val = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
    return val !== null ? JSON.parse(val) : fallback;
  }

  function setStorage(key, value) {
    localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
  }

  // Reiniciar cooldown (al ganar)
  function resetCooldown() {
    setStorage('cooldownUntil', null);
    setStorage('penalty', 0);
    setStorage('attempts', 3);
  }

  // Iniciar cooldown con penalización
  function startCooldown(minutes) {
    const until = Date.now() + minutes * 60 * 1000;
    setStorage('cooldownUntil', until);
    updateCountdown(until);
  }

  // Actualizar visualización de la cuenta regresiva
  function updateCountdown(until) {
    rollBtn.disabled = true;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = until - now;
      if (diff <= 0) {
        clearInterval(interval);
        countdown.innerText = 'Ya puedes volver a lanzar.';
        rollBtn.disabled = false;
        setStorage('cooldownUntil', null);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        countdown.innerText = `Espera ${mins}m ${secs}s...`;
      }
    }, 1000);
  }

  // Inicialización
  function init() {
    const cooldownUntil = getStorage('cooldownUntil', null);

    if (cooldownUntil && Date.now() < cooldownUntil) {
      updateCountdown(cooldownUntil);
    } else {
      rollBtn.disabled = false;
      if (getStorage('attempts', 3) !== 3) {
        setStorage('attempts', 3);
      }
    }

    // Evento del botón
    rollBtn.addEventListener('click', function() {
      const roll = Math.floor(Math.random() * 6) + 1;
      result.innerText = `Has sacado un ${roll}`;

      if (roll === 6) {
        const account = accounts[Math.floor(Math.random() * accounts.length)];
        accountDisplay.innerText = `🎉 ¡Ganaste! Cuenta: ${account}`;
        resetCooldown();
        rollBtn.disabled = false;
        countdown.innerText = '';
      } else {
        accountDisplay.innerText = '❌ No ganaste esta vez.';
        let currentAttempts = getStorage('attempts', 3) - 1;
        if (currentAttempts <= 0) {
          let currentPenalty = getStorage('penalty', 0) + 5;
          setStorage('penalty', currentPenalty);
          setStorage('attempts', 3);
          startCooldown(currentPenalty);
        } else {
          setStorage('attempts', currentAttempts);
        }
      }
    });
  }

  // Ejecutar
  init();
})();
