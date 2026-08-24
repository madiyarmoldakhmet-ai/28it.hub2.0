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
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
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

  // Update navbar links
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
      loadProjects({ userId: currentUser.id });
    } else if (viewName === 'profile') {
      if (heroChapter) heroChapter.classList.add('hidden');
      if (sectionTitle) sectionTitle.innerText = `Профиль автора: ${currentUser.username}`;
      loadProjects({ userId: currentUser.id });
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
  const cmd = "http://localhost:3000";
  navigator.clipboard.writeText(cmd).then(() => {
    alert("Ссылка на сайт скопирована!");
  }).catch(() => {});
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

async function handleAuthSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const errorEl = document.getElementById('authError');

  errorEl.classList.add('hidden');
  const endpoint = currentAuthTab === 'login' ? '/api/login' : '/api/register';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.innerText = data.message || 'Ошибка авторизации';
      errorEl.classList.remove('hidden');
      return;
    }
    currentToken = data.token;
    currentUser = data.user;
    localStorage.setItem('messenger_token', currentToken);
    localStorage.setItem('messenger_user', JSON.stringify(currentUser));
    showAppScreen();
  } catch (err) {
    errorEl.innerText = 'Сервер недоступен. Проверьте соединение.';
    errorEl.classList.remove('hidden');
  }
}

function showAuthScreen() {
  document.getElementById('authScreen').classList.remove('hidden');
  document.getElementById('appContainer').classList.add('hidden');
}

function showAppScreen() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('appContainer').classList.remove('hidden');

  document.getElementById('currentUsername').innerText = currentUser.username;
  document.getElementById('currentUserAvatar').innerText = currentUser.username.charAt(0).toUpperCase();

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
  if (socket) socket.disconnect();
  socket = io();

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
      if (isTyping) {
        indicator.innerText = `${username} печатает...`;
        indicator.classList.remove('hidden');
      } else {
        indicator.classList.add('hidden');
      }
    }
  });

  socket.on('gitea_event', (eventData) => {
    prependGitEvent(eventData);
  });
}

// =====================================================================
// PRODUCT CATALOG
// =====================================================================
async function loadProjects(filters = {}) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '<div class="ollama-loading">Загрузка каталога...</div>';

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
    let posts = data.posts || [];

    if (searchQuery) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.description.toLowerCase().includes(searchQuery) ||
          p.author.toLowerCase().includes(searchQuery)
      );
    }

    const countEl = document.getElementById('projectsCount');
    if (countEl) countEl.innerText = `${posts.length} проектов`;
    renderProjectsGrid(posts);
  } catch (err) {
    grid.innerHTML = '<div class="ollama-loading" style="color:var(--color-primary);">Ошибка загрузки проектов</div>';
    console.error('loadProjects error:', err);
  }
}

function renderProjectsGrid(posts) {
  const grid = document.getElementById('projectsGrid');
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
  card.className = 'ollama-card';
  card.onclick = () => openProjectDetailModal(post.id);

  const coverHtml = post.image_url
    ? `<img src="${escapeHtml(post.image_url)}" class="ollama-card-cover" alt="${escapeHtml(post.title)}" loading="lazy" />`
    : `<div class="ollama-card-cover" style="display:flex;align-items:center;justify-content:center;font-size:36px;opacity:0.3;">📦</div>`;

  const category = post.category || 'Учёба & Доклады';

  card.innerHTML = `
    ${coverHtml}
    <span class="ollama-card-category">${escapeHtml(category)}</span>
    <h3 class="ollama-card-title">${escapeHtml(post.title)}</h3>
    <p class="ollama-card-desc">${escapeHtml(post.description)}</p>
    <div class="ollama-card-author">
      <div class="ollama-user-avatar" style="width:20px;height:20px;font-size:10px;">${escapeHtml(post.author.charAt(0).toUpperCase())}</div>
      <span class="ollama-body-sm-strong" style="font-size:12px;">${escapeHtml(post.author)}</span>
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

  try {
    const res = await fetch(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    renderProjectDetailBody(data.post);
  } catch (err) {
    body.innerHTML = '<div class="ollama-loading">Ошибка получения данных</div>';
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

  const date = new Date(post.created_at).toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const isOwner = post.user_id === currentUser.id;
  const contactBtnHtml = isOwner
    ? `<button class="ollama-btn-secondary" disabled>Ваш проект</button>`
    : `<button class="ollama-btn-primary" onclick="contactAuthor(${post.user_id}, '${escapeHtml(post.author)}', ${post.id}, '${escapeHtml(post.title)}')">
        Написать автору
       </button>`;

  const repoHtml = post.repo_url
    ? `<div style="margin:16px 0;">
         <a href="${escapeHtml(post.repo_url)}" target="_blank" rel="noopener" class="ollama-btn-secondary full-width">
           🔗 Git-репозиторий: ${escapeHtml(post.repo_url)}
         </a>
       </div>`
    : '';

  body.innerHTML = `
    ${heroHtml}
    
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px;">
      <div>
        <span class="ollama-card-category" style="margin-bottom:8px;">${escapeHtml(post.category || 'Учёба & Доклады')}</span>
        <h1 class="ollama-heading-lg">${escapeHtml(post.title)}</h1>
      </div>
      <div>
        ${contactBtnHtml}
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid var(--color-hairline);border-bottom:1px solid var(--color-hairline);margin-bottom:16px;">
      <div class="ollama-user-avatar">${escapeHtml(post.author.charAt(0).toUpperCase())}</div>
      <div>
        <div class="ollama-body-strong">${escapeHtml(post.author)}</div>
        <div class="ollama-caption-sm">Опубликовано: ${date}</div>
      </div>
      <button class="ollama-btn-secondary" style="margin-left:auto;height:32px;padding:4px 12px;font-size:13px;" id="likeBtn-${post.id}" onclick="toggleLike(${post.id})">
        ${post.is_liked ? '❤️ Понравилось' : '🤍 Лайк'} (${post.like_count || 0})
      </button>
    </div>

    <div class="ollama-body-md" style="margin-bottom:16px;white-space:pre-wrap;">${escapeHtml(post.description)}</div>

    ${repoHtml}

    <!-- COMMENTS -->
    <div style="margin-top:24px;border-top:1px solid var(--color-hairline);padding-top:16px;">
      <h3 class="ollama-heading-sm" style="margin-bottom:12px;">Обсуждение</h3>
      <div id="modalCommentsList">
        <div class="ollama-caption-sm">Загрузка комментариев...</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <textarea id="modalCommentInput" class="ollama-text-input ollama-textarea" rows="2" placeholder="Ваш комментарий..."></textarea>
        <button class="ollama-btn-primary" style="height:auto;" onclick="submitModalComment(${post.id})">Отправить</button>
      </div>
    </div>
  `;

  loadModalComments(post.id);
}

async function toggleLike(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    const btn = document.getElementById(`likeBtn-${postId}`);
    if (btn) btn.innerText = `${data.isLiked ? '❤️ Понравилось' : '🤍 Лайк'} (${data.likeCount})`;
  } catch (err) {
    console.error('toggleLike error:', err);
  }
}

async function loadModalComments(postId) {
  const container = document.getElementById('modalCommentsList');
  try {
    const res = await fetch(`/api/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const comments = data.comments || [];
    container.innerHTML = '';
    if (comments.length === 0) {
      container.innerHTML = '<div class="ollama-caption-sm">Пока нет комментариев.</div>';
      return;
    }
    comments.forEach((c) => {
      const time = new Date(c.created_at).toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
      });
      const item = document.createElement('div');
      item.style.cssText = 'padding:8px 0;border-bottom:1px solid var(--color-hairline);display:flex;gap:8px;';
      item.innerHTML = `
        <div class="ollama-user-avatar" style="width:20px;height:20px;font-size:10px;">${escapeHtml(c.author.charAt(0).toUpperCase())}</div>
        <div style="flex:1;">
          <div class="ollama-body-sm-strong">${escapeHtml(c.author)} <span class="ollama-caption-sm" style="margin-left:6px;">${time}</span></div>
          <div class="ollama-body-sm" style="margin-top:2px;">${escapeHtml(c.text)}</div>
        </div>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    container.innerHTML = '<div class="ollama-caption-sm">Ошибка загрузки комментариев</div>';
  }
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
    console.error('submitModalComment error:', err);
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
      await loadChats();
      await selectChat(data.chat);

      const msgInput = document.getElementById('messageInput');
      if (msgInput) {
        msgInput.value = `Здравствуйте, ${authorName}! Я по поводу вашего проекта "${projectTitle}".`;
        msgInput.focus();
      }
    }
  } catch (err) {
    console.error('contactAuthor error:', err);
  }
}

async function loadChats() {
  try {
    const res = await fetch('/api/chats', {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    renderChatsList(data.chats || []);
  } catch (err) {
    console.error('Failed to load chats:', err);
  }
}

function renderChatsList(chats) {
  const container = document.getElementById('chatsList');
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
      <div class="ollama-user-avatar" style="width:28px;height:28px;font-size:12px;">👤</div>
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
    }
  } catch (err) {
    console.error('Failed to load chat details:', err);
  }

  loadChats();
  joinChatRoom(chat.id);
}

function joinChatRoom(chatId) {
  if (!socket || !socket.connected) return;
  socket.emit('join_chat', { chatId, token: currentToken, userId: currentUser.id });
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

  const isMe = msg.userId === currentUser.id;
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
  if (!activeChatId || !socket) return;

  socket.emit('send_message', {
    chatId: activeChatId,
    content: content || '',
    attachmentUrl: pendingAttachmentUrl || undefined,
    userId: currentUser.id,
    username: currentUser.username,
    token: currentToken,
  });

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
  if (!socket || !activeChatId) return;
  socket.emit('typing_status', {
    chatId: activeChatId,
    userId: currentUser.id,
    username: currentUser.username,
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
// FILE UPLOAD HELPER
// =====================================================================
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${currentToken}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Ошибка загрузки файла');
  }

  const data = await res.json();
  return data.url;
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
    alert('Не удалось загрузить фото: ' + err.message);
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
  document.getElementById('postRepo').value = '';
  document.getElementById('postImageInput').value = '';
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
  const repo_url = document.getElementById('postRepo').value.trim();
  const imageFileInput = document.getElementById('postImageInput');
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
        errorEl.innerText = 'Ошибка загрузки обложки: ' + uploadErr.message;
        errorEl.classList.remove('hidden');
        return;
      }
    }

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
        repo_url: repo_url || undefined,
        image_url,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.innerText = data.message || data.error || `Ошибка сервера (${res.status})`;
      errorEl.classList.remove('hidden');
      return;
    }

    closePublishModal();
    loadProjects();
  } catch (err) {
    errorEl.innerText = 'Ошибка соединения с сервером.';
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
      container.innerHTML = '<div class="ollama-git-empty">Событий пока нет.<br>Настройте вебхуки в Gitea.</div>';
      return;
    }
    events.forEach((ev) => container.appendChild(buildGitEventEl(ev)));
  } catch (err) {
    container.innerHTML = '<div class="ollama-git-empty" style="color:var(--color-primary);">Ошибка загрузки ленты</div>';
  }
}

function buildGitEventEl(ev) {
  const el = document.createElement('div');
  el.className = 'ollama-git-card';

  const time = new Date(ev.created_at).toLocaleString('ru-RU', {
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
