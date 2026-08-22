import axios from 'axios';
import { createLink } from '../utils.js';
import parse from './parser.js';

const texts = { success: 'RSS успешно загружен', exists: 'RSS уже существует', invalid: 'Ссылка должна быть валидным URL', rss: 'Ресурс не содержит валидный RSS', network: 'Ошибка сети' };

export default () => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');
  const button = form.querySelector('button[type="submit"]');
  const feedback = document.querySelector('.feedback');
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  const modal = document.querySelector('#modal');
  const state = { feeds: [], posts: [], seen: new Set() };
  const message = (text, color = 'danger') => { feedback.textContent = text; feedback.className = `feedback m-0 position-absolute small text-${color}`; };
  const draw = () => {
    feeds.innerHTML = '<h2>Фиды</h2>';
    posts.innerHTML = '<h2>Посты</h2>';
    const feedList = document.createElement('ul');
    const postList = document.createElement('ul');
    state.feeds.forEach((feed) => { const item = document.createElement('li'); const title = document.createElement('h3'); const description = document.createElement('p'); title.textContent = feed.title; description.textContent = feed.description; item.append(title, description); feedList.append(item); });
    state.posts.forEach((post) => {
      const item = document.createElement('li'); const link = document.createElement('a'); const preview = document.createElement('button');
      link.href = post.url; link.target = '_blank'; link.textContent = post.title; link.dataset.seen = state.seen.has(post.id) ? 'true' : 'false';
      preview.type = 'button'; preview.textContent = 'Просмотр';
      preview.addEventListener('click', () => { state.seen.add(post.id); link.dataset.seen = 'true'; modal.querySelector('.modal-title').textContent = post.title; modal.querySelector('[data-test="modal-body"]').textContent = post.description; modal.querySelector('.full-article').href = post.url; modal.classList.add('show'); modal.style.display = 'block'; });
      item.append(link, preview); postList.append(item);
    });
    feeds.append(feedList); posts.append(postList);
  };
  modal.querySelectorAll('[data-bs-dismiss="modal"]').forEach((close) => close.addEventListener('click', () => { modal.classList.remove('show'); modal.style.display = 'none'; }));
  form.addEventListener('submit', (event) => {
    event.preventDefault(); const url = input.value.trim();
    try { new URL(url); } catch (error) { message(texts.invalid); return; }
    if (state.feeds.some((feed) => feed.url === url)) { message(texts.exists); return; }
    button.disabled = true; input.disabled = true;
    axios.get(createLink(url)).then((response) => { const payload = typeof response.data === 'string' ? JSON.parse(response.data) : response.data; const parsed = parse(payload.contents); state.feeds.push({ ...parsed.feed, url }); state.posts.push(...parsed.posts.map((post, index) => ({ ...post, id: `${Date.now()}-${index}` }))); draw(); form.reset(); message(texts.success, 'success'); }).catch((error) => { message(error.message === 'invalidRSS' ? texts.rss : texts.network); }).finally(() => { button.disabled = false; input.disabled = false; });
  });
};
