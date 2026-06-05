const chatScenarios = {
  leadership: {
    question: 'Насколько кандидат соответствует лидерскому профилю?',
    answer: `Алексей К. показывает <strong>72% соответствие</strong> лидерскому профилю вашей компании.<br><br>
      <strong>Сильные индикаторы:</strong><br>
      — На интервью с Team Lead описал кейс, где взял ответственность за срыв сроков и перераспределил задачи в команде из 8 человек.<br>
      — Использует <span class="highlight">«мы-концепцию»</span> в 68% речевых конструкций.<br><br>
      <strong>Зона внимания:</strong><br>
      — В стрессовых сценариях переключается на «я-концепцию» (54%). Возможен стиль «личной ответственности» вместо «командного фасилитирования».`
  },
  risks: {
    question: 'Какие риски при адаптации?',
    answer: `Выявлены <strong>2 риска:</strong><br><br>
      🔴 <strong>Значительный</strong> — Стиль коммуникации с заказчиком. Параметр «Клиентоориентированность» — <strong>41%</strong> (порог: 60%).<br><br>
      🟡 <strong>Умеренный</strong> — Темп принятия решений. Склонен к детальному анализу перед действием. При параметре «Скорость итераций: high» возможен friction в первые 60 дней.`
  },
  softskills: {
    question: 'Расскажи подробнее про его soft skills',
    answer: `<strong>Профиль soft skills Алексея К.:</strong><br><br>
      Коммуникация — <strong>8/10</strong> · Критическое мышление — <strong>7/10</strong><br>
      Лидерство — <strong>7/10</strong> · Адаптивность — <strong>6/10</strong><br>
      Эмоциональный интеллект — <strong>7/10</strong> · Работа в команде — <strong>8/10</strong><br><br>
      💡 <em>Рекомендация:</em> на финале проверьте сценарий «конфликт с заказчиком» и «работа в условиях неопределённости».`
  }
};

function typeWriter(element, html, speed = 12) {
  element.innerHTML = '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const text = temp.textContent;
  let i = 0;

  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '▋';
  cursor.style.opacity = '0.6';

  function tick() {
    if (i < text.length) {
      element.textContent = text.slice(0, i + 1);
      element.appendChild(cursor);
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
        setTimeout(() => { busy = false; }, 1500);
      }, 600);
    });
  });
}

function initReportTabs() {
  const tabs = document.querySelectorAll('.report-tab');
  const panels = document.querySelectorAll('.report-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('report-tab--active'));
      panels.forEach(p => p.classList.remove('report-panel--active'));
      tab.classList.add('report-tab--active');
      document.querySelector(`[data-panel="${target}"]`)?.classList.add('report-panel--active');
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

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.pain-card, .pillar, .roi-metric, .price-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  initChatSimulator();
  initReportTabs();
  initMobileNav();
  initScrollAnimations();
});
