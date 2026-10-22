(async () => {
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

function element() {
  return {
    innerHTML: '', textContent: '', dataset: {}, style: { setProperty(name, value) { this[name] = value; }, removeProperty(name) { delete this[name]; } }, attributes: {}, open: false,
    classList: { add() {}, remove() {}, toggle() {} }, focus() {}, matches() { return false; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, handler) { this[name] = handler; },
    setPointerCapture(id) { this.pointerCapture = id; }, hasPointerCapture(id) { return this.pointerCapture === id; }, releasePointerCapture() { this.pointerCapture = null; },
    showModal() { this.open = true; },
    close() { this.open = false; this.onClose(); }
  };
}
const elements = new Map();
const doc = element();
const win = element();
const reducedMotion = { matches: false, addEventListener(name, handler) { this[name] = handler; } };
const timers = [];
for (const selector of ['#screen', '#step', '.progress', '#progress-fill', '#stage-label', '#trap-dialog', '#dialog-title', '#dialog-description', '#trick-hint', '.page', '#intro-controls', '#skip-intro', '#pull-tab', '#intro-instruction', '#cinematic-scene', '#boot-screen', '#start-experience', '#retry-assets', '#boot-status', '#asset-progress', '#asset-progress-fill', '#asset-count']) elements.set(selector, element());
const screen = elements.get('#screen');
for (const selector of ['#radio-audio', '#field-radio', '#radio-toggle', '#radio-volume', '#radio-level', '#radio-status', '#radio-title']) elements.set(selector, element());
elements.get('#radio-title').textContent = 'Спокойная драка';
const music = elements.get('#radio-audio');
music.paused = true;
music.readyState = 4;
let playCalls = 0;
let rejectPlay = false;
music.play = () => { playCalls++; if (rejectPlay) return Promise.reject(new Error('blocked')); music.paused = false; music.onPlay(); return Promise.resolve(); };
music.pause = () => { music.paused = true; music.onPause(); };
music.addEventListener = (name, handler) => { music[{ play: 'onPlay', pause: 'onPause' }[name] || name] = handler; };
music.load = () => music.oncanplaythrough();
const dialog = elements.get('#trap-dialog');
// Preserve the native close method separately from the close-event callback.
dialog.addEventListener = (name, handler) => { dialog[name === 'close' ? 'onClose' : name] = handler; };
const buttons = [element(), element()];
const modalButtons = { '.next': element(), '.dialog-secondary': element() };
dialog.querySelector = selector => modalButtons[selector];
const arena = { left: 10, top: 20, width: 360, height: 185 };
screen.querySelector = selector => selector === '.escape-zone' ? { getBoundingClientRect: () => arena, clientWidth: arena.width, clientHeight: arena.height } : buttons[selector.includes('"1"') ? 1 : 0];
buttons[1].getBoundingClientRect = () => {
  const left = arena.left + (buttons[1].style.left?.startsWith('max') ? Math.max(0, arena.width - 180) : 0);
  const top = arena.top + (parseFloat(buttons[1].style.top) || 0);
  return { left, top, right: left + 180, bottom: top + 68, width: 180, height: 68 };
};
doc.querySelector = selector => elements.get(selector);
doc.documentElement = element();
doc.fonts = { ready: Promise.resolve() };
let failImages = false;
let stallImages = false;
win.Image = class { set src(value) { if (!stallImages) { if (failImages) this.onerror(); else this.onload(); } } };
elements.get('#pull-tab').getBoundingClientRect = () => ({ width: 760 });
win.innerWidth = 1000;
win.innerHeight = 800;
win.matchMedia = () => reducedMotion;
win.setTimeout = callback => { timers.push(callback); return callback; };
win.clearTimeout = callback => { const index = timers.indexOf(callback); if (index !== -1) timers.splice(index, 1); };
const context = vm.createContext({ document: doc, window: win });
vm.runInContext(fs.readFileSync('script.js', 'utf8'), context);
const page = elements.get('.page');
const controls = elements.get('#intro-controls');
const boot = elements.get('#boot-screen');
const start = elements.get('#start-experience');
const tab = elements.get('#pull-tab');
const scene = elements.get('#cinematic-scene');
assert.equal(page.inert, true);
assert.equal(start.disabled, true, 'Do not allow starting before assets load');
assert.equal(playCalls, 0, 'No music before a deliberate start');
start.click();
assert.equal(playCalls, 0, 'Do not play while assets are loading');
assert.equal(vm.runInContext('introActive', context), false);
await new Promise(setImmediate);
assert.equal(start.disabled, false);
assert.equal(elements.get('#asset-progress').attributes['aria-valuenow'], 12);
assert.equal(vm.runInContext('introActive', context), false, 'Loading must not start the cinematic automatically');
music.readyState = 0;
music.load = () => music.onerror();
await vm.runInContext('loadAssets()', context);
assert.equal(start.disabled, true, 'A missing music file must block startup');
music.load = () => music.oncanplaythrough();
await vm.runInContext('loadAssets()', context);
assert.equal(start.disabled, false, 'Music loading can recover on retry');
music.readyState = 4;
failImages = true;
await vm.runInContext('loadAssets()', context);
assert.equal(start.disabled, true);
assert.equal(elements.get('#retry-assets').hidden, false);
start.click();
assert.equal(vm.runInContext('introActive', context), false, 'A failed asset blocks startup');
failImages = false;
stallImages = true;
const stalled = vm.runInContext('loadAssets()', context);
await new Promise(setImmediate);
for (const timeout of [...timers]) { win.clearTimeout(timeout); timeout(); }
await stalled;
assert.equal(start.disabled, true, 'Timed out assets cannot enable startup');
stallImages = false;
await elements.get('#retry-assets').click();
assert.equal(start.disabled, false, 'Retry recovers from a failed load');
start.click();
assert.equal(playCalls, 1, 'Start music from the startup click');
assert.equal(music.volume, .2);
assert.match(elements.get('#radio-title').innerHTML, /class="radio-letter"/);
assert.equal(elements.get('#field-radio').hidden, false);
elements.get('#radio-volume').value = '0';
elements.get('#radio-volume').input();
assert.equal(music.volume, 0);
elements.get('#radio-volume').value = '70';
elements.get('#radio-volume').input();
assert.equal(music.volume, .7);
elements.get('#radio-toggle').click();
assert.equal(music.paused, true);
rejectPlay = true;
elements.get('#radio-toggle').click();
await new Promise(setImmediate);
assert.match(elements.get('#radio-status').textContent, /Нажми/);
rejectPlay = false;
elements.get('#radio-toggle').click();
assert.equal(music.paused, false);
assert.match(fs.readFileSync('index.html', 'utf8'), /src="assets\/music.mp3" loop/);
assert.equal(boot.hidden, true);
assert.equal(page.inert, true);
const pointer = (pointerId, clientX, button = 0, clientY = 200) => ({ pointerId, clientX, clientY, button, preventDefault() {} });
tab.pointerdown(pointer(1, 100));
assert.equal(tab.pointerCapture, undefined, 'No pulling during the landing animation');
scene.animationend({ target: scene, animationName: 'camera-arrive' });
assert.equal(tab.disabled, false);
scene.pointermove({ pointerType: 'mouse', clientX: 2000, clientY: -100 });
assert.equal(scene.style['--look-x'], '2deg', 'Clamp the cinematic camera movement');
assert.equal(scene.style['--look-y'], '1.4deg');
scene.pointermove({ pointerType: 'touch', clientX: 0, clientY: 800 });
assert.equal(scene.style['--look-x'], '2deg', 'Touch must not tilt the camera');
reducedMotion.matches = true;
scene.pointermove({ pointerType: 'mouse', clientX: 0, clientY: 800 });
assert.equal(scene.style['--look-x'], '2deg', 'Reduced motion disables cursor movement');
reducedMotion.matches = false;
assert.equal(timers.length, 0, 'Wait indefinitely for a deliberate pull');
tab.click({ detail: 1 });
assert.equal(vm.runInContext('introOpening', context), false, 'A simple mouse click cannot open the envelope');
tab.pointerdown(pointer(1, 100, 2));
assert.equal(tab.pointerCapture, undefined, 'Ignore right clicks');
tab.pointerdown(pointer(1, 100));
tab.pointermove(pointer(2, 300));
assert.equal(tab.style['--tear-x'], undefined, 'Ignore a second finger');
tab.pointermove(pointer(1, 150));
assert.equal(tab.style['--tear-x'], '50px');
scene.pointermove({ pointerType: 'mouse', clientX: 0, clientY: 800 });
assert.equal(scene.style['--look-x'], '2deg', 'Keep the camera still while the seal is being dragged');
tab.pointerup(pointer(2, 150));
assert.equal(tab.pointerCapture, 1, 'Another pointer cannot release the grip');
tab.pointerup(pointer(1, 150));
assert.equal(tab.style['--tear-x'], undefined, 'An incomplete pull returns to its starting position');
assert.equal(vm.runInContext('introOpening', context), false);
tab.pointerdown(pointer(3, 100));
tab.pointercancel(pointer(3, 100));
assert.equal(tab.pointerCapture, null);
tab.pointerdown(pointer(4, 100));
tab.pointermove(pointer(4, 350));
assert.equal(vm.runInContext('introOpening', context), true, 'Pulling past the threshold tears the seal');
assert.equal(tab.pointerCapture, null);
assert.equal(tab.disabled, true);
scene.pointermove({ pointerType: 'mouse', clientX: 0, clientY: 800 });
assert.equal(scene.style['--look-x'], undefined, 'Reset camera tilt before the dossier emerges');
page.animationend({ target: screen, animationName: 'reveal' });
assert.equal(page.inert, true);
page.animationend({ target: page, animationName: 'dossier-unpack' });
assert.equal(page.inert, false);
scene.pointermove({ pointerType: 'mouse', clientX: 1000, clientY: 0 });
assert.equal(scene.style['--look-x'], undefined, 'Keep the quiz stable after the intro');
assert.equal(controls.hidden, true);
assert.equal(timers.length, 0);
vm.runInContext('startIntro()', context);
elements.get('#skip-intro').click();
assert.equal(page.inert, false, 'Skip unlocks the quiz');
vm.runInContext('startIntro()', context);
timers.shift()();
assert.equal(page.inert, true, 'The landing fallback only enables the pull, never auto-opens');
tab.pointerdown(pointer(5, 350));
tab.pointermove(pointer(5, 350, 0, 0));
assert.equal(vm.runInContext('introOpening', context), true, 'An upward pull works at the right edge of a phone screen');
timers.shift()();
vm.runInContext('startIntro()', context);
timers.shift()();
tab.click({ detail: 0 });
assert.equal(vm.runInContext('introOpening', context), true, 'Keyboard activation can open the envelope');
timers.shift()();
assert.equal(page.inert, false, 'The opening fallback unlocks the quiz');
vm.runInContext('startIntro()', context);
reducedMotion.change({ matches: true });
assert.equal(page.inert, false);
reducedMotion.matches = true;
vm.runInContext('startIntro()', context);
assert.equal(page.inert, false);
assert.equal(timers.length, 0);
reducedMotion.matches = false;
const questions = vm.runInContext('questions', context);
const memes = vm.runInContext('memes', context);
assert.equal(questions.length, 10);
assert.equal(new Set(memes).size, 10);
assert.equal(questions.filter(question => question.trick).length, 5);

function click(dataset) {
  const button = Object.assign(element(), { dataset, hasAttribute: name => name === 'data-answer' && 'answer' in dataset });
  screen.click({ target: { closest: () => button } });
  return button;
}
function unloading() {
  let prevented = false;
  win.beforeunload({ preventDefault() { prevented = true; } });
  return prevented;
}
assert.equal(unloading(), false, 'No close warning before interaction');
for (let route = 0; route < 1024; route++) {
  for (let question = 0; question < 10; question++) {
    assert.equal((screen.innerHTML.match(/data-answer=/g) || []).length, 2);
    assert.equal(elements.get('#step').textContent, `Вопрос ${String(question + 1).padStart(2, '0')} / 10`);
    const answer = String((route >> question) & 1);
    if (question === 5) {
      buttons[1].style = {};
      if (route === 0) {
        const event = { pointerType: 'mouse', clientX: 20, clientY: 30 };
        screen.pointermove(event);
        assert.equal(buttons[1].style.left, 'max(0px, calc(100% - 180px))');
        assert.equal(buttons[1].style.top, '117px');
        arena.width = 260;
        assert.equal(buttons[1].getBoundingClientRect().right, arena.left + arena.width, 'Keep the runaway button in bounds after resizing');
        arena.width = 360;
        screen.pointermove({ pointerType: 'mouse', clientX: 350, clientY: 180 });
        assert.equal(buttons[1].style.left, '0px');
        assert.equal(buttons[1].style.top, '0px');
        reducedMotion.matches = true;
        screen.pointermove(event);
        assert.equal(buttons[1].style.left, '0px');
        reducedMotion.matches = false;
        screen.pointermove({ ...event, pointerType: 'touch' });
        assert.equal(buttons[1].style.left, '0px');
      }
    }
    if (question === 6 && route === 0) {
      screen.pointerover({ target: { closest: () => buttons[1] } });
      assert.match(buttons[1].textContent, /с Данечкой в колду/);
    }
    if (question === 7 && answer === '1') {
      assert.equal(click({ answer }).style.transform, 'scale(0.75)');
      assert.equal(click({ answer }).style.transform, 'scale(0.5)');
      assert.match(screen.innerHTML, /Есть хоть одна причина/);
    }
    click({ answer });
    if (question === 8 && answer === '1') {
      assert.equal(dialog.open, true);
      dialog.close();
    }
    if (question === 9 && answer === '1') {
      assert.match(screen.innerHTML, /Судьба решает/);
      click({ answer });
      assert.equal(timers.length, 1, 'Double click must not queue a second roulette');
      timers.shift()();
    }
    assert.match(screen.innerHTML, /Зачтено/);
    assert.equal(page.dataset.screen, 'reaction', 'Trigger the HUD confirmation when answering');
    assert.equal(screen.innerHTML.includes('class="sparks"'), false, 'No confetti after individual answers');
    assert.ok(screen.innerHTML.includes(`assets/${memes[question]}.gif`));
    assert.equal(elements.get('.progress').attributes['aria-valuenow'], question + 1);
    const reaction = screen.innerHTML;
    click({ answer });
    assert.equal(screen.innerHTML, reaction, 'Extra answer clicks must not skip a reaction');
    assert.equal(unloading(), true, 'Warn before leaving an unfinished quiz');
    click({ action: 'next' });
  }
  assert.match(screen.innerHTML, /Диагноз:/);
  assert.equal(page.dataset.screen, 'result');
  assert.match(screen.innerHTML, /Боевой допуск подтверждён/);
  assert.equal(screen.innerHTML.includes('class="sparks"'), false, 'No confetti in the final either');
  assert.equal(elements.get('#progress-fill').style.width, '100%');
  assert.equal(unloading(), false, 'No close warning once finished');
  doc.documentElement.pointerleave({ pointerType: 'mouse', clientY: 0 });
  assert.equal(dialog.open, false, 'No exit popup once finished');
  assert.match(screen.innerHTML, /<a class="next launch-game" href="steam:\/\/run\/4435490"/);
  assert.match(screen.innerHTML, />ЕХАЛА /);
  assert.match(screen.innerHTML, /Владик/);
  assert.match(screen.innerHTML, /Данечк/);
  assert.equal(screen.innerHTML.includes('Discord'), false);
  click({ action: 'restart' });
  assert.equal(elements.get('#progress-fill').style.width, '0%');
}
for (let attempt = 0; attempt < 3; attempt++) {
  doc.documentElement.pointerleave({ pointerType: 'mouse', clientY: 0 });
  assert.equal(dialog.open, true, 'Show the exit popup on every exit attempt before completion');
  assert.match(elements.get('#dialog-title').textContent, /Ты куда/);
  dialog.close();
}
const hashes = new Set();
for (const meme of memes) {
  const data = fs.readFileSync(`assets/${meme}.gif`);
  assert.ok(data.subarray(0, 6).toString().startsWith('GIF8'));
  hashes.add(crypto.createHash('sha256').update(data).digest('hex'));
}
assert.equal(hashes.size, 10, 'Each question has a different GIF file');
console.log('Passed: loading and retry including music; radio start/pause/volume/play rejection; envelope drag; bounded camera movement; HUD phases; 1024 quiz routes; no confetti; Steam link; repeated exit popup.');

})().catch(error => { console.error(error); process.exitCode = 1; });
