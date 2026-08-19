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
    'usuario : cq2u5j051418830\ncontraseña : 11511474',
    'usuario : cw2w0g0v1418832\ncontraseña : 69334503',
    'usuario : cncb68z61418833\ncontraseña : 33164c67',
    'usuario : c94966x81418831\ncontraseña : 91c29232',
    'usuario : c79o01161418827\ncontraseña : b77933b8',
    'usuario : c55nhmbn1418828\ncontraseña : 39958111',
    'usuario : cv416b751418829\ncontraseña : 5510aa36',
    'usuario : c9288d611418469\ncontraseña : 95284677',
    'usuario : crunk9161418467\ncontraseña : darkar07',
    'usuario : c8ja8b021418471\ncontraseña : 77297a92'
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
