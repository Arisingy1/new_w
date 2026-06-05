const chatScenarios = {
  instant: {
    question: 'Насколько Алексей К. подходит на роль IT Project Manager?',
    answer: `Алексей К. показывает <strong>77% культурной совместимости</strong> и <strong>7.4/10</strong> по soft skills.<br><br>
      <strong>Ключевые индикаторы:</strong><br>
      — STAR-кейс: управление командой 8 человек, time-to-market −23%<br>
      — «Мы-концепция» в 68% речевых конструкций<br><br>
      <strong>Риск:</strong> клиентоориентированность 41% (порог: 60%)`
  },
  compare: {
    question: 'Сравни финалистов по кросс-функциональным задачам',
    answer: `<strong>Сравнение финалистов:</strong><br><br>
      <span class="highlight">Алексей К.</span> — коммуникация 8/10, лидерство 7/10, Match 77%<br>
      <span class="highlight">Мария С.</span> — коммуникация 9/10, лидерство 6/10, Match 62%<br>
      <span class="highlight">Дмитрий В.</span> — коммуникация 7/10, лидерство 8/10, Match 84%<br><br>
      💡 Для кросс-функциональных задач лидирует <strong>Дмитрий В.</strong> по лидерству и Match %.`
  },
  questions: {
    question: 'Сгенерируй вопросы для финального интервью с Алексеем К.',
    answer: `<strong>Вопросы для нанимающего менеджера:</strong><br><br>
      1. Опишите ситуацию, когда пришлось искать компромисс с заказчиком при жёстких сроках.<br>
      2. Как вы действуете, когда данных недостаточно для принятия решения?<br>
      3. Приведите пример, когда вы сознательно уступили скорости ради качества анализа.<br><br>
      💡 Сформировано на основе рисков: клиентоориентированность 41%, темп решений.`
  }
};

function typeWriter(element, html, speed = 14) {
  element.innerHTML = '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const text = temp.textContent;
  let i = 0;

  function tick() {
    if (i < text.length) {
      element.textContent = text.slice(0, i + 1);
      i++;
      setTimeout(tick, speed);
    } else {
      element.innerHTML = html;
    }
  }
  tick();
}

function addChatMessage(container, text, type) {
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg--${type}`;
  if (type === 'ai') {
    container.appendChild(msg);
    typeWriter(msg, text);
  } else {
    msg.textContent = text;
    container.appendChild(msg);
  }
  container.scrollTop = container.scrollHeight;
}

function initChatSimulator() {
  const messages = document.getElementById('chatMessages');
  const chips = document.querySelectorAll('.chip');
  let busy = false;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (busy) return;
      const scenario = chatScenarios[chip.dataset.scenario];
      if (!scenario) return;

      busy = true;
      chips.forEach(c => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');

      addChatMessage(messages, scenario.question, 'user');

      setTimeout(() => {
        addChatMessage(messages, scenario.answer, 'ai');
        setTimeout(() => { busy = false; }, 1200);
      }, 500);
    });
  });
}

function initMobileNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open);
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('nav--open'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initChatSimulator();
  initMobileNav();
});
