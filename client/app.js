let socket = null;
let currentAuthTab = 'login';
let currentUser = null;
let currentToken = null;
let activeChatId = null;
let activeChatDetails = null;
let typingTimeout = null;
let searchDebounce = null;
let currentNav = 'main'; // 'main' | 'projects' | 'my-projects' | 'chats' | 'profile'
let selectedCategory = 'Все';
let searchQuery = '';
let pendingAttachmentUrl = null;
let isOfflineMode = false;

// =====================================================================
// SEED DATA FOR STANDALONE / GITHUB PAGES MODE
// =====================================================================
const SEED_PROJECTS = [
  {
    id: 1,
    user_id: 101,
    author: 'Madiyar',
    title: '🌿 Умная теплица на Arduino & ESP32',
    description: 'Автоматизированная система полива и контроля температуры для школьного зимнего сада. Данные передаются по Wi-Fi в веб-дашборд.',
    category: 'Учёба & Доклады',
    is_pinned: 1,
    like_count: 18,
    is_liked: false,
    repo_url: 'https://github.com/madiyarmoldakhmet-ai/28it.hub2.0',
    code_snippet: `// Чтение датчиков влажности почвы
int sensorValue = analogRead(A0);
if (sensorValue < 300) {
  digitalWrite(RELAY_PIN, HIGH); // Включить полив
  Serial.println("Полив активирован");
}`,
    image_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    user_id: 102,
    author: 'Aisulu',
    title: '🤖 Telegram-бот школьного расписания и звонков',
    description: 'Бот позволяет быстро узнать расписание любого класса, домашние задания и время до конца перемены. Написан на Python (aiogram).',
    category: 'Проекты & Идеи',
    is_pinned: 0,
    like_count: 29,
    is_liked: false,
    repo_url: 'https://github.com/madiyarmoldakhmet-ai/28it.hub2.0',
    code_snippet: `@dp.message_handler(commands=['schedule'])
async def send_schedule(message: types.Message):
    schedule = get_today_schedule()
    await message.reply(f"📅 Расписание на сегодня:\\n{schedule}")`,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 3,
    user_id: 103,
    author: 'Danial',
    title: '🎮 2D Платформер «RoboQuest» на Godot Engine',
    description: 'Обучающая игра по алгоритмам и основам логики для учеников 5-7 классов. 10 уникальных уровней с головоломками.',
    category: 'Геймдев & Творчество',
    is_pinned: 0,
    like_count: 14,
    is_liked: false,
    repo_url: 'https://github.com/madiyarmoldakhmet-ai/28it.hub2.0',
    code_snippet: `func _physics_process(delta):
    velocity.y += GRAVITY * delta
    if is_on_floor() and Input.is_action_just_pressed("jump"):
        velocity.y = JUMP_FORCE
    move_and_slide()`,
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: 4,
    user_id: 104,
    author: 'Sofia',
    title: '📊 Интерактивный дашборд школьной олимпиады',
    description: 'Веб-сервис для автоматического подсчета баллов и вывода турнирной таблицы олимпиад в реальном времени.',
    category: 'Веб-сервисы & Софт',
    is_pinned: 0,
    like_count: 22,
    is_liked: false,
    repo_url: 'https://github.com/madiyarmoldakhmet-ai/28it.hub2.0',
    code_snippet: `function calculateTotalScore(scores) {
  return scores.reduce((sum, current) => sum + current, 0);
}`,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  }
];

const SEED_COMMENTS = {
  1: [
    { id: 1, author: 'Aisulu', text: 'Отличный проект! Какие датчики использовали?', created_at: new Date(Date.now() - 3600000 * 5).toISOString() },
    { id: 2, author: 'Madiyar', text: 'Спасибо! Использовали емкостные датчики влажности почвы v1.2 и DHT22.', created_at: new Date(Date.now() - 3600000 * 3).toISOString() }
  ],
  2: [
    { id: 3, author: 'Danial', text: 'Очень удобно на переменах проверять кабинет!', created_at: new Date(Date.now() - 3600000 * 12).toISOString() }
  ]
};

function getLocalProjects() {
  const data = localStorage.getItem('hub_local_projects');
  if (!data) {
    localStorage.setItem('hub_local_projects', JSON.stringify(SEED_PROJECTS));
    return [...SEED_PROJECTS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...SEED_PROJECTS];
  }
}

function saveLocalProjects(projects) {
  localStorage.setItem('hub_local_projects', JSON.stringify(projects));
}

function getLocalComments(postId) {
  const data = localStorage.getItem(`hub_comments_${postId}`);
  if (!data) {
    const initial = SEED_COMMENTS[postId] || [];
    localStorage.setItem(`hub_comments_${postId}`, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveLocalComments(postId, comments) {
  localStorage.setItem(`hub_comments_${postId}`, JSON.stringify(comments));
}

// =====================================================================
// INIT & THEME MANAGEMENT
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  const savedToken = localStorage.getItem('messenger_token');
  const savedUser = localStorage.getItem('messenger_user');

  if (savedToken && savedUser) {
    try {
      currentToken = savedToken;
      currentUser = JSON.parse(savedUser);
      showAppScreen();
    } catch (e) {
      logout();
    }
  } else {
    showAuthScreen();
  }
});

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerText = theme === 'dark' ? '🌙' : '☀️';
  }
}

// =====================================================================
// NAVIGATION & VIEWS
// =====================================================================
function navigate(viewName) {
  currentNav = viewName;

  document.querySelectorAll('.ollama-nav-link').forEach((btn) => btn.classList.remove('active'));
  const navIdMap = {
    'main': 'navMain',
    'projects': 'navProjects',
    'my-projects': 'navMyProjects',
    'chats': 'navChats',
    'profile': 'navMyProjects',
  };
  const activeBtn = document.getElementById(navIdMap[viewName]);
  if (activeBtn) activeBtn.classList.add('active');

  const pageView = document.getElementById('pageView');
  const chatsView = document.getElementById('chatsView');
  const heroChapter = document.getElementById('heroChapter');
  const sectionTitle = document.getElementById('sectionTitle');

  if (viewName === 'chats') {
    pageView.classList.add('hidden');
    chatsView.classList.remove('hidden');
    loadChats();
  } else {
    chatsView.classList.add('hidden');
    pageView.classList.remove('hidden');

    if (viewName === 'main') {
      if (heroChapter) heroChapter.classList.remove('hidden');
      if (sectionTitle) sectionTitle.innerText = 'Каталог проектов';
      selectedCategory = 'Все';
      updateCatPills();
      loadProjects();
    } else if (viewName === 'projects') {
      if (heroChapter) heroChapter.classList.add('hidden');
      if (sectionTitle) sectionTitle.innerText = 'Все проекты';
      loadProjects();
    } else if (viewName === 'my-projects') {
      if (heroChapter) heroChapter.classList.add('hidden');
      if (sectionTitle) sectionTitle.innerText = 'Мои проекты';
      loadProjects({ userId: currentUser ? currentUser.id : 1 });
    } else if (viewName === 'profile') {
      if (heroChapter) heroChapter.classList.add('hidden');
      if (sectionTitle) sectionTitle.innerText = `Профиль автора: ${currentUser ? currentUser.username : 'Гость'}`;
      loadProjects({ userId: currentUser ? currentUser.id : 1 });
    }
  }
}

function scrollToCatalog() {
  const el = document.getElementById('catalogSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function selectCategory(catName) {
  selectedCategory = catName;
  updateCatPills();
  loadProjects();
}

function updateCatPills() {
  document.querySelectorAll('.ollama-cat-pill').forEach((pill) => {
    const text = pill.innerText.trim();
    if (text === selectedCategory || (selectedCategory === 'Все' && text.includes('Все'))) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

function handleGlobalSearch() {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = document.getElementById('globalSearchInput').value.trim().toLowerCase();
    loadProjects();
  }, 250);
}

function copyInstallCmd() {
  const currentUrl = window.location.origin;
  navigator.clipboard.writeText(currentUrl).then(() => {
    alert(`Ссылка на сайт скопирована: ${currentUrl}`);
  }).catch(() => {
    alert(`Ссылка: ${currentUrl}`);
  });
}

// =====================================================================
// AUTHENTICATION
// =====================================================================
function switchAuthTab(tab) {
  currentAuthTab = tab;
  document.getElementById('loginTabBtn').classList.toggle('active', tab === 'login');
  document.getElementById('registerTabBtn').classList.toggle('active', tab === 'register');
  document.getElementById('authSubmitBtn').innerText = tab === 'login' ? 'Войти' : 'Зарегистрироваться';
  document.getElementById('authError').classList.add('hidden');
}

function submitAuthDirect(tab) {
  switchAuthTab(tab);
  const form = document.getElementById('authForm');
  if (form) {
    if (form.requestSubmit) {
      form.requestSubmit();
    } else {
      handleAuthSubmit(new Event('submit'));
    }
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const errorEl = document.getElementById('authError');

  if (!username) return;
  errorEl.classList.add('hidden');
  const endpoint = currentAuthTab === 'login' ? '/api/login' : '/api/register';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      currentToken = data.token;
      currentUser = data.user;
      isOfflineMode = false;
      localStorage.setItem('messenger_token', currentToken);
      localStorage.setItem('messenger_user', JSON.stringify(currentUser));
      showAppScreen();
      return;
    } else if (res.status === 400 || res.status === 401) {
      const data = await res.json().catch(() => ({}));
      errorEl.innerText = data.message || 'Неверный логин или пароль';
      errorEl.classList.remove('hidden');
      return;
    }
    throw new Error('API unreachable');
  } catch (err) {
    // Web / GitHub Pages static standalone fallback
    isOfflineMode = true;
    currentToken = 'demo-token-' + Date.now();
    currentUser = {
      id: Math.abs(hashCode(username)) || 100,
      username: username,
    };
    localStorage.setItem('messenger_token', currentToken);
    localStorage.setItem('messenger_user', JSON.stringify(currentUser));
    showAppScreen();
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function showAuthScreen() {
  document.getElementById('authScreen').classList.remove('hidden');
  document.getElementById('appContainer').classList.add('hidden');
}

function showAppScreen() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('appContainer').classList.remove('hidden');

  if (currentUser) {
    document.getElementById('currentUsername').innerText = currentUser.username;
    document.getElementById('currentUserAvatar').innerText = currentUser.username.charAt(0).toUpperCase();
  }

  initSocketConnection();
  navigate('main');
  loadGitActivity();
}

function logout() {
  localStorage.removeItem('messenger_token');
  localStorage.removeItem('messenger_user');
  if (socket) socket.disconnect();
  currentToken = null;
  currentUser = null;
  activeChatId = null;
  activeChatDetails = null;
  showAuthScreen();
}

// =====================================================================
// SOCKET.IO REALTIME
// =====================================================================
function initSocketConnection() {
  if (typeof io === 'undefined') return;
  if (socket) {
    try { socket.disconnect(); } catch (e) {}
  }

  try {
    socket = io({
      reconnectionAttempts: 2,
      timeout: 3000,
    });

    socket.on('connect', () => {
      if (activeChatId) joinChatRoom(activeChatId);
    });

    socket.on('chat_joined', ({ chatId, history }) => {
      renderMessagesHistory(history);
    });

    socket.on('receive_message', (msg) => {
      if (Number(msg.chatId) === Number(activeChatId)) {
        appendSingleMessage(msg);
        scrollToBottom();
      }
      loadChats();
    });

    socket.on('typing_status', ({ chatId, username, isTyping }) => {
      if (Number(chatId) === Number(activeChatId)) {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
          if (isTyping) {
            indicator.innerText = `${username} печатает...`;
            indicator.classList.remove('hidden');
          } else {
            indicator.classList.add('hidden');
          }
        }
      }
    });

    socket.on('gitea_event', (eventData) => {
      prependGitEvent(eventData);
    });
  } catch (err) {
    console.log('Running in static web mode (sockets idle)');
  }
}

// =====================================================================
// PRODUCT CATALOG
// =====================================================================
async function loadProjects(filters = {}) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '<div class="ollama-loading">Загрузка каталога...</div>';

  let posts = [];

  try {
    let url = '/api/posts?';
    if (selectedCategory && selectedCategory !== 'Все') {
      url += `category=${encodeURIComponent(selectedCategory)}&`;
    }
    if (filters.userId) {
      url += `userId=${encodeURIComponent(filters.userId)}&`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    posts = data.posts || [];
  } catch (err) {
    // Static / LocalStorage fallback
    posts = getLocalProjects();

    if (selectedCategory && selectedCategory !== 'Все') {
      posts = posts.filter((p) => p.category === selectedCategory);
    }
    if (filters.userId) {
      posts = posts.filter((p) => String(p.user_id) === String(filters.userId));
    }
  }

  if (searchQuery) {
    posts = posts.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(searchQuery)) ||
        (p.description && p.description.toLowerCase().includes(searchQuery)) ||
        (p.author && p.author.toLowerCase().includes(searchQuery))
    );
  }

  const countEl = document.getElementById('projectsCount');
  if (countEl) countEl.innerText = `${posts.length} проектов`;
  renderProjectsGrid(posts);
}

function renderProjectsGrid(posts) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (posts.length === 0) {
    grid.innerHTML = '<div class="ollama-loading">Проектов пока нет. Будьте первым, кто опубликует!</div>';
    return;
  }

  posts.forEach((post) => {
    grid.appendChild(buildProjectCard(post));
  });
}

function buildProjectCard(post) {
  const card = document.createElement('div');
  card.className = `ollama-card ${post.is_pinned ? 'pinned-card' : ''}`;
  card.onclick = () => openProjectDetailModal(post.id);

  const coverHtml = post.image_url
    ? `<img src="${escapeHtml(post.image_url)}" class="ollama-card-cover" alt="${escapeHtml(post.title)}" loading="lazy" />`
    : `<div class="ollama-card-cover" style="display:flex;align-items:center;justify-content:center;font-size:32px;opacity:0.3;">📄</div>`;

  const category = post.category || 'Учёба & Доклады';
  const authorName = post.author || 'Автор';

  const pinBadge = post.is_pinned ? `<span class="post-badge pin-badge">📌 Закреплено</span>` : '';
  const codeBadge = post.code_snippet ? `<span class="post-badge code-badge">💻 Код</span>` : '';
  const fileBadge = post.file_url ? `<span class="post-badge file-badge">📎 Файл</span>` : '';
  const photoBadge = post.image_url ? `<span class="post-badge photo-badge">🖼️ Фото</span>` : '';

  card.innerHTML = `
    ${coverHtml}
    <div class="card-badges">
      ${pinBadge}
      <span class="ollama-card-category">${escapeHtml(category)}</span>
      ${codeBadge}
      ${fileBadge}
      ${photoBadge}
    </div>
    <h3 class="ollama-card-title">${escapeHtml(post.title)}</h3>
    <p class="ollama-card-desc">${escapeHtml(post.description)}</p>
    <div class="ollama-card-author">
      <div class="ollama-user-avatar" style="width:20px;height:20px;font-size:10px;">${escapeHtml(authorName.charAt(0).toUpperCase())}</div>
      <span class="ollama-body-sm-strong" style="font-size:12px;">${escapeHtml(authorName)}</span>
      <span class="ollama-caption-sm" style="margin-left:auto;">❤️ ${post.like_count || 0}</span>
    </div>
  `;

  return card;
}

// =====================================================================
// PROJECT DETAIL MODAL
// =====================================================================
async function openProjectDetailModal(postId) {
  const modal = document.getElementById('projectDetailModal');
  const body = document.getElementById('projectDetailBody');
  body.innerHTML = '<div class="ollama-loading">Загрузка информации...</div>';
  modal.classList.remove('hidden');

  let post = null;

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    post = data.post;
  } catch (err) {
    const localPosts = getLocalProjects();
    post = localPosts.find((p) => String(p.id) === String(postId));
  }

  if (post) {
    renderProjectDetailBody(post);
  } else {
    body.innerHTML = '<div class="ollama-loading">Проект не найден</div>';
  }
}

function closeProjectDetailModal() {
  document.getElementById('projectDetailModal').classList.add('hidden');
}

function renderProjectDetailBody(post) {
  const body = document.getElementById('projectDetailBody');

  const heroHtml = post.image_url
    ? `<div style="margin-bottom:16px;"><img src="${escapeHtml(post.image_url)}" style="width:100%;max-height:260px;object-fit:cover;border-radius:var(--radius-lg);" alt="${escapeHtml(post.title)}" /></div>`
    : '';

  const date = new Date(post.created_at || Date.now()).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const isOwner = currentUser && post.user_id === currentUser.id;
  const authorName = post.author || 'Автор';

  const contactBtnHtml = isOwner
    ? `<button class="ollama-btn-secondary" disabled>Ваш проект</button>`
    : `<button class="ollama-btn-primary" onclick="contactAuthor(${post.user_id || 1}, '${escapeHtml(authorName)}', ${post.id}, '${escapeHtml(post.title)}')">
        Написать автору
       </button>`;

  const pinBtnHtml = `<button class="ollama-btn-secondary" id="pinBtn-${post.id}" onclick="togglePin(${post.id})" style="margin-left:8px;">
                        ${post.is_pinned ? '📌 Открепить' : '📌 Закрепить'}
                      </button>`;

  const repoHtml = post.repo_url
    ? `<div style="margin:12px 0;">
         <a href="${escapeHtml(post.repo_url)}" target="_blank" rel="noopener" class="ollama-btn-secondary full-width">
           🔗 Git-репозиторий: ${escapeHtml(post.repo_url)}
         </a>
       </div>`
    : '';

  const codeHtml = post.code_snippet
    ? `<div style="margin:16px 0;">
         <div class="ollama-label" style="margin-bottom:6px;">💻 Исходный код:</div>
         <pre class="code-preview-block"><code>${escapeHtml(post.code_snippet)}</code></pre>
       </div>`
    : '';

  const fileHtml = post.file_url
    ? `<div style="margin:12px 0;">
         <a href="${escapeHtml(post.file_url)}" download class="ollama-btn-secondary full-width">
           📎 Скачать прикрепленный файл
         </a>
       </div>`
    : '';

  body.innerHTML = `
    ${heroHtml}
    
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:12px;">
      <div>
        <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
          ${post.is_pinned ? '<span class="post-badge pin-badge">📌 Закреплено</span>' : ''}
          <span class="ollama-card-category">${escapeHtml(post.category || 'Учёба & Доклады')}</span>
        </div>
        <h1 class="ollama-heading-lg">${escapeHtml(post.title)}</h1>
      </div>
      <div style="display:flex;align-items:center;">
        ${contactBtnHtml}
        ${pinBtnHtml}
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--color-hairline);border-bottom:1px solid var(--color-hairline);margin-bottom:14px;">
      <div class="ollama-user-avatar">${escapeHtml(authorName.charAt(0).toUpperCase())}</div>
      <div>
        <div class="ollama-body-strong">${escapeHtml(authorName)}</div>
        <div class="ollama-caption-sm">Опубликовано: ${date}</div>
      </div>
      <button class="ollama-btn-secondary" style="margin-left:auto;height:30px;padding:3px 10px;font-size:12px;" id="likeBtn-${post.id}" onclick="toggleLike(${post.id})">
        ${post.is_liked ? '❤️ Понравилось' : '🤍 Лайк'} (${post.like_count || 0})
      </button>
    </div>

    <div class="ollama-body-md" style="margin-bottom:14px;white-space:pre-wrap;">${escapeHtml(post.description)}</div>

    ${codeHtml}
    ${fileHtml}
    ${repoHtml}

    <!-- COMMENTS -->
    <div style="margin-top:20px;border-top:1px solid var(--color-hairline);padding-top:14px;">
      <h3 class="ollama-heading-sm" style="margin-bottom:10px;">Обсуждение</h3>
      <div id="modalCommentsList">
        <div class="ollama-caption-sm">Загрузка комментариев...</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <textarea id="modalCommentInput" class="ollama-text-input ollama-textarea" rows="2" placeholder="Ваш комментарий..."></textarea>
        <button class="ollama-btn-primary" style="height:auto;" onclick="submitModalComment(${post.id})">Отправить</button>
      </div>
    </div>
  `;

  loadModalComments(post.id);
}

async function togglePin(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}/pin`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (res.ok) {
      closeProjectDetailModal();
      loadProjects();
      return;
    }
    throw new Error('API unreachable');
  } catch (err) {
    const posts = getLocalProjects();
    const target = posts.find((p) => String(p.id) === String(postId));
    if (target) {
      target.is_pinned = target.is_pinned ? 0 : 1;
      saveLocalProjects(posts);
    }
    closeProjectDetailModal();
    loadProjects();
  }
}

async function toggleLike(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      const btn = document.getElementById(`likeBtn-${postId}`);
      if (btn) btn.innerText = `${data.isLiked ? '❤️ Понравилось' : '🤍 Лайк'} (${data.likeCount})`;
      return;
    }
    throw new Error('API unreachable');
  } catch (err) {
    const posts = getLocalProjects();
    const target = posts.find((p) => String(p.id) === String(postId));
    if (target) {
      target.is_liked = !target.is_liked;
      target.like_count = (target.like_count || 0) + (target.is_liked ? 1 : -1);
      if (target.like_count < 0) target.like_count = 0;
      saveLocalProjects(posts);

      const btn = document.getElementById(`likeBtn-${postId}`);
      if (btn) btn.innerText = `${target.is_liked ? '❤️ Понравилось' : '🤍 Лайк'} (${target.like_count})`;
    }
  }
}

async function loadModalComments(postId) {
  const container = document.getElementById('modalCommentsList');
  if (!container) return;

  let comments = [];

  try {
    const res = await fetch(`/api/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    comments = data.comments || [];
  } catch (err) {
    comments = getLocalComments(postId);
  }

  container.innerHTML = '';
  if (comments.length === 0) {
    container.innerHTML = '<div class="ollama-caption-sm">Пока нет комментариев. Будьте первым!</div>';
    return;
  }

  comments.forEach((c) => {
    const time = new Date(c.created_at || Date.now()).toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
    });
    const item = document.createElement('div');
    item.style.cssText = 'padding:8px 0;border-bottom:1px solid var(--color-hairline);display:flex;gap:8px;';
    item.innerHTML = `
      <div class="ollama-user-avatar" style="width:20px;height:20px;font-size:10px;">${escapeHtml((c.author || 'U').charAt(0).toUpperCase())}</div>
      <div style="flex:1;">
        <div class="ollama-body-sm-strong">${escapeHtml(c.author || 'Пользователь')} <span class="ollama-caption-sm" style="margin-left:6px;">${time}</span></div>
        <div class="ollama-body-sm" style="margin-top:2px;">${escapeHtml(c.text)}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

async function submitModalComment(postId) {
  const input = document.getElementById('modalCommentInput');
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    input.value = '';
    await loadModalComments(postId);
  } catch (err) {
    const comments = getLocalComments(postId);
    comments.push({
      id: Date.now(),
      author: currentUser ? currentUser.username : 'Гость',
      text: text,
      created_at: new Date().toISOString(),
    });
    saveLocalComments(postId, comments);
    input.value = '';
    loadModalComments(postId);
  }
}

// =====================================================================
// CONTACT & CHATS
// =====================================================================
async function contactAuthor(targetUserId, authorName, projectId, projectTitle) {
  closeProjectDetailModal();

  try {
    const res = await fetch('/api/chats/direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ targetUserId }),
    });

    if (res.ok) {
      const data = await res.json();
      navigate('chats');
      selectChat(data.chat);
      return;
    }
    throw new Error('API unreachable');
  } catch (err) {
    navigate('chats');
    const demoChat = {
      id: targetUserId || 999,
      name: authorName || 'Автор проекта',
      last_message: `Здравствуйте! Пишу по поводу проекта: ${projectTitle || 'Проект'}`,
      last_sender: currentUser ? currentUser.username : 'Я',
    };
    selectChat(demoChat);
  }
}

async function loadChats() {
  try {
    const res = await fetch('/api/chats', {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    renderChatsList(data.chats || []);
  } catch (err) {
    const demoChats = [
      { id: 1, name: '💬 Общий чат IT-клуба', last_message: 'Добро пожаловать в 28IT.hub!', last_sender: 'Madiyar' },
      { id: 2, name: '🌿 Умная теплица (команда)', last_message: 'Датчик температуры подключен.', last_sender: 'Aisulu' },
    ];
    renderChatsList(demoChats);
  }
}

function renderChatsList(chats) {
  const container = document.getElementById('chatsList');
  if (!container) return;
  container.innerHTML = '';

  if (chats.length === 0) {
    container.innerHTML = '<div class="ollama-caption-sm" style="padding:16px;text-align:center;">Нет открытых диалогов</div>';
    return;
  }

  chats.forEach((chat) => {
    const div = document.createElement('div');
    div.className = `ollama-dialog-item ${chat.id === activeChatId ? 'active' : ''}`;
    div.onclick = () => selectChat(chat);

    const preview = chat.last_message ? `${chat.last_sender || ''}: ${chat.last_message}` : 'Сообщений нет';

    div.innerHTML = `
      <div class="ollama-user-avatar" style="width:28px;height:28px;font-size:12px;">💬</div>
      <div style="flex:1;overflow:hidden;">
        <div class="ollama-body-sm-strong" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(chat.name)}</div>
        <div class="ollama-caption-sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(preview)}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

async function selectChat(chat) {
  activeChatId = chat.id;
  document.querySelectorAll('.ollama-dialog-item').forEach((item) => item.classList.remove('active'));
  document.getElementById('messageForm').classList.remove('hidden');

  try {
    const res = await fetch(`/api/chats/${chat.id}/messages`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      activeChatDetails = data.chat;
      document.getElementById('activeChatTitle').innerText = data.chat.name;
      renderMessagesHistory(data.messages || []);
      joinChatRoom(chat.id);
      return;
    }
    throw new Error('API unreachable');
  } catch (err) {
    document.getElementById('activeChatTitle').innerText = chat.name;
    const history = [
      { userId: 101, username: 'Madiyar', content: 'Привет! Добро пожаловать на платформу школьных проектов 28IT.hub 🚀', createdAt: new Date(Date.now() - 3600000).toISOString() },
    ];
    renderMessagesHistory(history);
  }
}

function joinChatRoom(chatId) {
  if (!socket || !socket.connected) return;
  socket.emit('join_chat', { chatId, token: currentToken, userId: currentUser ? currentUser.id : 1 });
}

function renderMessagesHistory(history) {
  const container = document.getElementById('messagesContainer');
  container.innerHTML = '';
  if (!history || history.length === 0) {
    container.innerHTML = '<div class="ollama-empty-messages"><div class="ollama-heading-md">Диалог открыт</div><p class="ollama-body-sm">Напишите сообщение</p></div>';
    return;
  }
  history.forEach((msg) => appendSingleMessage(msg));
  scrollToBottom();
}

function appendSingleMessage(msg) {
  const container = document.getElementById('messagesContainer');
  const placeholder = container.querySelector('.ollama-empty-messages');
  if (placeholder) placeholder.remove();

  const isMe = currentUser && msg.userId === currentUser.id;
  const bubble = document.createElement('div');
  bubble.className = `ollama-msg-bubble ${isMe ? 'sent' : 'received'}`;

  const formattedTime = new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const attachmentHtml = msg.attachmentUrl
    ? `<a href="${escapeHtml(msg.attachmentUrl)}" target="_blank" rel="noopener">
         <img style="max-width:240px;max-height:180px;border-radius:var(--radius-md);margin-bottom:6px;display:block;" src="${escapeHtml(msg.attachmentUrl)}" alt="фото" />
       </a>`
    : '';

  const textHtml = msg.content ? `<span>${escapeHtml(msg.content)}</span>` : '';

  bubble.innerHTML = `
    ${attachmentHtml}
    ${textHtml}
    <div class="ollama-caption-sm" style="font-size:10px;opacity:0.7;text-align:right;margin-top:2px;">${formattedTime}</div>
  `;
  container.appendChild(bubble);
}

function handleKeyDown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage(event);
  }
}

function sendMessage(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('messageInput');
  const content = input.value.trim();

  if (!content && !pendingAttachmentUrl) return;

  if (socket && socket.connected && activeChatId) {
    socket.emit('send_message', {
      chatId: activeChatId,
      content: content || '',
      attachmentUrl: pendingAttachmentUrl || undefined,
      userId: currentUser ? currentUser.id : 1,
      username: currentUser ? currentUser.username : 'Гость',
      token: currentToken,
    });
  } else {
    // Offline / Demo send
    appendSingleMessage({
      userId: currentUser ? currentUser.id : 1,
      username: currentUser ? currentUser.username : 'Гость',
      content: content,
      attachmentUrl: pendingAttachmentUrl,
      createdAt: new Date().toISOString(),
    });
    scrollToBottom();
  }

  input.value = '';
  removeChatAttach();
  sendTypingStatus(false);
}

function handleTyping() {
  sendTypingStatus(true);
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => sendTypingStatus(false), 2000);
}

function sendTypingStatus(isTyping) {
  if (!socket || !socket.connected || !activeChatId) return;
  socket.emit('typing_status', {
    chatId: activeChatId,
    userId: currentUser ? currentUser.id : 1,
    username: currentUser ? currentUser.username : 'Гость',
    isTyping,
  });
}

function scrollToBottom() {
  setTimeout(() => {
    const container = document.getElementById('messagesContainer');
    if (container) container.scrollTop = container.scrollHeight;
  }, 50);
}

// =====================================================================
// FILE UPLOAD HELPER (Supports Base64 offline fallback)
// =====================================================================
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
  } catch (e) {}

  // Fallback to local DataURL for static web mode
  return await readFileAsDataURL(file);
}

async function handleChatFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const url = await uploadFile(file);
    pendingAttachmentUrl = url;

    const preview = document.getElementById('chatAttachPreview');
    const img = document.getElementById('chatAttachImg');
    img.src = url;
    preview.classList.remove('hidden');
  } catch (err) {
    alert('Не удалось прикрепить фото: ' + err.message);
  }
  event.target.value = '';
}

function removeChatAttach() {
  pendingAttachmentUrl = null;
  const preview = document.getElementById('chatAttachPreview');
  const img = document.getElementById('chatAttachImg');
  if (preview) preview.classList.add('hidden');
  if (img) img.src = '';
}

// =====================================================================
// PUBLISH MODAL
// =====================================================================
function openPublishModal() {
  document.getElementById('publishModal').classList.remove('hidden');
  document.getElementById('postTitle').value = '';
  document.getElementById('postDesc').value = '';
  if (document.getElementById('postCodeSnippet')) document.getElementById('postCodeSnippet').value = '';
  if (document.getElementById('postImageInput')) document.getElementById('postImageInput').value = '';
  if (document.getElementById('postFileInput')) document.getElementById('postFileInput').value = '';
  if (document.getElementById('postIsPinned')) document.getElementById('postIsPinned').checked = false;
  document.getElementById('publishError').classList.add('hidden');
}

function closePublishModal() {
  document.getElementById('publishModal').classList.add('hidden');
}

function handleOverlayClick(event, modalId) {
  if (event.target.id === modalId) {
    document.getElementById(modalId).classList.add('hidden');
  }
}

async function handlePublishSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const description = document.getElementById('postDesc').value.trim();
  const code_snippet = document.getElementById('postCodeSnippet') ? document.getElementById('postCodeSnippet').value.trim() : '';
  const is_pinned = document.getElementById('postIsPinned') ? (document.getElementById('postIsPinned').checked ? 1 : 0) : 0;

  const imageFileInput = document.getElementById('postImageInput');
  const fileInput = document.getElementById('postFileInput');
  const errorEl = document.getElementById('publishError');
  const btn = document.getElementById('publishBtn');

  errorEl.classList.add('hidden');

  if (!title || !description) {
    errorEl.innerText = 'Заполните название и описание проекта.';
    errorEl.classList.remove('hidden');
    return;
  }

  btn.disabled = true;
  btn.innerText = 'Публикую...';

  try {
    let image_url = null;
    if (imageFileInput && imageFileInput.files[0]) {
      try {
        image_url = await uploadFile(imageFileInput.files[0]);
      } catch (uploadErr) {
        errorEl.innerText = 'Ошибка загрузки изображения: ' + uploadErr.message;
        errorEl.classList.remove('hidden');
        btn.disabled = false;
        btn.innerText = 'Опубликовать';
        return;
      }
    }

    let file_url = null;
    if (fileInput && fileInput.files[0]) {
      try {
        file_url = await uploadFile(fileInput.files[0]);
      } catch (uploadErr) {
        errorEl.innerText = 'Ошибка загрузки файла: ' + uploadErr.message;
        errorEl.classList.remove('hidden');
        btn.disabled = false;
        btn.innerText = 'Опубликовать';
        return;
      }
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          code_snippet: code_snippet || undefined,
          image_url: image_url || undefined,
          file_url: file_url || undefined,
          is_pinned: is_pinned === 1,
        }),
      });

      if (res.ok) {
        closePublishModal();
        loadProjects();
        return;
      }
    } catch (apiErr) {}

    // Fallback to localStorage post
    const posts = getLocalProjects();
    const newPost = {
      id: Date.now(),
      user_id: currentUser ? currentUser.id : 1,
      author: currentUser ? currentUser.username : 'Автор',
      title,
      description,
      category: category || 'Учёба & Доклады',
      code_snippet,
      image_url,
      file_url,
      is_pinned,
      like_count: 0,
      is_liked: false,
      created_at: new Date().toISOString(),
    };
    posts.unshift(newPost);
    saveLocalProjects(posts);

    closePublishModal();
    loadProjects();
  } catch (err) {
    errorEl.innerText = 'Ошибка сохранения проекта.';
    errorEl.classList.remove('hidden');
  } finally {
    btn.disabled = false;
    btn.innerText = 'Опубликовать';
  }
}

// =====================================================================
// GIT ACTIVITY
// =====================================================================
async function loadGitActivity() {
  const container = document.getElementById('gitActivityList');
  if (!container) return;
  container.innerHTML = '<div class="ollama-git-empty">Загрузка событий...</div>';

  try {
    const res = await fetch('/api/webhooks/events', {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const events = data.events || [];

    container.innerHTML = '';
    if (events.length === 0) {
      container.innerHTML = '<div class="ollama-git-empty">Событий пока нет.<br>Настройте вебхуки в репозитории.</div>';
      return;
    }
    events.forEach((ev) => container.appendChild(buildGitEventEl(ev)));
  } catch (err) {
    // Static demo events
    const demoEvents = [
      { event_type: 'deploy', summary: 'Платформа успешно развернута на GitHub Pages', created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
      { event_type: 'release', summary: 'Версия 2.0: Добавлен онлайн-каталог и фильтры', created_at: new Date(Date.now() - 86400000).toISOString() },
      { event_type: 'push', summary: 'Обновлены темы оформления и мобильная адаптивность', created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    ];
    container.innerHTML = '';
    demoEvents.forEach((ev) => container.appendChild(buildGitEventEl(ev)));
  }
}

function buildGitEventEl(ev) {
  const el = document.createElement('div');
  el.className = 'ollama-git-card';

  const time = new Date(ev.created_at || Date.now()).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  });

  el.innerHTML = `
    <div>
      <span class="ollama-git-tag">${escapeHtml(ev.event_type || 'event')}</span>
      <span style="margin-left:8px;" class="ollama-body-sm-strong">${escapeHtml(ev.summary)}</span>
    </div>
    <div class="ollama-caption-sm">${time}</div>
  `;
  return el;
}

function prependGitEvent(ev) {
  const container = document.getElementById('gitActivityList');
  if (!container) return;
  const empty = container.querySelector('.ollama-git-empty');
  if (empty) empty.remove();
  container.insertBefore(buildGitEventEl(ev), container.firstChild);
}

// UTILS
function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
