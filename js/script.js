const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const hero = document.querySelector('.hero');
const heroCanvas = document.getElementById('heroNetwork');
const aboutSection = document.getElementById('about');
const aboutCanvas = document.getElementById('aboutNetwork');
const loaderScreen = document.getElementById('loaderScreen');

function hideLoader() {
  body.classList.remove('is-loading');
  if (loaderScreen) {
    loaderScreen.setAttribute('aria-hidden', 'true');
  }
}

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const nextTheme = current === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
}

setTheme('light');

const typewriterTexts = ["Action", "Intelligence", "Automation", "Predictions"];
const typedText = document.getElementById('typed-text');
let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 70;
const deleteSpeed = 100;

function typeWriter() {
  if (!typedText) return;
  const currentText = typewriterTexts[typewriterIndex];
  if (isDeleting) {
    if (charIndex <= 0) {
      isDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, typeSpeed);
      return;
    }
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex -= 1;
    setTimeout(typeWriter, deleteSpeed);
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, deleteSpeed);
      return;
    }
    setTimeout(typeWriter, typeSpeed);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  initAboutCarousel();
  setTimeout(hideLoader, 3000);
  initSkillCards();
  initProjectCards();
  initProjectModal();
  initLanguageSwitcher();
});

function initSkillCards() {
  const TILT_LIMIT = 10;
  const SCALE = 1.03;

  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const tiltX = -(((e.clientY - rect.top) / rect.height) - 0.5) * (TILT_LIMIT * 2);
      const tiltY = (((e.clientX - rect.left) / rect.width) - 0.5) * (TILT_LIMIT * 2);
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${SCALE}, ${SCALE}, ${SCALE})`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  document.querySelectorAll('.skill-tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
    });
  });
}

function initProjectCards() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const triggerPop = () => {
      card.classList.remove('pop');
      void card.offsetWidth;
      card.classList.add('pop');
    };

    card.addEventListener('mouseenter', triggerPop);
    card.addEventListener('focusin', triggerPop);
    card.addEventListener('click', triggerPop);
  });
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('projectModalTitle');
  const modalDescription = document.getElementById('projectModalDescription');
  const modalTags = document.getElementById('projectModalTags');
  const modalLink = document.getElementById('projectModalLink');
  const modalBadge = document.getElementById('projectModalBadge');
  const modalClose = document.getElementById('projectModalClose');
  const projectSection = document.getElementById('projects');

  if (!modal || !modalTitle || !modalDescription || !modalTags || !modalLink || !modalBadge || !modalClose) return;

  const scrollToProjectsSection = () => {
    if (!projectSection) return;
    projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelectorAll('.hero-cta[data-target="projects"]').forEach((button) => {
    button.addEventListener('click', () => {
      scrollToProjectsSection();
    });
  });

  const projectMap = {
    linux: {
      badge: 'AI project',
      title: 'AI-Powered Linux CLI Assistant',
      description: 'A command-line tool that answers Linux and terminal questions using an LLM via the Groq API. It turns plain English prompts into exact commands with a short explanation, without executing anything on its own.',
      tags: ['Python', 'Groq API', 'CLI', 'AI'],
      link: 'https://github.com/Lala-chann/Linux-AI',
      linkText: 'Open source'
    },
    keyboard: {
      badge: 'Vision project',
      title: 'Virtual Hand-Tracking Keyboard',
      description: 'A real-time keyboard system built with MediaPipe and OpenCV. It tracks hand landmarks and lets the user press virtual keys with fingertip motion, plus launch apps directly from the keyboard interface.',
      tags: ['Python', 'MediaPipe', 'OpenCV', 'Computer Vision'],
      link: 'https://github.com/Lala-chann/Real-Time-Keyboard-Detection',
      linkText: 'Open source'
    },
    drone: {
      badge: 'Drone project',
      title: 'Drone Control with Hand and Face Detection',
      description: 'This project combines gesture-based controls with facial recognition to guide a drone and identify the owner using computer vision. It blends low-level flight logic with AI-assisted interaction.',
      tags: ['DroneKit', 'OpenCV', 'DeepFace', 'Raspberry Pi'],
      link: '#',
      linkText: 'See project'
    }
  };

  const openProject = (projectId) => {
    const project = projectMap[projectId];
    if (!project) return;

    modalTitle.textContent = project.title;
    modalBadge.textContent = project.badge;
    modalDescription.textContent = project.description;
    modalLink.href = project.link;
    modalLink.textContent = project.linkText;
    modalTags.innerHTML = project.tags.map((tag) => `<span class="project-modal-tag">${tag}</span>`).join('');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeProject = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-project-link]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const projectId = element.dataset.project;
      if (!projectId) return;

      scrollToProjectsSection();
      setTimeout(() => openProject(projectId), 300);
    });
  });

  document.querySelectorAll('[data-project]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const projectId = element.dataset.project;
      if (projectId) {
        scrollToProjectsSection();
        setTimeout(() => openProject(projectId), 250);
      }
    });
  });

  modalClose.addEventListener('click', closeProject);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeProject();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeProject();
    }
  });
}

function initLanguageSwitcher() {
  const TRANSLATIONS = {
    en: {
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'skills.pill': 'Skills',
      'skills.heading': 'Technical Expertise',
      'skills.sub': "Practical technologies I'm using and actively learning to build real, hands-on projects.",
      'skills.upcoming': 'Upcoming — learning next',
      'proj.source': 'Source Code',
      'proj.linux.title': 'AI-Powered Linux CLI Assistant',
      'proj.linux.desc': 'A command-line tool that answers Linux/CLI questions using an LLM via the Groq API. Ask in plain English, get back the exact command and a short explanation — it never executes anything on its own.',
      'proj.kb.title': 'Virtual Hand-Tracking Keyboard',
      'proj.kb.desc': 'A virtual keyboard built with MediaPipe and OpenCV. It tracks 21 hand landmarks in real time so users can "press" keys with their index finger — and launch applications directly from the virtual keyboard.',
      'proj.upcoming.title': 'More Projects Coming Soon',
      'proj.upcoming.desc': 'This space is reserved for what I build next.',
      'hero.desc': 'I\'m Mammadova Lala, a second-year Artificial Intelligence &amp; Big Data student at <a href="https://home.sch.ac.kr/en/index.jsp" target="_blank" rel="noopener">Soonchunhyang University</a>, South Korea. I learn by building — real, hands-on projects rather than just theory. I\'m a member of the <a href="https://www.asiae.co.kr/en/article/2025021711292185228" target="_blank" rel="noopener">Drone Security Strategy Research Institute\'s</a> national drone security consortium, where my current project applies AI to control a drone and solve real-world problems.'
    },
    az: {
      'nav.about': 'Haqqımda',
      'nav.experience': 'Təcrübə',
      'nav.skills': 'Bacarıqlar',
      'nav.projects': 'Layihələr',
      'nav.contact': 'Əlaqə',
      'skills.pill': 'Bacarıqlar',
      'skills.heading': 'Texniki Bacarıqlar',
      'skills.sub': 'Real, praktiki layihələr qurmaq üçün istifadə etdiyim və aktiv öyrəndiyim texnologiyalar.',
      'skills.upcoming': 'Tezliklə — növbəti öyrənəcəyim',
      'proj.source': 'Mənbə Kodu',
      'proj.linux.title': 'AI ilə işləyən Linux CLI Assistenti',
      'proj.linux.desc': 'Groq API vasitəsilə LLM-dən istifadə edən Linux/CLI suallarına cavab verən terminal aləti. Sadə ingiliscə soruşun, dəqiq əmri və qısa izahı alın — özü heç vaxt heç nə icra etmir.',
      'proj.kb.title': 'Virtual Əl İzləmə Klaviaturası',
      'proj.kb.desc': 'MediaPipe və OpenCV ilə qurulmuş virtual klaviatura. O, real vaxtda 21 əl markerini izləyir və istifadəçi index barmağı ilə düymələri "basır" — virtual klaviaturadan birbaşa tətbiqləri də işə sala bilir.',
      'proj.upcoming.title': 'Daha çox layihə yaxın zamanda',
      'proj.upcoming.desc': 'Bu yer növbəti qurduğum layihələr üçün ayrılıb.',
      'hero.desc': 'Mən Məmmədova Lalayam, Cənubi Koreyada, <a href="https://home.sch.ac.kr/en/index.jsp" target="_blank" rel="noopener">Soonchunhyang Universitetində</a> Süni İntellekt və Big Data üzrə 2-ci kurs tələbəsiyəm. Öyrənməyi real, praktiki layihələr qurmaqla edirəm — sadəcə nəzəriyyə ilə deyil. <a href="https://www.asiae.co.kr/en/article/2025021711292185228" target="_blank" rel="noopener">Dron Təhlükəsizliyi Strategiyası Tədqiqat İnstitutunun</a> milli dron təhlükəsizliyi konsorsiumunun üzvüyəm və hazırkı layihəm dronu idarə etmək və real problemləri həll etmək üçün süni intellekt tətbiq etməkdir.'
    },
    ko: {
      'nav.about': '소개',
      'nav.experience': '경력',
      'nav.skills': '기술',
      'nav.projects': '프로젝트',
      'nav.contact': '연락처',
      'skills.pill': '기술',
      'skills.heading': '기술 스택',
      'skills.sub': '실제 프로젝트를 만들기 위해 사용하고 있고, 적극적으로 배우고 있는 기술들입니다.',
      'skills.upcoming': '다음 학습 예정',
      'proj.source': '소스 코드',
      'proj.linux.title': 'AI 기반 리눅스 CLI 도우미',
      'proj.linux.desc': 'Groq API를 활용하는 LLM으로 Linux/CLI 질문에 답하는 CLI 도구입니다. 평문으로 질문하면 정확한 명령과 짧은 설명을 받아볼 수 있으며, 스스로 실행하진 않습니다.',
      'proj.kb.title': '가상 손 추적 키보드',
      'proj.kb.desc': 'MediaPipe와 OpenCV로 만든 가상 키보드입니다. 실시간으로 21개의 손 랜드마크를 추적해 검지로 키를 누르며, 가상 키보드에서 직접 애플리케이션을 실행할 수 있습니다.',
      'proj.upcoming.title': '추가 프로젝트 공개 예정',
      'proj.upcoming.desc': '다음에 만드는 프로젝트를 위해 이 공간을 남겨두고 있습니다.',
      'hero.desc': '저는 맘마도바 랄라이며, 한국 <a href="https://home.sch.ac.kr/en/index.jsp" target="_blank" rel="noopener">순천향대학교</a>에서 인공지능 및 빅데이터를 전공하는 2학년 학생입니다. 저는 이론보다 실제 프로젝트를 직접 만들며 배웁니다. 저는 <a href="https://www.asiae.co.kr/en/article/2025021711292185228" target="_blank" rel="noopener">드론 보안 전략 연구소</a>의 국가 드론 보안 컨소시엄 회원이며, 현재 AI를 활용해 드론을 제어하고 실제 문제를 해결하는 프로젝트를 진행하고 있습니다.'
    }
  };

  const langSwitch = document.getElementById('langSwitch');
  const langBtn = document.getElementById('langBtn');
  const langBtnLabel = document.getElementById('langBtnLabel');
  const langDropdown = document.getElementById('langDropdown');
  if (!langSwitch || !langBtn || !langDropdown || !langBtnLabel) return;

  const options = Array.from(langDropdown.querySelectorAll('.lang-option'));

  function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    langBtnLabel.textContent = lang.toUpperCase();
    options.forEach((option) => {
      option.classList.toggle('active', option.dataset.lang === lang);
    });
    document.documentElement.setAttribute('lang', lang);
  }

  langBtn.addEventListener('click', () => {
    langSwitch.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(langSwitch.classList.contains('open')));
  });

  document.addEventListener('click', (event) => {
    if (!langSwitch.contains(event.target)) {
      langSwitch.classList.remove('open');
    }
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      applyLanguage(option.dataset.lang);
      langSwitch.classList.remove('open');
    });
  });

  applyLanguage('en');
}

function initAboutCarousel() {
  const aboutCarousel = document.getElementById('aboutCarousel');
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  if (!aboutCarousel || !carouselTrack || !carouselDots) return;

  const slides = Array.from(carouselTrack.children);
  const count = slides.length;
  let activeIndex = 0;

  const renderDots = () => {
    carouselDots.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = i === activeIndex ? 'active' : '';
      dot.addEventListener('click', () => setActiveIndex(i));
      carouselDots.appendChild(dot);
    }
  };

  const setActiveIndex = (index) => {
    activeIndex = Math.max(0, Math.min(count - 1, index));
    carouselTrack.style.transform = `translateX(-${activeIndex * 50}%)`;
    renderDots();
  };

  aboutCarousel.addEventListener('mousemove', (event) => {
    const rect = aboutCarousel.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const side = relX < rect.width / 2 ? 'hover-left' : 'hover-right';
    aboutCarousel.classList.toggle('hover-left', side === 'hover-left');
    aboutCarousel.classList.toggle('hover-right', side === 'hover-right');
  });

  aboutCarousel.addEventListener('mouseleave', () => {
    aboutCarousel.classList.remove('hover-left', 'hover-right');
  });

  aboutCarousel.addEventListener('click', (event) => {
    const rect = aboutCarousel.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    if (relX < rect.width / 2) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  });

  setActiveIndex(0);
}


/* ASCII rain background for the hero section */
(function () {
  if (!hero || !heroCanvas) return;

  const ctx = heroCanvas.getContext('2d');
  if (!ctx) return;

  const DEFAULTS = {
    headColor: '#FFFFFF',
    trailColor: '#F7FF00',
    glyphSize: 12,
    speed: 2,
    angle: 0,
    density: 50,
    trail: 18,
    glyphs: '????????0123456789ABCDEF???',
    shuffle: true,
    shuffleGlyphs: '????????0123456789ABCDEF???',
  };

  const MIN_BURNOUT = 0.75;
  const CROSSING_SHARE = 0.35;
  const MIN_RELEASE = 0.3;
  const MAX_RELEASE = 0.8;

  const source = DEFAULTS.shuffle ? DEFAULTS.shuffleGlyphs : DEFAULTS.glyphs;
  const chars = [...source];
  const pick = () => chars[Math.floor(Math.random() * chars.length)];

  const rad = (DEFAULTS.angle * Math.PI) / 180;
  const rate = DEFAULTS.speed * DEFAULTS.glyphSize;
  const gap = DEFAULTS.glyphSize * (1 + (50 - DEFAULTS.density) / 12);
  const tailLength = Math.max(1, Math.round(DEFAULTS.trail));

  let alive = true;
  let raf = 0;
  let last = 0;
  let w = 0;
  let h = 0;
  let span = 0;
  let cols = 0;
  let columns = [];

  function spawn(y) {
    return {
      y,
      rate: rate * (0.75 + Math.random() * 0.5),
      burnout:
        Math.random() < CROSSING_SHARE
          ? Infinity
          : MIN_BURNOUT + Math.random() * (1 - MIN_BURNOUT),
      alpha: 1,
      chars: Array.from({ length: tailLength }, pick),
    };
  }

  function nextRelease() {
    return span * (MIN_RELEASE + Math.random() * (MAX_RELEASE - MIN_RELEASE));
  }

  function layout() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = hero.clientWidth || 360;
    h = hero.clientHeight || 320;
    heroCanvas.width = Math.round(w * dpr);
    heroCanvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    span = Math.hypot(w, h);
    cols = Math.max(1, Math.ceil(span / gap));
    columns = Array.from({ length: cols }, () => ({
      streams: [spawn(Math.random() * span)],
      releaseAt: nextRelease(),
    }));
  }

  function draw(dt) {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(rad);
    ctx.font = `${DEFAULTS.glyphSize}px ui-monospace, Menlo, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lead = tailLength * DEFAULTS.glyphSize;

    for (let i = 0; i < cols; i++) {
      const column = columns[i];
      const x = -span / 2 + i * gap + gap / 2;

      for (const stream of column.streams) {
        stream.y += stream.rate * dt;

        const travelled = stream.y / span;
        if (stream.burnout !== Infinity && travelled > stream.burnout) {
          stream.alpha -= dt * 1.5;
        }

        if (DEFAULTS.shuffle && Math.random() < 0.25) {
          stream.chars[Math.floor(Math.random() * stream.chars.length)] = pick();
        }

        const headY = -span / 2 + stream.y;
        const columnAlpha = Math.max(0, Math.min(1, stream.alpha));

        for (let j = 0; j < tailLength; j++) {
          const y = headY - j * DEFAULTS.glyphSize;
          if (y < -span / 2 - DEFAULTS.glyphSize || y > span / 2 + DEFAULTS.glyphSize) continue;
          const taper = j === 0 ? 1 : 1 - j / tailLength;
          ctx.globalAlpha = columnAlpha * taper;
          ctx.fillStyle = j === 0 ? DEFAULTS.headColor : DEFAULTS.trailColor;
          ctx.fillText(stream.chars[j], x, y);
        }
      }

      column.streams = column.streams.filter(
        (stream) => stream.alpha > 0 && stream.y - lead <= span
      );

      const newest = column.streams[column.streams.length - 1];
      if (!newest || newest.y >= column.releaseAt) {
        column.streams.push(spawn(-lead));
        column.releaseAt = nextRelease();
      }
    }

    ctx.restore();
  }

  function loop(time) {
    if (!alive) return;
    const dt = last ? Math.min((time - last) / 1000, 0.05) : 1 / 60;
    last = time;
    draw(dt);
    raf = requestAnimationFrame(loop);
  }

  layout();

  let ro = null;
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(layout);
    ro.observe(hero);
  }

  raf = requestAnimationFrame(loop);
  window.addEventListener('resize', layout);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    ro?.disconnect();
  };
})();

/* Kinetic grid background for the About section */
(function () {
  if (!aboutSection || !aboutCanvas) return;

  const ctx = aboutCanvas.getContext('2d');
  if (!ctx) return;

  const GAP = 40;
  const RADIUS = 220;
  const PULL = 0.4;

  const getColorVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const glowColor = getColorVar('--glow-color') || '57, 255, 20';
  const dotColor = getColorVar('--dot-color') || '#888';
  const lineColor = `rgba(${glowColor}, 0.72)`;
  const trailColor = `rgba(${glowColor}, 0.95)`;

  const mouse = { x: -9999, y: -9999, active: false };
  const trail = [];
  let W = 1;
  let H = 1;
  let cols = [];
  let dots = [];
  let raf = 0;

  function build(width, height) {
    const rect = aboutSection.getBoundingClientRect();
    W = Math.max(1, Math.floor(width ?? rect.width));
    H = Math.max(1, Math.floor(height ?? rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    aboutCanvas.width = Math.floor(W * dpr);
    aboutCanvas.height = Math.floor(H * dpr);
    aboutCanvas.style.width = W + 'px';
    aboutCanvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = [];
    dots = [];
    const columns = Math.floor(W / GAP) + 2;
    const rows = Math.floor(H / GAP) + 2;
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const column = [];
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const hx = colIndex * GAP;
        const hy = rowIndex * GAP;
        const dot = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
        column.push(dot);
        dots.push(dot);
      }
      cols.push(column);
    }
  }

  function setMouse(clientX, clientY) {
    const rect = aboutCanvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
    trail.push({ x: mouse.x, y: mouse.y, t: performance.now() });
    if (trail.length > 80) trail.shift();
  }

  function onMove(event) {
    if (event.touches?.[0]) {
      setMouse(event.touches[0].clientX, event.touches[0].clientY);
    } else {
      setMouse(event.clientX, event.clientY);
    }
  }

  function onLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (const dot of dots) {
      let ax = (dot.hx - dot.x) * 0.08;
      let ay = (dot.hy - dot.y) * 0.08;
      if (mouse.active) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PULL;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
      }
      dot.vx = (dot.vx + ax) * 0.82;
      dot.vy = (dot.vy + ay) * 0.82;
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < cols[colIndex].length; rowIndex++) {
        const dot = cols[colIndex][rowIndex];
        const right = cols[colIndex + 1]?.[rowIndex];
        const down = cols[colIndex]?.[rowIndex + 1];
        const proximity = mouse.active
          ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
          : 0;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5 + proximity * 1.2;
        ctx.globalAlpha = 0.08 + proximity * 0.6;
        if (right) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (const dot of dots) {
      const proximity = mouse.active
        ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
        : 0;
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.18 + proximity * 0.72;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.2 + proximity * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (trail.length > 1) {
      const now = performance.now();
      ctx.strokeStyle = trailColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = now - b.t;
        if (age > 260) continue;
        ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.65;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    raf = requestAnimationFrame(frame);
  }

  build();
  frame();

  const ro = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver((entries) => {
        const cr = entries[0]?.contentRect;
        build(cr?.width, cr?.height);
      })
    : null;

  ro?.observe(aboutSection);
  aboutSection.addEventListener('mousemove', onMove);
  aboutSection.addEventListener('mouseleave', onLeave);
  aboutSection.addEventListener('touchmove', onMove, { passive: true });
  aboutSection.addEventListener('touchend', onLeave);
  window.addEventListener('resize', () => build());

  return () => {
    cancelAnimationFrame(raf);
    ro?.disconnect();
    aboutSection.removeEventListener('mousemove', onMove);
    aboutSection.removeEventListener('mouseleave', onLeave);
    aboutSection.removeEventListener('touchmove', onMove);
    aboutSection.removeEventListener('touchend', onLeave);
  };
})();

/* Kinetic grid background for the Experience section */
(function () {
  const section = document.getElementById('experience');
  const canvas = document.getElementById('experienceNetwork');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const GAP = 40;
  const RADIUS = 220;
  const PULL = 0.4;
  const getColorVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const glowColor = getColorVar('--glow-color') || '57, 255, 20';
  const dotColor = getColorVar('--dot-color') || '#888';
  const lineColor = `rgba(${glowColor}, 0.72)`;
  const trailColor = `rgba(${glowColor}, 0.95)`;

  const mouse = { x: -9999, y: -9999, active: false };
  const trail = [];
  let W = 1;
  let H = 1;
  let cols = [];
  let dots = [];
  let raf = 0;

  function build() {
    const rect = section.getBoundingClientRect();
    W = Math.max(1, Math.floor(rect.width));
    H = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = [];
    dots = [];
    const columns = Math.floor(W / GAP) + 2;
    const rows = Math.floor(H / GAP) + 2;
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const column = [];
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const dot = {
          hx: colIndex * GAP,
          hy: rowIndex * GAP,
          x: colIndex * GAP,
          y: rowIndex * GAP,
          vx: 0,
          vy: 0,
        };
        column.push(dot);
        dots.push(dot);
      }
      cols.push(column);
    }
  }

  function setMouse(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
    trail.push({ x: mouse.x, y: mouse.y, t: performance.now() });
    if (trail.length > 80) trail.shift();
  }

  function onMove(event) {
    if (event.touches?.[0]) {
      setMouse(event.touches[0].clientX, event.touches[0].clientY);
    } else {
      setMouse(event.clientX, event.clientY);
    }
  }

  function onLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (const dot of dots) {
      let ax = (dot.hx - dot.x) * 0.08;
      let ay = (dot.hy - dot.y) * 0.08;
      if (mouse.active) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PULL;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
      }
      dot.vx = (dot.vx + ax) * 0.82;
      dot.vy = (dot.vy + ay) * 0.82;
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < cols[colIndex].length; rowIndex++) {
        const dot = cols[colIndex][rowIndex];
        const right = cols[colIndex + 1]?.[rowIndex];
        const down = cols[colIndex]?.[rowIndex + 1];
        const proximity = mouse.active
          ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
          : 0;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5 + proximity * 1.2;
        ctx.globalAlpha = 0.08 + proximity * 0.6;
        if (right) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (const dot of dots) {
      const proximity = mouse.active
        ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
        : 0;
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.18 + proximity * 0.72;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.2 + proximity * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (trail.length > 1) {
      const now = performance.now();
      ctx.strokeStyle = trailColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = now - b.t;
        if (age > 260) continue;
        ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.65;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  build();
  frame();

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => build())
    : null;
  resizeObserver?.observe(section);

  section.addEventListener('mousemove', onMove);
  section.addEventListener('mouseleave', onLeave);
  section.addEventListener('touchmove', onMove, { passive: true });
  section.addEventListener('touchend', onLeave);
  window.addEventListener('resize', build);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver?.disconnect();
    section.removeEventListener('mousemove', onMove);
    section.removeEventListener('mouseleave', onLeave);
    section.removeEventListener('touchmove', onMove);
    section.removeEventListener('touchend', onLeave);
    window.removeEventListener('resize', build);
  };
})();

/* Kinetic grid background for the Skills section */
(function () {
  const section = document.getElementById('skills');
  const canvas = document.getElementById('skillsNetwork');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const GAP = 40;
  const RADIUS = 220;
  const PULL = 0.4;
  const getColorVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const glowColor = getColorVar('--glow-color') || '57, 255, 20';
  const dotColor = getColorVar('--dot-color') || '#888';
  const lineColor = `rgba(${glowColor}, 0.72)`;
  const trailColor = `rgba(${glowColor}, 0.95)`;

  const mouse = { x: -9999, y: -9999, active: false };
  const trail = [];
  let W = 1;
  let H = 1;
  let cols = [];
  let dots = [];
  let raf = 0;

  function build(width, height) {
    const rect = section.getBoundingClientRect();
    W = Math.max(1, Math.floor(width ?? rect.width));
    H = Math.max(1, Math.floor(height ?? rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = [];
    dots = [];
    const columns = Math.floor(W / GAP) + 2;
    const rows = Math.floor(H / GAP) + 2;
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const column = [];
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const hx = colIndex * GAP;
        const hy = rowIndex * GAP;
        const dot = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
        column.push(dot);
        dots.push(dot);
      }
      cols.push(column);
    }
  }

  function setMouse(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
    trail.push({ x: mouse.x, y: mouse.y, t: performance.now() });
    if (trail.length > 80) trail.shift();
  }

  function onMove(event) {
    if (event.touches?.[0]) {
      setMouse(event.touches[0].clientX, event.touches[0].clientY);
    } else {
      setMouse(event.clientX, event.clientY);
    }
  }

  function onLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (const dot of dots) {
      let ax = (dot.hx - dot.x) * 0.08;
      let ay = (dot.hy - dot.y) * 0.08;
      if (mouse.active) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PULL;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
      }
      dot.vx = (dot.vx + ax) * 0.82;
      dot.vy = (dot.vy + ay) * 0.82;
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < cols[colIndex].length; rowIndex++) {
        const dot = cols[colIndex][rowIndex];
        const right = cols[colIndex + 1]?.[rowIndex];
        const down = cols[colIndex]?.[rowIndex + 1];
        const proximity = mouse.active
          ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
          : 0;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5 + proximity * 1.2;
        ctx.globalAlpha = 0.08 + proximity * 0.6;
        if (right) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (const dot of dots) {
      const proximity = mouse.active
        ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
        : 0;
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.18 + proximity * 0.72;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.2 + proximity * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (trail.length > 1) {
      const now = performance.now();
      ctx.strokeStyle = trailColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = now - b.t;
        if (age > 260) continue;
        ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.65;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  build();
  frame();

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => build())
    : null;
  resizeObserver?.observe(section);

  section.addEventListener('mousemove', onMove);
  section.addEventListener('mouseleave', onLeave);
  section.addEventListener('touchmove', onMove, { passive: true });
  section.addEventListener('touchend', onLeave);
  window.addEventListener('resize', build);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver?.disconnect();
    section.removeEventListener('mousemove', onMove);
    section.removeEventListener('mouseleave', onLeave);
    section.removeEventListener('touchmove', onMove);
    section.removeEventListener('touchend', onLeave);
    window.removeEventListener('resize', build);
  };
})();

/* Kinetic grid background for the Works section */
(function () {
  const section = document.getElementById('projects');
  const canvas = document.getElementById('worksNetwork');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const GAP = 40;
  const RADIUS = 220;
  const PULL = 0.4;
  const getColorVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const glowColor = getColorVar('--glow-color') || '57, 255, 20';
  const dotColor = getColorVar('--dot-color') || '#888';
  const lineColor = `rgba(${glowColor}, 0.72)`;
  const trailColor = `rgba(${glowColor}, 0.95)`;

  const mouse = { x: -9999, y: -9999, active: false };
  const trail = [];
  let W = 1;
  let H = 1;
  let cols = [];
  let dots = [];
  let raf = 0;

  function build(width, height) {
    const rect = section.getBoundingClientRect();
    W = Math.max(1, Math.floor(width ?? rect.width));
    H = Math.max(1, Math.floor(height ?? rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = [];
    dots = [];
    const columns = Math.floor(W / GAP) + 2;
    const rows = Math.floor(H / GAP) + 2;
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const column = [];
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const hx = colIndex * GAP;
        const hy = rowIndex * GAP;
        const dot = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
        column.push(dot);
        dots.push(dot);
      }
      cols.push(column);
    }
  }

  function setMouse(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
    trail.push({ x: mouse.x, y: mouse.y, t: performance.now() });
    if (trail.length > 80) trail.shift();
  }

  function onMove(event) {
    if (event.touches?.[0]) {
      setMouse(event.touches[0].clientX, event.touches[0].clientY);
    } else {
      setMouse(event.clientX, event.clientY);
    }
  }

  function onLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (const dot of dots) {
      let ax = (dot.hx - dot.x) * 0.08;
      let ay = (dot.hy - dot.y) * 0.08;
      if (mouse.active) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PULL;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
      }
      dot.vx = (dot.vx + ax) * 0.82;
      dot.vy = (dot.vy + ay) * 0.82;
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    for (let colIndex = 0; colIndex < cols.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < cols[colIndex].length; rowIndex++) {
        const dot = cols[colIndex][rowIndex];
        const right = cols[colIndex + 1]?.[rowIndex];
        const down = cols[colIndex]?.[rowIndex + 1];
        const proximity = mouse.active
          ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
          : 0;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5 + proximity * 1.2;
        ctx.globalAlpha = 0.08 + proximity * 0.6;
        if (right) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }
        if (down) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(down.x, down.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (const dot of dots) {
      const proximity = mouse.active
        ? Math.max(0, 1 - Math.hypot(mouse.x - dot.x, mouse.y - dot.y) / RADIUS)
        : 0;
      ctx.fillStyle = dotColor;
      ctx.globalAlpha = 0.18 + proximity * 0.72;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.2 + proximity * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    if (trail.length > 1) {
      const now = performance.now();
      ctx.strokeStyle = trailColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = now - b.t;
        if (age > 260) continue;
        ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.65;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  build();
  frame();

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => build())
    : null;
  resizeObserver?.observe(section);

  section.addEventListener('mousemove', onMove);
  section.addEventListener('mouseleave', onLeave);
  section.addEventListener('touchmove', onMove, { passive: true });
  section.addEventListener('touchend', onLeave);
  window.addEventListener('resize', build);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver?.disconnect();
    section.removeEventListener('mousemove', onMove);
    section.removeEventListener('mouseleave', onLeave);
    section.removeEventListener('touchmove', onMove);
    section.removeEventListener('touchend', onLeave);
    window.removeEventListener('resize', build);
  };
})();

/* Experience carousel */
(function () {
  const track = document.getElementById('expTrack');
  const prevButton = document.getElementById('expPrev');
  const nextButton = document.getElementById('expNext');
  const dots = Array.from(document.querySelectorAll('.exp-dot'));
  const slides = Array.from(track?.querySelectorAll('.exp-slide') || []);

  if (!track || !slides.length) return;

  let currentIndex = 0;

  function updateCarousel(nextIndex) {
    const safeIndex = (nextIndex + slides.length) % slides.length;
    currentIndex = safeIndex;

    const slideWidth = slides[0].offsetWidth + 24;
    track.scrollTo({
      left: slideWidth * currentIndex,
      behavior: 'smooth',
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  prevButton?.addEventListener('click', () => updateCarousel(currentIndex - 1));
  nextButton?.addEventListener('click', () => updateCarousel(currentIndex + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      updateCarousel(Number(dot.dataset.index) || 0);
    });
  });

  updateCarousel(0);
})();
