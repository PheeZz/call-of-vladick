const questions = [
  {
    title: 'Владик, пойдёшь с Данечкой в колду?',
    description: 'Простой вопрос, Владик. Отвечай честно. Данечка ждёт.',
    answers: ['Да, Данечка, погнали', 'Нет'],
    reactions: [
      ['Красавчик, Владик. Правильный ответ.', 'Данечка знал, что на тебя можно положиться. Но формальности есть формальности — ещё девять вопросов.'],
      ['«Нет, я не просто хочу. Я пиздец как хочу».', 'Именно так Данечка и прочитал твой ответ. Приятно иметь дело с человеком, который умеет выражать свои чувства.']
    ]
  },
  {
    title: 'Владик, какие планы на вечер?',
    description: 'Выбери то, к чему лежит душа. И мышка.',
    answers: ['Катать с Данечкой', 'Отдохнуть от всего'],
    reactions: [
      ['Вот это я понимаю — планы.', 'Сначала с Данечкой «одна катка», потом птицы за окном. Классика крепкой дружбы.'],
      ['Отдохнуть от всего. Кроме колды.', 'От работы, забот и принятия решений. Данечка уже всё решил: сегодня катаете.']
    ]
  },
  {
    title: 'Готов прикрыть жопу Данечки?',
    description: 'Вопрос исключительно тактический. Почти наверняка.',
    answers: ['Всегда готов', 'Я лучше дома посижу'],
    reactions: [
      ['Настоящий brother in arms.', 'Ты прикрываешь Данечку, Данечка прикрывает тебя. Иногда оба смотрим не туда. Зато вместе.'],
      ['Дома? Идеально. Комп же там.', 'Мы никуда и не собирались. Сиди удобно, надевай наушники. Операция уже спланирована.']
    ]
  },
  {
    title: 'А если будем проигрывать?',
    description: 'Небольшой стресс-тест перед отправкой в лобби.',
    answers: ['Зато вместе поржём', 'Тогда я не играю'],
    reactions: [
      ['Ради этого всё и затевалось.', 'Победа — дело временное. Орать с Данечкой «ДА КАК ОН МЕНЯ УВИДЕЛ» в два микрофона — бесценно.'],
      ['То есть настроен только побеждать.', 'Вот это настрой! Записываю: «мотивированный игрок, готов тащить». Отмазку не обнаружено.']
    ]
  },
  {
    title: 'Половина пути. Владик, ты с Данечкой?',
    description: 'Внимательно изучи оба варианта. Это очень свободный выбор.',
    answers: ['Да, запускаю колду', 'Нет, запускаю колду'],
    reactions: [
      ['Добро пожаловать в отряд, Владик.', 'Пять из пяти. А теперь бонусный раунд: посмотрим, насколько сильно ты хочешь в колду.'],
      ['Слово «нет» тут явно лишнее.', 'Главное мы услышали: «запускаю колду». Данечка доволен твоей решительностью.']
    ]
  },
  {
    title: 'Владик, точно-точно не хочешь?',
    description: 'Если не хочешь — просто нажми «нет». Чего сложного-то?',
    answers: ['Да хочу я, хочу', 'Нет'],
    trick: 'runaway',
    reactions: [
      ['Устал гоняться за отмазками?', 'Правильная кнопка всё это время стояла на месте. Как и Данечка в лобби.'],
      ['Поймал «нет»? Вот это аим!', 'С таким аимом тебе Данечку тащить, а не отмазываться. Срочно в колду.']
    ]
  },
  {
    title: 'Может, всё-таки сольёшься?',
    description: 'У этой кнопки своё мнение. Спойлер: она на стороне Данечки.',
    answers: ['Не, Данечка, я с тобой', 'Да, сольюсь'],
    trick: 'switch',
    reactions: [
      ['Мужик сказал — мужик зашёл.', 'Ни шага назад. Кроме тех случаев, когда в тебя летит граната.'],
      ['Кнопка переобулась быстрее тебя.', 'Хотел слиться, а подписался на катку. Даже интерфейс знает, чего ты на самом деле хочешь.']
    ]
  },
  {
    title: 'Есть хоть одна причина не играть?',
    description: 'Попробуй надавить на свою отмазку. Посмотрим, что от неё останется.',
    answers: ['Ни одной, погнали', 'Есть вообще-то'],
    trick: 'shrink',
    reactions: [
      ['Железобетонная аргументация.', 'Ноль причин против. Данечка за. Математика элементарная, блядь.'],
      ['Отмазка уменьшилась до нуля.', 'Три нажатия — и от неё ничего не осталось. А желание поиграть только выросло.']
    ]
  },
  {
    title: 'Оформим официальный отказ?',
    description: 'Наша бюрократия работает безупречно. Особенно против тебя.',
    answers: ['Не надо, я играю', 'Оформить отказ'],
    trick: 'paperwork',
    reactions: [
      ['Бумажки подождут. Катка — нет.', 'Люблю людей, которые решают вопросы без лишней хуйни.'],
      ['Ваш отказ успешно отклонён.', 'Данечка лично рассмотрел заявку. Резолюция: «Владик, запускай игру».']
    ]
  },
  {
    title: 'Владик, доверим решение судьбе?',
    description: 'Последний шанс. Рулетка абсолютно честная. Мамой клянусь.',
    answers: ['Данечка, я уже запускаю', 'Крути, я рискую'],
    trick: 'roulette',
    reactions: [
      ['Судьба любит решительных.', 'Десять из десяти, Владик. Твоё желание играть подтверждено всеми известными науке способами.'],
      ['Выпало: пиздуй в колду.', 'Невероятно! Вероятность этого исхода была всего лишь сто процентов. Судьба есть судьба.']
    ]
  }
];

const memes = ['billy', 'billy-smile', 'billy-approve', 'danny', 'van', 'gachi-roll', 'billy-jojo', 'aniki', 'van-reaction', 'billy-dance'];
const screen = document.querySelector('#screen');
const step = document.querySelector('#step');
const progress = document.querySelector('.progress');
const dialog = document.querySelector('#trap-dialog');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const page = document.querySelector('.page');
const introControls = document.querySelector('#intro-controls');
const pullTab = document.querySelector('#pull-tab');
const introInstruction = document.querySelector('#intro-instruction');
const scene = document.querySelector('#cinematic-scene');
const bootScreen = document.querySelector('#boot-screen');
const startButton = document.querySelector('#start-experience');
const retryButton = document.querySelector('#retry-assets');
const music = document.querySelector('#radio-audio');
const radio = document.querySelector('#field-radio');
const radioToggle = document.querySelector('#radio-toggle');
const radioVolume = document.querySelector('#radio-volume');
const radioStatus = document.querySelector('#radio-status');
music.volume = .35;

function syncRadio() {
  const playing = !music.paused;
  radio.classList.toggle('is-playing', playing);
  radioToggle.textContent = playing ? 'Ⅱ' : '▶';
  radioToggle.setAttribute('aria-pressed', String(playing));
  radioToggle.setAttribute('aria-label', playing ? 'Выключить музыку' : 'Включить музыку');
  radioStatus.textContent = playing ? 'В эфире · повтор включён' : 'Эфир на паузе';
}

function playMusic() {
  music.play().catch(() => {
    syncRadio();
    radio.open = true;
    radioStatus.textContent = 'Нажми ▶, чтобы включить эфир';
  });
}
music.addEventListener('play', syncRadio);
music.addEventListener('pause', syncRadio);
music.addEventListener('error', () => { radioStatus.textContent = 'Не удалось загрузить трек. Обнови страницу.'; });
radioToggle.addEventListener('click', () => { if (music.paused) playMusic(); else music.pause(); });
radioVolume.addEventListener('input', () => {
  music.volume = Number(radioVolume.value) / 100;
  document.querySelector('#radio-level').textContent = `${radioVolume.value}%`;
});
let assetsLoaded = false;
let introActive = false;
let introReady = false;
let introOpening = false;
let pull = null;
let introTimer;

function releasePull(event) {
  if (!pull || (event && event.pointerId !== pull.pointerId)) return;
  const pointerId = pull.pointerId;
  pull = null;
  if (pullTab.hasPointerCapture(pointerId)) pullTab.releasePointerCapture(pointerId);
  pullTab.classList.remove('is-dragging');
  if (!introOpening) {
    pullTab.style.removeProperty('--tear-x');
    pullTab.style.removeProperty('--tear-y');
    pullTab.style.removeProperty('--tear-angle');
  }
}

function finishIntro() {
  if (!introActive) return;
  radio.open = false;
  introActive = false;
  releasePull();
  introReady = false;
  introOpening = false;
  pullTab.disabled = true;
  window.clearTimeout(introTimer);
  document.documentElement.classList.remove('intro-playing', 'intro-ready', 'intro-opening');
  scene.style.removeProperty('--look-x');
  scene.style.removeProperty('--look-y');
  page.inert = false;
  introControls.hidden = true;
  screen.focus({ preventScroll: true });
}

function readyIntro() {
  if (!introActive || introReady || introOpening) return;
  window.clearTimeout(introTimer);
  introReady = true;
  pullTab.disabled = false;
  document.documentElement.classList.add('intro-ready');
  introInstruction.textContent = 'Владик, зажми край и потяни вправо или вверх. Ну, не ломайся.';
}

function openEnvelope() {
  if (!introActive || !introReady || introOpening) return;
  introOpening = true;
  releasePull();
  scene.style.removeProperty('--look-x');
  scene.style.removeProperty('--look-y');
  pullTab.disabled = true;
  document.documentElement.classList.add('intro-opening');
  introInstruction.textContent = 'Пакет вскрыт. Владик, Данечка собрал на тебя досье…';
  introTimer = window.setTimeout(finishIntro, 4400);
}

function startIntro() {
  bootScreen.hidden = true;
  document.documentElement.classList.remove('boot-loading');
  if (reducedMotion.matches) {
    radio.open = false;
    page.inert = false;
    screen.focus({ preventScroll: true });
    return;
  }
  introActive = true;
  introReady = false;
  introOpening = false;
  pullTab.disabled = true;
  pullTab.style.removeProperty('--tear-x');
  pullTab.style.removeProperty('--tear-y');
  pullTab.style.removeProperty('--tear-angle');
  page.inert = true;
  introControls.hidden = false;
  document.documentElement.classList.add('intro-playing');
  introInstruction.textContent = 'Входящий пакет Владику / от Данечки';
  introTimer = window.setTimeout(readyIntro, 2600);
}

async function loadAssets() {
  assetsLoaded = false;
  startButton.disabled = true;
  startButton.textContent = 'Загружаем…';
  retryButton.hidden = true;
  bootScreen.classList.remove('is-loaded');
  document.querySelector('#boot-status').textContent = 'Данечка собирает личное дело Владика…';
  const total = memes.length + 2;
  const progressBar = document.querySelector('#asset-progress');
  progressBar.setAttribute('aria-valuemax', total);
  let loaded = 0;
  function updateLoading() {
    progressBar.setAttribute('aria-valuenow', loaded);
    document.querySelector('#asset-progress-fill').style.width = `${loaded / total * 100}%`;
    document.querySelector('#asset-count').textContent = `${loaded} / ${total}`;
  }
  updateLoading();
  const images = memes.map((meme) => new Promise((resolve, reject) => {
    const image = new window.Image();
    const timeout = window.setTimeout(() => { image.onload = image.onerror = null; reject(new Error(meme)); }, 30000);
    image.onload = () => { window.clearTimeout(timeout); resolve(); };
    image.onerror = () => { window.clearTimeout(timeout); reject(new Error(meme)); };
    image.src = `assets/${meme}.gif`;
  }));
  const fonts = new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('fonts')), 30000);
    document.fonts.ready.then(() => { window.clearTimeout(timeout); resolve(); }, () => { window.clearTimeout(timeout); reject(new Error('fonts')); });
  });
  const audio = new Promise((resolve, reject) => {
    if (music.readyState >= 4) { resolve(); return; }
    const finish = (error) => {
      window.clearTimeout(timeout);
      music.oncanplaythrough = music.onerror = null;
      if (error) reject(error); else resolve();
    };
    const timeout = window.setTimeout(() => finish(new Error('music')), 30000);
    music.oncanplaythrough = () => finish();
    music.onerror = () => finish(new Error('music'));
    music.load();
  });
  const results = await Promise.allSettled([...images, fonts, audio].map((asset) => asset.then(() => {
    loaded += 1;
    updateLoading();
  })));
  if (results.some(result => result.status === 'rejected')) {
    document.querySelector('#boot-status').textContent = 'Не все материалы загрузились. Проверь соединение и попробуй ещё раз.';
    retryButton.hidden = false;
    startButton.textContent = 'Пакет пока не готов';
    return;
  }
  assetsLoaded = true;
  startButton.disabled = false;
  startButton.textContent = 'Вскрыть пакет ↗';
  document.querySelector('#boot-status').textContent = 'Всё на месте, Владик. Личное дело от Данечки готово к вскрытию.';
  bootScreen.classList.add('is-loaded');
}

startButton.addEventListener('click', () => {
  if (!assetsLoaded) return;
  radio.hidden = false;
  radio.open = true;
  playMusic();
  startIntro();
});
retryButton.addEventListener('click', loadAssets);
scene.addEventListener('animationend', (event) => {
  if (event.target === scene && event.animationName === 'camera-arrive') readyIntro();
});
scene.addEventListener('pointermove', (event) => {
  if (!introActive || !introReady || introOpening || pull || reducedMotion.matches || event.pointerType !== 'mouse') return;
  const x = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1));
  const y = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1));
  scene.style.setProperty('--look-x', `${x * 2}deg`);
  scene.style.setProperty('--look-y', `${-y * 1.4}deg`);
});
page.addEventListener('animationend', (event) => {
  if (event.target === page && event.animationName === 'dossier-unpack' && introOpening) finishIntro();
});
pullTab.addEventListener('pointerdown', (event) => {
  if (!introActive || !introReady || introOpening || pull || event.button !== 0) return;
  event.preventDefault();
  pull = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, threshold: Math.min(180, Math.max(80, pullTab.getBoundingClientRect().width * .22)) };
  pullTab.setPointerCapture(event.pointerId);
  pullTab.classList.add('is-dragging');
});
pullTab.addEventListener('pointermove', (event) => {
  if (!pull || event.pointerId !== pull.pointerId) return;
  const distance = Math.hypot(Math.max(0, event.clientX - pull.startX), Math.max(0, pull.startY - event.clientY));
  pullTab.style.setProperty('--tear-x', `${Math.min(distance, pull.threshold)}px`);
  pullTab.style.setProperty('--tear-y', `${-distance * .22}px`);
  pullTab.style.setProperty('--tear-angle', `${-Math.min(distance / 18, 10)}deg`);
  if (distance >= pull.threshold) openEnvelope();
});
pullTab.addEventListener('pointerup', releasePull);
pullTab.addEventListener('pointercancel', releasePull);
pullTab.addEventListener('lostpointercapture', releasePull);
pullTab.addEventListener('click', (event) => { if (event.detail === 0) openEnvelope(); });
document.querySelector('#skip-intro').addEventListener('click', finishIntro);
reducedMotion.addEventListener('change', (event) => { if (event.matches) finishIntro(); });
let current = 0;
let phase = 'question';
let attempts = 0;
let interacted = false;
let dialogMode = '';

function sparks() {
  return `<div class="sparks" aria-hidden="true">${Array.from({ length: 16 }, (_, i) => `<i style="--i:${i};--x:${Math.cos(i * Math.PI / 8) * 230}px;--y:${Math.sin(i * Math.PI / 8) * 180}px">${i % 3 === 0 ? '♂' : '✦'}</i>`).join('')}</div>`;
}

function paint(html) {
  page.dataset.screen = phase;
  screen.innerHTML = html;
  screen.classList.remove('reveal');
  void screen.offsetWidth;
  screen.classList.add('reveal');
  screen.tabIndex = -1;
  screen.focus({ preventScroll: true });
}

function updateProgress(completed) {
  progress.setAttribute('aria-valuenow', completed);
  document.querySelector('#progress-fill').style.width = `${completed / questions.length * 100}%`;
}

function showQuestion() {
  phase = 'question';
  attempts = 0;
  const question = questions[current];
  step.textContent = `Вопрос ${String(current + 1).padStart(2, '0')} / ${questions.length}`;
  document.querySelector('#stage-label').textContent = 'Без подвоха. Почти.';
  updateProgress(current);
  const buttons = question.answers.map((answer, index) => {
    const button = `<button class="answer" data-answer="${index}">${answer}<span aria-hidden="true">${index === 0 ? '✓' : '×'}</span></button>`;
    return question.trick === 'runaway' && index === 1 ? `<div class="escape-zone">${button}</div>` : button;
  }).join('');
  paint(`<p class="kicker">Боеготовность Владика · мотивация ${100 + current * 10}%</p><h1>${question.title}</h1><p class="description">${question.description}</p><div class="answers ${question.trick === 'runaway' ? 'runaway-arena' : ''}">${buttons}</div><p id="trick-hint" class="fine-print" aria-live="polite">${question.trick ? 'Бонусный раунд. Тут даже кнопкам нельзя доверять.' : 'Неправильных ответов нет. Мы позаботились.'}</p>`);
}

function showReaction(answer) {
  phase = 'reaction';
  const [title, description] = questions[current].reactions[answer];
  document.querySelector('#stage-label').textContent = 'Ответ принят Данечкой';
  updateProgress(current + 1);
  paint(`<div class="reaction"><div class="stamp">Зачтено. Ты наш человек.</div><h1>${title}</h1><p class="description">${description}</p><figure class="meme"><img src="assets/${memes[current]}.gif" alt="Гачи-реакция: боевой настрой одобрен"><figcaption>♂ ${answer === 1 ? 'Отказ переработан в согласие' : 'Данечка одобряет'} · <a href="assets/SOURCES.md" target="_blank" rel="noopener noreferrer">Источники GIF</a></figcaption></figure><button class="next" data-action="next">${current === questions.length - 1 ? 'Получить вердикт' : 'Ладно, дальше'}<span aria-hidden="true">↗</span></button></div>`);
}

function showResult() {
  phase = 'result';
  step.textContent = 'Проверка завершена';
  document.querySelector('#stage-label').textContent = 'Допущен к совместному угару';
  paint(`${sparks()}<div class="result-mark" aria-hidden="true"><svg class="squad-mark" focusable="false"><use href="#squad-emblem"/></svg></div><div class="deployment-status">Боевой допуск подтверждён<span>Владик + Данечка / отряд укомплектован</span></div><h1>Диагноз:<br>хочешь в колду.</h1><p class="description">Владик, сопротивление было достойным. Но результаты однозначны: тебе срочно нужна катка с Данечкой.</p><a class="next launch-game" href="steam://run/4435490" aria-label="Ехала — запустить Modern Warfare 4 в Steam">ЕХАЛА <span aria-hidden="true">↗</span></a><p class="fine-print">Владик, жми. Колда сама себя не запустит. Данечка ждёт.</p><button class="restart" data-action="restart">Перепройти и снова согласиться</button>`);
}

function openTrap(mode) {
  if (dialog.open) return;
  dialogMode = mode;
  document.querySelector('#dialog-title').textContent = mode === 'paperwork' ? 'Подтверди отказ от отказа.' : 'Ты куда, Владик?';
  document.querySelector('#dialog-description').textContent = mode === 'paperwork' ? 'Владик, внимательно ознакомься с вариантами. Данечка уже поставил печать.' : 'Данечка теряет бойца! Владик, осталось совсем чуть-чуть. Твоя отмазка ещё даже не прошла модерацию.';
  dialog.querySelector('.next').textContent = mode === 'paperwork' ? 'Отказываюсь от отказа' : 'Ладно, продолжим';
  dialog.querySelector('.dialog-secondary').textContent = mode === 'paperwork' ? 'Подтверждаю, что хочу играть' : 'Вернуться с недовольным лицом';
  dialog.showModal();
}

dialog.addEventListener('close', () => {
  if (dialogMode === 'paperwork' && phase === 'question') showReaction(1);
  dialogMode = '';
});

function switchAnswer(event) {
  if (phase !== 'question' || questions[current].trick !== 'switch') return;
  const button = event.target.closest('[data-answer="1"]');
  if (button) {
    button.textContent = 'Да, с Данечкой в колду ♥';
    button.classList.add('converted');
    document.querySelector('#trick-hint').textContent = 'Кнопка подумала и приняла правильное решение.';
  }
}
screen.addEventListener('pointerover', switchAnswer);
screen.addEventListener('focusin', switchAnswer);

screen.addEventListener('pointermove', (event) => {
  if (phase !== 'question' || questions[current].trick !== 'runaway' || event.pointerType === 'touch' || reducedMotion.matches) return;
  const button = screen.querySelector('[data-answer="1"]');
  if (button.matches(':focus-visible')) return;
  const rect = button.getBoundingClientRect();
  if (event.clientX < rect.left - 35 || event.clientX > rect.right + 35 || event.clientY < rect.top - 35 || event.clientY > rect.bottom + 35) return;
  const zone = screen.querySelector('.escape-zone');
  const area = zone.getBoundingClientRect();
  const maxX = Math.max(0, zone.clientWidth - rect.width);
  const maxY = Math.max(0, zone.clientHeight - rect.height);
  const corners = [[0, 0], [maxX, 0], [0, maxY], [maxX, maxY]];
  const distance = ([x, y]) => Math.hypot(area.left + x + rect.width / 2 - event.clientX, area.top + y + rect.height / 2 - event.clientY);
  const [x, y] = corners.reduce((best, point) => distance(point) > distance(best) ? point : best);
  button.style.left = x === 0 ? '0px' : 'max(0px, calc(100% - 180px))';
  button.style.top = `${y}px`;
  attempts += 1;
  document.querySelector('#trick-hint').textContent = ['Отказ покинул чат.', 'Не догонишь — не откажешься.', 'Кнопка делает кардио. Владик, а Данечка всё ещё ждёт в лобби.'][Math.min(attempts - 1, 2)];
});

document.addEventListener('pointerdown', () => { interacted = true; });
document.addEventListener('keydown', (event) => {
  interacted = true;
  if (introActive && event.key === 'Escape') finishIntro();
});
document.documentElement.addEventListener('pointerleave', (event) => {
  if (bootScreen.hidden && !introActive && event.pointerType === 'mouse' && event.clientY <= 5 && interacted && phase !== 'result') {
    openTrap('exit');
  }
});
window.addEventListener('beforeunload', (event) => {
  if (!bootScreen.hidden || introActive || !interacted || phase === 'result') return;
  event.preventDefault();
  event.returnValue = '';
});

screen.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (phase === 'question' && button.hasAttribute('data-answer')) {
    interacted = true;
    const answer = Number(button.dataset.answer);
    const trick = questions[current].trick;
    if (answer === 1 && trick === 'shrink' && attempts < 2) {
      attempts += 1;
      button.style.transform = `scale(${1 - attempts * .25})`;
      screen.querySelector('[data-answer="0"]').classList.add('insistent');
      document.querySelector('#trick-hint').textContent = attempts === 1 ? 'Отмазка стала в два раза менее убедительной.' : 'Последний клик — и отмазке пиздец.';
    } else if (answer === 1 && trick === 'paperwork') openTrap('paperwork');
    else if (answer === 1 && trick === 'roulette') {
      phase = 'roulette';
      paint('<div class="roulette" aria-hidden="true">♂</div><h1>Судьба решает…</h1><p class="description" role="status">Колду. Не колду. Колду. Не колду. Кого мы обманываем.</p>');
      window.setTimeout(() => showReaction(1), reducedMotion.matches ? 0 : 1400);
    } else showReaction(answer);
  }
  else if (phase === 'reaction' && button.dataset.action === 'next') {
    current += 1;
    if (current < questions.length) showQuestion();
    else showResult();
  } else if (phase === 'result' && button.dataset.action === 'restart') {
    current = 0;
    showQuestion();
  }
});

page.inert = true;
document.documentElement.classList.add('boot-loading');
showQuestion();
loadAssets();
