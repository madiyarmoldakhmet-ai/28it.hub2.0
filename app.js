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
