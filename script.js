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
    'usuario : c8ja8b021418471\ncontraseña : 77297a92',
    'usuario : cwm5szq61417944\ncontraseña : 62702a09',
    'usuario : cwy1tr341417915\ncontraseña : 71224b46',
    'usuario : c7zj3sdw1417914\ncontraseña : 46772123',
    'usuario : c40xd6ug1417906\ncontraseña : 108922c1',
    'usuario : cfjq90j71417910\ncontraseña : 23259692',
    'usuario : cy3r9c3k1417908\ncontraseña : guaman1997',
    'usuario : cgk7a5m11417909\ncontraseña : kechimbo',
    'usuario : c48ks9co1417907\ncontraseña : a13c6276',
    'usuario : cj5asx7p1417912\ncontraseña : b1368a8b',
    'usuario : c427h0s81417913\ncontraseña : 3081c197',
    'usuario : ceyh418d1417911\ncontraseña : a7b92604',
    'usuario : cox48z5y1417867\ncontraseña : 953b6160',
    'usuario : c9b3h1621417866\ncontraseña : 69431505',
    'usuario : c759q15p1417856\ncontraseña : tokyo99',
    'usuario : cc55b2bt1417705\ncontraseña : 26109a68',
    'usuario : c5dxc9pr1417565\ncontraseña : 555555',
    'usuario : c2d3544n1417504\ncontraseña : 49965967',
    'usuario : crsbz67j1417385\ncontraseña : 617bb122',
    'usuario : cun8546u1417084\ncontraseña : britney2020',
    'usuario : cj8029r01417028\ncontraseña : lima2025',
    'usuario : c39ks9pk1417029\ncontraseña : matias28',
    'usuario : cx211bt41417027\ncontraseña : c6428908',
    'usuario : c5a9nvny1417026\ncontraseña : 41448aa7',
    'usuario : cbnda02q1417025\ncontraseña : 34787872',
    'usuario : cj1mvr541416814\ncontraseña : 1b085462',
    'usuario : c6ptv6381416771\ncontraseña : jaronulo',
    'usuario : czg167811416589\ncontraseña : 38719360',
    'usuario : c04cy11f1416582\ncontraseña : 45625788',
    'usuario : c7916z761416587\ncontraseña : 55a48338',
    'usuario : cfj02w141416583\ncontraseña : 35b23466',
    'usuario : c76g59051416584\ncontraseña : 08112a69',
    'usuario : c58o9r9j1416586\ncontraseña : 39310815',
    'usuario : c9m0a3261416590\ncontraseña : 0907cb47',
    'usuario : c41850611416588\ncontraseña : 8756b609',
    'usuario : cp2x85091416581\ncontraseña : 8309c684',
    'usuario : c2cgrzy21416585\ncontraseña : 50808405',
    'usuario : c4ujz2y91416223\ncontraseña : 05889457',
    'usuario : ck5e8smb1416103\ncontraseña : 251b2b38',
    'usuario : c3h3oo951416104\ncontraseña : 96690229',
    'usuario : c9js05891416106\ncontraseña : 50544786',
    'usuario : cjo0c99m1416102\ncontraseña : 0b96a545',
    'usuario : c79btgu91416107\ncontraseña : 6b1140a2',
    'usuario : cx55f67a1416105\ncontraseña : 935569a9',
    'usuario : c9ys2r0e1416098\ncontraseña : 75656yy6',
    'usuario : c93989361416100\ncontraseña : a2c31686',
    'usuario : c7un07mw1416099\ncontraseña : Seb12Bru',
    'usuario : ch8x6mnh1416101\ncontraseña : 39911263',
    'usuario : cj28av121416062\ncontraseña : 61962b19',
    'usuario : c3808z461415290\ncontraseña : Lueh0302',
    'usuario : c0ys03521415292\ncontraseña : 114949c1',
    'usuario : csn9419x1415291\ncontraseña : 3784061a',
    'usuario : c8yxtod71415293\ncontraseña : mayeyo99',
    'usuario : cm1tjd1j1415289\ncontraseña : 59072170',
    'usuario : ch0v0rq91415047\ncontraseña : 122cb060',
    'usuario : c42v659s1414880\ncontraseña : 87a8ba47',
    'usuario : c73293r81414882\ncontraseña : 592276b0',
    'usuario : c95844171414881\ncontraseña : 848b116a',
    'usuario : cyr3b7wr1414874\ncontraseña : 80473710',
    'usuario : cdgy7y411414873\ncontraseña : 2617142025',
    'usuario : c0y5ts341414875\ncontraseña : 183a6642',
    'usuario : c696g9r81414878\ncontraseña : 292480c0',
    'usuario : ct70xr5y1414502\ncontraseña : jerson5',
    'usuario : c19n946x1414415\ncontraseña : 19760927',
    'usuario : c73306861414192\ncontraseña : 84bb9571',
    'usuario : cegh96031413951\ncontraseña : fargot0988',
    'usuario : crx659541413732\ncontraseña : 473b3bc4',
    'usuario : c49m9ghx1413728\ncontraseña : 49361085',
    'usuario : cj7wvbe11413564\ncontraseña : a2584370',
    'usuario : c7w3o9631413570\ncontraseña : c3561637',
    'usuario : cv0v74j11413566\ncontraseña : 35443237',
    'usuario : ca3u3q7x1413563\ncontraseña : iu8iikikh',
    'usuario : cyrm00th1413518\ncontraseña : Santy2302',
    'usuario : c5m2370p1413421\ncontraseña : 43363645',
    'usuario : cf7ctf311412954\ncontraseña : 7b037b23',
    'usuario : c5vcg0901412891\ncontraseña : FlujoTv891',
    'usuario : cyf37s3y1412899\ncontraseña : flujotvCar99',
    'usuario : cy9jh3591412895\ncontraseña : 04530841',
    'usuario : c7600em71412708\ncontraseña : 73763933',
    'usuario : cn0e5o181412435\ncontraseña : sp87466433',
    'usuario : cgawqy3u1412344\ncontraseña : saltos3dumas2',
    'usuario : c8hc0yvv1411971\ncontraseña : 96991225',
    'usuario : c951vsu61411928\ncontraseña : 1c8464b1',
    'usuario : ch89c6ac1411770\ncontraseña : ccmj2325',
    'usuario : c6w6215o1411183\ncontraseña : chambito',
    'usuario : cy8485481411130\ncontraseña : 339383a1',
    'usuario : c242cje81410972\ncontraseña : 31028597',
    'usuario : cfd1s2531410419\ncontraseña : 1b062109',
    'usuario : c936xd6t1410366\ncontraseña : 78b60454',
    'usuario : c446aw1y1410369\ncontraseña : a1987389',
    'usuario : c2m39enn1410363\ncontraseña : 65824661',
    'usuario : c97n3fcw1410361\ncontraseña : 19861b40',
    'usuario : cfe29r0f1410244\ncontraseña : isislu2015',
    'usuario : cg40r23w1410140\ncontraseña : magis0803',
    'usuario : cobvxt1z1410119\ncontraseña : 8b5b6905',
    'usuario : c9679ok41409955\ncontraseña : magis1747',
    'usuario : c47os3m21409805\ncontraseña : 998877',
    'usuario : cam2cej81409651\ncontraseña : 48204884',
    'usuario : ckkn5a7c1408775\ncontraseña : c2a63a13',
    'usuario : cc0r55091408591\ncontraseña : FlujotvCar591',
    'usuario : co6832321408621\ncontraseña : 47330350'
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